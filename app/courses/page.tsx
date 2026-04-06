'use client';

import Link from "next/link";
import { ChevronRight, Star, Users, Clock, CheckCircle } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";
import { getUserPurchases, recordPurchase } from "../../lib/purchases";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";

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
    slug: "system-design-notes"
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
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-b from-white to-gray-50 relative">
        {/* Abstract background shapes */}
        <div className="absolute top-10 right-10 w-48 h-48 bg-[#1D4ED8]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-[#B3B4BD]/10 rotate-45"></div>
        
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold text-[#141619] sm:text-6xl">
              Our <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">Courses</span>
            </h1>
            <p className="text-xl text-[#2C2E3A] max-w-3xl mx-auto font-light leading-relaxed">
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
              <div key={course.slug} className={`rounded-3xl border ${isPurchased ? 'border-green-300' : 'border-[#B3B4BD]/20'} bg-white/90 p-6 shadow-xl`}>
                {isPurchased && (
                  <div className="flex items-center gap-2 mb-4 rounded-full bg-green-100 px-4 py-2 w-fit">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">Purchased</span>
                  </div>
                )}
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-[#1D4ED8]/10 px-3 py-1 text-xs font-semibold text-[#1D4ED8] mb-3">
                    {course.category}
                  </span>
                  <h3 className="text-2xl font-bold text-[#141619] mb-2">
                    {course.title}
                  </h3>
                  <p className="text-[#2C2E3A] mb-4">
                    {course.description}
                  </p>
                </div>

                <div className="mb-6">
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-[#1D4ED8]">
                      {isPurchased ? 'Owned' : `Starts at ${course.price}`}
                    </span>
                    <p className="text-xs text-[#B3B4BD]">{isPurchased ? 'You have access' : course.badge}</p>
                  </div>
                  {isPurchased ? (
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-[#141619] transition hover:bg-green-400"
                    >
                      Access Course
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ) : (
                  <Link
                    href={course.slug === "linkedin-growth" ? `/courses/${course.slug}` : "#"}
                    className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] text-white transition hover:bg-blue-400"
                  >
                    {course.slug === "linkedin-growth" ? "View Course" : "Coming Soon"}
                    {course.slug === "linkedin-growth" && <ChevronRight className="h-4 w-4" />}
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
