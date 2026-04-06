'use client';

import Link from "next/link";
import { ChevronRight, Edit3, Users, Clock, CheckCircle } from "lucide-react";

export default function GhostwritingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-[#B3B4BD]/20 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-4 lg:px-6">
          <Link href="/" className="text-xl font-bold">
            <span className="text-[#141619]">own</span>
            <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">UR</span>
            <span className="text-[#141619]">growth</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative">
        {/* Abstract background shapes */}
        <div className="absolute top-10 right-10 w-48 h-48 bg-[#1D4ED8]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-[#B3B4BD]/10 rotate-45"></div>
        
        <div className="mx-auto max-w-6xl px-4 lg:px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-[#141619]">LinkedIn</span>{" "}
              <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent font-black">
                Growth
              </span>{" "}
              <span className="text-[#141619]">Services</span>
            </h1>
            <p className="mt-6 text-xl text-[#2C2E3A] sm:text-2xl lg:text-3xl max-w-4xl mx-auto font-light leading-relaxed">
              From content creation to brand deals, we manage your LinkedIn end-to-end so you can focus on what you do best, while your profile works for you 24/7.
            </p>
            <div className="mt-8">
              <a href="https://topmate.io/ashwini_harle" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-10 py-5 text-lg font-semibold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-2xl">
                Get Started Today
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50 relative">
        {/* Subtle 3D elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#1D4ED8]/10 rotate-12 rounded-lg blur-sm"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-[#B3B4BD]/20 -rotate-45 rounded-lg"></div>
        
        <div className="mx-auto max-w-6xl px-4 lg:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#141619] sm:text-5xl mb-4">
              Everything You Need to Grow on LinkedIn
            </h2>
            <p className="text-xl text-[#2C2E3A] font-light">
              AI can write your posts. It can't build your brand, grow your audience, or get you paid. We can.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group bg-white border border-[#B3B4BD]/20 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-[#1D4ED8]/10 hover:border-[#1D4ED8]/30">
              <Edit3 className="h-12 w-12 text-[#1D4ED8] mb-4" />
              <h3 className="text-xl font-semibold text-[#141619] mb-3 group-hover:text-[#1D4ED8] transition-colors">LinkedIn Content & Ghostwriting</h3>
              <p className="text-[#2C2E3A] font-light">
                We write posts, articles, and carousels in your voice so your profile stays active, consistent, and worth following.
              </p>
            </div>

            <div className="group bg-white border border-[#B3B4BD]/20 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-[#1D4ED8]/10 hover:border-[#1D4ED8]/30">
              <Users className="h-12 w-12 text-[#1D4ED8] mb-4" />
              <h3 className="text-xl font-semibold text-[#141619] mb-3 group-hover:text-[#1D4ED8] transition-colors">Account Management</h3>
              <p className="text-[#2C2E3A] font-light">
                We handle your LinkedIn daily, from optimizing your profile to engaging with the right people, so you never have to worry about it!
              </p>
            </div>

            <div className="group bg-white border border-[#B3B4BD]/20 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-[#1D4ED8]/10 hover:border-[#1D4ED8]/30">
              <Clock className="h-12 w-12 text-[#1D4ED8] mb-4" />
              <h3 className="text-xl font-semibold text-[#141619] mb-3 group-hover:text-[#1D4ED8] transition-colors">Personal Brand Building</h3>
              <p className="text-[#2C2E3A] font-light">
                We position you as the go-to expert in your space, building a profile and presence that people trust, follow, and remember.
              </p>
            </div>

            <div className="group bg-white border border-[#B3B4BD]/20 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-[#1D4ED8]/10 hover:border-[#1D4ED8]/30">
              <CheckCircle className="h-12 w-12 text-[#1D4ED8] mb-4" />
              <h3 className="text-xl font-semibold text-[#141619] mb-3 group-hover:text-[#1D4ED8] transition-colors">Brand Outreach & Deal Negotiation</h3>
              <p className="text-[#2C2E3A] font-light">
                We find brands that fit your niche, pitch them on your behalf, and negotiate deals, so you get paid without the back and forth.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative">
        {/* Subtle 3D elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#1D4ED8]/10 rotate-12 rounded-lg blur-sm"></div>
        
        <div className="mx-auto max-w-6xl px-4 lg:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#141619] sm:text-5xl mb-4">
              Why Choose Our Services?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center group">
              <CheckCircle className="h-12 w-12 text-[#1D4ED8] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-[#141619] mb-2 group-hover:text-[#1D4ED8] transition-colors">We've Done It Ourselves</h3>
              <p className="text-[#2C2E3A] text-sm font-light">We've Built What You're Trying to Build. We're not consultants who theorize about LinkedIn growth, we've done it ourselves, in the same game, with real results.</p>
            </div>
            <div className="text-center group">
              <CheckCircle className="h-12 w-12 text-[#1D4ED8] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-[#141619] mb-2 group-hover:text-[#1D4ED8] transition-colors">Real Strategy by Professionals</h3>
              <p className="text-[#2C2E3A] text-sm font-light">AI Speed. Human Brain. Real Connection. We use AI to stay sharp and efficient, but every strategy, every word, every decision is filtered through human judgment.</p>
            </div>
            <div className="text-center group">
              <CheckCircle className="h-12 w-12 text-[#1D4ED8] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-[#141619] mb-2 group-hover:text-[#1D4ED8] transition-colors">Your Voice, Always</h3>
              <p className="text-[#2C2E3A] text-sm font-light">We write and manage everything in your tone, so your audience never feels like they're talking to a stranger.</p>
            </div>
            <div className="text-center group">
              <CheckCircle className="h-12 w-12 text-[#1D4ED8] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-[#141619] mb-2 group-hover:text-[#1D4ED8] transition-colors">End-to-End Service</h3>
              <p className="text-[#2C2E3A] text-sm font-light">Content, engagement, brand deals, analytics you don't need to juggle multiple people or agencies. One team, full ownership.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-[#1D4ED8]/10 to-[#0F172A]/10 relative">
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#B3B4BD]/10 rotate-45"></div>
        
        <div className="mx-auto max-w-4xl px-4 lg:px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold text-[#141619] sm:text-5xl mb-4">
            Ready to Amplify Your Voice?
          </h2>
          <p className="text-xl text-[#2C2E3A] mb-8 font-light">
            Let's discuss your content needs and create a strategy that works for you.
          </p>
          <a href="https://topmate.io/ashwini_harle" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-10 py-5 text-lg font-semibold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-2xl">
            Schedule a Consultation
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </section>
    </main>
  );
}
