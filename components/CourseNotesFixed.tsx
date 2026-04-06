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
              <div><strong className="text-[#141619]">Ronak:</strong> Building ownURgrowth, manages the business, operations, and strategy behind Ashwini's LinkedIn presence and many other creators. Has worked hands-on with brand collaborations, content strategy, and audience growth.</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-200 mb-3">What This Course IS:</h4>
              <ul className="text-sm text-[#2C2E3A] space-y-1">
                <li>• A short, crisp, no-fluff crash course</li>
                <li>• Pure tactics and learnings - only what actually works</li>
                <li>• Tried and tested strategies from a real creator who has done it</li>
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
            <h4 className="font-semibold text-orange-200 mb-3">How to Use This Guide:</h4>
            <ul className="text-sm text-[#2C2E3A] space-y-1">
              <li>• These notes are designed to be a complete standalone guide</li>
              <li>• Use the Index - Jump directly to what's most relevant to you right now</li>
              <li>• While watching the video - Note down one liner notes of whatever resonates</li>
              <li>• Come back to this PDF - Bookmark it as your reference manual</li>
            </ul>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3">The Promise:</h4>
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
            <p className="text-sm text-[#2C2E3A] mb-3">Every few years, a platform emerges that gives ordinary people an extraordinary opportunity to build visibility and credibility through content alone. YouTube in 2016. TikTok in 2020. The people who recognised those windows early built audiences and careers that most people now look at from the outside and wish they had been a part of.</p>
            <p className="text-sm text-[#2C2E3A]">LinkedIn is that window right now. Organic reach is still high, consistent creators still stand out, and the algorithm actively rewards people who show up regularly. Three years from now, the people who started today will be the ones others wish they had followed earlier.</p>
          </div>
          <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-cyan-200 mb-3">It Does Not Matter Where You Are Starting From!</h4>
            <p className="text-sm text-[#2C2E3A]">LinkedIn levels the playing field in a way very few platforms do. Your college tier, your city, and your starting follower count are all irrelevant. What matters is whether you show up consistently and share value. Everyone gets the same algorithm, the same reach potential, and the same access to recruiters, decision-makers, and industry leaders.</p>
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
            <p className="text-sm text-[#2C2E3A] mt-3 italic text-center">Same talent. Same project. Same effort. Completely different outcomes because of visibility alone. This is what a personal brand does.</p>
          </div>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">What LinkedIn Can Do For You:</h4>
            <div className="text-sm text-[#2C2E3A] space-y-2">
              <div><strong className="text-[#141619]">Students:</strong> Build a visible body of work before graduation. Land internships, referrals, and recruiter outreach while your peers are not even thinking about it yet.</div>
              <div><strong className="text-[#141619]">Working Professionals:</strong> Accelerate promotions, attract inbound job opportunities, and build industry credibility that compounds over time.</div>
              <div><strong className="text-[#141619]">Business Owners and Freelancers:</strong> Generate high quality leads and sales organically, without a paid ads budget, from an audience that is already in a professional and business mindset.</div>
            </div>
          </div>
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-orange-200 mb-3">The Effort Reality:</h4>
            <p className="text-sm text-[#2C2E3A]">LinkedIn requires far less effort than people assume. A well-written post takes 15 to 20 minutes. No video editing, no production setup, no design required. A single post can reach thousands of the right people - recruiters, founders, clients, and industry peers without spending a single rupee. The effort-to-impact ratio on LinkedIn is higher than any other professional platform today.</p>
          </div>
        </div>
      )
    },
    {
      title: "👤 Building a Profile That Works For You",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">Your Profile is Your Storefront</h4>
            <p className="text-sm text-[#2C2E3A] mb-3">Before anyone reads a single post you write, before anyone decides to connect with you or respond to your message, they see your profile. Think of it exactly like a storefront. A well-designed, clear storefront pulls people in. A neglected or confusing one makes people walk past without a second thought.</p>
            <p className="text-sm text-[#2C2E3A] italic">One simple rule governs everything about your LinkedIn profile: what is seen is what gets noticed, and what gets noticed is what gets results.</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h4 className="font-semibold text-[#141619] mb-3">The Two Elements People See Before Opening Your Profile:</h4>
            <p className="text-sm text-[#2C2E3A] mb-3">When you send a connection request or a message to someone, they see exactly two things before they even click on your name: your profile photo and your headline. These two elements alone determine whether people engage with you or ignore you. Getting them right is non-negotiable.</p>
          </div>
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3">Profile Photo - The First Impression You Cannot Take Back:</h4>
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
                  <li>• Full body shots where your face is too small</li>
                  <li>• Party photos, group photos, or heavily filtered images</li>
                  <li>• Cluttered or distracting backgrounds</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-[#2C2E3A] mt-3">If you do not have a professional photo, a clean, well-lit casual photo is perfectly fine. The priority is clarity and approachability.</p>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3">Headline - Your One Line Pitch:</h4>
            <p className="text-sm text-[#2C2E3A] mb-3">Your headline is the single most important line on your profile. It follows your name everywhere on LinkedIn - in search results, connection requests, comments, and messages. Most people waste it by writing their job title alone. That is a missed opportunity.</p>
            <div className="bg-gray-100 rounded p-3 mb-3">
              <p className="text-sm text-[#2C2E3A] font-mono text-center">What you do + Who you help + What outcome you deliver</p>
            </div>
            <p className="text-sm text-[#2C2E3A] italic">Think of your headline as a billboard that has one second to make an impression. It should immediately tell a stranger who you are, who you serve, and why they should care.</p>
          </div>
          <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-cyan-200 mb-3">The About Section - Your Story, Not Your Resume:</h4>
            <p className="text-sm text-[#2C2E3A] mb-2">The About section is where most people either copy-paste their resume or leave it blank. Both are wrong. This section is your opportunity to tell your story in your own voice - where you come from, what you care about, what you are building, and how you can help the person reading it.</p>
            <p className="text-sm text-[#2C2E3A] mb-2">Write it like you are talking to someone, not filing a form. It should feel human, not corporate.</p>
            <p className="text-sm text-[#2C2E3A] italic">Pro Tip: In the resources section of this course, a ready-to-use AI prompt has been provided. Paste your details into that prompt, run it through any AI tool, and you will have a strong About section draft within minutes.</p>
          </div>
        </div>
      )
    },
    {
      title: "🤝 Network is the Real Net Worth",
      content: (
        <div className="space-y-4">
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-orange-200 mb-3">Why Networking Changes Everything</h4>
            <p className="text-sm text-[#2C2E3A] mb-3">There is a reason the phrase "network is the real net worth" has become a universal truth in the professional world. The opportunities that change your life rarely come from job portals or cold applications. They come from people - someone who remembers your name, someone who saw your post, someone you helped six months ago who now knows exactly who to call.</p>
            <p className="text-sm text-[#2C2E3A]">LinkedIn accelerates this process faster than any other platform. It removes the barriers that would otherwise make certain people completely inaccessible to you. The CEO of a company you admire, a co-founder building something in your space, a CFO who has walked the exact path you want to walk - on LinkedIn, one thoughtful message is all that stands between you and a real conversation with any of them.</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h4 className="font-semibold text-[#141619] mb-3">The Numbers Game Framework:</h4>
            <p className="text-sm text-[#2C2E3A] mb-3">Networking on LinkedIn is a numbers game, and the math is brutally honest. The average response rate on cold outreach is less than 5%. Reaching out to 2 or 3 people and hearing nothing back is completely normal - it is not a reflection of you, it is just the reality of cold outreach.</p>
            <div className="text-sm text-[#2C2E3A] space-y-2">
              <div>• To get 1 meaningful reply: <strong className="text-blue-300">Reach out to at least 15-20 people</strong></div>
              <div>• To get 4-5 real conversations: <strong className="text-green-300">Reach out to 100+ people consistently</strong></div>
              <div>• Before you question the process: <strong className="text-yellow-300">Increase your effort</strong></div>
            </div>
          </div>
          <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-cyan-200 mb-3">What Genuine Networking Actually Looks Like</h4>
            <p className="text-sm text-[#2C2E3A] mb-3">Networking is not collecting connections like trophies. It is building real, two-way relationships where value flows in both directions. The mindset shift that makes all the difference is this - lead with giving, not asking.</p>
            <p className="text-sm text-[#2C2E3A]">Comment genuinely on people's posts. Share something useful. Celebrate someone's win publicly. Help without expecting anything in return. These small actions compound over time into a reputation, and that reputation becomes the reason people think of you when opportunities arise.</p>
          </div>
        </div>
      )
    },
    {
      title: "📝 The Content Playbook",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">LinkedIn Content is Different - Respect That</h4>
            <p className="text-sm text-[#2C2E3A]">LinkedIn is not Instagram. You cannot post random, low-effort content and expect results. The audience here is professional, the standards are higher, and the content that wins is content that teaches, tells a story, or starts a conversation. Keep that as your north star for everything you post.</p>
          </div>
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3">The 6 Content Types That Work on LinkedIn:</h4>
            <div className="text-sm text-[#2C2E3A] space-y-3">
              <div><strong className="text-[#141619]">1. Personal Stories and Lessons Learned:</strong> The single most powerful content type on LinkedIn. Personal stories are relatable, human, and impossible to replicate.</div>
              <div><strong className="text-[#141619]">2. Educational and How-To Content:</strong> People come to LinkedIn to learn and stay ahead. If you can teach someone something useful in two minutes, you have added real value to their day.</div>
              <div><strong className="text-[#141619]">3. Industry Insights and Opinions:</strong> Pick a trending topic in your industry, share your honest perspective on it, and watch the comments section come alive.</div>
              <div><strong className="text-[#141619]">4. Behind the Scenes and Day in the Life:</strong> This is the easiest content type to produce, especially on days when you have no time or no ideas.</div>
              <div><strong className="text-[#141619]">5. Career Milestones and Wins:</strong> Got a promotion? Post it. Landed a new job? Post it. Milestone posts perform exceptionally well on LinkedIn.</div>
              <div><strong className="text-[#141619]">6. Questions and Polls:</strong> Polls are one of the most underrated engagement tools on LinkedIn. They force the reader to stop, think, and make a decision.</div>
            </div>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3">The Golden Rule of LinkedIn Content:</h4>
            <p className="text-sm text-[#2C2E3A]">LinkedIn rewards content that does one of three things: Teaches something. Tells a story. Starts a conversation. Every post you create should do at least one of these. If it does not, rethink it before posting.</p>
          </div>
        </div>
      )
    },
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
            Get access to the complete LinkedIn growth guide with every strategy from the PDF
          </p>
          <button
            onClick={() => window.location.href = '/courses/linkedin-growth'}
            className="bg-blue-600 hover:bg-[#1D4ED8] text-white px-8 py-3 rounded-lg font-medium transition-all"
          >
            Upgrade to Access Complete Notes
          </button>
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
          <p className="text-[#B3B4BD] text-sm">87-page comprehensive LinkedIn growth guide</p>
        </div>
      </div>

      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-green-200 mb-2">📚 Complete 87-Page Course Notes</h3>
        <p className="text-sm text-[#2C2E3A] mb-3">You have access to the complete LinkedIn growth guide. This includes ALL sections from the original PDF:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#B3B4BD]">
          <div>
            <ul className="space-y-1">
              <li>• Introduction & Course Overview</li>
              <li>• Why LinkedIn & Why Now</li>
              <li>• Building a Profile That Works</li>
              <li>• Network is the Real Net Worth</li>
              <li>• Building and Managing Connections</li>
              <li>• Growing and Deepening Connections</li>
              <li>• The Power of Commenting</li>
              <li>• The Content Playbook</li>
              <li>• The Execution Playbook</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-1">
              <li>• LinkedIn Newsletters</li>
              <li>• Making Money on LinkedIn</li>
              <li>• The Business of LinkedIn</li>
              <li>• LinkedIn Business Page</li>
              <li>• Beyond Brand Deals</li>
              <li>• The Prompt Vault (50+ AI Prompts)</li>
              <li>• Networking Prompts</li>
              <li>• Content Creation Prompts</li>
              <li>• Brand Deal Prompts</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-[#B3B4BD] mt-3 italic">Complete 87-page guide with every strategy, framework, and AI prompt from the original PDF</p>
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
