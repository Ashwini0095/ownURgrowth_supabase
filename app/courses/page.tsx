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

type CourseCard = {
  title: string;
  category: string;
  description: string;
  students: string;
  price: string;
  badge: string;
  slug: string;
  /** Replaces "Starts at …" when set (e.g. coming soon) */
  priceMessage?: string;
};

const courses: CourseCard[] = [
  {
    title: "Grow on LinkedIn",
    category: "LinkedIn Growth",
    description: "Master LinkedIn to build your personal brand, grow your network, and unlock career opportunities",
    students: "",
    price: "₹499",
    badge: "3 plans available",
    slug: "linkedin-growth"
  },
  {
    title: "System Design Notes",
    category: "System Design",
    description: "Clear, practical notes to master scalable system design for real-world systems and interviews.",
    students: "",
    price: "₹1000",
    badge: "Notes only",
    slug: "system-design-notes",
    priceMessage: "Coming soon",
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
          <div className="absolute bottom-32 right-1/4 w-12 h-12 bg-blue-300/20 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-1/3 right-1/6 w-8 h-8 border-2 border-indigo-300/30 rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
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
          <div className="grid gap-10 md:grid-cols-2 max-w-5xl mx-auto">
            {courses.map((course) => {
              const isPurchased = purchasedCourses.includes(course.slug);
              const isComingSoon = course.slug === "system-design-notes";
              return (
              <div key={course.slug} className={`group relative overflow-hidden ${isPurchased ? 'bg-gradient-to-br from-green-50/80 to-emerald-50/60 border-2 border-green-200/50' : 'bg-gradient-to-br from-blue-50/80 to-indigo-50/60 border-2 border-[#1D4ED8]/30'} rounded-3xl p-8 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full`}>
                
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 w-full h-2 ${isPurchased ? 'bg-gradient-to-r from-green-500 via-emerald-400 to-green-500' : 'bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8]'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl`}></div>
                
                {/* Corner decoration */}
                <div className={`absolute top-6 right-6 w-12 h-12 ${isPurchased ? 'bg-green-200/30' : 'bg-[#1D4ED8]/20'} rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0`}>
                  <div className={`w-6 h-6 ${isPurchased ? 'bg-green-400/50' : 'bg-[#1D4ED8]/50'} rounded-lg`}></div>
                </div>

                {isPurchased && (
                  <div className="flex items-center gap-2 mb-6 rounded-full bg-green-100 border border-green-200 px-4 py-2 w-fit">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">Purchased</span>
                  </div>
                )}

                <div className="mb-6">
                  <span className={`inline-block rounded-full ${isPurchased ? 'bg-green-100 text-green-700 border-green-200' : 'bg-[#1D4ED8]/10 text-[#1D4ED8] border-[#1D4ED8]/20'} px-4 py-2 text-sm font-semibold mb-4 border`}>
                    {course.category}
                  </span>
                  <h3 className={`text-3xl font-bold ${isPurchased ? 'text-green-800' : 'text-[#1D4ED8]'} mb-4 transition-colors duration-500 relative z-10 tracking-tight`}>
                    {course.title}
                  </h3>
                  <p className="text-[#2C2E3A] text-lg font-light leading-relaxed mb-6 relative z-10">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto relative z-10">
                  <div>
                    <span className={`text-2xl font-bold ${isPurchased ? 'text-green-600' : 'text-[#1D4ED8]'}`}>
                      {isPurchased ? 'Owned' : course.priceMessage ?? `Starts at ${course.price}`}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{isPurchased ? 'You have access' : course.badge}</p>
                  </div>
                  {isPurchased ? (
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 text-lg font-bold text-white transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-green-500/30"
                    >
                      Access Course
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  ) : course.slug === "system-design-notes" ? (
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
