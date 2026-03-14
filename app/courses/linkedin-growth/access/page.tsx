'use client';

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../../../../lib/AuthContext";
import { useEffect, useState } from "react";
import NotesViewerWrapper from "./NotesViewerWrapper";

const planLabels: Record<string, string> = {
  basic: "Core Course (₹499)",
  plus: "Course + Notes (₹799)",
  pro: "Course + Notes + Live Q&A (₹999)",
};

// Mock function to check if user has purchased the course
const checkUserPurchase = async (userId: string, plan: string) => {
  // In real app, this would check your database
  // For now, return true if user is logged in (mock purchase)
  return userId ? plan : null;
};

export default function LinkedInGrowthAccessPage() {
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
      <main className="min-h-screen bg-slate-950 text-white">
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
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/5 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-20 lg:px-6 lg:pt-24">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
                ownURgrowth • Course Access
              </p>
              <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
                Grow on LinkedIn
              </h1>
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                You&apos;re viewing content for: {planLabel}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/courses/linkedin-growth"
                className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-slate-100"
              >
                <ChevronLeft className="h-3 w-3" />
                Change plan
              </Link>
              {(userPlan === "basic" || userPlan === "plus") && (
                <Link
                  href={`/upgrade?from=${userPlan}`}
                  className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300 hover:bg-blue-500/30"
                >
                  Upgrade Plan
                  <ChevronRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)] md:items-start">
            <div className="space-y-3">
              <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-900/80">
                <div className="border-b border-white/5 px-4 py-3 text-xs font-medium text-slate-200 sm:text-sm">
                  Video lectures
                </div>
                <div className="p-3 sm:p-4">
                  <video
                    className="aspect-video w-full rounded-lg bg-black"
                    src="/linkedin-growth.mp4"
                    controls
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-[11px] text-slate-400 sm:text-xs">
                      🔒 Protected content - Only accessible to verified purchasers
                    </p>
                    <p className="text-[11px] text-slate-500 sm:text-xs">
                      User: {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {showNotes && (
                <NotesViewerWrapper pdfUrl="/linkedin-notes.pdf" />
              )}

              {showLiveQA && (
                <div className="rounded-2xl border border-blue-500/40 bg-slate-900/90 p-4 text-xs text-slate-200 sm:text-sm">
                  <p className="font-semibold text-blue-200">
                    Live Q&A details
                  </p>
                  <p className="mt-1 text-slate-400">
                    This plan includes access to a live Q&A session. Share your
                    next session date, time and join link here.
                  </p>
                  <ul className="mt-2 space-y-1 text-[11px] text-slate-400 sm:text-xs">
                    <li>- Next session: Add date & time</li>
                    <li>- Join link: Add Zoom/Google Meet link</li>
                    <li>- How to submit questions: Add instructions</li>
                  </ul>
                </div>
              )}

              {!showNotes && !showLiveQA && (
                <div className="rounded-2xl border border-white/5 bg-slate-900/80 p-4 text-xs text-slate-200 sm:text-sm">
                  <p className="font-semibold text-slate-50">What you get</p>
                  <p className="mt-1 text-slate-400">
                    Lifetime access to the full LinkedIn growth video course.
                    Upgrade later if you want notes or live Q&A access.
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

