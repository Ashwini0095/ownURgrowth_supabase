'use client';

import { Check, ChevronRight, ArrowLeft, ShieldCheck, Zap, Star, Lock } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../../lib/AuthContext";
import { writePurchaseSnapshot } from "../../../lib/purchaseCache";
import { getUserDisplayName } from "../../../lib/userDisplayName";
import { dispatchNotice } from "../../../lib/notice";
import Link from "next/link";

const plans = [
  {
    id: "basic",
    name: "Basic",
    fullName: "Basic Crash Course",
    price: "₹499",
    tagline: "Essential foundations",
    includes: [
      "✓ Pre-recorded video courses",
      "✓ Exclusive Community Access",
      "✗ Downloadable PDF Notes",
      "✗ Lifetime Updates",
      "✗ Live QNA Sessions"
    ],
  },
  {
    id: "plus",
    name: "Pro",
    fullName: "Pro Program",
    price: "₹799",
    tagline: "Advanced strategies",
    includes: [
      "✓ Pre-recorded video courses",
      "✓ Exclusive Community Access",
      "✓ Downloadable PDF Notes",
      "✗ Lifetime Updates",
      "✗ Live QNA Sessions",
    ],
  },
  {
    id: "pro",
    name: "Master",
    fullName: "Master Program",
    price: "₹999",
    tagline: "Complete mastery",
    bestValue: true,
    includes: [
      "✓ Pre-recorded video courses",
      "✓ Exclusive Community Access",
      "✓ Downloadable PDF Notes",
      "✓ Lifetime Updates",
      "✓ Live QNA Sessions"
    ],
  },
];

function CheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get('plan');
  
  const [selectedPlan, setSelectedPlan] = useState<string>(
    plans.some(p => p.id === initialPlan) ? (initialPlan as string) : "pro"
  );
  const [purchasedPlan, setPurchasedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, session, loading: authLoading } = useAuth();

  useEffect(() => {
    const checkPurchaseHistory = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/check-purchase", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
          },
          body: JSON.stringify({ userId: user.id, userEmail: user.email }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.plan) {
            setPurchasedPlan(data.plan);
            router.push(`/courses/linkedin-growth/access?plan=${data.plan}`);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!authLoading) checkPurchaseHistory();
  }, [user, authLoading, session, router]);

  const handlePayment = async () => {
    if (!selectedPlan) return;
    if (!user || !session) {
      router.push(`/login?redirect=/checkout/linkedin-growth?plan=${selectedPlan}`);
      return;
    }

    const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);
    if (!selectedPlanData) return;

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          courseId: "linkedin-growth",
          courseName: selectedPlanData.fullName,
          price: parseInt(selectedPlanData.price.replace("₹", "")),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Checkout failed (${response.status})`);
      }

      const { orderId, amount, currency } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount,
        currency,
        name: "ownURgrowth",
        description: selectedPlanData.fullName,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.access_token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userEmail: user?.email,
                userName: getUserDisplayName(user?.user_metadata),
                courseName: "Grow on LinkedIn",
                plan: selectedPlanData.fullName,
                amount: amount,
                userId: user?.id,
              }),
            });

            if (verifyResponse.ok) {
              const verifyData = await verifyResponse.json().catch(() => ({}));
              const activatedPlan = typeof verifyData?.plan === "string" ? verifyData.plan : selectedPlan;

              if (user?.id) {
                writePurchaseSnapshot({
                  userId: user.id,
                  courses: ['linkedin-growth'],
                  plan: activatedPlan,
                });
              }

              window.location.href = `/courses/linkedin-growth/access?plan=${activatedPlan}&payment_id=${response.razorpay_payment_id}`;
            } else {
              dispatchNotice("Payment verification failed. Please contact support with your payment ID.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
          }
        },
        prefill: {
          name: getUserDisplayName(user?.user_metadata) || "",
          email: user?.email || "",
        },
        theme: {
          color: "#1D4ED8",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      dispatchNotice("Payment failed. Please try again.");
    }
  };

  if (authLoading || (user && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 font-medium animate-pulse">Preparing your checkout...</p>
        </div>
      </div>
    );
  }

  const currentPlan = plans.find(p => p.id === selectedPlan)!;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/courses/linkedin-growth" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to course
          </Link>
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="text-gray-900">own</span><span className="text-blue-600">UR</span><span className="text-gray-900">growth</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-green-700" />
            Secure 256-bit SSL Checkout
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Selection */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Complete your enrollment</h1>
              <p className="text-gray-500 font-medium">You're one step away from transforming your LinkedIn presence.</p>
            </div>

            {/* Plan Chips */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Step 1: Choose your path</h3>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-bold uppercase">Lifetime Access</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`group relative flex flex-col p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
                      selectedPlan === plan.id 
                        ? "border-blue-600 bg-white ring-4 ring-blue-50 shadow-xl" 
                        : "border-gray-100 bg-white hover:border-gray-200"
                    }`}
                  >
                    {plan.bestValue && (
                      <div className="absolute -top-3 right-4 bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                        Most Popular
                      </div>
                    )}
                    <span className={`text-xs font-bold uppercase tracking-tight mb-1 ${selectedPlan === plan.id ? "text-blue-600" : "text-gray-400"}`}>
                      {plan.name}
                    </span>
                    <span className="text-xl font-black text-gray-900 mb-3">{plan.price}</span>
                    <p className="text-[11px] text-gray-500 leading-tight font-medium">{plan.tagline}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Account Status */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Step 2: Account Details</h3>
              <div className={`p-6 rounded-2xl border-2 transition-all ${user ? "border-green-200 bg-green-50/30" : "border-gray-100 bg-white"}`}>
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-green-800">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Signed in as {user.email}</p>
                      <p className="text-sm text-gray-500">Your enrollment will be linked to this account.</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Account required</p>
                        <p className="text-sm text-gray-500">Please sign in to continue with payment.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                      <Link href={`/login?redirect=/checkout/linkedin-growth?plan=${selectedPlan}`} className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm text-center">Login</Link>
                      <Link href={`/signup?redirect=/checkout/linkedin-growth?plan=${selectedPlan}`} className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold text-sm text-center">Sign Up</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Features Detail */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600 fill-current" />
                <h3 className="font-bold text-gray-900">What's included in the {currentPlan.fullName}</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {currentPlan.includes.map((item, i) => {
                  const isInc = item.startsWith("✓");
                  return (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${isInc ? "border-blue-50 bg-blue-50/20" : "border-gray-50 opacity-40 bg-gray-50/50"}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isInc ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-400"}`}>
                        {isInc ? <Check className="w-3 h-3" /> : <span className="text-[10px]">✗</span>}
                      </div>
                      <span className={`text-xs font-semibold ${isInc ? "text-gray-700" : "text-gray-400 line-through"}`}>{item.substring(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-2xl shadow-blue-500/5 sticky top-24">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg">
                  <Star className="w-8 h-8 fill-current" />
                </div>
                <div>
                  <h3 className="font-black text-gray-900">Grow on LinkedIn</h3>
                  <p className="text-sm text-gray-500 font-medium">{currentPlan.fullName}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-4 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-gray-900 font-bold">{currentPlan.price}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Tax (GST)</span>
                  <span className="text-green-800 font-bold">Included</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-lg font-black text-gray-900">Total</span>
                  <span className="text-3xl font-black text-blue-600">{currentPlan.price}</span>
                </div>
              </div>

              {user ? (
                <button
                  onClick={handlePayment}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black text-lg shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  Confirm & Pay
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  disabled
                  className="w-full py-5 rounded-2xl bg-gray-100 text-gray-400 font-black text-lg flex items-center justify-center gap-3 cursor-not-allowed"
                >
                  <Lock className="w-5 h-5" />
                  Sign in to Pay
                </button>
              )}

              <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
                <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                  <ShieldCheck className="w-4 h-4 text-green-700" />
                  30-Day Money Back Guarantee
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                  <Zap className="w-4 h-4 text-blue-500 fill-current" />
                  Instant access after payment
                </div>
              </div>
            </div>

            {/* Social Proof Mini */}
            <div className="mt-6 p-6 bg-blue-600 rounded-3xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                <Users className="w-16 h-16" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Join the elite</p>
              <h4 className="text-xl font-black mb-1">5,000+ Students</h4>
              <p className="text-sm text-blue-100 font-medium opacity-80">already growing their authority on LinkedIn with this exact system.</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

// Support Icons (needed for social proof)
function Users(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CheckoutPageContent />
    </Suspense>
  );
}
