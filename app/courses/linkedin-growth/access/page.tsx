'use client';

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../../../../lib/AuthContext";
import { useEffect, useRef, useState, Suspense } from "react";
import NotesViewerWrapper from "./NotesViewerWrapper";
import CourseNotesFixed from "../../../../components/CourseNotesFixed";
import PromptVaultClean from "../../../../components/PromptVaultClean";
import CourseReviewPopup, { hasSubmittedCourseReview } from "../../../../components/CourseReviewPopup";

const COURSE_ID = "linkedin-growth";
const BUNNY_ORIGIN = "https://iframe.mediadelivery.net";
const VIDEO_END_DELAY_MS = 3000;

const planLabels: Record<string, string> = {
  basic: "Core Course (₹499)",
  plus: "Course + Notes (₹799)",
  pro: "Course + Notes + Live Q&A (₹999)",
};

// Mock function to check if user has purchased the course
// const checkUserPurchase = async (userId: string, plan: string) => {
//   // Temporarily return 'pro' to avoid Firebase calls during quota exceeded
//   console.log('Using mock data due to Firebase quota exceeded');
//   return 'pro'; // This gives users access to course content
// };

// add this function to backend with api
// const checkUserPurchase = async (user: any) => {
//   try {
//     const { collection, query, where, getDocs } =
//       await import("firebase/firestore");
//     const { db } = await import("../../../../lib/firebase");

//     const paymentsRef = collection(db, "payments");

//     let q = query(paymentsRef, where("userId", "==", user.uid));
//     let snapshot = await getDocs(q);

//     if (snapshot.empty && user.email) {
//       q = query(paymentsRef, where("userEmail", "==", user.email));
//       snapshot = await getDocs(q);
//     }

//     if (snapshot.empty) return null;

//     // Find the highest plan
//     let highestPlan: "basic" | "plus" | "pro" | null = null;

//     snapshot.forEach((doc) => {
//       const data = doc.data();

//       if (data.status !== "completed") return;

//       if (data.amount >= 999) highestPlan = "pro";
//       else if (data.amount >= 799 && highestPlan !== "pro")
//         highestPlan = "plus";
//       else if (!highestPlan) highestPlan = "basic";
//     });

//     return highestPlan;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };

const checkUserPurchase = async (user: any, session: any) => {
  if (!session) return null;
  try {
    const res = await fetch("/api/check-purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        userId: user.id,
        userEmail: user.email,
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.plan || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};



function AccessPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, session, loading } = useAuth();
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(true);

  const [reviewOpen, setReviewOpen] = useState(false);
  const [canReview, setCanReview] = useState(true);
  const navigateOnCloseRef = useRef(false);
  const videoEndTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setCanReview(!hasSubmittedCourseReview(COURSE_ID));
  }, []);

  const openReview = (navigateOnClose: boolean) => {
    if (hasSubmittedCourseReview(COURSE_ID)) {
      setCanReview(false);
      if (navigateOnClose) router.push("/courses/linkedin-growth");
      return;
    }
    navigateOnCloseRef.current = navigateOnClose;
    setReviewOpen(true);
  };

  const handleReviewClose = () => {
    setReviewOpen(false);
    setCanReview(!hasSubmittedCourseReview(COURSE_ID));
    if (navigateOnCloseRef.current) {
      navigateOnCloseRef.current = false;
      router.push("/courses/linkedin-growth");
    }
  };

  const handleReviewClick = () => {
    openReview(false);
  };

  useEffect(() => {
    if (!userPlan) return;
    if (hasSubmittedCourseReview(COURSE_ID)) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      if (hasSubmittedCourseReview(COURSE_ID)) {
        router.push("/courses/linkedin-growth");
        return;
      }
      window.history.pushState(null, "", window.location.href);
      openReview(true);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPlan]);


  useEffect(() => {
    const verifyAccess = async () => {
      if (loading) return;

      if (!user) {
        router.push(`/login?redirect=/courses/linkedin-growth/access`);
        return;
      }

      const purchasedPlan = await checkUserPurchase(user, session);

      if (!purchasedPlan) {
        router.push("/courses/linkedin-growth");
        return;
      }

      setUserPlan(purchasedPlan);
      setVerifying(false);
    };

    verifyAccess();
  }, [user, session, loading, router]);

  // Listen for Bunny Stream's "ended" event via player.js-style postMessage.
  // When the video finishes, wait 3s and surface the review popup (unless already submitted).
  useEffect(() => {
    if (!userPlan) return;

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== BUNNY_ORIGIN) return;
      let payload: any = e.data;
      if (typeof payload === "string") {
        try { payload = JSON.parse(payload); } catch { return; }
      }
      const event = payload?.event ?? payload?.type;
      if (event !== "ended" && event !== "video:ended") return;

      if (videoEndTimerRef.current) return;
      videoEndTimerRef.current = window.setTimeout(() => {
        videoEndTimerRef.current = null;
        openReview(false);
      }, VIDEO_END_DELAY_MS);
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      if (videoEndTimerRef.current) {
        window.clearTimeout(videoEndTimerRef.current);
        videoEndTimerRef.current = null;
      }
    };
  }, [userPlan]);

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
        <div
          className="absolute bottom-32 right-1/4 w-12 h-12 bg-blue-300/20 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      <section className="bg-gradient-to-br from-white/95 to-blue-50/30 backdrop-blur-md border-b-2 border-[#1D4ED8]/20 shadow-xl relative z-10">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 lg:px-6 lg:pt-24">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D4ED8]/10 to-blue-100 px-4 py-2 rounded-full border border-[#1D4ED8]/20 mb-4 backdrop-blur-sm">
                <div className="w-2 h-2 bg-[#1D4ED8] rounded-full animate-pulse"></div>
                <span className="text-[#1D4ED8] font-semibold text-sm tracking-wide uppercase">
                  Course Access
                </span>
              </div>
              <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl tracking-tight">
                Grow on{" "}
                <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">
                  LinkedIn
                </span>
              </h1>
              <p className="mt-4 text-lg text-[#2C2E3A] font-light">
                You&apos;re viewing content for:{" "}
                <span className="font-semibold text-[#1D4ED8]">
                  {planLabel}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              {canReview && (
                <button
                  type="button"
                  onClick={handleReviewClick}
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#1D4ED8]/30 bg-white/80 px-5 py-2.5 text-sm font-bold text-[#1D4ED8] shadow-md shadow-[#1D4ED8]/10 transition-all duration-500 hover:scale-105 hover:border-[#1D4ED8] hover:bg-[#1D4ED8]/5"
                >
                  <Star className="h-4 w-4" fill="currentColor" strokeWidth={2} />
                  Leave a Review
                </button>
              )}
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
                  <h3 className="text-xl font-bold text-[#141619]">
                    Video Lectures
                  </h3>
                  <p className="text-sm text-[#2C2E3A] mt-1">
                    Premium LinkedIn growth strategies
                  </p>
                </div>
                <div className="p-6">
                  <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-xl aspect-video">
                    <iframe
                        src={`https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID}/${process.env.NEXT_PUBLIC_BUNNY_VIDEO_ID}?autoplay=false&preload=true&responsive=true`}
                      loading="lazy"
                      style={{
                        border: 0,
                        position: "absolute",
                        top: 0,
                        height: "100%",
                        width: "100%",
                      }}
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl overflow-hidden">
                <CourseNotesFixed
                  userPlan={userPlan as "basic" | "plus" | "pro"}
                  userId={user?.id}
                />
              </div>

              <div className="bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl overflow-hidden">
                <PromptVaultClean hasAccess={true} />
              </div>

              {showLiveQA && (
                <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-indigo-50/60 border-2 border-[#1D4ED8]/30 rounded-3xl p-6 transition-all duration-700 hover:shadow-xl">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] rounded-t-3xl"></div>

                  <h3 className="text-xl font-bold text-[#1D4ED8] mb-3">
                    Live Q&A Sessions
                  </h3>
                  <p className="text-[#2C2E3A] mb-4 leading-relaxed">
                    This plan includes access to exclusive live Q&A sessions
                    with direct access to expert guidance.
                  </p>
                  <div className="bg-white/70 rounded-2xl p-4 border border-[#1D4ED8]/20">
                    <p className="text-sm text-[#2C2E3A]">The next session date, time, and join link will be sent to you via email.</p>
                  </div>
                </div>
              )}

              {!showNotes && !showLiveQA && (
                <div className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-6 transition-all duration-700 hover:shadow-xl">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] rounded-t-3xl"></div>

                  <h3 className="text-xl font-bold text-[#141619] mb-3">
                    What You Get
                  </h3>
                  <p className="text-[#2C2E3A] leading-relaxed">
                    Lifetime access to the full LinkedIn growth video course.
                    Upgrade later if you want notes or live Q&A access.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CourseReviewPopup
        open={reviewOpen}
        onClose={handleReviewClose}
        courseId={COURSE_ID}
      />
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

