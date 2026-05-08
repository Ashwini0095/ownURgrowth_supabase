'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAuth } from '../../lib/AuthContext';

const MyCoursesContent = dynamic(() => import('./MyCoursesContent'), {
  ssr: false,
});

export default function MyCoursesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/my-courses');
    }
  }, [user, authLoading, router]);

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

          <MyCoursesContent />
        </div>
      </section>
    </main>
  );
}
