'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../lib/AuthContext';

const STORAGE_KEY = 'loginNudge:shownCount';
const MAX_SHOWS = 2;
const FIRST_DELAY_MS = 3000;
const REPEAT_DELAY_MS = 20000;

export default function LoginNudgePopup() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getShownCount = () => {
    if (typeof window === 'undefined') return 0;
    return parseInt(sessionStorage.getItem(STORAGE_KEY) || '0', 10);
  };

  const bumpShownCount = () => {
    const next = getShownCount() + 1;
    sessionStorage.setItem(STORAGE_KEY, String(next));
    return next;
  };

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const scheduleNextShow = (delay: number) => {
    clearTimer();
    timerRef.current = window.setTimeout(() => {
      if (getShownCount() >= MAX_SHOWS) return;
      setOpen(true);
    }, delay);
  };

  useEffect(() => {
    if (!mounted || loading) return;

    if (user) {
      clearTimer();
      setOpen(false);
      return;
    }

    const authPages = ['/login', '/signup'];
    if (authPages.includes(pathname)) return;

    if (getShownCount() >= MAX_SHOWS) return;

    scheduleNextShow(FIRST_DELAY_MS);

    return () => clearTimer();
  }, [mounted, loading, user, pathname]);

  const handleDismiss = () => {
    setOpen(false);
    const count = bumpShownCount();
    if (count < MAX_SHOWS) {
      scheduleNextShow(REPEAT_DELAY_MS);
    }
  };

  const handleLogin = () => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, String(MAX_SHOWS));
    router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
  };

  const handleSignup = () => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, String(MAX_SHOWS));
    router.push(`/signup?redirect=${encodeURIComponent(pathname)}`);
  };

  if (!mounted || !open || user) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center px-4 animate-[fadeIn_0.3s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-nudge-title"
    >
      <button
        type="button"
        aria-label="Dismiss"
        onClick={handleDismiss}
        className="absolute inset-0 bg-slate-900/15 backdrop-blur-[2px] animate-[fadeIn_0.3s_ease-out]"
      />

      <div
        className="relative w-full max-w-md rounded-3xl border border-white/40 bg-white/70 p-8 shadow-2xl shadow-fuchsia-500/20 backdrop-blur-2xl animate-[popIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]"
      >
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-slate-500 transition hover:bg-black/10 hover:text-slate-900"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-400 to-purple-500 shadow-lg shadow-fuchsia-400/40">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
        </div>

        <h2
          id="login-nudge-title"
          className="text-2xl font-bold tracking-tight text-slate-900"
        >
          Join ownURgrowth
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Sign up in 30 seconds to continue.
        </p>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={handleSignup}
            className="w-full rounded-full bg-gradient-to-r from-fuchsia-400 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-fuchsia-500/40"
          >
            Create an account
          </button>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full rounded-full border border-slate-300 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 backdrop-blur transition hover:bg-white"
          >
            I already have an account
          </button>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="mt-4 w-full text-center text-xs font-medium text-slate-500 transition hover:text-slate-700"
        >
          Maybe later
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.92);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
