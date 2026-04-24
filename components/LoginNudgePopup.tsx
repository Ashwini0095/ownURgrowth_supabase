'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { X, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
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
        className="absolute inset-0 bg-[#0F172A]/30 backdrop-blur-[2px] animate-[fadeIn_0.3s_ease-out]"
      />

      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#1D4ED8]/15 bg-white/95 shadow-2xl shadow-[#1D4ED8]/20 backdrop-blur-2xl animate-[popIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]"
      >
        {/* Decorative gradient blobs, same recipe as the login/signup card */}
        <div className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-indigo-300/25 to-blue-400/15 blur-3xl" />

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#0F172A]/5 text-[#2C2E3A] transition-colors hover:bg-[#1D4ED8]/10 hover:text-[#1D4ED8]"
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <div className="relative p-7 sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1D4ED8] to-[#0F172A] shadow-xl shadow-[#1D4ED8]/30">
            <LogIn className="h-6 w-6 text-white" strokeWidth={2.25} />
          </div>

          <h2
            id="login-nudge-title"
            className="mt-5 text-2xl font-bold tracking-tight text-[#141619]"
          >
            Join ownURgrowth
          </h2>
          <p className="mt-1.5 text-sm font-light leading-relaxed text-[#2C2E3A]">
            Create your free account in 30 seconds — save progress, unlock courses, and pick up right where you left off.
          </p>

          <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#1D4ED8]/10 bg-[#1D4ED8]/[0.04] px-3 py-2 text-[11px] font-medium text-[#2C2E3A]">
            <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0 text-[#1D4ED8]" strokeWidth={2.25} />
            <span>Lifetime access · Progress syncs across devices</span>
          </div>

          <div className="mt-5 space-y-2.5">
            <button
              type="button"
              onClick={handleSignup}
              className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/40"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Create an account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/25 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
            </button>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full rounded-full border border-[#B3B4BD]/60 bg-white px-4 py-3 text-sm font-semibold text-[#141619] transition-colors hover:border-[#1D4ED8]/40 hover:bg-[#1D4ED8]/5 hover:text-[#1D4ED8]"
            >
              I already have an account
            </button>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="mt-4 block w-full text-center text-xs font-medium text-[#2C2E3A]/70 transition-colors hover:text-[#1D4ED8]"
          >
            Maybe later
          </button>
        </div>
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
