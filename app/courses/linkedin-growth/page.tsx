'use client';

import { Check, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../lib/AuthContext";
import Link from "next/link";

const plans = [
  {
    id: "basic",
    name: "Basic Crash Course",
    price: "₹499/-",
    description: "Essential LinkedIn growth fundamentals.",
    includes: [
      "✓ Pre-recorded video courses",
      "✓ Exclusive Community Access", 
      "✗ Downloadable PDF Notes Course with ready to use AI Prompts",
      "✗ Lifetime Updates at No Extra Cost",
      "✗ Live group QNA Sessions"
    ],
  },
  {
    id: "plus", 
    name: "Pro Program",
    price: "₹799/-",
    description: "Advanced LinkedIn growth strategies.",
    includes: [
      "✓ Pre-recorded video courses",
      "✓ Exclusive Community Access",
      "✓ Downloadable PDF Notes Course with ready to use AI Prompts", 
      "✗ Lifetime Updates at No Extra Cost",
      "✗ Live group QNA Sessions"
    ],
  },
  {
    id: "pro",
    name: "Master Program", 
    price: "₹999/-",
    description: "Complete LinkedIn mastery with all features.",
    bestValue: true,
    includes: [
      "✓ Pre-recorded video courses",
      "✓ Exclusive Community Access",
      "✓ Downloadable PDF Notes Course with ready to use AI Prompts",
      "✓ Lifetime Updates at No Extra Cost", 
      "✓ Live group QNA Sessions"
    ],
  },
];

export default function LinkedInGrowthPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [purchasedPlan, setPurchasedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  // Check user's purchase history
  useEffect(() => {
    const checkPurchaseHistory = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Check if user has purchased this course
        const response = await fetch(`/api/check-purchase?userId=${user.uid}&courseId=linkedin-growth`);
        const data = await response.json();
        
        if (data.purchased) {
          setPurchasedPlan(data.planId);
        }
      } catch (error) {
        console.error('Error checking purchase:', error);
      } finally {
        setLoading(false);
      }
    };

    checkPurchaseHistory();
  }, [user]);

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
              Build a system to grow your LinkedIn audience, generate
              opportunities, and build your personal brand with lifetime access
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
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative flex flex-col items-stretch rounded-2xl border px-4 py-4 text-left transition ${
                    isPurchased
                      ? "border-green-500/30 bg-green-500/10 cursor-pointer"
                      : isSelected
                      ? plan.bestValue 
                        ? "border-orange-400 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 ring-2 ring-orange-400/50"
                        : "border-blue-400 bg-slate-900"
                      : plan.bestValue
                      ? "border-orange-300/60 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 hover:border-orange-400 hover:ring-2 hover:ring-orange-400/30"
                      : "border-white/5 bg-slate-900/60 hover:border-blue-300/60 hover:bg-slate-900"
                  }`}
                >
                  {plan.bestValue && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-3 py-1 text-[10px] font-bold text-white shadow-lg">
                        ⭐ BEST VALUE
                      </span>
                    </div>
                  )}
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
                    {plan.includes.map((item) => {
                      const isIncluded = item.startsWith('✓');
                      const isExcluded = item.startsWith('✗');
                      const text = item.substring(2); // Remove the ✓ or ✗ symbol
                      
                      return (
                        <li key={item} className={`flex items-center gap-2 ${isExcluded ? 'opacity-50' : ''}`}>
                          {isIncluded ? (
                            <span className="text-green-400">✓</span>
                          ) : isExcluded ? (
                            <span className="text-red-400">✗</span>
                          ) : (
                            <span className={`h-1.5 w-1.5 rounded-full ${isPurchased ? 'bg-green-400' : 'bg-blue-400'}`} />
                          )}
                          <span className={isExcluded ? 'line-through' : ''}>{text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {purchasedPlan ? (
              <div className="flex gap-3">
                {/* Show Access Course if no plan is selected OR selected plan is purchased */}
                {(!selectedPlan || selectedPlan === purchasedPlan) && (
                  <button
                    onClick={() => router.push(`/courses/linkedin-growth/access?plan=${purchasedPlan}`)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition hover:bg-green-400"
                  >
                    Access Course
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
                
                {/* Show upgrade button for higher plans */}
                {selectedPlan && selectedPlan !== purchasedPlan && (
                  <button
                    onClick={handleContinue}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
                  >
                    Upgrade to {plans.find(p => p.id === selectedPlan)?.name}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
                
                {/* Show upgrade option when purchased plan is selected AND it's not the highest plan */}
                {selectedPlan === purchasedPlan && (purchasedPlan === "basic" || purchasedPlan === "plus") && (
                  <button
                    onClick={() => router.push(`/upgrade?from=${purchasedPlan}`)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-500 px-6 py-2.5 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/10"
                  >
                    Upgrade Plan
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
                
                {/* General upgrade option when no specific plan selected */}
                {!selectedPlan && (purchasedPlan === "basic" || purchasedPlan === "plus") && (
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

