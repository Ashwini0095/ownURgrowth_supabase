'use client';

import { FileText, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface CourseNotesProps {
  userPlan: 'basic' | 'plus' | 'pro' | null;
}

export default function CourseNotesComplete({ userPlan }: CourseNotesProps) {
  const hasAccess = userPlan === 'plus' || userPlan === 'pro';
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const sections = [
    {
      title: "📑 Introduction & Course Overview",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">Who We Are:</h4>
            <div className="text-sm text-[#2C2E3A] space-y-2">
              <div><strong className="text-[#141619]">Ashwini:</strong> Software Developer at a MAANG company, LinkedIn creator, and career coach. Built a LinkedIn following of 50,000+ from scratch by applying everything taught in this course.</div>
              <div><strong className="text-[#141619]">Ronak:</strong> Building ownURgrowth, manages the business, operations, and strategy behind Ashwini's LinkedIn presence and many other creators.</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-200 mb-3">What This Course IS:</h4>
              <ul className="text-sm text-[#2C2E3A] space-y-1">
                <li>• A short, crisp, no-fluff crash course</li>
                <li>• Pure tactics and learnings - only what actually works</li>
                <li>• Tried and tested strategies from a real creator</li>
              </ul>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-200 mb-3">What This Course is NOT:</h4>
              <ul className="text-sm text-[#2C2E3A] space-y-1">
                <li>• A long, boring, padded-out course</li>
                <li>• Generic LinkedIn advice you've already heard</li>
                <li>• Theory with no practical application</li>
              </ul>
            </div>
          </div>
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-orange-200 mb-3">The Promise:</h4>
            <p className="text-sm text-[#2C2E3A]">If you read these notes thoroughly and apply what's inside, you will see real, measurable growth on LinkedIn. No fluff. No filler. Just results.</p>
          </div>
        </div>
      )
    },
    {
      title: "🚀 Why LinkedIn & Why Now",
      content: (
        <div className="space-y-4">
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3">The Opportunity Most People Will Miss!</h4>
            <p className="text-sm text-[#2C2E3A] mb-3">Every few years, a platform emerges that gives ordinary people an extraordinary opportunity to build visibility and credibility through content alone. YouTube in 2016. TikTok in 2020.</p>
            <p className="text-sm text-[#2C2E3A]">LinkedIn is that window right now. Organic reach is still high, consistent creators still stand out, and the algorithm actively rewards people who show up regularly.</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h4 className="font-semibold text-[#141619] mb-3">Visibility Beats Everything - Real Example:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#2C2E3A]">
              <div className="bg-green-900/30 rounded p-3">
                <strong className="text-green-300">Student A</strong>
                <p className="mt-1">LinkedIn Activity: Actively posts and builds industry connections</p>
                <p>Project Visibility: Reaches hundreds of professionals including recruiters</p>
                <p className="text-green-300 font-medium mt-2">Outcome: Gets messages, appreciation, and lands an internship</p>
              </div>
              <div className="bg-red-900/30 rounded p-3">
                <strong className="text-red-300">Student B</strong>
                <p className="mt-1">LinkedIn Activity: Not active on LinkedIn</p>
                <p>Project Visibility: Reaches only college professors and friends</p>
                <p className="text-red-300 font-medium mt-2">Outcome: Gets congratulated and asked for a party</p>
              </div>
            </div>
            <p className="text-sm text-[#2C2E3A] mt-3 italic text-center">Same talent. Same project. Same effort. Completely different outcomes because of visibility alone.</p>
          </div>
          <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-cyan-200 mb-3">What LinkedIn Can Do For You:</h4>
            <div className="text-sm text-[#2C2E3A] space-y-2">
              <div><strong className="text-[#141619]">Students:</strong> Build a visible body of work before graduation. Land internships, referrals, and recruiter outreach while your peers are not even thinking about it yet.</div>
              <div><strong className="text-[#141619]">Working Professionals:</strong> Accelerate promotions, attract inbound job opportunities, and build industry credibility that compounds over time.</div>
              <div><strong className="text-[#141619]">Business Owners and Freelancers:</strong> Generate high quality leads and sales organically, without a paid ads budget.</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "👤 Building a Profile That Works",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">Your Profile is Your Storefront</h4>
            <p className="text-sm text-[#2C2E3A]">Before anyone reads a single post you write, they see your profile. Think of it exactly like a storefront. A well-designed, clear storefront pulls people in.</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h4 className="font-semibold text-[#141619] mb-3">Profile Photo - The First Impression:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#2C2E3A]">
              <div>
                <strong className="text-green-300">What To Do:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Use a clear, well-lit photo</li>
                  <li>• Frame from waist to head</li>
                  <li>• Keep it professional or smart casual</li>
                  <li>• Plain or simple background</li>
                </ul>
              </div>
              <div>
                <strong className="text-red-300">What To Avoid:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Dark, blurry, or low quality images</li>
                  <li>• Full body shots where face is too small</li>
                  <li>• Party photos, group photos, filtered images</li>
                  <li>• Cluttered or distracting backgrounds</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3">Headline - Your One Line Pitch:</h4>
            <div className="bg-gray-100 rounded p-3 mb-3">
              <p className="text-sm text-[#2C2E3A] font-mono">What you do + Who you help + What outcome you deliver</p>
            </div>
            <p className="text-sm text-[#2C2E3A]">Your headline follows your name everywhere on LinkedIn. Most people waste it by writing their job title alone.</p>
          </div>
        </div>
      )
    },
    {
      title: "🤝 Network is the Real Net Worth",
      content: (
        <div className="space-y-4">
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-orange-200 mb-3">The Numbers Game Framework:</h4>
            <div className="text-sm text-[#2C2E3A] space-y-2">
              <div>• Average response rate: <strong className="text-red-300">Less than 5%</strong></div>
              <div>• To get 1 meaningful reply: <strong className="text-blue-300">Reach out to 15-20 people</strong></div>
              <div>• To get 4-5 real conversations: <strong className="text-green-300">Reach out to 100+ people</strong></div>
            </div>
          </div>
          <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-cyan-200 mb-3">What Genuine Networking Looks Like:</h4>
            <p className="text-sm text-[#2C2E3A]">Lead with giving, not asking. Comment genuinely on people's posts. Share something useful. Celebrate someone's win publicly. Help without expecting anything in return.</p>
          </div>
        </div>
      )
    }
  ];

  if (!hasAccess) {
    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-full bg-[#1D4ED8]/20 flex items-center justify-center">
            <FileText className="h-6 w-6 text-[#1D4ED8]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#141619]">Complete Course Notes</h2>
            <p className="text-[#B3B4BD] text-sm">87-page comprehensive LinkedIn growth guide</p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 text-center">
          <Lock className="h-16 w-16 text-[#B3B4BD] mx-auto mb-4" />
          <h3 className="font-medium text-[#141619] mb-3">Complete 87-Page Course Notes Available</h3>
          <p className="text-sm text-[#B3B4BD] mb-4">
            Get access to the complete LinkedIn growth guide with every strategy, framework, and AI prompt from the PDF
          </p>
          <div className="bg-slate-700 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-[#2C2E3A] mb-3">What's Included (87 Pages):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[#B3B4BD] text-left">
              <div>
                <ul className="space-y-1">
                  <li>• Complete profile optimization guide</li>
                  <li>• Networking strategies & frameworks</li>
                  <li>• Content creation playbook</li>
                  <li>• Growth hacking techniques</li>
                  <li>• Algorithm optimization tips</li>
                </ul>
              </div>
              <div>
                <ul className="space-y-1">
                  <li>• Personal branding strategies</li>
                  <li>• Monetization & brand deals</li>
                  <li>• 50+ AI prompts for content</li>
                  <li>• Newsletter creation guide</li>
                  <li>• Business page setup</li>
                </ul>
              </div>
            </div>
          </div>
          <button
            onClick={() => window.location.href = '/courses/linkedin-growth'}
            className="bg-blue-600 hover:bg-[#1D4ED8] text-white px-8 py-3 rounded-lg font-medium transition-all text-lg"
          >
            Upgrade to Access Complete Notes
          </button>
          <p className="text-xs text-[#141619]0 mt-3">Available in Pro Program (₹799) and Master Program (₹999)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-[#1D4ED8]/20 flex items-center justify-center">
          <FileText className="h-6 w-6 text-[#1D4ED8]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#141619]">Complete Course Notes</h2>
          <p className="text-[#B3B4BD] text-sm">87-page comprehensive LinkedIn growth guide with AI prompts</p>
        </div>
      </div>

      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-green-200 mb-2">📚 Complete Course Notes</h3>
        <p className="text-sm text-[#2C2E3A]">You have access to the complete 87-page LinkedIn growth guide. This includes all sections from the original PDF with networking frameworks, content strategies, monetization guides, and 50+ AI prompts.</p>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="border border-[#B3B4BD]/20 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex items-center justify-between p-4 bg-gray-100 hover:bg-slate-700 transition-colors"
            >
              <h3 className="font-medium text-[#141619] text-left">{section.title}</h3>
              {expandedSections.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-[#B3B4BD]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#B3B4BD]" />
              )}
            </button>
            {expandedSections.includes(index) && (
              <div className="p-4 bg-gray-100/50">
                {section.content}
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
    );
  }
