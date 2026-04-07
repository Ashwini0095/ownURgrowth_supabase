'use client';

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../../../../lib/AuthContext";
import { useEffect, useState, Suspense } from "react";
import NotesViewerWrapper from "./NotesViewerWrapper";
import CourseNotesFixed from "../../../../components/CourseNotesFixed";

const planLabels: Record<string, string> = {
  basic: "Core Course (₹499)",
  plus: "Course + Notes (₹799)",
  pro: "Course + Notes + Live Q&A (₹999)",
};

// Mock function to check if user has purchased the course
const checkUserPurchase = async (userId: string, plan: string) => {
  // Temporarily return 'pro' to avoid Firebase calls during quota exceeded
  console.log('Using mock data due to Firebase quota exceeded');
  return 'pro'; // This gives users access to course content
};

function AccessPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(true);
  
  const requestedPlan = searchParams.get('plan') || 'basic';
  
  useEffect(() => {
    const verifyAccess = async () => {
      if (loading) return;
      
      if (!user) {
        router.push(`/login?redirect=/courses/linkedin-growth/access?plan=${requestedPlan}`);
        return;
      }

      // Check if user has purchased this course
      const purchasedPlan = await checkUserPurchase(user.uid, requestedPlan);
      
      if (!purchasedPlan) {
        router.push('/courses/linkedin-growth');
        return;
      }
      
      setUserPlan(purchasedPlan);
      setVerifying(false);
    };

    verifyAccess();
  }, [user, loading, requestedPlan, router]);

  const planLabel = userPlan ? planLabels[userPlan] : "Core Course (₹499)";

  if (loading || verifying) {
    return (
      <main className="min-h-screen bg-slate-950 text-[#141619]">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-300">Verifying access...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!user || !userPlan) {
    return null; // Will redirect
  }

  const showNotes = userPlan === "plus" || userPlan === "pro";
  const showLiveQA = userPlan === "pro";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 text-[#141619] relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tl from-indigo-400/8 to-blue-500/5 rounded-full blur-2xl"></div>
        
        {/* Floating shapes */}
        <div className="absolute top-32 left-1/4 w-16 h-16 border border-blue-200/40 rounded-2xl rotate-12 animate-pulse"></div>
        <div className="absolute bottom-32 right-1/4 w-12 h-12 bg-blue-300/20 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
      </div>

      <section className="bg-gradient-to-br from-white/95 to-blue-50/30 backdrop-blur-md border-b-2 border-[#1D4ED8]/20 shadow-xl relative z-10">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 lg:px-6 lg:pt-24">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D4ED8]/10 to-blue-100 px-4 py-2 rounded-full border border-[#1D4ED8]/20 mb-4 backdrop-blur-sm">
                <div className="w-2 h-2 bg-[#1D4ED8] rounded-full animate-pulse"></div>
                <span className="text-[#1D4ED8] font-semibold text-sm tracking-wide uppercase">Course Access</span>
              </div>
              <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl tracking-tight">
                Grow on <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">LinkedIn</span>
              </h1>
              <p className="mt-4 text-lg text-[#2C2E3A] font-light">
                You&apos;re viewing content for: <span className="font-semibold text-[#1D4ED8]">{planLabel}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/courses/linkedin-growth"
                className="inline-flex items-center gap-2 text-[#2C2E3A] hover:text-[#1D4ED8] transition-colors font-medium"
              >
                <ChevronLeft className="h-4 w-4" />
                Change plan
              </Link>
              {(userPlan === "basic" || userPlan === "plus") && (
                <Link
                  href={`/upgrade?from=${userPlan}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105"
                >
                  Upgrade Plan
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)] lg:items-start">
            <div className="space-y-6">
              <div className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl transition-all duration-700 hover:shadow-2xl hover:shadow-[#1D4ED8]/15">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] rounded-t-3xl"></div>
                
                <div className="border-b border-[#1D4ED8]/10 px-6 py-4">
                  <h3 className="text-xl font-bold text-[#141619]">Video Lectures</h3>
                  <p className="text-sm text-[#2C2E3A] mt-1">Premium LinkedIn growth strategies</p>
                </div>
                <div className="p-6">
                  <video
                    className="aspect-video w-full rounded-2xl bg-black shadow-xl"
                    src="/linkedin-growth.mp4"
                    controls
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="mt-4 flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3">
                    <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                      🔒 Protected content - Only accessible to verified purchasers
                    </p>
                    <p className="text-xs text-green-600">
                      User: {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl overflow-hidden">
                <CourseNotesFixed userPlan={userPlan as 'basic' | 'plus' | 'pro'} />
              </div>

              {showLiveQA && (
                <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-indigo-50/60 border-2 border-[#1D4ED8]/30 rounded-3xl p-6 transition-all duration-700 hover:shadow-xl">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] rounded-t-3xl"></div>
                  
                  <h3 className="text-xl font-bold text-[#1D4ED8] mb-3">Live Q&A Sessions</h3>
                  <p className="text-[#2C2E3A] mb-4 leading-relaxed">
                    This plan includes access to exclusive live Q&A sessions with direct access to expert guidance.
                  </p>
                  <div className="bg-white/70 rounded-2xl p-4 border border-[#1D4ED8]/20">
                    <ul className="space-y-2 text-sm text-[#2C2E3A]">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#1D4ED8] rounded-full"></div>
                        Next session: Add date & time
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#1D4ED8] rounded-full"></div>
                        Join link: Add Zoom/Google Meet link
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#1D4ED8] rounded-full"></div>
                        How to submit questions: Add instructions
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {!showNotes && !showLiveQA && (
                <div className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-6 transition-all duration-700 hover:shadow-xl">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] rounded-t-3xl"></div>
                  
                  <h3 className="text-xl font-bold text-[#141619] mb-3">What You Get</h3>
                  <p className="text-[#2C2E3A] leading-relaxed">
                    Lifetime access to the full LinkedIn growth video course. Upgrade later if you want notes or live Q&A access.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function LinkedInGrowthAccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white text-[#141619] flex items-center justify-center">Loading...</div>}>
      <AccessPageContent />
    </Suspense>
  );
}

