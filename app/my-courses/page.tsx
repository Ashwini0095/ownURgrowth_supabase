'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { ChevronRight, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function MyCoursesPage() {
  const { user, session, loading: authLoading } = useAuth();
  const router = useRouter();
  const [purchasedPlan, setPurchasedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/my-courses');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user || !session) return;
      
      try {
        const response = await fetch('/api/check-purchase', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify({ userId: user.id, userEmail: user.email }),
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.plan) {
            setPurchasedPlan(data.plan);
          }
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchCourses();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#1D4ED8] border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  const planNames: Record<string, string> = {
    basic: "Basic Crash Course",
    plus: "Pro Program",
    pro: "Master Program"
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      <section className="py-20 lg:py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tl from-indigo-400/8 to-blue-500/5 rounded-full blur-2xl"></div>
        </div>

        <div className="mx-auto max-w-5xl px-4 lg:px-6 relative z-10">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#141619] tracking-tight mb-4">My Courses</h1>
            <p className="text-lg text-[#2C2E3A] font-light">Access your purchased courses and learning materials.</p>
          </div>

          {purchasedPlan ? (
            <div className="grid gap-8 md:grid-cols-2">
              {/* Course Card */}
              <div className="group relative bg-white border-2 border-transparent hover:border-[#1D4ED8]/30 rounded-3xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1D4ED8] to-blue-400 rounded-t-3xl"></div>
                
                <div className="flex items-start justify-between mb-6 pt-2">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#1D4ED8] mb-3">
                      {planNames[purchasedPlan] || "Course"} Tier
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
          ) : (
            <div className="bg-white border border-[#B3B4BD]/20 rounded-3xl p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <PlayCircle className="w-8 h-8 text-[#1D4ED8]/40" />
              </div>
              <h3 className="text-2xl font-bold text-[#141619] mb-3">No courses found</h3>
              <p className="text-[#2C2E3A] font-light max-w-md mx-auto mb-8">
                You haven't purchased any courses yet. Explore our catalog to start learning and growing your personal brand.
              </p>
              <Link 
                href="/courses/linkedin-growth"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
              >
                Browse Courses
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
