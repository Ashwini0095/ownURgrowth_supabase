"use client";

import { useState, Suspense } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Sparkles, ShieldCheck, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import { auth } from "../../lib/firebase";
import { trackSignUp } from "../../lib/analytics";
import GoogleSignInButton from "../../components/GoogleSignInButton";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const redirectUrl = searchParams.get('redirect') || '/courses';
  const loginHref = `/login${redirectUrl !== '/courses' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = (formData.get("name") as string | null) ?? "";
      const email = (formData.get("email") as string | null) ?? "";
      const password = (formData.get("password") as string | null) ?? "";

      if (!email || !password || !name) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name
      });

      const { sendEmailVerification } = await import("firebase/auth");
      await sendEmailVerification(userCredential.user);

      trackSignUp();

      setMessage("Account created successfully! Please check your email (including spam folder) for a verification link from noreply@asrocourse.firebaseapp.com. Click the link to verify your account.");
      setTimeout(() => router.push(redirectUrl), 3000);

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-100 via-gray-50 to-white text-[#141619] relative overflow-hidden">
      {/* Ambient background decoration — aligned with homepage */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(29, 78, 216, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(29, 78, 216, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px'
        }}
      />
      <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-gradient-to-br from-blue-400/25 to-indigo-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-32 -left-20 w-[24rem] h-[24rem] bg-gradient-to-tr from-indigo-400/20 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-gradient-to-r from-blue-300/10 to-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center px-4 py-6 sm:py-10 lg:px-8 lg:py-8">
        <div className="w-full overflow-hidden rounded-3xl border border-[#1D4ED8]/15 bg-white/70 shadow-2xl shadow-[#1D4ED8]/10 backdrop-blur-xl lg:grid lg:grid-cols-2">
          {/* ── Left hero panel ─────────────────────────────────── */}
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#1D4ED8] to-[#0F172A] p-8 text-white lg:flex lg:flex-col lg:justify-between xl:p-10">
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-20 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl translate-y-20 -translate-x-12" />
            <div className="absolute top-1/2 right-1/4 w-20 h-20 border border-white/20 rounded-2xl rotate-12" />
            <div className="absolute bottom-1/3 left-1/3 w-14 h-14 border border-white/15 rounded-full" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                JOIN OWNURGROWTH
              </div>

              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight xl:text-4xl 2xl:text-5xl">
                Master skills that
                <span className="block bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  actually matter.
                </span>
              </h2>

              <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-white/80 xl:text-base">
                Land your dream job, grow your LinkedIn, and build a brand that works for you.
                One account, all your courses, forever.
              </p>
            </div>

            <div className="relative z-10 mt-6 space-y-2.5 xl:mt-8 xl:space-y-3">
              {[
                { icon: Rocket, title: "Lifetime access", sub: "Buy once, learn at your pace" },
                { icon: ShieldCheck, title: "Trusted by ambitious learners", sub: "Built for real outcomes" },
                { icon: CheckCircle2, title: "Practical, no fluff", sub: "Frameworks you can use today" },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm xl:p-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Icon className="h-[18px] w-[18px]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs text-white/70">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right form panel ────────────────────────────────── */}
          <div className="relative p-6 sm:p-8 lg:p-8 xl:p-10">
            <div className="mx-auto w-full max-w-md">
              <div className="lg:hidden inline-flex items-center gap-2 rounded-full border border-[#1D4ED8]/20 bg-[#1D4ED8]/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#1D4ED8]">
                <Sparkles className="h-3 w-3" />
                JOIN OWNURGROWTH
              </div>

              <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#141619] sm:text-3xl lg:text-[1.75rem] xl:text-3xl">
                Create your account
              </h1>
              <p className="mt-1.5 text-sm font-light text-[#2C2E3A]">
                Get instant access to every course you own.
              </p>

              <div className="mt-5">
                <GoogleSignInButton
                  redirectUrl={redirectUrl}
                  onError={setError}
                />

                <div className="my-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#B3B4BD]/60 to-transparent" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2C2E3A]/70">or sign up with email</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#B3B4BD]/60 to-transparent" />
                </div>
              </div>

              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-xs font-semibold text-[#141619]">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full rounded-xl border border-[#B3B4BD]/50 bg-white px-4 py-2.5 text-sm text-[#141619] placeholder:text-[#B3B4BD] outline-none transition-all duration-200 focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-semibold text-[#141619]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-[#B3B4BD]/50 bg-white px-4 py-2.5 text-sm text-[#141619] placeholder:text-[#B3B4BD] outline-none transition-all duration-200 focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-xs font-semibold text-[#141619]">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      minLength={6}
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-[#B3B4BD]/50 bg-white px-4 py-2.5 pr-11 text-sm text-[#141619] placeholder:text-[#B3B4BD] outline-none transition-all duration-200 focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20"
                      placeholder="At least 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-[#2C2E3A] transition-colors hover:bg-[#1D4ED8]/5 hover:text-[#1D4ED8]"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-4 w-full overflow-hidden rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? "Creating account..." : (
                      <>
                        Create account
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/25 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
                </button>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-600">
                    {error}
                  </div>
                )}
                {message && !error && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs text-emerald-700">
                    {message}
                  </div>
                )}
              </form>

              <p className="mt-5 text-center text-sm text-[#2C2E3A]">
                Already have an account?{" "}
                <Link
                  href={loginHref}
                  className="font-semibold text-[#1D4ED8] transition-colors hover:text-[#0F172A]"
                >
                  Log in
                </Link>
              </p>

              <p className="mt-2 text-center text-[11px] leading-relaxed text-[#2C2E3A]/70">
                By creating an account you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white text-[#141619] flex items-center justify-center">Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}
