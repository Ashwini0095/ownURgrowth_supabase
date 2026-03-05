'use client';

import { Check, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const plans = [
  {
    id: "basic",
    name: "Core Course",
    price: "₹500",
    description: "Full video course on how to grow on LinkedIn.",
    includes: ["Full video curriculum", "Lifetime access"],
  },
  {
    id: "plus",
    name: "Course + Notes",
    price: "₹700",
    description: "Course plus downloadable notes and templates.",
    includes: ["Everything in Core", "Downloadable notes", "Content prompts & hooks"],
  },
  {
    id: "pro",
    name: "Course + Notes + Live Q&A",
    price: "₹1000",
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

  const handleContinue = () => {
    if (!selectedPlan) return;
    // In a real app, you would redirect to a payment gateway (Razorpay/Stripe).
    // For now we simulate success and go straight to access.
    router.push(`/courses/linkedin-growth/access?plan=${selectedPlan}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/5 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-20 lg:px-6 lg:pt-24">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
              asroForever • Course
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

          <div className="mb-8 rounded-2xl border border-violet-500/40 bg-slate-900/70 p-4 text-xs text-slate-200 sm:text-sm">
            <p className="font-medium text-violet-200">
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
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`flex flex-col items-stretch rounded-2xl border px-4 py-4 text-left transition ${
                    isSelected
                      ? "border-fuchsia-400 bg-slate-900"
                      : "border-white/5 bg-slate-900/60 hover:border-fuchsia-300/60 hover:bg-slate-900"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h2 className="text-sm font-semibold text-slate-50">
                      {plan.name}
                    </h2>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-500/20 px-2 py-0.5 text-[11px] font-medium text-fuchsia-200">
                        <Check className="h-3 w-3" />
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-base font-semibold text-fuchsia-300">
                    {plan.price}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{plan.description}</p>
                  <ul className="mt-3 space-y-1 text-xs text-slate-300">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!selectedPlan}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-fuchsia-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/30 transition hover:bg-fuchsia-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300 disabled:shadow-none"
            >
              Continue to payment
              <ChevronRight className="h-4 w-4" />
            </button>
            <p className="text-xs text-slate-400">
              After successful payment, you&apos;ll be redirected to your course
              area to watch the video lectures and download notes (if included in
              your plan).
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

