'use client';

import Link from "next/link";
import { ChevronRight, Target, TrendingUp, Users, Zap, BarChart3, Globe } from "lucide-react";

export default function PartnershipsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tl from-indigo-400/8 to-blue-500/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/5 to-indigo-400/8 rounded-full blur-3xl"></div>
          
          {/* Floating shapes */}
          <div className="absolute top-32 left-1/4 w-16 h-16 border border-blue-200/40 rounded-2xl rotate-12 animate-pulse"></div>
          <div className="absolute bottom-32 right-1/4 w-12 h-12 bg-blue-300/20 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-1/3 right-1/6 w-8 h-8 border-2 border-indigo-300/30 rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
        </div>
        
        <div className="mx-auto max-w-6xl px-4 lg:px-6 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D4ED8]/10 to-blue-100 px-6 py-3 rounded-full border border-[#1D4ED8]/20 mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-[#1D4ED8] rounded-full animate-pulse"></div>
              <span className="text-[#1D4ED8] font-semibold text-sm tracking-wide uppercase">Influencer Marketing</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl mb-8">
              <span className="text-[#141619]">Find Your</span>{" "}
              <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent font-black">
                Influencers
              </span>
            </h1>
            <p className="mt-6 text-xl text-[#2C2E3A] sm:text-2xl lg:text-3xl max-w-4xl mx-auto font-light leading-relaxed mb-8">
              <span className="font-semibold text-[#1D4ED8]">Influencer Outreach & Management</span><br /><br />
              Stop chasing influencers. We identify, negotiate, and manage creator partnerships for your brand end to end, so you can focus on what you sell, not who sells it!
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] mx-auto rounded-full mb-12"></div>
            <div className="mt-8">
              <a href="https://topmate.io/ashwini_harle" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-12 py-6 text-xl font-bold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-2xl">
                Partner With Us
                <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="mx-auto max-w-6xl px-4 lg:px-6 relative z-10">
          <div className="text-center">
            <blockquote className="text-3xl text-[#141619] sm:text-4xl lg:text-5xl max-w-5xl mx-auto font-semibold leading-tight">
              "We've been on the influencer side of brand deals so we know exactly how to get the best results for both parties."
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-16 h-0.5 bg-[#1D4ED8]"></div>
              <span className="text-[#1D4ED8] font-medium text-lg">Experience Matters</span>
              <div className="w-16 h-0.5 bg-[#1D4ED8]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Partners */}
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
              <span className="text-[#1D4ED8] font-semibold text-sm tracking-wide uppercase">Perfect Match</span>
            </div>
            <h2 className="text-4xl font-bold text-[#141619] sm:text-5xl lg:text-6xl mb-6 tracking-tight">
              Ideal Brand <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">Partners</span>
            </h2>
            <p className="text-xl text-[#2C2E3A] max-w-4xl mx-auto font-light leading-relaxed">
              We work with brands that align with our mission of professional and personal growth.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] mx-auto rounded-full mt-8"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-8 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/15 hover:border-[#1D4ED8]/40 hover:-translate-y-2 text-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
              <div className="absolute top-6 right-6 w-10 h-10 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0">
                <div className="w-4 h-4 bg-[#1D4ED8]/30 rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-bold text-[#141619] mb-4 group-hover:text-[#1D4ED8] transition-colors duration-500">EdTech Companies</h3>
              <p className="text-[#2C2E3A] font-light leading-relaxed">Learning platforms, course creators, educational tools</p>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-8 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/15 hover:border-[#1D4ED8]/40 hover:-translate-y-2 text-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
              <div className="absolute top-6 right-6 w-10 h-10 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0">
                <div className="w-4 h-4 bg-[#1D4ED8]/30 rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-bold text-[#141619] mb-4 group-hover:text-[#1D4ED8] transition-colors duration-500">Productivity Tools</h3>
              <p className="text-[#2C2E3A] font-light leading-relaxed">Software, apps, and services that boost productivity</p>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-8 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/15 hover:border-[#1D4ED8]/40 hover:-translate-y-2 text-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
              <div className="absolute top-6 right-6 w-10 h-10 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0">
                <div className="w-4 h-4 bg-[#1D4ED8]/30 rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-bold text-[#141619] mb-4 group-hover:text-[#1D4ED8] transition-colors duration-500">Career Services</h3>
              <p className="text-[#2C2E3A] font-light leading-relaxed">Resume builders, job boards, career coaching</p>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-8 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/15 hover:border-[#1D4ED8]/40 hover:-translate-y-2 text-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
              <div className="absolute top-6 right-6 w-10 h-10 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0">
                <div className="w-4 h-4 bg-[#1D4ED8]/30 rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-bold text-[#141619] mb-4 group-hover:text-[#1D4ED8] transition-colors duration-500">Business Tools</h3>
              <p className="text-[#2C2E3A] font-light leading-relaxed">CRM, project management, business software</p>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-8 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/15 hover:border-[#1D4ED8]/40 hover:-translate-y-2 text-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
              <div className="absolute top-6 right-6 w-10 h-10 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0">
                <div className="w-4 h-4 bg-[#1D4ED8]/30 rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-bold text-[#141619] mb-4 group-hover:text-[#1D4ED8] transition-colors duration-500">Financial Services</h3>
              <p className="text-[#2C2E3A] font-light leading-relaxed">Investment platforms, financial planning tools</p>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-8 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/15 hover:border-[#1D4ED8]/40 hover:-translate-y-2 text-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
              <div className="absolute top-6 right-6 w-10 h-10 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0">
                <div className="w-4 h-4 bg-[#1D4ED8]/30 rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-bold text-[#141619] mb-4 group-hover:text-[#1D4ED8] transition-colors duration-500">Wellness Brands</h3>
              <p className="text-[#2C2E3A] font-light leading-relaxed">Mental health, fitness, work-life balance solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="mx-auto max-w-4xl px-4 lg:px-6 text-center">
          <h2 className="text-3xl font-bold text-[#141619] sm:text-4xl mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="text-lg text-[#2C2E3A] mb-8">
            Let's discuss how we can help you reach your target audience and achieve your marketing goals.
          </p>
          <a href="https://topmate.io/ashwini_harle" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-10 py-5 text-lg font-semibold text-white shadow-lg shadow-[#1D4ED8]/30 transition-all duration-300 hover:shadow-[#1D4ED8]/40 hover:scale-105">
            Start Partnership Discussion
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}
