'use client';

import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';

export default function Navigation() {
  const { user, signOut } = useAuth();

  return (
    <nav className="relative bg-white/90 backdrop-blur-md border-b border-[#B3B4BD]/20 shadow-sm">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              <span className="text-[#141619]">own</span>
              <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">UR</span>
              <span className="text-[#141619]">growth</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/courses" className="text-sm text-[#2C2E3A] hover:text-[#1D4ED8] transition-colors font-medium relative group">
                Courses
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1D4ED8] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <a href="/#why-choose" className="text-sm text-[#2C2E3A] hover:text-[#1D4ED8] transition-colors font-medium relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1D4ED8] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="/#reviews" className="text-sm text-[#2C2E3A] hover:text-[#1D4ED8] transition-colors font-medium relative group">
                Reviews
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1D4ED8] group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-[#2C2E3A] font-medium">
                  Welcome, {user.displayName || user.email?.split('@')[0]}
                </span>
                <Link href="/profile" className="text-sm text-[#2C2E3A] hover:text-[#1D4ED8] transition-colors font-medium">
                  Profile
                </Link>
                <button 
                  onClick={signOut}
                  className="text-sm text-[#2C2E3A] hover:text-[#1D4ED8] font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm text-[#2C2E3A] hover:text-[#1D4ED8] font-medium">
                  Login
                </Link>
                <Link href="/signup" className="relative overflow-hidden bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-8 py-3 text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 rounded-full">
                  <span className="relative z-10">Sign Up</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full hover:translate-x-full transition-transform duration-500"></div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
