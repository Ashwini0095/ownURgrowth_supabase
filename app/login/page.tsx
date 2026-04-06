'use client';

import { useState, Suspense } from "react";
import type { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import GoogleSignInButton from "../../components/GoogleSignInButton";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const redirectUrl = searchParams.get('redirect') || '/courses';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string | null) ?? "";
    const password = (formData.get("password") as string | null) ?? "";

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(redirectUrl);
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white relative">
      {/* Abstract background shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#1D4ED8]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#0F172A]/3 rounded-full blur-2xl"></div>
      
      <section className="flex items-center justify-center px-4 py-16 relative z-10">
        <div className="w-full max-w-md rounded-3xl border border-[#B3B4BD]/20 bg-white/90 backdrop-blur-md p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-[#141619] mb-2">Log in</h1>
          <p className="text-[#2C2E3A] font-light mb-8">
            Access your ownURgrowth courses.
          </p>

          <div className="mb-6">
            <GoogleSignInButton 
              redirectUrl={redirectUrl}
              onError={setError}
            />
            
            <div className="my-4 flex items-center">
              <div className="flex-1 border-t border-[#B3B4BD]/30"></div>
              <span className="px-3 text-xs text-[#141619]0">or</span>
              <div className="flex-1 border-t border-[#B3B4BD]/30"></div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <style jsx>{`
              input:-webkit-autofill,
              input:-webkit-autofill:hover,
              input:-webkit-autofill:focus,
              input:-webkit-autofill:active {
                -webkit-box-shadow: 0 0 0 30px #0f172a inset !important;
                -webkit-text-fill-color: white !important;
                border-color: rgba(255, 255, 255, 0.1) !important;
              }
            `}</style>
            <div className="space-y-1 text-sm">
              <label htmlFor="email" className="block text-[#141619]">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full rounded-lg border border-[#B3B4BD]/30 bg-white px-3 py-2 text-sm text-[#141619] outline-none ring-0 placeholder:text-[#2C2E3A] focus:border-[#1D4ED8] autofill:bg-white"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="password" className="block text-[#141619]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="w-full rounded-lg border border-[#B3B4BD]/30 bg-white px-3 py-2 pr-10 text-sm text-[#141619] outline-none ring-0 placeholder:text-[#2C2E3A] focus:border-[#1D4ED8] autofill:bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2C2E3A] hover:text-[#141619]"
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
              className="mt-2 w-full rounded-full bg-[#1D4ED8] text-white shadow-lg shadow-[#1D4ED8]/30 transition hover:bg-blue-400"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
            {error && (
              <p className="text-xs text-red-400">
                {error}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white text-[#141619] flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
