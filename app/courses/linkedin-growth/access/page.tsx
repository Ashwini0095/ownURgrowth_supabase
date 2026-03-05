import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import NotesViewerWrapper from "./NotesViewerWrapper";

const planLabels: Record<string, string> = {
  basic: "Core Course (₹500)",
  plus: "Course + Notes (₹700)",
  pro: "Course + Notes + Live Q&A (₹1000)",
};

export default async function LinkedInGrowthAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const params = await searchParams;
  const plan = params?.plan ?? "basic";
  const planLabel = planLabels[plan] ?? "Core Course (₹500)";

  const showNotes = plan === "plus" || plan === "pro";
  const showLiveQA = plan === "pro";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/5 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-20 lg:px-6 lg:pt-24">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
                asroForever • Course Access
              </p>
              <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
                Grow on LinkedIn
              </h1>
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                You&apos;re viewing content for: {planLabel}
              </p>
            </div>
            <Link
              href="/courses/linkedin-growth"
              className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-slate-100"
            >
              <ChevronLeft className="h-3 w-3" />
              Change plan
            </Link>
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
                  >
                    Your browser does not support the video tag.
                  </video>
                  <p className="mt-2 text-[11px] text-slate-400 sm:text-xs">
                    Ensure your course video file is available at{" "}
                    <code className="rounded bg-slate-800 px-1.5 py-0.5">
                      public/linkedin-growth.mp4
                    </code>{" "}
                    so students can watch it here.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {showNotes && (
                <NotesViewerWrapper pdfUrl="/linkedin-notes.pdf" />
              )}

              {showLiveQA && (
                <div className="rounded-2xl border border-fuchsia-500/40 bg-slate-900/90 p-4 text-xs text-slate-200 sm:text-sm">
                  <p className="font-semibold text-fuchsia-200">
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

