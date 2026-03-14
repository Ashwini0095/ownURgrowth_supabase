'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut as firebaseSignOut, User } from 'firebase/auth';
import { trackLogin, setAnalyticsUser } from './analytics';

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
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      if (user) {
        // Check if email is verified (in real app, check your database)
        // For now, we'll use localStorage to simulate verification
        const verified = localStorage.getItem(`email_verified_${user.uid}`) === 'true';
        setIsEmailVerified(verified);
        
        trackLogin();
        setAnalyticsUser(user.uid, user.email || '', user.displayName || '');
      } else {
        setIsEmailVerified(false);
      }
    });

    return unsubscribe;
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  // Show email verification screen if user is logged in but not verified
  if (!loading && user && !isEmailVerified) {
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
            <p className="text-sm text-slate-400 mb-6">
              Please check your inbox and click the verification link to continue.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => {
                // Check if email is now verified
                const verified = localStorage.getItem(`email_verified_${user.uid}`) === 'true';
                setIsEmailVerified(verified);
                if (!verified) {
                  alert('Please click the verification link in your email first.');
                }
              }}
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              I've Verified My Email
            </button>
            
            <button
              onClick={async () => {
                const response = await fetch('/api/send-verification', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: user.email,
                    name: user.displayName || user.email,
                  }),
                });
                
                if (response.ok) {
                  alert('Verification email sent again!');
                } else {
                  alert('Failed to send email. Please try again.');
                }
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
