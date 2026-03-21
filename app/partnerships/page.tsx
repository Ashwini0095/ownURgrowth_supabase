'use client';

import Link from "next/link";
import { ChevronRight, Target, TrendingUp, Users, Zap, BarChart3, Globe } from "lucide-react";

export default function PartnershipsPage() {
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
              <span className="text-slate-200">Brand</span>{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Partnerships
              </span>{" "}
              <span className="text-slate-200">& Sponsorships</span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 sm:text-xl lg:text-2xl max-w-3xl mx-auto">
              Partner with ownURgrowth to reach ambitious professionals and learners. Connect your brand with our engaged community of growth-minded individuals.
            </p>
            <div className="mt-8">
              <a href="https://topmate.io/ashwini_harle" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-400/40 hover:scale-105">
                Partner With Us
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl mb-4">
              Our Reach & Impact
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Connect with professionals who are actively investing in their growth and career development.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-50 mb-2">10K+</div>
              <div className="text-slate-300">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-50 mb-2">95%</div>
              <div className="text-slate-300">Engagement Rate</div>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-50 mb-2">50+</div>
              <div className="text-slate-300">Countries Reached</div>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-50 mb-2">500K+</div>
              <div className="text-slate-300">Monthly Impressions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Options */}
      <section className="py-16 lg:py-24 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Choose the partnership model that aligns with your marketing goals and budget.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-2xl border border-white/10 bg-slate-950/70 p-6 transition-all duration-300 hover:border-blue-400/30 hover:bg-slate-950/90 hover:scale-105">
              <Target className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-50 mb-3">Course Sponsorship</h3>
              <p className="text-slate-300 mb-4">
                Sponsor our premium courses and get your brand in front of engaged learners.
              </p>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>• Brand integration in course materials</li>
                <li>• Logo placement and mentions</li>
                <li>• Direct access to course participants</li>
              </ul>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-slate-950/70 p-6 transition-all duration-300 hover:border-blue-400/30 hover:bg-slate-950/90 hover:scale-105">
              <Zap className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-50 mb-3">Content Collaboration</h3>
              <p className="text-slate-300 mb-4">
                Co-create valuable content that showcases your expertise and our platform.
              </p>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>• Joint webinars and workshops</li>
                <li>• Co-branded educational content</li>
                <li>• Thought leadership articles</li>
              </ul>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-slate-950/70 p-6 transition-all duration-300 hover:border-blue-400/30 hover:bg-slate-950/90 hover:scale-105">
              <BarChart3 className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-50 mb-3">Newsletter Sponsorship</h3>
              <p className="text-slate-300 mb-4">
                Reach our subscribers through dedicated newsletter placements and mentions.
              </p>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>• Featured sponsor sections</li>
                <li>• Product showcases</li>
                <li>• Direct audience engagement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Partners */}
      <section className="py-16 lg:py-24 bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl mb-4">
              Ideal Brand Partners
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              We work with brands that align with our mission of professional and personal growth.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-slate-50 mb-2">EdTech Companies</h3>
              <p className="text-slate-300 text-sm">Learning platforms, course creators, educational tools</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-slate-50 mb-2">Productivity Tools</h3>
              <p className="text-slate-300 text-sm">Software, apps, and services that boost productivity</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-slate-50 mb-2">Career Services</h3>
              <p className="text-slate-300 text-sm">Resume builders, job boards, career coaching</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-slate-50 mb-2">Business Tools</h3>
              <p className="text-slate-300 text-sm">CRM, project management, business software</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-slate-50 mb-2">Financial Services</h3>
              <p className="text-slate-300 text-sm">Investment platforms, financial planning tools</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-slate-50 mb-2">Wellness Brands</h3>
              <p className="text-slate-300 text-sm">Mental health, fitness, work-life balance solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="mx-auto max-w-4xl px-4 lg:px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Let's discuss how we can help you reach your target audience and achieve your marketing goals.
          </p>
          <a href="https://topmate.io/ashwini_harle" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-400/40 hover:scale-105">
            Start Partnership Discussion
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}
