'use client';

import Link from "next/link";
import { ChevronRight, Edit3, Users, Clock, CheckCircle } from "lucide-react";

export default function GhostwritingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
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
            <p className="mt-6 text-xl text-[#2C2E3A] sm:text-2xl lg:text-3xl max-w-4xl mx-auto font-medium leading-relaxed">
              From content creation to brand deals, we manage your LinkedIn end-to-end so you can focus on what you do best, while your profile works for you 24/7.
            </p>
            <div className="mt-8">
              <a href="https://forms.gle/D2e3RsbyqbkAHaGE6" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-10 py-5 text-lg font-semibold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-2xl">
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
      <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tl from-indigo-400/8 to-blue-500/5 rounded-full blur-2xl"></div>
          
          {/* Floating shapes */}
          <div className="absolute top-32 left-1/4 w-16 h-16 border border-blue-200/40 rounded-2xl rotate-12 animate-pulse"></div>
          <div className="absolute bottom-32 right-1/4 w-12 h-12 bg-blue-300/20 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
        </div>
        
        <div className="mx-auto max-w-6xl px-4 lg:px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D4ED8]/10 to-blue-100 px-6 py-3 rounded-full border border-[#1D4ED8]/20 mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-[#1D4ED8] rounded-full animate-pulse"></div>
              <span className="text-[#1D4ED8] font-semibold text-sm tracking-wide uppercase">Our Advantage</span>
            </div>
            <h2 className="text-4xl font-bold text-[#141619] sm:text-5xl lg:text-6xl mb-6 tracking-tight">
              Why Choose Our <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">Services?</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] mx-auto rounded-full"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-8 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/15 hover:border-[#1D4ED8]/40 hover:-translate-y-2">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
              
              {/* Corner decoration */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0">
                <div className="w-4 h-4 bg-[#1D4ED8]/30 rounded-lg"></div>
              </div>

              <CheckCircle className="h-16 w-16 text-[#1D4ED8] mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-bold text-[#141619] mb-4 group-hover:text-[#1D4ED8] transition-colors duration-500 text-center">We've Done It Ourselves</h3>
              <p className="text-[#2C2E3A] font-light leading-relaxed text-center">We've Built What You're Trying to Build. We're not consultants who theorize about LinkedIn growth, we've done it ourselves, in the same game, with real results.</p>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-8 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/15 hover:border-[#1D4ED8]/40 hover:-translate-y-2">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
              
              {/* Corner decoration */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0">
                <div className="w-4 h-4 bg-[#1D4ED8]/30 rounded-lg"></div>
              </div>

              <CheckCircle className="h-16 w-16 text-[#1D4ED8] mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-bold text-[#141619] mb-4 group-hover:text-[#1D4ED8] transition-colors duration-500 text-center">Real Strategy by Professionals</h3>
              <p className="text-[#2C2E3A] font-light leading-relaxed text-center">AI Speed. Human Brain. Real Connection. We use AI to stay sharp and efficient, but every strategy, every word, every decision is filtered through human judgment.</p>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-8 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/15 hover:border-[#1D4ED8]/40 hover:-translate-y-2">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
              
              {/* Corner decoration */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0">
                <div className="w-4 h-4 bg-[#1D4ED8]/30 rounded-lg"></div>
              </div>

              <CheckCircle className="h-16 w-16 text-[#1D4ED8] mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-bold text-[#141619] mb-4 group-hover:text-[#1D4ED8] transition-colors duration-500 text-center">Your Voice, Always</h3>
              <p className="text-[#2C2E3A] font-light leading-relaxed text-center">We write and manage everything in your tone, so your audience never feels like they're talking to a stranger.</p>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-8 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/15 hover:border-[#1D4ED8]/40 hover:-translate-y-2">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
              
              {/* Corner decoration */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0">
                <div className="w-4 h-4 bg-[#1D4ED8]/30 rounded-lg"></div>
              </div>

              <CheckCircle className="h-16 w-16 text-[#1D4ED8] mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-bold text-[#141619] mb-4 group-hover:text-[#1D4ED8] transition-colors duration-500 text-center">End-to-End Service</h3>
              <p className="text-[#2C2E3A] font-light leading-relaxed text-center">Content, engagement, brand deals, analytics you don't need to juggle multiple people or agencies. One team, full ownership.</p>
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
          <a href="https://forms.gle/D2e3RsbyqbkAHaGE6" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-10 py-5 text-lg font-semibold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-2xl">
            Schedule a Consultation
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </section>
    </main>
  );
}
