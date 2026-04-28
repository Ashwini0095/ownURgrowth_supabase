'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export default function Navigation() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: '/courses', label: 'Courses' },
    { href: '/#why-choose', label: 'About' },
    { href: '/#reviews', label: 'Reviews' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#B3B4BD]/20 shadow-sm">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <Image src="/vercel.png" alt="ownURgrowth" width={40} height={40} className="rounded-lg" />
              <span><span className="text-[#141619]">own</span><span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">UR</span><span className="text-[#141619]">growth</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="text-sm text-[#2C2E3A] hover:text-[#1D4ED8] transition-colors font-medium relative group">
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1D4ED8] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
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
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-[#141619] hover:text-[#1D4ED8] transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#B3B4BD]/20 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block text-base text-[#2C2E3A] hover:text-[#1D4ED8] font-medium py-2"
              >
                {label}
              </a>
            ))}
            <hr className="border-[#B3B4BD]/20" />
            {user ? (
              <>
                <span className="block text-sm text-[#2C2E3A] font-medium py-1">
                  Welcome, {user.displayName || user.email?.split('@')[0]}
                </span>
                <Link href="/profile" onClick={() => setOpen(false)} className="block text-base text-[#2C2E3A] hover:text-[#1D4ED8] font-medium py-2">
                  Profile
                </Link>
                <button
                  onClick={() => { signOut(); setOpen(false); }}
                  className="block text-base text-[#2C2E3A] hover:text-[#1D4ED8] font-medium py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4 pt-2">
                <Link href="/login" onClick={() => setOpen(false)} className="text-base text-[#2C2E3A] hover:text-[#1D4ED8] font-medium">
                  Login
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-6 py-2.5 text-white rounded-full font-medium">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
