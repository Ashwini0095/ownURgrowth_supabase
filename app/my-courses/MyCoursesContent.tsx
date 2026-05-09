'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, PlayCircle } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import {
  isFreshPurchaseSnapshot,
  readPurchaseSnapshot,
  writePurchaseSnapshot,
} from '../../lib/purchaseCache';

const RECENT_PURCHASE_WINDOW_MS = 2 * 60 * 1000;

const planNames: Record<string, string> = {
  basic: 'Basic Crash Course',
  plus: 'Pro Program',
  pro: 'Master Program',
};

export default function MyCoursesContent() {
  const { user, session } = useAuth();

  // Hydrate plan synchronously from cache so the card paints immediately on revisits.
  const [purchasedPlan, setPurchasedPlan] = useState<string | null>(
    () => readPurchaseSnapshot()?.plan ?? null
  );
  const [hasFetched, setHasFetched] = useState<boolean>(
    () => readPurchaseSnapshot() !== null
  );

  useEffect(() => {
    if (!user) {
      setPurchasedPlan(null);
      return;
    }
    const snap = readPurchaseSnapshot();
    if (snap && snap.userId !== user.id) {
      setPurchasedPlan(null);
      setHasFetched(false);
    } else if (snap) {
      setPurchasedPlan(snap.plan);
      setHasFetched(true);
    }
  }, [user]);

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

        setPurchasedPlan(plan);
        writePurchaseSnapshot({
          userId: user.id,
          courses: plan ? ['linkedin-growth'] : [],
          plan,
        });
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        if (!cancelled) setHasFetched(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, session]);

  // Only show the spinner when we have nothing to display yet (no cache, no fetch).
  if (!hasFetched && !purchasedPlan) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#1D4ED8] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (purchasedPlan) {
    return (
      <div className="grid gap-8 md:grid-cols-2">
        <div className="group relative bg-white border-2 border-transparent hover:border-[#1D4ED8]/30 rounded-3xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1D4ED8] to-blue-400 rounded-t-3xl"></div>

          <div className="flex items-start justify-between mb-6 pt-2">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#1D4ED8] mb-3">
                {planNames[purchasedPlan] || 'Course'} Tier
              </span>
              <h2 className="text-2xl font-bold text-[#141619]">Grow on LinkedIn</h2>
            </div>
          </div>

          <p className="text-[#2C2E3A] font-light mb-8">
            Build a system to grow your LinkedIn audience, generate opportunities, and build your personal brand.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/courses/linkedin-growth/access?plan=${purchasedPlan}`}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#1D4ED8]/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <PlayCircle className="w-4 h-4" />
              Resume Course
            </Link>
            {purchasedPlan !== 'pro' && (
              <Link
                href={`/upgrade?from=${purchasedPlan}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1D4ED8] bg-white px-6 py-3 text-sm font-bold text-[#1D4ED8] transition-all duration-300 hover:bg-[#1D4ED8]/5"
              >
                Upgrade
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#B3B4BD]/20 rounded-3xl p-12 text-center shadow-sm">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <PlayCircle className="w-8 h-8 text-[#1D4ED8]/40" />
      </div>
      <h3 className="text-2xl font-bold text-[#141619] mb-3">No courses found</h3>
      <p className="text-[#2C2E3A] font-light max-w-md mx-auto mb-8">
        You haven't purchased any courses yet. Explore our catalog to start learning and growing your personal brand.
      </p>
      <Link
        href="/courses"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
      >
        Browse Courses
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
