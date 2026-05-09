'use client';

import dynamic from 'next/dynamic';
import { useAuth } from '../../lib/AuthContext';

const CoursesGrid = dynamic(() => import('./CoursesGrid'), { ssr: false });

export default function CoursesPage() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tl from-indigo-400/8 to-blue-500/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/5 to-indigo-400/8 rounded-full blur-3xl"></div>

          {/* Floating shapes */}
          <div className="absolute top-32 left-1/4 w-16 h-16 border border-blue-200/40 rounded-2xl rotate-12 animate-pulse"></div>
          <div className="absolute bottom-32 right-1/4 w-12 h-12 bg-blue-300/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-1/3 right-1/6 w-8 h-8 border-2 border-indigo-300/30 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-20 lg:px-6 relative z-10">
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-bold text-[#141619] sm:text-6xl lg:text-7xl tracking-tight">
              Our <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">Courses</span>
            </h1>
            <p className="text-xl text-[#2C2E3A] max-w-4xl mx-auto font-light leading-relaxed">
              Practical courses designed to accelerate your career and personal growth with real-world strategies
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <CoursesGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[#B3B4BD]/20 bg-gradient-to-br from-gray-100 via-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-6">
          {user ? (
            <>
              <h2 className="text-3xl font-bold text-[#141619] mb-4">
                Continue Your Learning Journey
              </h2>
              <p className="text-lg text-[#2C2E3A] mb-8">
                You're logged in and ready to access your courses
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </main>
  );
}
