'use client';

import { useEffect, useState } from 'react';

export default function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <div 
        className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-[#1D4ED8]/10 to-[#0F172A]/5 rounded-full blur-xl"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div 
        className="absolute top-1/3 left-10 w-24 h-24 bg-[#B3B4BD]/10 rotate-45 rounded-lg"
        style={{ transform: `translateY(${scrollY * -0.05}px) rotate(${45 + scrollY * 0.1}deg)` }}
      />
      <div 
        className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-gradient-to-tr from-[#1D4ED8]/5 to-transparent rounded-full"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      />
      <div 
        className="absolute top-2/3 left-1/4 w-20 h-20 border-2 border-[#1D4ED8]/10 rounded-full"
        style={{ transform: `translateY(${scrollY * -0.03}px)` }}
      />
    </div>
  );
}
