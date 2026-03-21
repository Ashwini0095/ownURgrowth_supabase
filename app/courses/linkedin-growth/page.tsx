'use client';

import { Check, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../lib/AuthContext";
import Link from "next/link";

const plans = [
  {
    id: "basic",
    name: "Core Course",
    price: "₹499",
    description: "Full video course on how to grow on LinkedIn.",
    includes: ["Full video curriculum", "Lifetime access"],
  },
  {
    id: "plus",
    name: "Course + Notes",
    price: "₹799",
    description: "Course plus downloadable notes and templates.",
    includes: ["Everything in Core", "Downloadable notes", "Content prompts & hooks"],
  },
  {
    id: "pro",
    name: "Course + Notes + Live Q&A",
    price: "₹999",
    description: "Best value for serious LinkedIn growth.",
    includes: [
      "Everything in Course + Notes",
      "Access to live Q&A session",
      "Priority question submission",
    ],
  },
];

export default function LinkedInGrowthPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const router = useRouter();
  const { user, loading } = useAuth();
  
  // Mock purchased plan - in real app, get this from user's purchase history
  const purchasedPlan = null; // Change to null if not purchased, or "basic"/"plus"/"pro"

  const handleContinue = async () => {
    if (!selectedPlan) return;
    
    // Check if user is logged in
    if (!user) {
      router.push('/login?redirect=/courses/linkedin-growth');
      return;
    }
    
    const selectedPlanData = plans.find(plan => plan.id === selectedPlan);
    if (!selectedPlanData) return;

    try {
      // Create Razorpay order
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: 'linkedin-growth',
          courseName: selectedPlanData.name,
          price: parseInt(selectedPlanData.price.replace('₹', '')),
        }),
      });

      const { orderId, amount, currency } = await response.json();

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount,
        currency,
        name: 'ownURgrowth',
        description: selectedPlanData.name,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            // Verify payment and send receipt
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userEmail: user?.email,
                userName: user?.displayName || user?.email,
                courseName: 'Grow on LinkedIn',
                plan: selectedPlanData.name,
                amount: amount,
                userId: user?.uid,
              }),
            });

            if (verifyResponse.ok) {
              router.push(`/courses/linkedin-growth/access?plan=${selectedPlan}&payment_id=${response.razorpay_payment_id}`);
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user?.displayName || '',
          email: user?.email || '',
          contact: '',
        },
        theme: {
          color: '#3B82F6',
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-4 lg:px-6">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-white">own</span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">UR</span>
            <span className="text-white">growth</span>
          </Link>
        </div>
      </nav>

      <section className="border-b border-white/5 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-20 lg:px-6 lg:pt-24">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
              ownURgrowth • Course
            </p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Grow on LinkedIn
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
              Learn a practical system to grow your LinkedIn audience, generate
              opportunities, and build your personal brand—with lifetime access
              and three simple plans.
            </p>
          </div>

          <div className="mb-8 rounded-2xl border border-blue-500/40 bg-slate-900/70 p-4 text-xs text-slate-200 sm:text-sm">
            <p className="font-medium text-blue-200">
              Choose the plan that fits you best.
            </p>
            <p className="mt-1 text-slate-400">
              You can upgrade later by paying the difference. Payments are one-time
              and include lifetime access.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              const isPurchased = purchasedPlan === plan.id;
              const canUpgrade = purchasedPlan && plans.findIndex(p => p.id === purchasedPlan) < plans.findIndex(p => p.id === plan.id);
              
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => !isPurchased && setSelectedPlan(plan.id)}
                  disabled={isPurchased}
                  className={`flex flex-col items-stretch rounded-2xl border px-4 py-4 text-left transition ${
                    isPurchased
                      ? "border-green-500/30 bg-green-500/10 cursor-default"
                      : isSelected
                      ? "border-blue-400 bg-slate-900"
                      : "border-white/5 bg-slate-900/60 hover:border-blue-300/60 hover:bg-slate-900"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h2 className="text-sm font-semibold text-slate-50">
                      {plan.name}
                    </h2>
                    {isPurchased ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-[11px] font-medium text-green-200">
                        <Check className="h-3 w-3" />
                        Purchased
                      </span>
                    ) : isSelected ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-2 py-0.5 text-[11px] font-medium text-blue-200">
                        <Check className="h-3 w-3" />
                        Selected
                      </span>
                    ) : canUpgrade ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/20 px-2 py-0.5 text-[11px] font-medium text-orange-200">
                        Upgrade
                      </span>
                    ) : null}
                  </div>
                  <p className={`text-base font-semibold ${isPurchased ? 'text-green-300' : 'text-blue-300'}`}>
                    {plan.price}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{plan.description}</p>
                  <ul className="mt-3 space-y-1 text-xs text-slate-300">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${isPurchased ? 'bg-green-400' : 'bg-blue-400'}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {purchasedPlan ? (
              <div className="flex gap-3">
                <button
                  onClick={() => router.push(`/courses/linkedin-growth/access?plan=${purchasedPlan}`)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition hover:bg-green-400"
                >
                  Access Course
                  <ChevronRight className="h-4 w-4" />
                </button>
                {(purchasedPlan === "basic" || purchasedPlan === "plus") && (
                  <button
                    onClick={() => router.push(`/upgrade?from=${purchasedPlan}`)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-500 px-6 py-2.5 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/10"
                  >
                    Upgrade Plan
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            ) : !user ? (
              <div className="flex gap-3">
                <Link
                  href="/login?redirect=/courses/linkedin-growth"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
                >
                  Login to Purchase
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/signup?redirect=/courses/linkedin-growth"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-500 px-6 py-2.5 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/10"
                >
                  Sign Up
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleContinue}
                disabled={!selectedPlan}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300 disabled:shadow-none"
              >
                Continue to payment
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
            <p className="text-xs text-slate-400">
              {purchasedPlan 
                ? "You have lifetime access to this course. You can upgrade anytime by paying the difference."
                : !user
                ? "Create an account or login to purchase this course and get lifetime access."
                : "After successful payment, you'll be redirected to your course area to watch the video lectures and download notes (if included in your plan)."
              }
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

