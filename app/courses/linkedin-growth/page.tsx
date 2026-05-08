'use client';

import { Check, ChevronRight, Play, Star, Users, Award, ShieldCheck, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../lib/AuthContext";
import {
  readPurchaseSnapshot,
  writePurchaseSnapshot,
} from "../../../lib/purchaseCache";
import Link from "next/link";
import ReviewsCarousel from "../../../components/ReviewsCarousel";

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
  const [purchasedPlan, setPurchasedPlan] = useState<string | null>(null);
  const router = useRouter();
  const { user, session, loading: authLoading } = useAuth();

  // Hydrate from cache as soon as we know the user — avoids the "few seconds"
  // of default CTAs while /api/check-purchase is in flight.
  useEffect(() => {
    if (!user) {
      setPurchasedPlan(null);
      return;
    }
    const snap = readPurchaseSnapshot();
    if (snap && snap.userId === user.id) {
      setPurchasedPlan(snap.plan);
    } else {
      setPurchasedPlan(null);
    }
  }, [user]);

  // Background revalidation against the server.
  useEffect(() => {
    if (authLoading || !user || !session) return;

    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/check-purchase", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ userId: user.id, userEmail: user.email }),
        });

        if (cancelled) return;

        const data = response.ok ? await response.json() : null;
        const plan: string | null = data?.plan ?? null;
        setPurchasedPlan(plan);
        writePurchaseSnapshot({
          userId: user.id,
          courses: plan ? ["linkedin-growth"] : [],
          plan,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading, session]);

  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-48 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-100/20 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-8 animate-fade-in">
              <Star className="w-4 h-4 fill-current" />
              <span>THE ULTIMATE LINKEDIN BLUEPRINT</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8">
              Grow Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">Audience</span> & Authority on LinkedIn.
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 font-medium leading-relaxed max-w-2xl mb-12">
              Master the system I used to build a 100k+ audience, generate millions of impressions, and turn LinkedIn into a career-defining asset.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              {purchasedPlan ? (
                <Link 
                  href={`/courses/linkedin-growth/access?plan=${purchasedPlan}`}
                  className="px-10 py-5 rounded-2xl bg-blue-600 text-white font-bold text-xl shadow-xl shadow-blue-600/20 hover:scale-[1.03] transition-all flex items-center justify-center gap-3"
                >
                  Access Your Course
                  <ChevronRight className="w-6 h-6" />
                </Link>
              ) : (
                <a 
                  href="#pricing"
                  className="px-10 py-5 rounded-2xl bg-blue-600 text-white font-bold text-xl shadow-xl shadow-blue-600/20 hover:scale-[1.03] transition-all flex items-center justify-center gap-3"
                >
                  View Plans
                  <ArrowRight className="w-6 h-6" />
                </a>
              )}
              <a href="#curriculum" className="px-10 py-5 rounded-2xl bg-white border-2 border-gray-100 text-gray-900 font-bold text-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                <Play className="w-5 h-5 fill-current" />
                View Curriculum
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 opacity-60">
            <div className="flex items-center gap-2 font-bold text-lg"><Users className="w-6 h-6" /> 5,000+ Students</div>
            <div className="flex items-center gap-2 font-bold text-lg"><Star className="w-6 h-6" /> 4.9/5 Rating</div>
            <div className="flex items-center gap-2 font-bold text-lg"><Award className="w-6 h-6" /> Certified Training</div>
            <div className="flex items-center gap-2 font-bold text-lg"><ShieldCheck className="w-6 h-6" /> Lifetime Access</div>
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section id="curriculum" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">What's Inside the Program</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">A step-by-step roadmap to go from zero to a recognized personal brand.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Optimizing Your Profile", desc: "Turn your profile into a high-converting landing page that works while you sleep." },
              { title: "Content Strategy", desc: "Learn the frameworks for writing viral posts and high-value educational content." },
              { title: "Growth Mechanics", desc: "Master the LinkedIn algorithm and the networking secrets of top creators." },
              { title: "Monetization", desc: "Turn your audience into opportunities, consulting calls, and product sales." },
              { title: "AI Workflows", desc: "Accelerate your creative process using curated AI prompts and templates." },
              { title: "Community Access", desc: "Join an exclusive group of like-minded creators building together." }
            ].map((module, i) => (
              <div key={i} className="p-8 rounded-3xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">{module.title}</h3>
                <p className="text-gray-600 leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 lg:py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your growth goals.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`relative flex flex-col p-8 rounded-3xl border-2 transition-all duration-500 hover:scale-[1.02] bg-white ${
                  plan.bestValue ? "border-blue-600 shadow-2xl shadow-blue-500/10" : "border-gray-100"
                }`}
              >
                {plan.bestValue && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
                    Best Value
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-blue-600">{plan.price}</span>
                </div>
                <p className="text-gray-600 mb-8 font-medium">{plan.description}</p>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.includes.map((item, idx) => {
                    const isIncluded = item.startsWith("✓");
                    const text = item.substring(2);
                    return (
                      <li key={idx} className={`flex items-start gap-3 ${!isIncluded ? "opacity-40" : ""}`}>
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${isIncluded ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                          {isIncluded ? <Check className="w-3 h-3" /> : <span className="text-[10px]">✗</span>}
                        </div>
                        <span className={`text-sm ${!isIncluded ? "line-through" : "font-medium"}`}>{text}</span>
                      </li>
                    );
                  })}
                </ul>

                {purchasedPlan === plan.id ? (
                  <Link 
                    href={`/courses/linkedin-growth/access?plan=${plan.id}`}
                    className="w-full py-4 rounded-xl bg-green-500 text-white font-bold text-center hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Enrolled
                  </Link>
                ) : (
                  <Link 
                    href={`/checkout/linkedin-growth?plan=${plan.id}`}
                    className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                      plan.bestValue ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Select Plan
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">Student Success Stories</h2>
            <p className="text-xl text-gray-600">Join thousands who have transformed their careers through LinkedIn.</p>
          </div>
          <ReviewsCarousel />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-900 opacity-90" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
          <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">Ready to build your personal brand?</h2>
          <p className="text-2xl text-blue-100 mb-12 opacity-90 font-light">Stop watching from the sidelines. Start building your authority today.</p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {purchasedPlan ? (
              <Link 
                href={`/courses/linkedin-growth/access?plan=${purchasedPlan}`}
                className="px-12 py-6 rounded-2xl bg-white text-blue-600 font-black text-2xl shadow-2xl hover:scale-[1.05] transition-all"
              >
                Access Your Course
              </Link>
            ) : (
              <Link 
                href="/checkout/linkedin-growth"
                className="px-12 py-6 rounded-2xl bg-white text-blue-600 font-black text-2xl shadow-2xl hover:scale-[1.05] transition-all"
              >
                Enroll Now
              </Link>
            )}
          </div>
          <p className="mt-8 text-blue-200/60 font-medium">One-time payment. Lifetime access. No hidden fees.</p>
        </div>
      </section>
    </main>
  );
}
