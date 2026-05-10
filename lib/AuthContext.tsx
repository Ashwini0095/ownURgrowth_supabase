'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { createUserSession, updateSessionActivity, removeUserSession, checkSessionValidity } from './sessionManager';
import { clearPurchaseSnapshot } from './purchaseCache';
import { dispatchNotice } from './notice';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => { },
});

const handleUserLogin = async (u: User, token?: string) => {
  // Check session validity and create new session
  const isValidSession = await checkSessionValidity(u.id);
  if (!isValidSession) {
    const sessionCreated = await createUserSession(u.id);
    if (!sessionCreated) {
      dispatchNotice('Maximum device limit reached. Please log out from another device.');
      await supabase.auth.signOut();
      return;
    }
  }

  // Upsert user profile
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    await fetch('/api/user-profile', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        uid: u.id,
        email: u.email,
        displayName: u.user_metadata?.full_name || u.user_metadata?.name || null,
        photoURL: u.user_metadata?.avatar_url || null,
      }),
    });
  } catch (err) {
    console.error('Failed to upsert user profile:', err);
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track which (userId, access_token) pair we've already processed so the
    // initial session and subsequent INITIAL_SESSION/TOKEN_REFRESHED events
    // don't each trigger duplicate handleUserLogin runs (which would race in
    // createUserSession and write the user profile twice on every page load).
    let lastHandledKey: string | null = null;

    const runLogin = (s: Session | null) => {
      if (!s?.user) {
        lastHandledKey = null;
        return;
      }
      const key = `${s.user.id}:${s.access_token}`;
      if (key === lastHandledKey) return;
      lastHandledKey = key;
      void handleUserLogin(s.user, s.access_token);
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
      runLogin(s);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, s) => {
        setSession(s);
        setUser(s?.user ?? null);
        setLoading(false);

        if (s?.user) {
          runLogin(s);
        } else {
          lastHandledKey = null;
          await removeUserSession();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Auto-logout after 20 minutes of inactivity
  useEffect(() => {
    if (!user) return;

    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        dispatchNotice('You have been logged out due to inactivity.');
        void supabase.auth.signOut();
      }, 20 * 60 * 1000); // 20 minutes
    };

    // Only listen to events that indicate real user intent (not mousemove/scroll)
    const events = ['mousedown', 'keypress', 'touchstart'];

    // Set initial timeout
    resetTimeout();

    // Reset timeout on user activity
    events.forEach(event => {
      document.addEventListener(event, resetTimeout, true);
    });

    return () => {
      clearTimeout(timeout);
      events.forEach(event => {
        document.removeEventListener(event, resetTimeout, true);
      });
    };
  }, [user]);

  // Session heartbeat: update DB activity once every 5 minutes via setInterval
  // This is far more efficient than firing on every DOM event
  useEffect(() => {
    if (!user) return;

    // Fire once immediately
    updateSessionActivity();

    const interval = setInterval(() => {
      updateSessionActivity();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [user]);

  const signOut = async () => {
    clearPurchaseSnapshot();
    setUser(null);
    setSession(null);

    try {
      await supabase.auth.signOut({ scope: 'local' });
    } catch (error) {
      console.error('Supabase local signOut failed:', error);
    }

    void removeUserSession();
    void supabase.auth.signOut().then(({ error }) => {
      if (error) console.error('Supabase signOut failed:', error.message);
    });

    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
