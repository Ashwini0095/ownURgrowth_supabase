"use client";

import { useState, Suspense } from "react";
import type { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { trackSignUp } from "../../lib/analytics";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  const redirectUrl = searchParams.get('redirect') || '/courses';

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
      
      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Send Firebase verification email
      const { sendEmailVerification } = await import("firebase/auth");
      await sendEmailVerification(userCredential.user);

      // Track signup event
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
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
          <h1 className="text-2xl font-semibold text-slate-50">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Join asroForever and get access to your courses.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-slate-200">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-fuchsia-400"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="email" className="block text-slate-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-fuchsia-400"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="password" className="block text-slate-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                minLength={6}
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-fuchsia-400"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-fuchsia-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/30 transition hover:bg-fuchsia-300"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
            {error && (
              <p className="text-xs text-red-400">
                {error}
              </p>
            )}
            {message && !error && (
              <p className="text-xs text-emerald-300">
                {message}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}

