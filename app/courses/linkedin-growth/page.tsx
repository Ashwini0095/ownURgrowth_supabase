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

      const cacheKey = `purchase_${user.id}`;
      const timeKey = `purchase_time_${user.id}`;
      const cached = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(timeKey);

      // If cache is less than 5 mins old, don't even call API
      const isFresh =
        cachedTime && Date.now() - parseInt(cachedTime) < 5 * 60 * 1000;
      if (cached && isFresh) {
        setPurchasedPlan(cached);
        setLoading(false);
        return;
      }

      // If cache exists but is old, show it immediately but revalidate in background
      if (cached) {
        setPurchasedPlan(cached);
        setLoading(false);
      }

      try {
        const response = await fetch("/api/check-purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, userEmail: user.email }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.plan) {
            localStorage.setItem(cacheKey, data.plan);
            localStorage.setItem(timeKey, Date.now().toString());
            setPurchasedPlan(data.plan);
          }
        }
      } catch (error) {
        console.error("Error:", error);
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
      router.push("/login?redirect=/courses/linkedin-growth");
      return;
    }

    const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);
    if (!selectedPlanData) return;

    try {
      // Create Razorpay order
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: "linkedin-growth",
          courseName: selectedPlanData.name,
          price: parseInt(selectedPlanData.price.replace("₹", "")),
        }),
      });

      const { orderId, amount, currency } = await response.json();

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount,
        currency,
        name: "ownURgrowth",
        description: selectedPlanData.name,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            // Verify payment and send receipt
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
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
              localStorage.removeItem(`purchase_${user?.id}`);
              localStorage.removeItem(`purchase_time_${user?.id}`);
              router.push(
                `/courses/linkedin-growth/access?plan=${selectedPlan}&payment_id=${response.razorpay_payment_id}`,
              );
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user?.user_metadata?.full_name || user?.user_metadata?.name || "",
          email: user?.email || "",
          contact: "",
        },
        theme: {
          color: "#3B82F6",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white ">
      <section className="py-20 lg:py-24 relative overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tl from-indigo-400/8 to-blue-500/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/5 to-indigo-400/8 rounded-full blur-3xl"></div>

          {/* Floating shapes */}
          <div className="absolute top-32 left-1/4 w-16 h-16 border border-blue-200/40 rounded-2xl rotate-12 animate-pulse"></div>
          <div
            className="absolute bottom-32 right-1/4 w-12 h-12 bg-blue-300/20 rounded-full animate-bounce"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/6 w-8 h-8 border-2 border-indigo-300/30 rotate-45 animate-spin"
            style={{ animationDuration: "8s" }}
          ></div>
        </div>

        <div className="mx-auto max-w-5xl px-4 lg:px-6 relative z-10">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D4ED8]/10 to-blue-100 px-6 py-3 rounded-full border border-[#1D4ED8]/20 mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-[#1D4ED8] rounded-full animate-pulse"></div>
              <span className="text-[#1D4ED8] font-semibold text-sm tracking-wide uppercase">
                Premium Course
              </span>
            </div>
            <h1 className="text-5xl font-bold text-[#141619] sm:text-6xl lg:text-7xl mb-8 tracking-tight">
              Grow on{" "}
              <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">
                LinkedIn
              </span>
            </h1>
            <p className="text-xl text-[#2C2E3A] font-light leading-relaxed max-w-4xl mx-auto mb-8">
              Build a system to grow your LinkedIn audience, generate opportunities, and build your personal brand with lifetime access and three simple plans.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] mx-auto rounded-full"></div>
          </div>

          <div className="mb-16 bg-gradient-to-br from-white/95 to-blue-50/30 backdrop-blur-sm border-2 border-[#1D4ED8]/20 rounded-3xl p-8 shadow-xl text-center">
            <h2 className="text-3xl font-bold text-[#141619] mb-4">
              Choose the plan that fits you best.
            </h2>
            <p className="text-lg text-[#2C2E3A] font-light leading-relaxed">
              You can upgrade later by paying the difference. Payments are one-time and include lifetime access.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              const isPurchased = purchasedPlan === plan.id;
              const canUpgrade =
                purchasedPlan &&
                plans.findIndex((p) => p.id === purchasedPlan) <
                  plans.findIndex((p) => p.id === plan.id);

              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`group relative flex flex-col items-stretch rounded-3xl border-2 p-8 text-left transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-2 ${
                    isPurchased
                      ? "border-green-400/50 bg-gradient-to-br from-green-50/80 to-emerald-50/60 shadow-xl shadow-green-500/20"
                      : isSelected
                        ? plan.bestValue
                          ? "border-orange-400/60 bg-gradient-to-br from-orange-50/80 to-yellow-50/60 ring-2 ring-orange-400/50 shadow-xl shadow-orange-500/20"
                          : "border-[#1D4ED8]/60 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 ring-2 ring-[#1D4ED8]/50 shadow-xl shadow-blue-500/20"
                        : plan.bestValue
                          ? "border-orange-300/40 bg-gradient-to-br from-orange-50/40 to-yellow-50/40 hover:border-orange-400/60 hover:shadow-xl hover:shadow-orange-500/15"
                          : "border-[#1D4ED8]/30 bg-gradient-to-br from-blue-50/40 to-indigo-50/40 hover:border-[#1D4ED8]/60 hover:shadow-xl hover:shadow-blue-500/15"
                  }`}
                >
                  {/* Top accent line */}
                  <div
                    className={`absolute top-0 left-0 w-full h-2 ${
                      isPurchased
                        ? "bg-gradient-to-r from-green-500 via-emerald-400 to-green-500"
                        : plan.bestValue
                          ? "bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500"
                          : "bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8]"
                    } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl`}
                  ></div>

                  {plan.bestValue && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                        ⭐ BEST VALUE
                      </span>
                    </div>
                  )}

                  <div className="mb-6 flex items-center justify-between gap-2">
                    <h2 className="text-2xl font-bold text-[#141619]">
                      {plan.name}
                    </h2>
                    {isPurchased ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 border border-green-200 px-3 py-1 text-sm font-semibold text-green-700">
                        <Check className="h-4 w-4" />
                        Purchased
                      </span>
                    ) : isSelected ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#1D4ED8]/10 border border-[#1D4ED8]/20 px-3 py-1 text-sm font-semibold text-[#1D4ED8]">
                        <Check className="h-4 w-4" />
                        Selected
                      </span>
                    ) : canUpgrade ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 border border-orange-200 px-3 py-1 text-sm font-semibold text-orange-700">
                        Upgrade
                      </span>
                    ) : null}
                  </div>

                  <p
                    className={`text-4xl font-bold mb-4 ${
                      isPurchased
                        ? "text-green-600"
                        : plan.bestValue
                          ? "text-orange-600"
                          : "text-[#1D4ED8]"
                    }`}
                  >
                    {plan.price}
                  </p>
                  <p className="text-lg text-[#2C2E3A] mb-8 font-light">
                    {plan.description}
                  </p>

                  <ul className="space-y-4 text-base text-[#2C2E3A] flex-grow">
                    {plan.includes.map((item) => {
                      const isIncluded = item.startsWith("✓");
                      const isExcluded = item.startsWith("✗");
                      const text = item.substring(2);

                      return (
                        <li
                          key={item}
                          className={`flex items-start gap-3 ${isExcluded ? "opacity-60" : ""}`}
                        >
                          {isIncluded ? (
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                          ) : isExcluded ? (
                            <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-red-600 text-sm">✗</span>
                            </div>
                          ) : null}
                          <span
                            className={
                              isExcluded ? "line-through" : "leading-relaxed"
                            }
                          >
                            {text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {purchasedPlan ? (
              <div className="flex gap-4 flex-wrap">
                {/* Show Access Course if no plan is selected OR selected plan is purchased */}
                {(!selectedPlan || selectedPlan === purchasedPlan) && (
                  <button
                    onClick={() =>
                      router.push(
                        `/courses/linkedin-growth/access?plan=${purchasedPlan}`,
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-green-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  >
                    Access Course
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}

                {/* Show upgrade button for higher plans */}
                {selectedPlan && selectedPlan !== purchasedPlan && (
                  <button
                    onClick={handleContinue}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-8 py-4 text-lg font-bold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  >
                    Upgrade to {plans.find((p) => p.id === selectedPlan)?.name}
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}

                {/* Show upgrade option when purchased plan is selected AND it's not the highest plan */}
                {selectedPlan === purchasedPlan &&
                  (purchasedPlan === "basic" || purchasedPlan === "plus") && (
                    <button
                      onClick={() =>
                        router.push(`/upgrade?from=${purchasedPlan}`)
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#1D4ED8] bg-white px-8 py-4 text-lg font-bold text-[#1D4ED8] transition-all duration-500 hover:bg-[#1D4ED8] hover:text-white hover:scale-105"
                    >
                      Upgrade Plan
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  )}

                {/* General upgrade option when no specific plan selected */}
                {!selectedPlan &&
                  (purchasedPlan === "basic" || purchasedPlan === "plus") && (
                    <button
                      onClick={() =>
                        router.push(`/upgrade?from=${purchasedPlan}`)
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#1D4ED8] bg-white px-8 py-4 text-lg font-bold text-[#1D4ED8] transition-all duration-500 hover:bg-[#1D4ED8] hover:text-white hover:scale-105"
                    >
                      Upgrade Plan
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  )}
              </div>
            ) : !user ? (
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/login?redirect=/courses/linkedin-growth"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-8 py-4 text-lg font-bold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  Login to Purchase
                  <ChevronRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/signup?redirect=/courses/linkedin-growth"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-[#1D4ED8] transition-all duration-500 hover:bg-gray-50 hover:scale-105"
                >
                  Sign Up
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleContinue}
                disabled={!selectedPlan}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-8 py-4 text-lg font-bold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none disabled:hover:scale-100"
              >
                Continue to payment
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
            <div className="flex-1">
              <p className="text-base text-[#2C2E3A] leading-relaxed">
                {purchasedPlan
                  ? "You have lifetime access to this course. You can upgrade anytime by paying the difference."
                  : !user
                    ? "Create an account or login to purchase this course and get lifetime access."
                    : "After successful payment, you'll be redirected to your course area to watch the video lectures and download notes (if included in your plan)."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
