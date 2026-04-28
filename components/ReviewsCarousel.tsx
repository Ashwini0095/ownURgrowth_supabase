'use client';

import { Star, StarHalf } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    name: "Naman Damani",
    role: "SDE, UBS",
    rating: 4.5,
    text: "Honestly didn't expect to get so much out of it in one sitting. It's a crash course but nothing feels rushed, every minute is worth it."
  },
  {
    name: "Aniket Kolte",
    role: "Associate SDE, Finarkein",
    rating: 5,
    text: "What I liked most is that everything taught actually had a real example behind it. It didn't feel like theory, it felt like someone showing me their own work."
  },
  {
    name: "Tejas Kohade",
    role: "SDE 2, Mindstix",
    rating: 4,
    text: "There's no \"you got this, believe in yourself\" stuff here which I really appreciated. Just straight up sharing of what worked and what didn't, very refreshing."
  },
  {
    name: "Ishan Shah",
    role: "Intern, Upstox",
    rating: 5,
    text: "Some of the things shared in this course I genuinely hadn't come across anywhere else. Felt less like a course and more like a conversation with someone who's been in the trenches."
  },
  {
    name: "Shashank Patil",
    role: "SDE, Barclays",
    rating: 4.5,
    text: "Every tip had a \"I did this and here's what happened\" energy to it. You can tell none of it was copy pasted from somewhere, it's all been lived and tested."
  }
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  return (
    <div className="flex gap-1">
      {[...Array(full)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
      {hasHalf && (
        <div className="relative h-4 w-4">
          <Star className="absolute h-4 w-4 text-amber-400" />
          <StarHalf className="absolute h-4 w-4 fill-amber-400 text-amber-400" />
        </div>
      )}
    </div>
  );
}

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
            <div className="mb-4">
              <StarRating rating={review.rating} />
            </div>
            <p className="mb-4 text-[#2C2E3A] group-hover:text-[#141619] transition-colors">
              &ldquo;{review.text}&rdquo;
            </p>
            <div>
              <div className="font-semibold text-[#141619] group-hover:text-[#1D4ED8] transition-colors">{review.name}</div>
              <div className="text-sm text-[#B3B4BD]">{review.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
