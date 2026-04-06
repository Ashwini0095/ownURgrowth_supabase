'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FloatingCTAProps {
  text: string;
  href: string;
}

export default function FloatingCTA({ text, href }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      setIsVisible(scrolled > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <a
        href={href}
        className="group flex items-center gap-2 bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-6 py-3 rounded-full text-white font-semibold shadow-2xl hover:scale-110 transition-all duration-300"
      >
        {text}
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}
