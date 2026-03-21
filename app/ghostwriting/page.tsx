'use client';

import Link from "next/link";
import { ChevronRight, Edit3, Users, Clock, CheckCircle } from "lucide-react";

export default function GhostwritingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-4 lg:px-6">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-white">own</span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">UR</span>
            <span className="text-white">growth</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-slate-200">Professional</span>{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Ghostwriting
              </span>{" "}
              <span className="text-slate-200">Services</span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 sm:text-xl lg:text-2xl max-w-3xl mx-auto">
              Transform your ideas into compelling content. We help professionals, entrepreneurs, and thought leaders amplify their voice through high-quality written content.
            </p>
            <div className="mt-8">
              <a href="https://topmate.io/ashwini_harle" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-400/40 hover:scale-105">
                Get Started Today
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl mb-4">
              Our Ghostwriting Services
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              From LinkedIn posts to full-length books, we help you create content that resonates with your audience.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-2xl border border-white/10 bg-slate-950/70 p-6 transition-all duration-300 hover:border-blue-400/30 hover:bg-slate-950/90 hover:scale-105">
              <Edit3 className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-50 mb-3">LinkedIn Content</h3>
              <p className="text-slate-300 mb-4">
                Engaging posts, articles, and thought leadership content to build your professional brand.
              </p>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>• Daily post creation</li>
                <li>• Long-form articles</li>
                <li>• Engagement optimization</li>
              </ul>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-slate-950/70 p-6 transition-all duration-300 hover:border-blue-400/30 hover:bg-slate-950/90 hover:scale-105">
              <Users className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-50 mb-3">Blog Writing</h3>
              <p className="text-slate-300 mb-4">
                SEO-optimized blog posts that drive traffic and establish your expertise in your field.
              </p>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>• SEO optimization</li>
                <li>• Industry expertise</li>
                <li>• Regular publishing</li>
              </ul>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-slate-950/70 p-6 transition-all duration-300 hover:border-blue-400/30 hover:bg-slate-950/90 hover:scale-105">
              <Clock className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-50 mb-3">Email Newsletters</h3>
              <p className="text-slate-300 mb-4">
                Compelling newsletters that keep your audience engaged and drive conversions.
              </p>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>• Weekly/monthly newsletters</li>
                <li>• Audience engagement</li>
                <li>• Conversion optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl mb-4">
              Why Choose Our Ghostwriting Services?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-50 mb-2">Your Voice, Amplified</h3>
              <p className="text-slate-300 text-sm">We capture your unique voice and perspective in every piece.</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-50 mb-2">Industry Expertise</h3>
              <p className="text-slate-300 text-sm">Deep understanding of various industries and niches.</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-50 mb-2">Fast Turnaround</h3>
              <p className="text-slate-300 text-sm">Quick delivery without compromising on quality.</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-50 mb-2">Complete Confidentiality</h3>
              <p className="text-slate-300 text-sm">Your content, your credit. We remain completely anonymous.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="mx-auto max-w-4xl px-4 lg:px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl mb-4">
            Ready to Amplify Your Voice?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Let's discuss your content needs and create a strategy that works for you.
          </p>
          <a href="https://topmate.io/ashwini_harle" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-400/40 hover:scale-105">
            Schedule a Consultation
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}
