'use client';

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string | null) ?? "";
    const password = (formData.get("password") as string | null) ?? "";

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
          <h1 className="text-2xl font-semibold text-slate-50">Log in</h1>
          <p className="mt-1 text-sm text-slate-400">
            Access your asroForever courses.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-fuchsia-400"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
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
