'use client';

import { Check, ChevronRight, ArrowLeft } from "lucide-react";
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
      "✗ Live group QNA Sessions",
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

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro"); // Default to Master
  const [purchasedPlan, setPurchasedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, session, loading: authLoading } = useAuth();

  // Check user's purchase history
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
            // If already purchased, redirect to course access
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
      router.push("/login?redirect=/checkout/linkedin-growth");
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
          courseName: selectedPlanData.name,
          price: parseInt(selectedPlanData.price.replace("₹", "")),
        }),
      });

      const { orderId, amount, currency } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount,
        currency,
        name: "ownURgrowth",
        description: selectedPlanData.name,
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
                userName: user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email,
                courseName: "Grow on LinkedIn",
                plan: selectedPlanData.name,
                amount: amount,
                userId: user?.id,
              }),
            });

            if (verifyResponse.ok) {
              router.push(
                `/courses/linkedin-growth/access?plan=${selectedPlan}&payment_id=${response.razorpay_payment_id}`,
              );
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
          }
        },
        prefill: {
          name: user?.user_metadata?.full_name || user?.user_metadata?.name || "",
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
      alert("Payment failed. Please try again.");
    }
  };

  if (authLoading || (user && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
        <div className="mb-12">
          <Link 
            href="/courses/linkedin-growth" 
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course Details
          </Link>
          <div className="mt-8">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Complete your enrollment</h1>
            <p className="mt-2 text-lg text-gray-600">Select a plan to get lifetime access to Grow on LinkedIn.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Plan Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid sm:grid-cols-3 gap-6">
              {plans.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                return (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative flex flex-col p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                      isSelected 
                        ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600 shadow-lg shadow-blue-600/10" 
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {plan.bestValue && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Best Value
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-gray-900">{plan.name}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-blue-600" : "border-gray-300"}`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-700 mb-1">{plan.price}</div>
                    <p className="text-xs text-gray-500 font-medium">One-time payment</p>
                  </button>
                );
              })}
            </div>

            {/* Plan Features */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">What's included in {plans.find(p => p.id === selectedPlan)?.name}</h3>
              <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
                {plans.find(p => p.id === selectedPlan)?.includes.map((item, idx) => {
                  const isIncluded = item.startsWith("✓");
                  const isExcluded = item.startsWith("✗");
                  const text = item.substring(2);
                  return (
                    <li key={idx} className={`flex items-start gap-3 ${isExcluded ? "opacity-40" : ""}`}>
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${isIncluded ? "bg-green-100" : "bg-red-50"}`}>
                        {isIncluded ? <Check className="w-3 h-3 text-green-600" /> : <span className="text-red-500 text-[10px]">✗</span>}
                      </div>
                      <span className={`text-sm ${isExcluded ? "line-through text-gray-500" : "text-gray-700"}`}>{text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl sticky top-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8 pb-8 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Course</span>
                <span className="font-semibold text-gray-900">Grow on LinkedIn</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Plan</span>
                <span className="font-semibold text-gray-900">{plans.find(p => p.id === selectedPlan)?.name}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-gray-900 pt-4">
                <span>Total Amount</span>
                <span className="text-blue-700">{plans.find(p => p.id === selectedPlan)?.price}</span>
              </div>
            </div>

            <div className="space-y-6">
              {!user ? (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center">
                  <p className="text-sm text-blue-800 mb-4 font-medium">Please login or create an account to proceed with the purchase.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href={`/login?redirect=/checkout/linkedin-growth`} className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">Login</Link>
                    <Link href={`/signup?redirect=/checkout/linkedin-growth`} className="bg-white text-blue-600 border border-blue-200 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">Sign Up</Link>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Pay Now
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs text-gray-500 justify-center">
                  <Check className="w-3 h-3 text-green-500" />
                  Lifetime access
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 justify-center">
                  <Check className="w-3 h-3 text-green-500" />
                  Secure payment via Razorpay
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
