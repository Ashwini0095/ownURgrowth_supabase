'use client';

import Link from 'next/link';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../lib/AuthContext';
import {
  isFreshPurchaseSnapshot,
  readPurchaseSnapshot,
  writePurchaseSnapshot,
} from '../../lib/purchaseCache';

const RECENT_PURCHASE_WINDOW_MS = 2 * 60 * 1000;

type CourseCard = {
  title: string;
  category: string;
  description: string;
  price: string;
  badge: string;
  slug: string;
  priceMessage?: string;
};

const courses: CourseCard[] = [
  {
    title: 'Grow on LinkedIn',
    category: 'LinkedIn Growth',
    description:
      'Master LinkedIn to build your personal brand, grow your network, and unlock career opportunities',
    price: '₹499',
    badge: '3 plans available',
    slug: 'linkedin-growth',
  },
  {
    title: 'System Design Notes',
    category: 'System Design',
    description:
      'Clear, practical notes to master scalable system design for real-world systems and interviews.',
    price: '',
    badge: 'Notes only',
    slug: 'system-design-notes',
    priceMessage: 'Coming soon',
  },
];

export default function CoursesGrid() {
  const { user, session } = useAuth();

  // Synchronous first-paint hydration: read the latest snapshot before render.
  // Because this component is dynamically imported with ssr:false, there is
  // no server HTML to mismatch — first client paint already shows the right card.
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>(
    () => readPurchaseSnapshot()?.courses ?? []
  );

  // If the snapshot belongs to a different user, drop it immediately.
  useEffect(() => {
    if (!user) {
      setPurchasedCourses([]);
      return;
    }
    const snap = readPurchaseSnapshot();
    if (snap && snap.userId !== user.id) {
      setPurchasedCourses([]);
    } else if (snap) {
      setPurchasedCourses(snap.courses);
    }
  }, [user]);

  // Background revalidation against the server.
  useEffect(() => {
    if (!user || !session) return;

    let cancelled = false;
    (async () => {
      try {
        const response = await fetch('/api/check-purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ userId: user.id, userEmail: user.email }),
        });

        if (cancelled) return;

        const data = response.ok ? await response.json() : null;
        const plan: string | null = data?.plan ?? null;
        const cached = readPurchaseSnapshot();
        if (!plan && isFreshPurchaseSnapshot(cached, user.id, RECENT_PURCHASE_WINDOW_MS)) return;

        const nextCourses = plan ? ['linkedin-growth'] : [];
        setPurchasedCourses(nextCourses);
        writePurchaseSnapshot({ userId: user.id, courses: nextCourses, plan });
      } catch (err) {
        console.error('Error fetching purchases:', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, session]);

  return (
    <div className="grid gap-10 md:grid-cols-2 max-w-5xl mx-auto">
      {courses.map((course) => {
        const isPurchased = purchasedCourses.includes(course.slug);
        return (
          <div
            key={course.slug}
            className={`group relative overflow-hidden ${
              isPurchased
                ? 'bg-gradient-to-br from-green-50/80 to-emerald-50/60 border-2 border-green-200/50'
                : 'bg-gradient-to-br from-blue-50/80 to-indigo-50/60 border-2 border-[#1D4ED8]/30'
            } rounded-3xl p-8 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full`}
          >
            <div
              className={`absolute top-0 left-0 w-full h-2 ${
                isPurchased
                  ? 'bg-gradient-to-r from-green-500 via-emerald-400 to-green-500'
                  : 'bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8]'
              } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl`}
            ></div>

            <div
              className={`absolute top-6 right-6 w-12 h-12 ${
                isPurchased ? 'bg-green-200/30' : 'bg-[#1D4ED8]/20'
              } rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0`}
            >
              <div
                className={`w-6 h-6 ${
                  isPurchased ? 'bg-green-400/50' : 'bg-[#1D4ED8]/50'
                } rounded-lg`}
              ></div>
            </div>

            {isPurchased && (
              <div className="flex items-center gap-2 mb-6 rounded-full bg-green-100 border border-green-200 px-4 py-2 w-fit">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-semibold text-green-600">Purchased</span>
              </div>
            )}

            <div className="mb-6">
              <span
                className={`inline-block rounded-full ${
                  isPurchased
                    ? 'bg-green-100 text-green-700 border-green-200'
                    : 'bg-[#1D4ED8]/10 text-[#1D4ED8] border-[#1D4ED8]/20'
                } px-4 py-2 text-sm font-semibold mb-4 border`}
              >
                {course.category}
              </span>
              <h3
                className={`text-3xl font-bold ${
                  isPurchased ? 'text-green-800' : 'text-[#1D4ED8]'
                } mb-4 transition-colors duration-500 relative z-10 tracking-tight`}
              >
                {course.title}
              </h3>
              <p className="text-[#2C2E3A] text-lg font-light leading-relaxed mb-6 relative z-10">
                {course.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto relative z-10">
              <div>
                <span
                  className={`text-2xl font-bold ${
                    isPurchased ? 'text-green-600' : 'text-[#1D4ED8]'
                  }`}
                >
                  {isPurchased
                    ? 'Owned'
                    : course.priceMessage ?? `Starts at ${course.price}`}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  {isPurchased ? 'You have access' : course.badge}
                </p>
              </div>
              {isPurchased ? (
                <Link
                  href={`/courses/${course.slug}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 text-lg font-bold text-white transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-green-500/30"
                >
                  Access Course
                  <ChevronRight className="h-5 w-5" />
                </Link>
              ) : course.slug === 'system-design-notes' ? (
                <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 px-8 py-4 text-lg font-bold text-gray-300 shadow-xl cursor-not-allowed opacity-70">
                  Coming Soon
                </button>
              ) : (
                <Link
                  href={`/courses/${course.slug}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-8 py-4 text-lg font-bold text-white transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-[#1D4ED8]/30"
                >
                  View Course
                  <ChevronRight className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
