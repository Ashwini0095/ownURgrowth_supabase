'use client';

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  sections: string[];
}

export default function ScrollProgressBar({ sections }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(Math.min(currentProgress, 100));

      // Update active section based on scroll position
      const sectionHeight = 100 / sections.length;
      const currentSection = Math.floor(currentProgress / sectionHeight);
      setActiveSection(Math.min(currentSection, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-[#B3B4BD]/20">
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="px-4 py-2 flex justify-center">
        <div className="flex gap-4 text-xs text-[#2C2E3A]">
          {sections.map((section, index) => (
            <span 
              key={index}
              className={`transition-colors duration-300 ${
                index === activeSection ? 'text-[#1D4ED8] font-semibold' : ''
              }`}
            >
              {section}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
