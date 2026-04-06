'use client';

import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    name: "Sarah Chen",
    role: "Product Manager, Google",
    rating: 5,
    text: "The LinkedIn course completely changed how I approach networking. I got 3 job offers within 2 months!"
  },
  {
    name: "Alex Rodriguez",
    role: "Senior Engineer, Meta",
    rating: 5,
    text: "System design notes helped me crack interviews at FAANG companies. Worth every penny!"
  },
  {
    name: "Priya Sharma",
    role: "Marketing Director, Startup",
    rating: 5,
    text: "Practical, actionable content. No fluff, just real strategies that work in the real world."
  },
  {
    name: "Michael Johnson",
    role: "Data Scientist, Microsoft",
    rating: 5,
    text: "The course structure is perfect. I learned more in 2 weeks than I did in 6 months of random tutorials."
  },
  {
    name: "Emily Davis",
    role: "UX Designer, Adobe",
    rating: 5,
    text: "Finally, a course that focuses on what actually matters. My LinkedIn engagement increased by 400%!"
  },
  {
    name: "David Kim",
    role: "Software Engineer, Amazon",
    rating: 5,
    text: "The system design concepts are explained so clearly. Helped me land my dream job at Amazon."
  },
  {
    name: "Lisa Wang",
    role: "Product Owner, Netflix",
    rating: 5,
    text: "Best investment I made for my career. The LinkedIn strategies are pure gold!"
  },
  {
    name: "James Wilson",
    role: "Tech Lead, Spotify",
    rating: 5,
    text: "Concise, practical, and immediately applicable. Exactly what busy professionals need."
  },
  {
    name: "Maria Garcia",
    role: "Engineering Manager, Uber",
    rating: 5,
    text: "The course helped me build my personal brand and establish thought leadership in my field."
  },
  {
    name: "Robert Brown",
    role: "Senior Developer, Apple",
    rating: 5,
    text: "Outstanding content quality. The instructor knows what they're talking about and delivers real value."
  }
];

export default function ReviewsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (!isPaused) {
        scrollContainer.scrollLeft += 1;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      className="overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {[...reviews, ...reviews].map((review, index) => (
          <div 
            key={index}
            className="group min-w-[350px] rounded-2xl border border-[#B3B4BD]/20 bg-white/800 p-6 backdrop-blur transition-all duration-300 hover:border-[#1D4ED8]/30 hover:bg-white/80 hover:scale-105 hover:shadow-lg hover:shadow-[#1D4ED8]/10"
          >
            <div className="mb-4 flex">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-blue-400 text-[#1D4ED8] transition-all duration-300 group-hover:scale-110" />
              ))}
            </div>
            <p className="mb-4 text-[#2C2E3A] group-hover:text-[#141619] transition-colors">
              "{review.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#1D4ED8] to-[#0F172A] transition-all duration-300 group-hover:scale-110" />
              <div>
                <div className="font-semibold text-slate-100 group-hover:text-[#1D4ED8] transition-colors">{review.name}</div>
                <div className="text-sm text-[#B3B4BD]">{review.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
