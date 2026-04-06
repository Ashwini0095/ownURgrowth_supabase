'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-50 p-3 bg-white border-2 border-[#1D4ED8]/20 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
    >
      <ChevronUp className="h-5 w-5 text-[#1D4ED8] group-hover:text-[#0F172A] transition-colors" />
    </button>
  );
}
