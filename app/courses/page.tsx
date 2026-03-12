'use client';

import Link from "next/link";
import { ChevronRight, Star, Users, Clock, CheckCircle } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";
import { getUserPurchases, recordPurchase } from "../../lib/purchases";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const courses = [
  {
    title: "Grow on LinkedIn",
    category: "LinkedIn Growth",
    description: "Master LinkedIn to build your personal brand, grow your network, and unlock career opportunities",
    students: "₹500 course • ₹700 course + notes • ₹1000 course + notes + live Q&A",
    price: "₹500",
    badge: "3 plans available",
    slug: "linkedin-growth",
    rating: 4.9,
    studentCount: "12,000+",
    duration: "4 weeks"
  },
  {
    title: "System Design Notes",
    category: "System Design",
    description: "Clear, practical notes to master scalable system design for real-world systems and interviews.",
    students: "₹1000 one-time • lifetime access to notes",
    price: "₹1000",
    badge: "Notes only",
    slug: "system-design-notes",
    rating: 4.8,
    studentCount: "8,500+",
    duration: "Self-paced"
  },
];

export default function CoursesPage() {
  const { user, signOut } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      console.log('Fetching purchases for user:', user.uid);
      getUserPurchases(user.uid)
        .then((courses) => {
          console.log('Purchased courses:', courses);
          setPurchasedCourses(courses);
        })
        .catch((err) => console.error('Error fetching purchases:', err));
    }
  }, [user]);

  const handlePurchase = async (courseId: string, courseName: string, price: number) => {
    try {
      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        alert('Payment system is loading. Please try again in a moment.');
        return;
      }

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          courseName,
          price,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      const { orderId, amount, currency } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: 'ownURgrowth',
        description: courseName,
        order_id: orderId,
        handler: async function (response: any) {
          // Record purchase in Firestore
          if (user) {
            await recordPurchase(user.uid, courseId, response.razorpay_payment_id);
          }
          window.location.href = `/success?payment_id=${response.razorpay_payment_id}`;
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#3b82f6',
        },
        modal: {
          ondismiss: function() {
            console.log('Payment cancelled');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              <span className="text-white">own</span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">UR</span>
              <span className="text-white">growth</span>
            </Link>
            
            {/* Navigation Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/courses" className="text-sm text-blue-400 font-medium">
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

      {/* Header */}
      <section className="border-b border-white/5 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-slate-50 sm:text-5xl">
              Our <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Courses</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Practical courses designed to accelerate your career and personal growth
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {courses.map((course) => {
              const isPurchased = purchasedCourses.includes(course.slug);
              return (
              <div key={course.slug} className={`rounded-3xl border ${isPurchased ? 'border-green-500/30' : 'border-white/10'} bg-slate-900/70 p-6 shadow-xl`}>
                {isPurchased && (
                  <div className="flex items-center gap-2 mb-4 rounded-full bg-green-500/10 px-4 py-2 w-fit">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-semibold text-green-400">Purchased</span>
                  </div>
                )}
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300 mb-3">
                    {course.category}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-50 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-slate-300 mb-4">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-slate-200">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.studentCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-slate-400 mb-2">Pricing Options:</p>
                  <p className="text-slate-200">{course.students}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-400">
                      {isPurchased ? 'Owned' : `Starts at ${course.price}`}
                    </span>
                    <p className="text-xs text-slate-400">{isPurchased ? 'You have access' : course.badge}</p>
                  </div>
                  {isPurchased ? (
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-400"
                    >
                      Access Course
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ) : (
                  <>
                  <Link
                    href={course.slug === "linkedin-growth" ? `/courses/${course.slug}` : "#"}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
                  >
                    {course.slug === "linkedin-growth" ? "View Course" : "Coming Soon"}
                    {course.slug === "linkedin-growth" && <ChevronRight className="h-4 w-4" />}
                  </Link>
                  {course.slug === "linkedin-growth" && (
                    <button
                      onClick={() => handlePurchase(course.slug, course.title, 500)}
                      className="inline-flex items-center gap-2 rounded-full border border-blue-400 px-6 py-3 text-sm font-semibold text-blue-400 transition hover:bg-blue-400 hover:text-white"
                    >
                      Buy Now ₹500
                    </button>
                  )}
                  </>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/5 bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-6">
          {user ? (
            <>
              <h2 className="text-3xl font-bold text-slate-50 mb-4">
                Continue Your Learning Journey
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                You're logged in and ready to access your courses
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-slate-50 mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Join thousands of professionals who are already transforming their careers
              </p>
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400">
                Get Started Today
                <ChevronRight className="h-5 w-5" />
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
