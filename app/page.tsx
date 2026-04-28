'use client';

import Link from "next/link";
import { ChevronRight, PlayCircle, Star, Users, Award, Clock, Shield, BookOpen, RefreshCw, GraduationCap, Briefcase, Laptop, ArrowRight, Heart, Building } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { useEffect, useState } from "react";
import { trackPageView, trackButtonClick } from "../lib/analytics";
import ReviewsCarousel from "../components/ReviewsCarousel";
import InteractiveCounter from "../components/InteractiveCounter";
import FloatingCTA from "../components/FloatingCTA";
import InteractiveFAQ from "../components/InteractiveFAQ";
import ParallaxBackground from "../components/ParallaxBackground";
import AnimatedText from "../components/AnimatedText";
import ScrollProgressBar from "../components/ScrollProgressBar";
import BackToTop from "../components/BackToTop";
import Typewriter from "../components/Typewriter";
import ScrollAnimation from "../components/ScrollAnimation";

export default function Home() {
  const { user, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    trackPageView('Home');
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
        <section className="min-h-[75vh] flex items-start justify-center pt-12 pb-20 px-4">
          <div className="w-full max-w-3xl mx-auto space-y-6 text-center animate-pulse">
            <div className="flex justify-center gap-4">
              <div className="h-9 w-52 bg-[#B3B4BD]/20 rounded-full" />
              <div className="h-9 w-48 bg-[#B3B4BD]/20 rounded-full" />
            </div>
            <div className="h-12 sm:h-16 w-3/4 bg-[#B3B4BD]/20 rounded-2xl mx-auto" />
            <div className="h-12 sm:h-16 w-1/2 bg-[#1D4ED8]/10 rounded-2xl mx-auto" />
            <div className="h-6 w-2/3 bg-[#B3B4BD]/15 rounded-xl mx-auto" />
            <div className="flex justify-center gap-3 pt-4">
              <div className="h-12 w-36 bg-[#1D4ED8]/15 rounded-2xl" />
              <div className="h-12 w-36 bg-[#1D4ED8]/15 rounded-2xl" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#1D4ED8]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#0F172A]/3 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-[#B3B4BD]/10 rotate-45 blur-xl"></div>
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-start justify-center pt-12 pb-10 lg:pb-14 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden">
        {/* Square Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(29, 78, 216, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(29, 78, 216, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Professional Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-indigo-400/15 to-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-300/10 to-indigo-400/10 rounded-full blur-3xl"></div>
          
          {/* Geometric Patterns */}
          <div className="absolute top-32 left-32 w-32 h-32 border border-blue-200/30 rounded-2xl rotate-12 animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-indigo-200/20 to-blue-300/20 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-blue-300/20 rotate-45"></div>
        </div>
        
        <div className="w-full max-w-none px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="w-full space-y-6 text-center">
            {/* Floating badges */}
            <div className="flex flex-wrap justify-center gap-6">
              <div className="group transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2.5 bg-[#1D4ED8]/10 backdrop-blur-sm border border-[#1D4ED8]/20 px-5 py-2 rounded-full shadow-lg hover:shadow-[#1D4ED8]/30">
                <span className="w-2 h-2 bg-[#1D4ED8] rounded-full animate-pulse" />
                <span className="text-[#141619] font-medium text-sm sm:text-base">Transform Your Career & Life</span>
              </div>
              <div className="group transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2.5 bg-[#1D4ED8]/10 backdrop-blur-sm border border-[#1D4ED8]/20 px-5 py-2 rounded-full shadow-lg hover:shadow-[#1D4ED8]/30">
                <span className="w-2 h-2 bg-[#0F172A] rounded-full animate-pulse" />
                <span className="text-[#141619] font-medium text-sm sm:text-base">Build your personal brand</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl sm:leading-relaxed lg:leading-relaxed xl:leading-relaxed">
              <span className="text-[#141619]">Master Skills That</span>
              <br />
              <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                <Typewriter 
                  phrases={[
                    "Builds Passive Income",
                    "Actually Matters", 
                    "Builds Personal Brand"
                  ]}
                  typingSpeed={80}
                  deletingSpeed={40}
                  pauseDuration={1500}
                />
              </span>
            </h1>

            <p className="mt-6 text-sm text-[#2C2E3A] sm:text-base md:text-lg lg:text-xl font-semibold leading-relaxed max-w-5xl mx-auto tracking-normal px-4">
              You didn't come this far to stay average. Land your dream job, grow your LinkedIn, and build a brand that works for you, ownURgrowth got you covered.
            </p>

            <div className="flex flex-col gap-4 mt-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/courses" className="group relative overflow-hidden bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-14 py-6 text-xl md:text-2xl font-semibold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#1D4ED8]/50 rounded-2xl">
                  <span className="relative z-10 flex items-center gap-3">
                    Start Learning Today
                    <ChevronRight className="h-7 w-7 transition-transform group-hover:translate-x-2" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
                <Link href="/partnerships" className="group relative overflow-hidden bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-14 py-6 text-xl md:text-2xl font-semibold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#1D4ED8]/50 rounded-2xl">
                  <span className="relative z-10 flex items-center gap-3">
                    Amplify Your Brand
                    <ChevronRight className="h-7 w-7 transition-transform group-hover:translate-x-2" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a href="https://topmate.io/ashwini_harle" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-14 py-6 text-xl md:text-2xl font-semibold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#1D4ED8]/50 rounded-2xl">
                  <span className="relative z-10 flex items-center gap-3">
                    Connect 1:1
                    <ChevronRight className="h-7 w-7 transition-transform group-hover:translate-x-2" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </a>
                <Link href="/ghostwriting" className="group relative overflow-hidden bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-14 py-6 text-xl md:text-2xl font-semibold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#1D4ED8]/50 rounded-2xl">
                  <span className="relative z-10 flex items-center gap-3">
                    Let us grow your Linkedin
                    <ChevronRight className="h-7 w-7 transition-transform group-hover:translate-x-2" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Preview Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-slate-100 to-gray-100 py-10 lg:py-16 shadow-inner">
        {/* Professional background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/30 via-transparent to-slate-50/30"></div>
        {/* Subtle 3D elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#1D4ED8]/10 rotate-12 rounded-lg blur-sm"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-[#B3B4BD]/20 -rotate-45 rounded-lg"></div>
        
        <div className="mx-auto max-w-7xl px-4 lg:px-6 relative z-10">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl font-bold text-[#141619] sm:text-5xl lg:text-6xl mb-4">
              Learn & Earn <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">Programs</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-[#141619] font-bold">
              Built for The Ambitious
            </p>
          </div>
          
          <div className="grid gap-6 md:gap-10 md:grid-cols-2 max-w-6xl mx-auto">
            <ScrollAnimation delay={200}>
              <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-indigo-50/60 border-2 border-[#1D4ED8]/30 rounded-3xl p-4 sm:p-6 md:p-8 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/15 hover:border-[#1D4ED8]/50 hover:-translate-y-2 flex flex-col h-full">
              
              {/* Animated top border on hover */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
              
              {/* Corner symbol on hover */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-[#1D4ED8]/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0">
                <div className="w-6 h-6 bg-[#1D4ED8]/50 rounded-lg"></div>
              </div>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1D4ED8] mb-3 md:mb-4 transition-colors duration-500 relative z-10 tracking-tight">
                LinkedIn Decoded
              </h3>
              <p className="text-[#141619] text-base md:text-lg mb-6 md:mb-8 font-light leading-relaxed transition-colors flex-grow relative z-10">
                No theory. No fillers. Just raw secrets and tactics that actually grows your linkedin.
              </p>
              <div className="flex items-center justify-end mt-auto relative z-10">
                <Link href="/courses/linkedin-growth" className="relative overflow-hidden bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-6 md:px-12 py-3 text-base md:text-lg font-bold text-white transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl rounded-2xl group-hover:shadow-[#1D4ED8]/30">
                  <span className="relative z-10">Enroll Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Link>
              </div>
            </div>
            </ScrollAnimation>

            <ScrollAnimation delay={400}>
              <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-indigo-50/60 border-2 border-[#1D4ED8]/30 rounded-3xl p-4 sm:p-6 md:p-8 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1D4ED8]/15 hover:border-[#1D4ED8]/50 hover:-translate-y-2 flex flex-col h-full">
              
              {/* Animated top border on hover */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1D4ED8] via-blue-400 to-[#1D4ED8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
              
              {/* Corner symbol on hover */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-[#1D4ED8]/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-12 group-hover:rotate-0">
                <div className="w-6 h-6 bg-[#1D4ED8]/50 rounded-lg"></div>
              </div>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1D4ED8] mb-3 md:mb-4 transition-colors duration-500 relative z-10 tracking-tight">
                System Design Notes
              </h3>
              <p className="text-[#141619] text-base md:text-lg mb-6 md:mb-8 font-light leading-relaxed transition-colors flex-grow relative z-10">
                Clear notes to master scalable system design for real-world systems and interviews(which will get you in MAANG)
              </p>
              <div className="flex items-center justify-end mt-auto relative z-10">
                <button className="relative overflow-hidden bg-gradient-to-r from-gray-400 to-gray-500 px-6 md:px-12 py-3 text-base md:text-lg font-bold text-white shadow-xl rounded-2xl cursor-not-allowed opacity-70">
                  <span className="relative z-10">Coming Soon</span>
                </button>
              </div>
            </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="why-choose" className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Modern Background Elements */}
        <div className="absolute inset-0">
          {/* Animated gradient orbs */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-indigo-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-indigo-400/8 to-blue-500/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-300/5 to-indigo-400/8 rounded-full blur-3xl"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-20 right-1/4 w-20 h-20 border border-blue-200/40 rounded-2xl rotate-12 animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-br from-indigo-200/30 to-blue-300/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/6 w-12 h-12 border-2 border-blue-300/30 rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
          
          {/* Additional cubes and shapes */}
          <div className="absolute top-40 left-1/3 w-14 h-14 bg-blue-200/20 rounded-lg rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-18 h-18 border border-indigo-300/30 rounded-xl rotate-12 animate-bounce" style={{animationDuration: '4s', animationDelay: '0.5s'}}></div>
          <div className="absolute top-60 right-20 w-10 h-10 bg-gradient-to-br from-blue-300/25 to-indigo-400/15 rounded-md rotate-90 animate-spin" style={{animationDuration: '6s'}}></div>
          <div className="absolute bottom-40 left-20 w-22 h-22 border-2 border-blue-400/25 rounded-2xl -rotate-12 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/4 left-1/5 w-8 h-8 bg-indigo-300/20 rounded-full animate-bounce" style={{animationDuration: '2.5s', animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-60 right-1/5 w-16 h-16 border border-blue-300/35 rounded-lg rotate-45 animate-spin" style={{animationDuration: '10s'}}></div>
          <div className="absolute top-80 left-1/6 w-12 h-12 bg-gradient-to-tr from-blue-200/30 to-indigo-300/20 rounded-xl rotate-30 animate-pulse" style={{animationDelay: '3s'}}></div>
          
          {/* Subtle dot pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(29, 78, 216, 0.3) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          />
        </div>
        
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6 lg:py-24 relative z-10">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#141619] sm:text-5xl mb-4">
                Why Choose ownURgrowth?
              </h2>
              <p className="text-xl text-[#2C2E3A] max-w-3xl mx-auto font-light">
                We focus on practical skills that make a real difference in your career and life.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
            <div className="group text-center space-y-4 transition-all duration-300 hover:scale-105 bg-white border border-[#B3B4BD]/20 rounded-2xl p-6">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#1D4ED8]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1D4ED8]/20 group-hover:scale-110">
                <Clock className="h-6 w-6 text-[#1D4ED8] transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold text-[#141619] group-hover:text-[#1D4ED8] transition-colors">Lifetime Access</h3>
              <p className="text-[#2C2E3A] font-light">
                Learn at your own pace with permanent access to all course materials and updates.
              </p>
            </div>

            <div className="group text-center space-y-4 transition-all duration-300 hover:scale-105 bg-white border border-[#B3B4BD]/20 rounded-2xl p-6">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#1D4ED8]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1D4ED8]/20 group-hover:scale-110">
                <span className="text-2xl font-bold text-[#1D4ED8] transition-all duration-300 group-hover:scale-110">₹</span>
              </div>
              <h3 className="text-xl font-semibold text-[#141619] group-hover:text-[#1D4ED8] transition-colors">Affordable Pricing</h3>
              <p className="text-[#2C2E3A] font-light">
                You have wasted a lot of money in useless things, make smart decision this time, you won't regret
              </p>
            </div>

            <div className="group text-center space-y-4 transition-all duration-300 hover:scale-105 bg-white border border-[#B3B4BD]/20 rounded-2xl p-6">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#1D4ED8]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1D4ED8]/20 group-hover:scale-110">
                <Users className="h-6 w-6 text-[#1D4ED8] transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold text-[#141619] group-hover:text-[#1D4ED8] transition-colors">Live QNA Session</h3>
              <p className="text-[#2C2E3A] font-light">
                Get your doubts cleared in live Q&A sessions with the experienced & experts.
              </p>
            </div>

            <div className="group text-center space-y-4 transition-all duration-300 hover:scale-105 bg-white border border-[#B3B4BD]/20 rounded-2xl p-6">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#1D4ED8]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1D4ED8]/20 group-hover:scale-110">
                <RefreshCw className="h-6 w-6 text-[#1D4ED8] transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold text-[#141619] group-hover:text-[#1D4ED8] transition-colors">Free Course Updates</h3>
              <p className="text-[#2C2E3A] font-light">
                All future improvements and additional content are included at no extra cost.
              </p>
            </div>

            <div className="group text-center space-y-4 transition-all duration-300 hover:scale-105 bg-white border border-[#B3B4BD]/20 rounded-2xl p-6">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center transition-all duration-300 group-hover:from-blue-500/40 group-hover:to-cyan-500/40 group-hover:scale-110">
                <BookOpen className="h-6 w-6 text-[#1D4ED8] transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold text-[#141619] group-hover:text-[#1D4ED8] transition-colors">Concise & High-Signal Notes</h3>
              <p className="text-[#2C2E3A]">
                No fluff. Just ideas, patterns, and trade-offs that count.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is ownURgrowth For Section */}
      <section className="border-b border-white/5 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        {/* Background shading overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-blue-300/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/40 via-transparent to-blue-200/40"></div>
        
        {/* Subtle geometric elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-400/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-200/25 rounded-2xl rotate-45 blur-xl"></div>
        
        {/* Additional subtle shapes */}
        <div className="absolute top-20 left-1/3 w-16 h-16 border border-blue-300/30 rounded-lg rotate-12"></div>
        <div className="absolute bottom-20 right-1/3 w-12 h-12 bg-blue-300/20 rounded-full"></div>
        <div className="absolute top-1/3 left-20 w-8 h-8 border-2 border-blue-400/25 rotate-45"></div>
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6 lg:py-24 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#141619] sm:text-4xl mb-4">
              Who Is ownURgrowth For?
            </h2>
          </div>

          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-2xl border border-[#B3B4BD]/20 bg-gray-50/50 p-6 text-center transition-all duration-300 hover:border-[#1D4ED8]/30 hover:bg-gray-50/80 hover:scale-105 hover:shadow-lg hover:shadow-[#1D4ED8]/10">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center transition-all duration-300 group-hover:from-blue-500/40 group-hover:to-cyan-500/40 group-hover:scale-110">
                <GraduationCap className="h-6 w-6 text-[#1D4ED8] transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold text-[#141619] mb-3 group-hover:text-[#1D4ED8] transition-colors">Students</h3>
              <p className="text-[#2C2E3A] text-sm">
                Learn what school and college don't teach, the skills that actually make money.
              </p>
            </div>

            <div className="group rounded-2xl border border-[#B3B4BD]/20 bg-gray-50/50 p-6 text-center transition-all duration-300 hover:border-[#1D4ED8]/30 hover:bg-gray-50/80 hover:scale-105 hover:shadow-lg hover:shadow-[#1D4ED8]/10">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center transition-all duration-300 group-hover:from-blue-500/40 group-hover:to-cyan-500/40 group-hover:scale-110">
                <Briefcase className="h-6 w-6 text-[#1D4ED8] transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold text-[#141619] mb-3 group-hover:text-[#1D4ED8] transition-colors">Working Professionals</h3>
              <p className="text-[#2C2E3A] text-sm">
                Develop essential skills to enhance your career and boost productivity in your current role.
              </p>
            </div>

            <div className="group rounded-2xl border border-[#B3B4BD]/20 bg-gray-50/50 p-6 text-center transition-all duration-300 hover:border-[#1D4ED8]/30 hover:bg-gray-50/80 hover:scale-105 hover:shadow-lg hover:shadow-[#1D4ED8]/10">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center transition-all duration-300 group-hover:from-blue-500/40 group-hover:to-cyan-500/40 group-hover:scale-110">
                <Laptop className="h-6 w-6 text-[#1D4ED8] transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold text-[#141619] mb-3 group-hover:text-[#1D4ED8] transition-colors">Freelancers</h3>
              <p className="text-[#2C2E3A] text-sm">
                Discover ways to grow, manage, and streamline your freelance business effectively.
              </p>
            </div>

            <div className="group rounded-2xl border border-[#B3B4BD]/20 bg-gray-50/50 p-6 text-center transition-all duration-300 hover:border-[#1D4ED8]/30 hover:bg-gray-50/80 hover:scale-105 hover:shadow-lg hover:shadow-[#1D4ED8]/10">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center transition-all duration-300 group-hover:from-blue-500/40 group-hover:to-cyan-500/40 group-hover:scale-110">
                <ArrowRight className="h-6 w-6 text-[#1D4ED8] transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold text-[#141619] mb-3 group-hover:text-[#1D4ED8] transition-colors">Career Shifters</h3>
              <p className="text-[#2C2E3A] text-sm">
                Get the guidance needed to pivot confidently into a new field or industry.
              </p>
            </div>

            <div className="group rounded-2xl border border-[#B3B4BD]/20 bg-gray-50/50 p-6 text-center transition-all duration-300 hover:border-[#1D4ED8]/30 hover:bg-gray-50/80 hover:scale-105 hover:shadow-lg hover:shadow-[#1D4ED8]/10">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center transition-all duration-300 group-hover:from-blue-500/40 group-hover:to-cyan-500/40 group-hover:scale-110">
                <Heart className="h-6 w-6 text-[#1D4ED8] transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold text-[#141619] mb-3 group-hover:text-[#1D4ED8] transition-colors">Parents</h3>
              <p className="text-[#2C2E3A] text-sm">
                Manage time and personal growth while balancing family responsibilities.
              </p>
            </div>

            <div className="group rounded-2xl border border-[#B3B4BD]/20 bg-gray-50/50 p-6 text-center transition-all duration-300 hover:border-[#1D4ED8]/30 hover:bg-gray-50/80 hover:scale-105 hover:shadow-lg hover:shadow-[#1D4ED8]/10">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center transition-all duration-300 group-hover:from-blue-500/40 group-hover:to-cyan-500/40 group-hover:scale-110">
                <Building className="h-6 w-6 text-[#1D4ED8] transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold text-[#141619] mb-3 group-hover:text-[#1D4ED8] transition-colors">Founders and Business Owners</h3>
              <p className="text-[#2C2E3A] text-sm">
                Turn LinkedIn into a consistent source of leads and authority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 relative overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0">
          {/* Gradient orbs */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tl from-indigo-400/8 to-blue-500/5 rounded-full blur-2xl"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-32 left-1/4 w-16 h-16 border border-blue-200/30 rounded-2xl rotate-12 animate-pulse"></div>
          <div className="absolute bottom-32 right-1/4 w-12 h-12 bg-blue-300/20 rounded-full"></div>
          <div className="absolute top-1/2 right-20 w-8 h-8 border-2 border-indigo-300/25 rotate-45"></div>
        </div>
        
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6 lg:py-24 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D4ED8]/10 to-blue-100 px-6 py-3 rounded-full border border-[#1D4ED8]/20 mb-6 backdrop-blur-sm">
              <div className="w-2 h-2 bg-[#1D4ED8] rounded-full animate-pulse"></div>
              <span className="text-[#1D4ED8] font-semibold text-sm tracking-wide uppercase">Success Stories</span>
            </div>
            <h2 className="text-4xl font-bold text-[#141619] sm:text-5xl mb-6 tracking-tight">
              Hear From Our <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">Family</span>
            </h2>
            <p className="text-xl text-[#2C2E3A] max-w-4xl mx-auto font-light leading-relaxed">
              Join professionals who have upskilled and grew in their careers with our proven methods.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] mx-auto mt-8 rounded-full"></div>
          </div>

          <ReviewsCarousel />
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <InteractiveFAQ />

      {/* Floating CTA */}
      <FloatingCTA text="Start Learning" href="/courses" />

      {/* Back to Top */}
      <BackToTop />

      {/* Footer */}
      <footer className="bg-[#141619]">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-2xl font-bold">
              <span className="text-white">own</span>
              <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">UR</span>
              <span className="text-white">growth</span>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-300">
              <Link href="/courses" className="hover:text-white transition-colors">
                Courses
              </Link>
              <Link href="/about" className="hover:text-[#141619]">
                About
              </Link>
              <Link href="/contact" className="hover:text-[#141619]">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-[#141619]">
                Privacy
              </Link>
            </div>
          </div>
          <div className="mt-8 border-t border-white/5 pt-8 text-center text-sm text-slate-400">
            © 2026 ownURgrowth. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
