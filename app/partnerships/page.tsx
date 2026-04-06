'use client';

import Link from "next/link";
import { ChevronRight, Target, TrendingUp, Users, Zap, BarChart3, Globe } from "lucide-react";

export default function PartnershipsPage() {
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
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#1D4ED8]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#0F172A]/3 rounded-full blur-2xl"></div>
        
        <div className="mx-auto max-w-6xl px-4 lg:px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-[#141619]">Brand</span>{" "}
              <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent font-black">
                Partnerships
              </span>{" "}
              <span className="text-[#141619]">& Sponsorships</span>
            </h1>
            <p className="mt-6 text-xl text-[#2C2E3A] sm:text-2xl lg:text-3xl max-w-4xl mx-auto font-light leading-relaxed">
              Partner with ownURgrowth to reach ambitious professionals and learners. Connect your brand with our engaged community of growth-minded individuals.
            </p>
            <div className="mt-8">
              <a href="https://topmate.io/ashwini_harle" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-10 py-5 text-lg font-semibold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-2xl">
                Partner With Us
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#1D4ED8]/10 rotate-12 rounded-lg blur-sm"></div>
        
        <div className="mx-auto max-w-6xl px-4 lg:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#141619] sm:text-5xl mb-4">
              Our Reach & Impact
            </h2>
            <p className="text-xl text-[#2C2E3A] max-w-3xl mx-auto font-light">
              Connect with professionals who are actively investing in their growth and career development.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center group">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#1D4ED8]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-[#1D4ED8]" />
              </div>
              <div className="text-3xl font-bold text-[#141619] mb-2">10K+</div>
              <div className="text-[#2C2E3A]">Active Learners</div>
            </div>
            <div className="text-center group">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#1D4ED8]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-8 w-8 text-[#1D4ED8]" />
              </div>
              <div className="text-3xl font-bold text-[#141619] mb-2">95%</div>
              <div className="text-[#2C2E3A]">Engagement Rate</div>
            </div>
            <div className="text-center group">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#1D4ED8]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-[#1D4ED8]" />
              </div>
              <div className="text-3xl font-bold text-[#141619] mb-2">50+</div>
              <div className="text-[#2C2E3A]">Countries Reached</div>
            </div>
            <div className="text-center group">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#1D4ED8]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-[#1D4ED8]" />
              </div>
              <div className="text-3xl font-bold text-[#141619] mb-2">500K+</div>
              <div className="text-[#2C2E3A]">Monthly Impressions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Options */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#141619] sm:text-4xl mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-lg text-[#2C2E3A] max-w-2xl mx-auto">
              Choose the partnership model that aligns with your marketing goals and budget.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-2xl border border-[#B3B4BD]/20 bg-white/70 p-6 transition-all duration-300 hover:border-blue-400/30 hover:bg-white/90 hover:scale-105">
              <Target className="h-12 w-12 text-[#1D4ED8] mb-4" />
              <h3 className="text-xl font-semibold text-[#141619] mb-3">Course Sponsorship</h3>
              <p className="text-[#2C2E3A] mb-4">
                Sponsor our premium courses and get your brand in front of engaged learners.
              </p>
              <ul className="text-sm text-[#B3B4BD] space-y-2">
                <li>• Brand integration in course materials</li>
                <li>• Logo placement and mentions</li>
                <li>• Direct access to course participants</li>
              </ul>
            </div>

            <div className="group rounded-2xl border border-[#B3B4BD]/20 bg-white/70 p-6 transition-all duration-300 hover:border-blue-400/30 hover:bg-white/90 hover:scale-105">
              <Zap className="h-12 w-12 text-[#1D4ED8] mb-4" />
              <h3 className="text-xl font-semibold text-[#141619] mb-3">Content Collaboration</h3>
              <p className="text-[#2C2E3A] mb-4">
                Co-create valuable content that showcases your expertise and our platform.
              </p>
              <ul className="text-sm text-[#B3B4BD] space-y-2">
                <li>• Joint webinars and workshops</li>
                <li>• Co-branded educational content</li>
                <li>• Thought leadership articles</li>
              </ul>
            </div>

            <div className="group rounded-2xl border border-[#B3B4BD]/20 bg-white/70 p-6 transition-all duration-300 hover:border-blue-400/30 hover:bg-white/90 hover:scale-105">
              <BarChart3 className="h-12 w-12 text-[#1D4ED8] mb-4" />
              <h3 className="text-xl font-semibold text-[#141619] mb-3">Newsletter Sponsorship</h3>
              <p className="text-[#2C2E3A] mb-4">
                Reach our subscribers through dedicated newsletter placements and mentions.
              </p>
              <ul className="text-sm text-[#B3B4BD] space-y-2">
                <li>• Featured sponsor sections</li>
                <li>• Product showcases</li>
                <li>• Direct audience engagement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Partners */}
      <section className="py-16 lg:py-24 bg-gray-50/50">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#141619] sm:text-4xl mb-4">
              Ideal Brand Partners
            </h2>
            <p className="text-lg text-[#2C2E3A] max-w-2xl mx-auto">
              We work with brands that align with our mission of professional and personal growth.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#B3B4BD]/20 bg-white/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-[#141619] mb-2">EdTech Companies</h3>
              <p className="text-[#2C2E3A] text-sm">Learning platforms, course creators, educational tools</p>
            </div>
            <div className="rounded-2xl border border-[#B3B4BD]/20 bg-white/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-[#141619] mb-2">Productivity Tools</h3>
              <p className="text-[#2C2E3A] text-sm">Software, apps, and services that boost productivity</p>
            </div>
            <div className="rounded-2xl border border-[#B3B4BD]/20 bg-white/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-[#141619] mb-2">Career Services</h3>
              <p className="text-[#2C2E3A] text-sm">Resume builders, job boards, career coaching</p>
            </div>
            <div className="rounded-2xl border border-[#B3B4BD]/20 bg-white/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-[#141619] mb-2">Business Tools</h3>
              <p className="text-[#2C2E3A] text-sm">CRM, project management, business software</p>
            </div>
            <div className="rounded-2xl border border-[#B3B4BD]/20 bg-white/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-[#141619] mb-2">Financial Services</h3>
              <p className="text-[#2C2E3A] text-sm">Investment platforms, financial planning tools</p>
            </div>
            <div className="rounded-2xl border border-[#B3B4BD]/20 bg-white/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-[#141619] mb-2">Wellness Brands</h3>
              <p className="text-[#2C2E3A] text-sm">Mental health, fitness, work-life balance solutions</p>
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
