'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { trackLogin, setAnalyticsUser } from './analytics';
import { createUserSession, updateSessionActivity, removeUserSession, checkSessionValidity } from './sessionManager';
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
        handleUserLogin(s.user);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, s) => {
        setSession(s);
        setUser(s?.user ?? null);
        setLoading(false);

        if (s?.user) {
          handleUserLogin(s.user);
        } else {
          await removeUserSession();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleUserLogin = async (u: User) => {
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
      await fetch('/api/user-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

      // Update session activity (throttled inside sessionManager)
      if (user) {
        updateSessionActivity(user.id);
      }
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

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

  const signOut = async () => {
    await removeUserSession();
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
