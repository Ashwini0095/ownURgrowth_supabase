'use client';

import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';

export default function Navigation() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              <span className="text-white">own</span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">UR</span>
              <span className="text-white">growth</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/courses" className="text-sm text-slate-300 hover:text-white transition">
                Courses
              </Link>
              <a href="/#why-choose" className="text-sm text-slate-300 hover:text-white transition">
                About
              </a>
              <a href="/#reviews" className="text-sm text-slate-300 hover:text-white transition">
                Reviews
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-slate-300">
                  Welcome, {user.displayName || user.email?.split('@')[0]}
                </span>
                <Link href="/profile" className="text-sm text-slate-300 hover:text-white transition">
                  Profile
                </Link>
                <button 
                  onClick={signOut}
                  className="text-sm text-slate-300 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm text-slate-300 hover:text-white">
                  Login
                </Link>
                <Link href="/signup" className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
