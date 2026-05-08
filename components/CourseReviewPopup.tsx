'use client';

import { useEffect, useState } from 'react';
import { X, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/AuthContext';

interface CourseReviewPopupProps {
  open: boolean;
  onClose: () => void;
  courseId: string;
}

const submittedKey = (courseId: string) => `courseReview:${courseId}:submitted`;

export const hasSubmittedCourseReview = (courseId: string) => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(submittedKey(courseId)) === 'true';
};

export default function CourseReviewPopup({ open, onClose, courseId }: CourseReviewPopupProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setRating(0);
      setHoverRating(0);
      setComment('');
      setSubmitted(false);
      setError(null);
    }
  }, [open]);

  const handleSubmit = async () => {
    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (!user) {
      setError('You need to be signed in to leave a review.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase.from('reviews').insert({
        user_id: user.id,
        user_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
        user_email: user.email || '',
        stars: String(rating),
        review: comment.trim(),
        course_id: courseId,
      });

      if (insertError) throw insertError;

      window.localStorage.setItem(submittedKey(courseId), 'true');
      setSubmitted(true);
      setTimeout(() => onClose(), 1200);
    } catch (err: any) {
      setError(err?.message || 'Could not save your review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 animate-[fadeIn_0.3s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-review-title"
    >
      <button
        type="button"
        aria-label="Dismiss"
        onClick={submitting ? undefined : onClose}
        className="absolute inset-0 bg-[#0F172A]/30 backdrop-blur-[2px]"
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#1D4ED8]/15 bg-white/95 shadow-2xl shadow-[#1D4ED8]/20 backdrop-blur-2xl animate-[popIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
        <div className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-indigo-300/25 to-blue-400/15 blur-3xl" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          disabled={submitting}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#0F172A]/5 text-[#2C2E3A] transition-colors hover:bg-[#1D4ED8]/10 hover:text-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>

        {submitted ? (
          <div className="relative flex flex-col items-center px-8 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-xl shadow-emerald-500/30">
              <CheckCircle2 className="h-7 w-7 text-white" strokeWidth={2.25} />
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-[#141619]">
              Thanks for the review!
            </h2>
            <p className="mt-1.5 text-sm font-light text-[#2C2E3A]">
              Your feedback helps us make ownURgrowth better.
            </p>
          </div>
        ) : (
          <div className="relative p-7 sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1D4ED8] to-[#0F172A] shadow-xl shadow-[#1D4ED8]/30">
              <Star className="h-6 w-6 text-white" strokeWidth={2.25} fill="currentColor" />
            </div>

            <h2
              id="course-review-title"
              className="mt-5 text-2xl font-bold tracking-tight text-[#141619]"
            >
              How was the course?
            </h2>
            <p className="mt-1.5 text-sm font-light leading-relaxed text-[#2C2E3A]">
              Your honest feedback helps future learners — and helps us improve. It only takes 10 seconds.
            </p>

            <div className="mt-5">
              <p className="text-xs font-semibold text-[#141619]">Your rating</p>
              <div
                className="mt-2 flex items-center gap-1.5"
                onMouseLeave={() => setHoverRating(0)}
              >
                {[1, 2, 3, 4, 5].map((n) => {
                  const active = (hoverRating || rating) >= n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => {
                        setRating(n);
                        setError(null);
                      }}
                      onMouseEnter={() => setHoverRating(n)}
                      aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
                      className="group rounded-lg p-1 transition-transform duration-150 hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          active
                            ? 'text-[#1D4ED8]'
                            : 'text-[#B3B4BD]/60 group-hover:text-[#1D4ED8]/50'
                        }`}
                        strokeWidth={2}
                        fill={active ? 'currentColor' : 'none'}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="course-review-comment"
                className="text-xs font-semibold text-[#141619]"
              >
                Tell us more <span className="font-normal text-[#2C2E3A]/60">(optional)</span>
              </label>
              <textarea
                id="course-review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
                rows={3}
                placeholder="What did you like? What can we improve?"
                className="mt-2 w-full resize-none rounded-xl border border-[#B3B4BD]/50 bg-white px-4 py-2.5 text-sm text-[#141619] placeholder:text-[#B3B4BD] outline-none transition-all duration-200 focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20"
              />
              <p className="mt-1 text-right text-[10px] text-[#2C2E3A]/60">
                {comment.length}/500
              </p>
            </div>

            {error && (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </div>
            )}

            <div className="mt-5 space-y-2.5">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || rating === 0}
                className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {submitting ? (
                    'Submitting…'
                  ) : (
                    <>
                      Submit review
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/25 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="w-full rounded-full px-4 py-2.5 text-xs font-medium text-[#2C2E3A]/70 transition-colors hover:text-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: translateY(20px) scale(0.92); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
