'use client';

import Link from "next/link";
import { ChevronRight, PlayCircle, Star, Users, Award, Clock, Shield } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { useEffect } from "react";
import { trackPageView, trackButtonClick } from "../lib/analytics";

export default function Home() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    trackPageView('Home');
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">
              <span className="text-white">own</span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">UR</span>
              <span className="text-white">growth</span>
            </div>
            
            {/* Navigation Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/courses" className="text-sm text-slate-300 hover:text-white transition">
                Courses
              </Link>
              <Link href="/about" className="text-sm text-slate-300 hover:text-white transition">
                About
              </Link>
              <Link href="/reviews" className="text-sm text-slate-300 hover:text-white transition">
                Reviews
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm text-slate-300">
                    Welcome, {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <button 
                    onClick={signOut}
                    className="text-sm text-slate-300 hover:text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm text-slate-300 hover:text-white">
                    Login
                  </Link>
                  <Link href="/signup" className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-white/5 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur">
                <span className="inline-flex h-2 w-2 rounded-full bg-blue-400" />
                Transform Your Career & Life
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur">
                <span className="inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                Build your personal brand
              </div>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-slate-200">Master Skills That</span>{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Actually Matter
              </span>
            </h1>

            <p className="text-lg text-slate-300 sm:text-xl lg:text-2xl">
              You didn't come this far to stay average. Land your dream job, grow your LinkedIn, and build a brand that works for you, ownURgrowth got you covered.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/courses" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400">
                Start Learning Today
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Course Preview Section */}
      <section className="border-b border-white/5 bg-slate-900/90" style={{background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)'}}>
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6 lg:py-20">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-slate-50 sm:text-6xl">
              Practical <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Courses</span>
            </h2>
            <p className="text-2xl text-slate-300 mt-2">
              Built for The <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Ambitious</span>
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
              <h3 className="text-2xl font-bold text-slate-50 mb-3">Grow on LinkedIn</h3>
              <p className="text-slate-300 text-base mb-4">
                Master LinkedIn to build your personal brand, grow your network, and unlock career opportunities
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-blue-400 text-blue-400" />
                  <span className="text-sm font-semibold text-slate-100">4.9</span>
                </div>
                <Link href="/courses/linkedin-growth" className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400">
                  Enroll Now
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
              <h3 className="text-2xl font-bold text-slate-50 mb-3">System Design Notes</h3>
              <p className="text-slate-300 text-base mb-4">
                Comprehensive system design notes covering scalability, architecture patterns, and interview preparation
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-blue-400 text-blue-400" />
                  <span className="text-sm font-semibold text-slate-100">4.8</span>
                </div>
                <button className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-400 cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-white/5 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl mb-4">
              Why Choose <span className="text-white">own</span><span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">UR</span><span className="text-white">growth</span>?
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              We focus on practical skills that make a real difference in your career and life.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-50">Lifetime Access</h3>
              <p className="text-slate-300">
                Learn at your own pace with permanent access to all course materials and updates.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-50">14-Day Guarantee</h3>
              <p className="text-slate-300">
                Not satisfied? Get a full refund within 14 days, no questions asked.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-50">Expert Community</h3>
              <p className="text-slate-300">
                Connect with like-minded professionals and get support from industry experts.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <Award className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-50">Practical Focus</h3>
              <p className="text-slate-300">
                Real-world projects and actionable strategies you can implement immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-b border-white/5 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their careers with our courses.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6 backdrop-blur">
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-blue-400 text-blue-400" />
                ))}
              </div>
              <p className="mb-4 text-slate-300">
                "The LinkedIn course completely changed how I approach networking. I got 3 job offers within 2 months!"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-400" />
                <div>
                  <div className="font-semibold text-slate-100">Sarah Chen</div>
                  <div className="text-sm text-slate-400">Product Manager, Google</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6 backdrop-blur">
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-blue-400 text-blue-400" />
                ))}
              </div>
              <p className="mb-4 text-slate-300">
                "System design notes helped me crack interviews at FAANG companies. Worth every penny!"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-400" />
                <div>
                  <div className="font-semibold text-slate-100">Alex Rodriguez</div>
                  <div className="text-sm text-slate-400">Senior Engineer, Meta</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6 backdrop-blur">
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-blue-400 text-blue-400" />
                ))}
              </div>
              <p className="mb-4 text-slate-300">
                "Practical, actionable content. No fluff, just real strategies that work in the real world."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-400" />
                <div>
                  <div className="font-semibold text-slate-100">Priya Sharma</div>
                  <div className="text-sm text-slate-400">Marketing Director, Startup</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-b border-white/5 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-6 lg:py-24">
          {user ? (
            <>
              <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl mb-6">
                Welcome back, {user.displayName || user.email?.split('@')[0]}!
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Continue your learning journey and explore our courses
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/courses" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400">
                  Browse Courses
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl mb-6">
                Ready to Transform Your Future?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Join over 430,000 professionals who have already started their journey to success
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400">
                  Get Started Now
                  <ChevronRight className="h-5 w-5" />
                </Link>
                <Link href="/courses" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-medium text-slate-100 transition hover:border-white/30 hover:bg-white/10">
                  Browse Courses
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xl font-bold">
              <span className="text-white">own</span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">UR</span>
              <span className="text-white">growth</span>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-300">
              <Link href="/courses" className="hover:text-white">
                Courses
              </Link>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
            </div>
          </div>
          <div className="mt-8 border-t border-white/5 pt-8 text-center text-sm text-slate-400">
            © 2024 ownURgrowth. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
