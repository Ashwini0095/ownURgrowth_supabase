'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut as firebaseSignOut, User } from 'firebase/auth';
import { trackLogin, setAnalyticsUser } from './analytics';
import { createUserSession, updateSessionActivity, removeUserSession, checkSessionValidity } from './sessionManager';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      
      if (user) {
        // Check session validity and create new session
        const isValidSession = await checkSessionValidity(user.uid);
        if (!isValidSession) {
          const sessionCreated = await createUserSession(user.uid);
          if (!sessionCreated) {
            alert('Maximum device limit reached. Please log out from another device.');
            await firebaseSignOut(auth);
            return;
          }
        }
        
        trackLogin();
        setAnalyticsUser(user.uid, user.email || '', user.displayName || '');

        try {
          await fetch('/api/user-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            }),
          });
        } catch (err) {
          console.error('Failed to upsert user profile:', err);
        }
      } else {
        // Remove session when user logs out
        await removeUserSession();
      }
    });

    return unsubscribe;
  }, []);

  // Auto-logout after 20 minutes of inactivity
  useEffect(() => {
    if (!user) return;

    let timeout: NodeJS.Timeout;
    
    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        firebaseSignOut(auth);
        alert('You have been logged out due to inactivity.');
      }, 20 * 60 * 1000); // 20 minutes
      
      // Update session activity
      if (user) {
        updateSessionActivity(user.uid);
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
    await firebaseSignOut(auth);
  };

  // Show email verification screen if user is logged in but not verified
  if (!loading && user && !user.emailVerified) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-6">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
            <p className="text-slate-300 mb-4">
              We've sent a verification email to <strong>{user.email}</strong>
            </p>
            <p className="text-sm text-slate-400 mb-2">
              📧 Check your <strong>spam folder</strong> if you don't see it in your inbox
            </p>
            <p className="text-sm text-slate-400 mb-2">
              📨 Look for an email from: <strong>noreply@asrocourse.firebaseapp.com</strong>
            </p>
            <p className="text-sm text-slate-400 mb-6">
              🔗 Click the verification link in the email to continue
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              I've Verified My Email
            </button>
            
            <button
              onClick={async () => {
                const { sendEmailVerification } = await import("firebase/auth");
                await sendEmailVerification(user);
                alert('Verification email sent again!');
              }}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Resend Verification Email
            </button>
            
            <button
              onClick={signOut}
              className="w-full text-slate-400 hover:text-white py-2 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
