'use client';

import { FileText, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface CourseNotesProps {
  userPlan: 'basic' | 'plus' | 'pro' | null;
}

export default function CourseNotes({ userPlan }: CourseNotesProps) {
  const hasAccess = userPlan === 'plus' || userPlan === 'pro';
  const [expandedSections, setExpandedSections] = useState<number[]>([0]); // First section expanded by default

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const sections = [
    {
      title: "📑 Introduction & Table of Contents",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">Who We Are:</h4>
            <div className="text-sm text-[#2C2E3A] space-y-2">
              <div><strong className="text-[#141619]">Ashwini:</strong> Software Developer at a MAANG company, LinkedIn creator, and career coach. Built a LinkedIn following of 50,000+ from scratch by applying everything taught in this course.</div>
              <div><strong className="text-[#141619]">Ronak:</strong> Building ownURgrowth, manages the business, operations, and strategy behind Ashwini's LinkedIn presence and many other creators.</div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h4 className="font-semibold text-[#141619] mb-3">What This Course IS:</h4>
            <ul className="text-sm text-[#2C2E3A] space-y-1">
              <li>• A short, crisp, no-fluff crash course</li>
              <li>• Pure tactics and learnings - only what actually works</li>
              <li>• Tried and tested strategies from a real creator who has done it</li>
            </ul>
            <h4 className="font-semibold text-[#141619] mb-3 mt-4">What This Course is NOT:</h4>
            <ul className="text-sm text-[#2C2E3A] space-y-1">
              <li>• A long, boring, padded-out course</li>
              <li>• Generic LinkedIn advice you've already heard</li>
              <li>• Theory with no practical application</li>
            </ul>
          </div>
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3">The Promise:</h4>
            <p className="text-sm text-[#2C2E3A]">If you read these notes thoroughly and apply what's inside, you will see real, measurable growth on LinkedIn. No fluff. No filler. Just results.</p>
          </div>
        </div>
      )
    },
    {
      title: "1. 📋 LinkedIn Profile Optimization",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">Essential Profile Elements:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#2C2E3A]">
              <div>
                <strong className="text-[#141619]">Headline:</strong>
                <p>Use keywords + value proposition (120 chars max)</p>
              </div>
              <div>
                <strong className="text-[#141619]">Photo:</strong>
                <p>Professional headshot, eye contact, genuine smile</p>
              </div>
              <div>
                <strong className="text-[#141619]">Banner:</strong>
                <p>Brand colors, contact info, value statement</p>
              </div>
              <div>
                <strong className="text-[#141619]">Summary:</strong>
                <p>Hook + Story + CTA (2000 chars max)</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-[#2C2E3A] space-y-2">
            <div><strong className="text-[#141619]">Experience:</strong> Focus on results and achievements, not just duties</div>
            <div><strong className="text-[#141619]">Skills:</strong> Add top 50 relevant skills, get endorsements from connections</div>
            <div><strong className="text-[#141619]">Recommendations:</strong> Request from clients, colleagues, and managers</div>
            <div><strong className="text-[#141619]">Contact Info:</strong> Make website, email, and phone number visible</div>
          </div>
        </div>
      )
    },
    {
      title: "2. 🤖 AI Prompts for Content Creation",
      content: (
        <div className="space-y-4">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3">Ready-to-Use AI Prompts:</h4>
            <div className="space-y-3 text-sm text-[#2C2E3A]">
              <div>
                <strong className="text-[#141619]">For Engaging Posts:</strong>
                <div className="bg-gray-100 rounded p-2 mt-1 font-mono text-xs">
                  "Write a LinkedIn post about [your topic] that gets high engagement and includes a personal story"
                </div>
              </div>
              <div>
                <strong className="text-[#141619]">For Headlines:</strong>
                <div className="bg-gray-100 rounded p-2 mt-1 font-mono text-xs">
                  "Create 10 LinkedIn headlines for a [job title] in [industry] that show results and expertise"
                </div>
              </div>
              <div>
                <strong className="text-[#141619]">For Networking:</strong>
                <div className="bg-gray-100 rounded p-2 mt-1 font-mono text-xs">
                  "Write personalized connection request messages for [target audience] in [industry]"
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "3. 🤝 Networking Strategies",
      content: (
        <div className="space-y-4">
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3">Smart Networking Approach:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#2C2E3A]">
              <div>
                <strong className="text-[#141619]">Target Audience:</strong>
                <p>Define your ideal connections clearly before reaching out</p>
              </div>
              <div>
                <strong className="text-[#141619]">Connection Requests:</strong>
                <p>Always personalize messages (300 character limit)</p>
              </div>
              <div>
                <strong className="text-[#141619]">Follow-up Strategy:</strong>
                <p>Message within 24 hours of connecting</p>
              </div>
              <div>
                <strong className="text-[#141619]">Value First:</strong>
                <p>Share resources before asking for help</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-[#2C2E3A] space-y-2">
            <div><strong className="text-[#141619]">Daily Engagement:</strong> Comment meaningfully on 5-10 posts from your network</div>
            <div><strong className="text-[#141619]">Event Networking:</strong> Connect with attendees from LinkedIn events and webinars</div>
          </div>
        </div>
      )
    },
    {
      title: "4. 🚀 Growth Hacking Techniques",
      content: (
        <div className="space-y-4">
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-orange-200 mb-3">Proven Growth Tactics:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#2C2E3A]">
              <div>
                <strong className="text-[#141619]">Posting Schedule:</strong>
                <p>3-5 times per week, consistent timing</p>
              </div>
              <div>
                <strong className="text-[#141619]">Golden Hours:</strong>
                <p>8-10 AM or 12-2 PM in your timezone</p>
              </div>
              <div>
                <strong className="text-[#141619]">Hashtag Strategy:</strong>
                <p>3-5 relevant hashtags, mix popular + niche</p>
              </div>
              <div>
                <strong className="text-[#141619]">Content Repurposing:</strong>
                <p>Turn one idea into 5 different post formats</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "5. 📈 Algorithm & Engagement",
      content: (
        <div className="space-y-4">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-red-200 mb-3">Algorithm Optimization:</h4>
            <div className="text-sm text-[#2C2E3A] space-y-3">
              <div><strong className="text-[#141619]">First Hour Rule:</strong> Get 10+ engagements in first 60 minutes for maximum reach</div>
              <div><strong className="text-[#141619]">Comments &gt; Likes:</strong> Prioritize meaningful comments over simple likes</div>
              <div><strong className="text-[#141619]">Native Content:</strong> Upload videos directly to LinkedIn (don't share YouTube links)</div>
              <div><strong className="text-[#141619]">Dwell Time:</strong> Create content that makes people stop scrolling</div>
              <div><strong className="text-[#141619]">Quick Responses:</strong> Reply to comments within 2 hours</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "6. 🎯 Personal Branding",
      content: (
        <div className="space-y-4">
          <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-cyan-200 mb-3">Building Your Brand:</h4>
            <div className="text-sm text-[#2C2E3A] space-y-3">
              <div><strong className="text-[#141619]">Niche Focus:</strong> Be known for 1-2 specific topics, become the go-to expert</div>
              <div><strong className="text-[#141619]">Consistent Voice:</strong> Maintain the same tone and style across all content</div>
              <div><strong className="text-[#141619]">Visual Identity:</strong> Use consistent colors, fonts, and design elements</div>
              <div><strong className="text-[#141619]">Thought Leadership:</strong> Share unique insights and controversial (but professional) opinions</div>
              <div><strong className="text-[#141619]">Storytelling:</strong> Use personal stories to illustrate business points</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "7. 💼 Lead Generation",
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-200 mb-3">Converting Connections to Clients:</h4>
            <div className="text-sm text-[#2C2E3A] space-y-3">
              <div><strong className="text-[#141619]">Lead Magnets:</strong> Offer free resources in exchange for contact information</div>
              <div><strong className="text-[#141619]">Clear CTAs:</strong> Include a call-to-action in every post</div>
              <div><strong className="text-[#141619]">DM Strategy:</strong> Warm up prospects with value before pitching services</div>
              <div><strong className="text-[#141619]">Content Funnel:</strong> Awareness → Interest → Decision → Action</div>
              <div><strong className="text-[#141619]">Social Proof:</strong> Regularly share client results and testimonials</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "8. 📊 Analytics & Tracking",
      content: (
        <div className="space-y-4">
          <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-indigo-200 mb-3">Measuring Success:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#2C2E3A]">
              <div>
                <strong className="text-[#141619]">Key Metrics:</strong>
                <p>Impressions, engagement rate, click-through rate</p>
              </div>
              <div>
                <strong className="text-[#141619]">Profile Growth:</strong>
                <p>Track weekly profile views and connection growth</p>
              </div>
              <div>
                <strong className="text-[#141619]">Content Performance:</strong>
                <p>Note which post formats get most engagement</p>
              </div>
              <div>
                <strong className="text-[#141619]">A/B Testing:</strong>
                <p>Test different posting times and content styles</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="text-xs text-[#B3B4BD]">
              <strong className="text-[#2C2E3A]">Monthly Goals:</strong> 50-100 new connections, 20% engagement rate, 500+ profile views
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-[#1D4ED8]/20 flex items-center justify-center">
          <FileText className="h-6 w-6 text-[#1D4ED8]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#141619]">Course Notes</h2>
          <p className="text-[#B3B4BD] text-sm">Complete LinkedIn growth guide with AI prompts</p>
        </div>
      </div>

      {hasAccess ? (
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
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            <Lock className="h-12 w-12 text-[#B3B4BD] mx-auto mb-4" />
            <h3 className="font-medium text-[#141619] mb-2">Complete Course Notes Available</h3>
            <p className="text-sm text-[#B3B4BD] mb-4">
              Get access to detailed notes, AI prompts, and step-by-step strategies
            </p>
            <div className="bg-slate-700 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-[#2C2E3A] mb-2">What's Included:</h4>
              <ul className="text-sm text-[#B3B4BD] space-y-1 text-left">
                <li>• 8 comprehensive sections with actionable strategies</li>
                <li>• Ready-to-use AI prompts for content creation</li>
                <li>• Step-by-step profile optimization guide</li>
                <li>• Networking templates and scripts</li>
                <li>• Growth hacking techniques and analytics</li>
              </ul>
            </div>
            <button
              onClick={() => window.location.href = '/courses/linkedin-growth'}
              className="bg-blue-600 hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-lg font-medium transition-all"
            >
              Upgrade to Access Notes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
