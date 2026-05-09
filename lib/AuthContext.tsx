'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { trackLogin, setAnalyticsUser } from './analytics';
import { createUserSession, updateSessionActivity, removeUserSession, checkSessionValidity } from './sessionManager';
import { clearPurchaseSnapshot } from './purchaseCache';
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
  signOut: async () => {},
});

const handleUserLogin = async (u: User, token?: string) => {
  // Check session validity and create new session
  const isValidSession = await checkSessionValidity(u.id);
  if (!isValidSession) {
    const sessionCreated = await createUserSession(u.id);
    if (!sessionCreated) {
      alert('Maximum device limit reached. Please log out from another device.');
      await supabase.auth.signOut();
      return;
    }
  }

  trackLogin();
  setAnalyticsUser(u.id, u.email || '', u.user_metadata?.full_name || u.user_metadata?.name || '');

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
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);

      if (s?.user) {
        void handleUserLogin(s.user, s.access_token);
      }
    });

  // Listen for auth changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);

      if (s?.user) {
        await handleUserLogin(s.user, s.access_token);
      } else {
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
        supabase.auth.signOut();
        alert('You have been logged out due to inactivity.');
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
    updateSessionActivity(user.id);

    const interval = setInterval(() => {
      updateSessionActivity(user.id);
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [user]);

  const signOut = async () => {
    await removeUserSession();
    clearPurchaseSnapshot();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
