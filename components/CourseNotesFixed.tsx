'use client';

import { FileText, Lock, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'course-notes-read-sections';

function useReadTracker(totalSections: number, userId?: string) {
  const [readSections, setReadSections] = useState<Set<number>>(new Set());
  
  // Use a per-user key if userId is provided, fallback to legacy key
  const storageKey = userId ? `course-notes-read-${userId}` : STORAGE_KEY;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setReadSections(new Set(JSON.parse(stored)));
      } else {
        // If it's a new user and we have no per-user data, start fresh
        setReadSections(new Set());
      }
    } catch {}
  }, [storageKey]);

  const markRead = useCallback((index: number) => {
    setReadSections(prev => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      localStorage.setItem(storageKey, JSON.stringify([...next]));
      return next;
    });
  }, [storageKey]);

  const pct = totalSections > 0 ? Math.round((readSections.size / totalSections) * 100) : 0;
  return { readSections, markRead, pct };
}

interface CourseNotesProps {
  userPlan: 'basic' | 'plus' | 'pro' | null;
  userId?: string;
}

export default function CourseNotesComplete({ userPlan, userId }: CourseNotesProps) {
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
      title: "Introduction: Before You Begin",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Who We Are</h3>
            <div className="space-y-4 text-base text-[#2C2E3A] leading-7">
              <p><strong className="text-[#141619]">Ashwini</strong> - Software Developer at a MAANG company, LinkedIn creator, and career coach. Built a LinkedIn following of 50,000+ from scratch by applying everything taught in this course.</p>
              <p><strong className="text-[#141619]">Ronak</strong> - Building: ownURgrowth, manages the business, operations, and strategy behind Ashwini's LinkedIn presence and many other creators. Has worked hands-on with brand collaborations, content strategy, and audience growth.</p>
              <p className="italic text-[#1D4ED8] font-medium">This course is not theory from a textbook - everything here is tried, tested, and proven on a real LinkedIn account.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">What This Course Is (And What It Isn't)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-[#141619] mb-4">What it IS:</h4>
                <ul className="text-base text-[#2C2E3A] space-y-3 leading-7">
                  <li>A short, crisp, no-fluff crash course</li>
                  <li>Pure tactics and learnings - only what actually works</li>
                  <li>Tried and tested strategies from a real creator who has done it</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-[#141619] mb-4">What it is NOT:</h4>
                <ul className="text-base text-[#2C2E3A] space-y-3 leading-7">
                  <li>A long, boring, padded-out course</li>
                  <li>Generic LinkedIn advice you've already heard</li>
                  <li>Theory with no practical application</li>
                </ul>
              </div>
            </div>
            <p className="text-base text-[#2C2E3A] italic mt-6 leading-7">The biggest mistake most people make with online courses is consuming without implementing. This course is designed to be short enough that you have no excuse not to finish it and detailed enough that you can act on it immediately.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">How to Use This Guide</h3>
            <div className="text-base text-[#2C2E3A] space-y-4 leading-7">
              <p><strong>These notes are designed to be a complete standalone guide</strong> - even if you haven't watched the video, reading this cover to cover will give you 100% of the knowledge.</p>
              <p><strong>Use the Index</strong> - The guide is divided into clear sections. Jump directly to what's most relevant to you right now.</p>
              <p><strong>While watching the video</strong> - Note down one liner notes of whatever resonates. Your own handwritten notes will reinforce learning.</p>
              <p><strong>Come back to this PDF</strong> - Bookmark it. Every time you sit down to create LinkedIn content or work on your profile, treat this as your reference manual.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Additional Insight</h3>
            <p className="text-base text-[#2C2E3A] leading-7">Research shows that people retain only 10% of what they read passively but up to 70% when they take notes and apply concepts immediately. That's exactly why this course pairs a video with detailed written notes, use both.</p>
          </div>

          <div className="border-l-4 border-[#1D4ED8] pl-6">
            <h3 className="text-2xl font-bold text-[#1D4ED8] mb-6">The Promise</h3>
            <p className="text-base text-[#2C2E3A] font-medium leading-7">If you read these notes thoroughly and apply what's inside, you will see real, measurable growth on LinkedIn. No fluff. No filler. Just results.</p>
          </div>
        </div>
      )
    },
    {
      title: "Why LinkedIn & Why Now?",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Opportunity Most People Will Miss!</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Every few years, a platform emerges that gives ordinary people an extraordinary opportunity to build visibility and credibility through content alone. YouTube in 2016. TikTok in 2020. The people who recognised those windows early built audiences and careers that most people now look at from the outside and wish they had been a part of.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">LinkedIn is that window right now. Organic reach is still high, consistent creators still stand out, and the algorithm actively rewards people who show up regularly. Three years from now, the people who started today will be the ones others wish they had followed earlier.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">The question is not whether LinkedIn is worth your time, it is whether you can afford to wait any longer.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">It Does Not Matter Where You Are Starting From!</h3>
            <p className="text-base text-[#2C2E3A] leading-7">LinkedIn levels the playing field in a way very few platforms do. Your college tier, your city, and your starting follower count are all irrelevant. What matters is whether you show up consistently and share value. Everyone gets the same algorithm, the same reach potential, and the same access to recruiters, decision-makers, and industry leaders.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Visibility Beats Everything!</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Consider two students. Same college. Same city. Both build equally impressive projects. The only difference is LinkedIn presence.</p>
            
            <div className="bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-6 mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-base">
                  <thead>
                    <tr className="border-b border-[#1D4ED8]/20">
                      <th className="text-left py-3 px-4 font-semibold text-[#141619]"></th>
                      <th className="text-left py-3 px-4 font-semibold text-[#141619]">Student A</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#141619]">Student B</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#2C2E3A]">
                    <tr className="border-b border-[#1D4ED8]/10">
                      <td className="py-3 px-4 font-medium">LinkedIn Activity</td>
                      <td className="py-3 px-4">Actively posts and builds industry connections</td>
                      <td className="py-3 px-4">Not active on LinkedIn</td>
                    </tr>
                    <tr className="border-b border-[#1D4ED8]/10">
                      <td className="py-3 px-4 font-medium">Project Visibility</td>
                      <td className="py-3 px-4">Reaches hundreds of professionals including recruiters</td>
                      <td className="py-3 px-4">Reaches only college professors and friends</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Outcome</td>
                      <td className="py-3 px-4 text-green-700 font-medium">Gets messages, appreciation, and lands an internship</td>
                      <td className="py-3 px-4 text-red-700 font-medium">Gets congratulated and asked for a party</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Same talent. Same project. Same effort. Completely different outcomes because of visibility alone. This is what a personal brand does. It takes the work you are already doing and puts it in front of people who can change your life.</p>
            <p className="text-base text-[#2C2E3A] italic leading-7"><strong>Additional Insight:</strong> Recruiters today do not wait for resumes. They actively search LinkedIn for candidates. An active, well-optimised profile means opportunities come to you rather than you chasing them.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">What LinkedIn Can Do For You?</h3>
            <div className="space-y-4 text-base text-[#2C2E3A] leading-7">
              <p><strong className="text-[#141619]">Students</strong> - Build a visible body of work before graduation. Land internships, referrals, and recruiter outreach while your peers are not even thinking about it yet.</p>
              <p><strong className="text-[#141619]">Working Professionals</strong> - Accelerate promotions, attract inbound job opportunities, and build industry credibility that compounds over time.</p>
              <p><strong className="text-[#141619]">Business Owners and Freelancers</strong> - Generate high quality leads and sales organically, without a paid ads budget, from an audience that is already in a professional and business mindset.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Effort Reality</h3>
            <p className="text-base text-[#2C2E3A] leading-7">LinkedIn requires far less effort than people assume. A well-written post takes 15 to 20 minutes. No video editing, no production setup, no design required. A single post can reach thousands of the right people - recruiters, founders, clients, and industry peers without spending a single rupee. The effort-to-impact ratio on LinkedIn is higher than any other professional platform today.</p>
          </div>

          <div className="border-l-4 border-[#1D4ED8] pl-6">
            <h3 className="text-2xl font-bold text-[#1D4ED8] mb-6">Section Action Checklist</h3>
            <div className="space-y-3 text-base text-[#2C2E3A] leading-7">
              <p>Write down in one line what you personally want from LinkedIn - a job, internship, clients, or credibility. This is your north star for the entire course.</p>
              <p>Find one person in your field who has built a strong LinkedIn presence. Spend 10 minutes studying their profile and content. This is what is possible for you.</p>
              <p>If you do not have a LinkedIn account yet, create one before moving to the next section.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Building a Profile That Works For You!",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Your Profile is Your Storefront</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Before anyone reads a single post you write, before anyone decides to connect with you or respond to your message, they see your profile. Think of it exactly like a storefront. A well-designed, clear storefront pulls people in. A neglected or confusing one makes people walk past without a second thought.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">One simple rule governs everything about your LinkedIn profile: what is seen is what gets noticed, and what gets noticed is what gets results. Every element of your profile is either working for you or working against you. There is no neutral ground.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Two Elements People See Before Opening Your Profile!</h3>
            <p className="text-base text-[#2C2E3A] leading-7">When you send a connection request or a message to someone, they see exactly two things before they even click on your name, your profile photo and your headline. These two elements alone determine whether people engage with you or ignore you. Getting them right is non-negotiable.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Profile Photo - The First Impression You Cannot Take Back</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Your profile photo does not need to be a studio shoot. It needs to look professional and approachable. Here is a simple framework to get it right:</p>
            
            <div className="bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-6 mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-base">
                  <thead>
                    <tr className="border-b border-[#1D4ED8]/20">
                      <th className="text-left py-3 px-4 font-semibold text-[#141619]">What To Do</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#141619]">What To Avoid</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#2C2E3A]">
                    <tr className="border-b border-[#1D4ED8]/10">
                      <td className="py-3 px-4">Use a clear, well-lit photo</td>
                      <td className="py-3 px-4">Dark, blurry, or low quality images</td>
                    </tr>
                    <tr className="border-b border-[#1D4ED8]/10">
                      <td className="py-3 px-4">Frame from waist to head</td>
                      <td className="py-3 px-4">Full body shots where your face is too small</td>
                    </tr>
                    <tr className="border-b border-[#1D4ED8]/10">
                      <td className="py-3 px-4">Keep it professional or smart casual</td>
                      <td className="py-3 px-4">Party photos, group photos, or heavily filtered images</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Plain or simple background</td>
                      <td className="py-3 px-4">Cluttered or distracting backgrounds</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-base text-[#2C2E3A] leading-7">If you do not have a professional photo, a clean, well-lit casual photo is perfectly fine. The priority is clarity and approachability. People should be able to see your face clearly and feel comfortable reaching out to you.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Headline - Your One Line Pitch</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Your headline is the single most important line on your profile. It follows your name everywhere on LinkedIn - in search results, connection requests, comments, and messages. Most people waste it by writing their job title alone. That is a missed opportunity.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">A strong headline follows this structure:</p>
            <div className="bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-2xl p-4 mb-4">
              <p className="text-lg font-medium text-[#1D4ED8] text-center">What you do + Who you help + What outcome you deliver</p>
            </div>
            <p className="text-base text-[#2C2E3A] italic leading-7"><strong>Additional Insight:</strong> Think of your headline as a billboard that has one second to make an impression. It should immediately tell a stranger who you are, who you serve, and why they should care. Vague headlines like "Student at XYZ University" or "Looking for Opportunities" tell people nothing and convert nobody.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The About Section - Your Story, Not Your Resume</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">The About section is where most people either copy-paste their resume or leave it blank. Both are wrong. This section is your opportunity to tell your story in your own voice - where you come from, what you care about, what you are building, and how you can help the person reading it.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Write it like you are talking to someone, not filing a form. It should feel human, not corporate.</p>
            <p className="text-base text-[#2C2E3A] italic leading-7"><strong>Pro Tip:</strong> Writing a compelling About section from scratch can feel overwhelming. In the resources section of this course, a ready-to-use AI prompt has been provided. Paste your details into that prompt, run it through any AI tool, and you will have a strong About section draft within minutes. Refine it to match your voice and you are done.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Experience and Skills - Show Impact, Not Just Activity</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">These sections cannot be auto-generated and require your personal input. However, how you fill them makes a significant difference.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4"><strong className="text-[#141619]">If you are a student:</strong> Add everything. Every project, internship, freelance work, college club role, competition, or volunteer experience counts. At this stage, showing initiative and range matters more than having a polished corporate track record.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6"><strong className="text-[#141619]">If you are a working professional:</strong> Do not just list responsibilities. Anyone can write "managed a team" or "worked on product launches." What sets you apart is showing the impact you created. Numbers, outcomes, and results are what make experience sections memorable.</p>
            
            <div className="bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-6 mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-base">
                  <thead>
                    <tr className="border-b border-[#1D4ED8]/20">
                      <th className="text-left py-3 px-4 font-semibold text-red-700">Weak Entry</th>
                      <th className="text-left py-3 px-4 font-semibold text-green-700">Strong Entry</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#2C2E3A]">
                    <tr className="border-b border-[#1D4ED8]/10">
                      <td className="py-3 px-4">Managed social media accounts</td>
                      <td className="py-3 px-4">Grew LinkedIn page from 2K to 45K followers in 18 months through organic content strategy</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Worked on backend development</td>
                      <td className="py-3 px-4">Reduced API response time by 40% through query optimisation, improving user experience for 10K+ daily active users</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Profile Photo and Cover Image - Keep It Simple</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">For both your profile photo and cover image, Canva is all you need. Do not overthink the design. Keep it clean and simple.</p>
            <p className="text-base text-[#2C2E3A] leading-7">Your cover image has one job - to reinforce what you do or what you want people to know about you at a glance. If you are a developer, it could reference your tech stack or a project. If you are a coach or creator, it could state what you help people with. One clear message is enough.</p>
          </div>

          <div className="border-l-4 border-[#1D4ED8] pl-6">
            <h3 className="text-2xl font-bold text-[#1D4ED8] mb-6">Section Action Checklist</h3>
            <div className="space-y-3 text-base text-[#2C2E3A] leading-7">
              <p>Update your profile photo - clear, well-lit, face visible, waist to head framing.</p>
              <p>Rewrite your headline - what you do, who you help, what outcome you deliver.</p>
              <p>Write your About section using the AI prompt in the resources section.</p>
              <p>Update your Experience section - students add everything, professionals show impact not just responsibilities.</p>
              <p>Design your cover image on Canva - one clear message, keep it simple.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Network is the Real Net Worth!",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Why Networking Changes Everything?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">There is a reason the phrase "network is the real net worth" has become a universal truth in the professional world. The opportunities that change your life rarely come from job portals or cold applications. They come from people - someone who remembers your name, someone who saw your post, someone you helped six months ago who now knows exactly who to call.</p>
            <p className="text-base text-[#2C2E3A] leading-7">LinkedIn accelerates this process faster than any other platform. It removes the barriers that would otherwise make certain people completely inaccessible to you. The CEO of a company you admire, a co-founder building something in your space, a CFO who has walked the exact path you want to walk on LinkedIn, one thoughtful message is all that stands between you and a real conversation with any of them. That access simply does not exist anywhere else.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">What Genuine Networking Actually Looks Like?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Networking is not collecting connections like trophies. It is building real, two-way relationships where value flows in both directions. The mindset shift that makes all the difference is this - lead with giving, not asking.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Comment genuinely on people's posts. Share something useful. Celebrate someone's win publicly. Help without expecting anything in return. These small actions compound over time into a reputation, and that reputation becomes the reason people think of you when opportunities arise.</p>
            <p className="text-base text-[#2C2E3A] italic leading-7"><strong>Additional Insight:</strong> The most powerful professional relationships are built slowly and naturally, not through a single cold message asking for a favour. Engage with someone's content consistently for a few weeks before reaching out directly. By the time you do, you are not a stranger - you are already a familiar face.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Numbers Game Framework</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Networking on LinkedIn is a numbers game, and the math is brutally honest. The average response rate on cold outreach is less than 5%. Reaching out to 2 or 3 people and hearing nothing back is completely normal - it is not a reflection of you, it is just the reality of cold outreach.</p>
            <div className="bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-2xl p-6 mb-4">
              <div className="space-y-3 text-base text-[#2C2E3A]">
                <p>To get <strong className="text-[#1D4ED8]">1 meaningful reply</strong>, reach out to at least <strong>15 to 20 people</strong>.</p>
                <p>To get <strong className="text-[#1D4ED8]">4 to 5 real conversations</strong> going, you need to be reaching out to <strong>100 or more people</strong> consistently.</p>
                <p className="text-[#1D4ED8] font-medium">Before you question the process, increase your effort.</p>
              </div>
            </div>
            <p className="text-base text-[#2C2E3A] italic leading-7"><strong>Pro Tip:</strong> Personalise every connection request with a short note. Two sentences explaining who you are and why you want to connect is enough to dramatically increase your acceptance rate over blank requests.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">What Becomes Possible When You Build in Public!</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">When you are active and visible on LinkedIn, inbound opportunities start replacing outbound effort over time. Companies reach out to you even when you are not looking. Collaborations find you. People refer you for opportunities without you even asking.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">This is not luck, it is the compounding result of showing up consistently and building genuine relationships over time.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">The earlier you start, the more powerful this compounding becomes.</p>
          </div>

          <div className="border-l-4 border-[#1D4ED8] pl-6">
            <h3 className="text-2xl font-bold text-[#1D4ED8] mb-6">Section Action Checklist</h3>
            <div className="space-y-3 text-base text-[#2C2E3A] leading-7">
              <p>Send connection requests to at least 15 relevant people today - seniors, peers, or professionals in your target industry.</p>
              <p>Write a short personalised note with every request. Two sentences is enough.</p>
              <p>Engage genuinely on at least 15 people's posts today - a thoughtful comment goes further than a like.</p>
              <p>Identify 5 people you genuinely admire in your field and start engaging with their content before reaching out directly.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Building and Managing Connections the Right Way!",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Harsh Truth About Everyone's Inbox</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Every active LinkedIn user gets flooded with connection requests and messages daily. Recruiters, founders, senior professionals, none of them have the time to read every DM or accept every request. This is not pessimism, it is reality. And it means that if your message looks like every other message in their inbox, it will be ignored like every other message in their inbox.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">The only way to cut through is to stand out. And the only way to stand out is through personalisation.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">What Not To Do - The Messages That Never Work</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">These are the two most common messages sent on LinkedIn every single day, and they almost never get a response:</p>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <ul className="text-base text-red-700 space-y-2">
                <li>"I saw the JD, can you refer me?"</li>
                <li>"I am open to work, does your company have any vacancy?"</li>
              </ul>
            </div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">These messages fail for a simple reason: they are entirely about what you want, with zero consideration for the person receiving them. There is no context, no connection, and no reason for the other person to take time out of their day to help a complete stranger.</p>
            <p className="text-base text-[#2C2E3A] leading-7 font-medium">Sending these messages is not just ineffective, it actively creates a poor first impression that is very hard to recover from.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Personalisation Framework</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Every message you send should make the recipient feel like it was written specifically for them, because it should be. Before reaching out to anyone, spend five minutes on their profile. Read their posts. Understand what they care about. Find a genuine point of connection.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">A personalised message does not need to be long. It needs to show that you have done your homework and that you see them as a person, not just a means to an end.</p>
            
            <div className="bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-6 mb-6">
              <h4 className="text-lg font-semibold text-[#141619] mb-4">Structure every outreach message around three things:</h4>
              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-[#1D4ED8]">Observation</span>
                  <span className="text-[#2C2E3A]"> - Something specific you noticed about their work, their post, or their journey.</span>
                </div>
                <div>
                  <span className="font-semibold text-[#1D4ED8]">Connection</span>
                  <span className="text-[#2C2E3A]"> - Why it resonated with you or how it relates to your own path.</span>
                </div>
                <div>
                  <span className="font-semibold text-[#1D4ED8]">Ask</span>
                  <span className="text-[#2C2E3A]"> - A clear, reasonable, and specific request. Not "can you help me" but exactly what kind of help you are looking for.</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-base text-yellow-800"><strong>Pro Tip:</strong> If writing personalised messages feels difficult, use an AI tool to help you draft them. The resources section of this course includes ready-to-use prompts specifically built for LinkedIn outreach. Paste the person's profile details into the prompt and use the output as a starting draft, then refine it in your own voice before sending.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The HR Story - How Strategic Outreach Actually Works</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">This is a real example of what separates people who get results from people who give up. There was a company worth applying to, and the HR's LinkedIn profile was available. A message was sent - a normal, standard message. No response. Most people would stop there.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Instead of stopping, the HR's profile was studied properly. It turned out she had written a book. Her interests and perspective were researched using an AI tool to get a quick but informed understanding of her work. A second message was sent - not asking for a referral, but asking a genuine, thoughtful question about her book and her perspective on the subject.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4"><strong>She replied.</strong></p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">A real conversation followed. Trust and rapport were built naturally over that exchange. Only after a genuine connection had been established was the referral request made. The result was an interview call.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">The lesson is not complicated. People help people they like and trust. Relationship always comes before the ask. If you lead with what you want, you will almost always be ignored. If you lead with genuine interest in the other person, doors open.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">When Placements Are Around the Corner - Be Shameless About It!</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">When time is running out and you genuinely need referrals or responses, normal rules of hesitation do not apply. Here is what to do:</p>
            
            <div className="space-y-4 mb-6">
              <p className="text-base text-[#2C2E3A] leading-7"><strong>If you have the budget,</strong> invest in LinkedIn Premium for a month or two. It allows you to directly message people you are not connected with, which dramatically expands your reach during a critical window.</p>
              
              <p className="text-base text-[#2C2E3A] leading-7"><strong>If budget is a constraint,</strong> use comments. Find the posts of the people you want to reach, and leave genuine, thoughtful, professional comments consistently. This puts your name in front of them repeatedly without requiring them to open a DM. Over time, you become a familiar face, and your eventual message lands very differently than a cold outreach from a stranger.</p>
              
              <p className="text-base text-[#2C2E3A] leading-7">When placements are on the line, stop worrying about what people think of you for following up or reaching out multiple times. Your job is to get results. Be strategic, be persistent, and keep going.</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-base text-blue-800"><strong>Additional Insight:</strong> Following up is not desperation - it is professionalism. Most positive responses on LinkedIn come after the second or third touchpoint, not the first. A short, polite follow-up message three to five days after your initial outreach can double your response rate.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Section Action Checklist</h3>
            <div className="bg-gradient-to-br from-white/95 to-green-50/30 border-2 border-green-500/20 rounded-3xl p-6">
              <ul className="text-base text-[#2C2E3A] space-y-3 leading-7">
                <li>✓ Go through your pending or recent outreach messages and identify which ones were generic. Rewrite at least one using the Observation, Connection, Ask framework.</li>
                <li>✓ Pick one person you really want to connect with. Spend five minutes on their profile, find something genuine to reference, and send a personalised message today.</li>
                <li>✓ If placements or a job search is active right now, start commenting genuinely on posts from people at your target companies every day this week.</li>
                <li>✓ Use the outreach prompts in the resources section to draft your next three personalised messages.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Growing and Deepening Your Connections!",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Your Purpose Was Fulfilled - Now What?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Most people treat LinkedIn connections transactionally. They reach out, get what they need, and move on. And while there is nothing wrong with having a clear purpose behind an outreach, leaving the relationship there is one of the biggest missed opportunities on the platform.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">The people who build truly powerful networks are the ones who see every new connection not as a transaction completed, but as a relationship started. One conversation, handled well, can turn into a mentor, a collaborator, a referral source, or a genuine friend.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">But only if you choose to nurture it beyond the initial ask.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Three Levels of Engagement</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Once you are connected with someone, there are three ways you can choose to engage with them. Each level produces a different quality of relationship.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-50/80 to-red-100/40 border-2 border-red-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-red-700 mb-4">Level 1 - Passive Engagement</h4>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">This is where most people live. You open LinkedIn when you have time, occasionally reply to messages, sometimes comment on a post, and mostly show up only when you need something. You are somewhat visible to this person but not memorable.</p>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">Think of this as the starting phase - the relationship exists but has not really begun yet.</p>
                <p className="text-base text-red-600 font-medium leading-7">This level keeps the door open but does not move you forward.</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Level 2 - Active Engagement</h4>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">This is where real relationships are built. Active engagement means you are consistently and intentionally adding value to the other person's professional life.</p>
                
                <div className="mb-4">
                  <h5 className="text-lg font-semibold text-[#141619] mb-3">What this looks like in practice:</h5>
                  <ul className="text-base text-[#2C2E3A] space-y-2 leading-7 ml-4">
                    <li>• Sharing their posts within your network when the content is genuinely good</li>
                    <li>• Reposting their work with a thoughtful comment that adds to the conversation</li>
                    <li>• Regularly leaving meaningful comments on their posts, not just "great post" but something that shows you actually read and thought about what they shared</li>
                    <li>• Sending them articles, opportunities, or content that is relevant to their interests or work, with no agenda attached</li>
                  </ul>
                </div>
                
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">The key word here is <strong>value</strong>. Every interaction at this level should make the other person's professional life slightly better. That consistency is what builds trust and moves you from a name in their inbox to someone they actually think about.</p>
                
                <div className="bg-blue-100 border-l-4 border-blue-400 p-4 mt-4">
                  <p className="text-base text-blue-800"><strong>Additional Insight:</strong> People remember how you made them feel, not what you said. Consistently showing up for someone without asking for anything in return is the single fastest way to build genuine professional goodwill. When you eventually need something, you will not feel like a stranger asking for a favour - you will feel like a trusted contact making a reasonable request.</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-green-700 mb-4">Level 3 - Deep Engagement</h4>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">Deep engagement is friendship, plain and simple. This is the stage where professional boundaries fade and you are having real conversations about life, work, experiences, challenges, and wins with no agenda behind any of it.</p>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">You are not showing up to add value strategically. You are showing up because you genuinely enjoy talking to this person and care about how they are doing.</p>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">This level cannot be rushed or manufactured. It develops naturally from consistent active engagement over time. But when it happens, these become the relationships that truly change the trajectory of your career and life.</p>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <p className="text-base text-yellow-800"><strong>Pro Tip:</strong> Do not try to force a connection from Level 1 to Level 3 overnight. Respect the natural pace of how relationships develop. Focus on being genuinely useful and present at Level 2, and let the deeper connections emerge on their own.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">A Note on Socialising Skills</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Not everyone finds it easy to keep conversations going or build rapport naturally. That is completely fine. If starting or sustaining professional conversations feels uncomfortable, use AI to help you.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Paste the context of your conversation into an AI tool and ask for suggestions on how to respond or what to say next. It is a skill that develops with practice, and there is no shame in having a little support while you are building it.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">Templates and conversation starters for every stage of engagement are included in the resources section of this course. Use them as a starting point, but always personalise them before sending.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Section Action Checklist</h3>
            <div className="bg-gradient-to-br from-white/95 to-green-50/30 border-2 border-green-500/20 rounded-3xl p-6">
              <ul className="text-base text-[#2C2E3A] space-y-3 leading-7">
                <li>✓ Look at your existing connections and identify three people you want to move from passive to active engagement. Start engaging with their content this week.</li>
                <li>✓ Send one message to a connection with something genuinely useful - an article, an opportunity, or a resource - with no ask attached.</li>
                <li>✓ Identify one connection that has moved to active engagement naturally. Make an effort to have a real, non-transactional conversation with them this week.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Power of Commenting!",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Secret Every Creator Hides</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Here is something most people on LinkedIn do not realise. Creators may not check every DM. They may miss connection requests. But they almost always check their comments. Their public image and reputation matter deeply to them, and comments are where they see exactly what people think about their content and their ideas.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">This one insight, used consistently, is one of the fastest ways to get noticed by people you would otherwise never be able to reach.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Why Commenting Works So Well?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Leaving a meaningful comment on someone's post does two things simultaneously.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">Direct Creator Visibility</h4>
                <p className="text-base text-[#2C2E3A] leading-7">It puts you directly in front of the creator. A thoughtful, well-articulated comment stands out immediately in a sea of "great post" and fire emojis. Creators notice people who genuinely engage with their ideas, and over time, a consistent commenter becomes a familiar and respected name.</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3">Profile Traffic Generation</h4>
                <p className="text-base text-[#2C2E3A] leading-7">It drives traffic to your profile. Comment sections are public, and people read them. When you leave a comment that adds genuine value to the conversation, other readers get curious about who you are. They click on your name, visit your profile, and if your profile is solid, they connect with you.</p>
              </div>
            </div>

            <p className="text-base text-[#2C2E3A] leading-7 mb-4">A single strong comment on a high-visibility post can bring dozens of profile visits without you doing anything else.</p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-base text-yellow-800"><strong>Additional Insight:</strong> Commenting is the most underrated growth strategy on LinkedIn. A post you spend 30 minutes writing might reach a few hundred people when you are starting out. A single sharp comment on a post with high engagement can put your name in front of thousands of the right people within hours.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">What a Good Comment Looks Like?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Not all comments are equal. A comment that drives results is one that adds something to the conversation - a new perspective, a personal experience, a follow-up question, or a piece of context that makes the original post even more valuable for other readers.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-red-700 mb-4">❌ What to Avoid:</h4>
                <ul className="text-base text-red-600 space-y-2 leading-7">
                  <li>• One word reactions</li>
                  <li>• Empty validation like "so true" or "loved this"</li>
                  <li>• Anything that sounds like you are only commenting to be seen</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-green-700 mb-4">✅ What Works:</h4>
                <ul className="text-base text-green-600 space-y-2 leading-7">
                  <li>• Sharing a relevant personal experience</li>
                  <li>• Respectfully adding a point the creator didn't cover</li>
                  <li>• Asking a specific and thoughtful question</li>
                  <li>• Sharing how the post changed or confirmed your thinking</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Section Action Checklist</h3>
            <div className="bg-gradient-to-br from-white/95 to-green-50/30 border-2 border-green-500/20 rounded-3xl p-6">
              <ul className="text-base text-[#2C2E3A] space-y-3 leading-7">
                <li>✓ Identify five creators or professionals in your space whose content you genuinely find valuable. Follow them and turn on post notifications.</li>
                <li>✓ Leave one meaningful, substantive comment on a high-engagement post every single day this week.</li>
                <li>✓ Track your profile visits before and after a week of consistent commenting. The difference will speak for itself.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Content Playbook!",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">LinkedIn Content is Different - Respect That</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">LinkedIn is not Instagram. You cannot post random, low-effort content and expect results. The audience here is professional, the standards are higher, and the content that wins is content that teaches, tells a story, or starts a conversation.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">Keep that as your north star for everything you post.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Content Formats That Work</h3>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">Posts</h4>
                <p className="text-base text-[#2C2E3A] leading-7">A standard LinkedIn post is written text, with an optional image. The image does not need to be perfectly designed or directly related to the topic - a personal photo works just fine. The writing is what matters. This is the lowest-effort format and still one of the highest-performing ones when done well.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3">Carousels</h4>
                <p className="text-base text-[#2C2E3A] leading-7">Carousels on LinkedIn work similarly to Instagram - multiple slides that the reader swipes through. The difference is that LinkedIn carousels need to deliver real value. Data, frameworks, storytelling, step-by-step breakdowns, educational content - these are what make a carousel worth swiping through. They take more time to create than a post, but significantly less time than a reel, and a well-designed, meaningful carousel consistently generates strong reach and impressions.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/40 border-2 border-purple-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-purple-700 mb-3">Videos</h4>
                <p className="text-base text-[#2C2E3A] leading-7">Videos perform well on LinkedIn but require scripting, shooting, and editing. If you have the bandwidth, they are worth exploring. If not, posts and carousels alone are more than enough to build a strong presence.</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
              <p className="text-base text-yellow-800"><strong>Additional Insight:</strong> Do not let format become a barrier to starting. A well-written post with a personal photo will always outperform a beautifully designed carousel with nothing meaningful to say. Lead with substance.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The 6 Content Types That Work on LinkedIn</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">These six content types work regardless of whether you are a student, a working professional, or a business owner. When starting out, do not restrict yourself to one. Try all of them, see what resonates with your audience and what you enjoy creating, and then double down on what works.</p>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-50/80 to-red-100/40 border-2 border-red-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-red-700 mb-4">1. Personal Stories and Lessons Learned</h4>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">This is the single most powerful content type on LinkedIn. Personal stories are relatable, human, and impossible to replicate. They build trust faster than any other format because people connect with people, not information.</p>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">Your story does not need to be extraordinary. A college project that went wrong, a mistake you made in your first month at a job, a rejection that taught you something valuable - these are the stories that get people nodding and sharing.</p>
                <div className="bg-red-100 p-4 rounded-lg mt-4">
                  <h5 className="font-semibold text-red-800 mb-2">Examples of strong opening hooks:</h5>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• "Here is what I learned from failing my first startup."</li>
                    <li>• "3 mistakes I made as a new joinee that I wish someone had warned me about."</li>
                    <li>• "I got rejected by 14 companies before landing my dream job. Here is what changed."</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">2. Educational and How-To Content</h4>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">People come to LinkedIn to learn and stay ahead. If you can teach someone something useful in two minutes, you have added real value to their day — and they will remember you for it.</p>
                <p className="text-base text-[#2C2E3A] leading-7">Educational content builds authority and trust faster than almost anything else. Over time, you become the person your audience associates with a particular topic, and that association is what turns followers into opportunities.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-green-700 mb-4">3. Industry Insights and Opinions</h4>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">Opinions are one of the most underused content strategies on LinkedIn, and one of the most effective. Pick a trending topic in your industry, share your honest perspective on it, and watch the comments section come alive.</p>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">When people disagree with you thoughtfully, that is not a problem — that is engagement. Every comment increases your reach. Healthy debate is one of the fastest ways to grow visibility on the platform.</p>
                <p className="text-base text-green-600 font-medium leading-7">The important caveat is to always be professional. A strong opinion is not a controversial rant. It is a well-reasoned perspective that invites discussion.</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50/80 to-yellow-100/40 border-2 border-yellow-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-yellow-700 mb-4">4. Behind the Scenes and Day in the Life</h4>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">This is the easiest content type to produce, especially on days when you have no time or no ideas. Pick a day, document what it actually looks like, and post it. A day in the life as a final year student navigating placements. A day as a product manager. A day as someone who just quit their job to build something.</p>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">People are endlessly curious about how others live and work. This content is low effort, highly relatable, and consistently performs well.</p>
                <p className="text-base text-yellow-600 font-medium leading-7">Use this as your emergency content option - on days when you have nothing else, this keeps your streak alive. And streaks matter.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/40 border-2 border-purple-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-purple-700 mb-4">5. Career Milestones and Wins</h4>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">Got a promotion? Post it. Landed a new job? Post it. Published a research paper, completed a course, got your first client, hit a target, received feedback that made you proud? Post all of it. For reasons that even experienced creators find hard to fully explain, milestone posts perform exceptionally well on LinkedIn.</p>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">The key is not to just announce the win - that gets boring quickly. Pair every milestone with a story or a lesson. What did the journey look like? What did you learn? What would you do differently?</p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <p className="text-base text-yellow-800"><strong>Pro Tip:</strong> Do not wait for big wins. Share small updates, early progress, and work in progress. The audience that watches your journey from the beginning becomes your most loyal and engaged community.</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50/80 to-indigo-100/40 border-2 border-indigo-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-indigo-700 mb-4">6. Questions and Polls</h4>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">Polls are one of the most underrated engagement tools on LinkedIn. A poll forces the reader to stop, think, and make a decision. That active participation is psychologically different from passively reading a post.</p>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">The best polls are slightly tricky. Make your audience genuinely think before answering. Then post the correct answer and a detailed explanation in the comments. This drives people to the comments section, which increases engagement further, which increases reach.</p>
                <p className="text-base text-indigo-600 font-medium leading-7">Tailor your polls to your niche. A tech creator might post a DSA or system design question. A finance creator might post a market scenario. A marketing professional might post a campaign strategy question.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Two Bonus Content Types Worth Knowing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-50/80 to-orange-100/40 border-2 border-orange-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-orange-700 mb-3">Memes</h4>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">LinkedIn memes, when done right, go viral. The rules are simple: keep them professional, keep them relevant to your audience, and keep them relatable to the professional experience.</p>
                <p className="text-base text-orange-600 font-medium leading-7 text-sm">Warning: Use memes strategically and occasionally to boost reach, but always anchor your content strategy in personal brand building.</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50/80 to-pink-100/40 border-2 border-pink-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-pink-700 mb-3">Motivational Content</h4>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">Motivational posts perform consistently well on LinkedIn. You do not need to write them from scratch. Look at what performs well on Instagram in the motivation space, adapt the idea into a LinkedIn-appropriate format, and post it.</p>
                <p className="text-base text-pink-600 font-medium leading-7 text-sm">Use it as a supplement, not a substitute for personal brand content.</p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-[#1D4ED8] pl-6">
            <h3 className="text-2xl font-bold text-[#1D4ED8] mb-6">The Golden Rule of LinkedIn Content</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">LinkedIn rewards content that does one of three things:</p>
            <div className="text-lg font-semibold text-[#1D4ED8] space-y-2 mb-4">
              <p>• Teaches something</p>
              <p>• Tells a story</p>
              <p>• Starts a conversation</p>
            </div>
            <p className="text-base text-[#2C2E3A] font-medium leading-7">Every post you create should do at least one of these. If it does not, rethink it before posting.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">LinkedIn is Not Just for Tech</h3>
            <p className="text-base text-[#2C2E3A] leading-7">This needs to be said clearly. LinkedIn is not a tech-only platform. MBA, CA, finance, marketing, HR, consulting, design, law - every professional niche has an active and growing audience on LinkedIn. Every strategy in this course applies equally regardless of your field. The principles are the same. Only the content topic changes.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Section Action Checklist</h3>
            <div className="bg-gradient-to-br from-white/95 to-green-50/30 border-2 border-green-500/20 rounded-3xl p-6">
              <ul className="text-base text-[#2C2E3A] space-y-3 leading-7">
                <li>✓ Pick two content types from the six listed above that feel most natural to you and commit to trying both this week.</li>
                <li>✓ Write three post ideas right now - one personal story, one educational piece, and one opinion on something happening in your industry.</li>
                <li>✓ Create one poll relevant to your niche and post it. Put the answer and explanation in the comments.</li>
                <li>✓ Save one relatable meme idea for a low-effort day, but make sure your core content that week is personal brand focused.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Execution Playbook",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Structure Behind Every Winning Post</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Whether you are writing a post or building a carousel, the structure is always the same. Three parts, no exceptions:</p>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-red-50/80 to-red-100/40 border-2 border-red-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-red-700 mb-3">Hook</h4>
                <p className="text-base text-[#2C2E3A] leading-7">The first two lines of a post or the first slide of a carousel. This is where you either win or lose your reader.</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">Body</h4>
                <p className="text-base text-[#2C2E3A] leading-7">The core content. The story, the lesson, the data, the opinion. This is where you deliver the value you promised in the hook.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3">Call to Action</h4>
                <p className="text-base text-[#2C2E3A] leading-7">The last line. Tell your reader what to do next. Follow you, comment their thoughts, share the post, answer a question. Never leave them without a next step.</p>
              </div>
            </div>

            <p className="text-base text-[#1D4ED8] font-medium leading-7 mt-6">This structure works because it mirrors how attention works. You earn the read with the hook, you deliver value in the body, and you direct the energy with the CTA. Skip any one of these and the post underperforms.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Hook is Everything!</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">If someone is scrolling through their LinkedIn feed and your first two lines or your first carousel slide do not stop them, they are gone. You have lost them before they even gave you a chance. The entire value of your post - no matter how good the body is - means nothing if the hook does not land.</p>
            
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-base text-red-800 font-medium">This is the one part of your content you should never outsource entirely to AI. Use AI for the body, use it for the carousel slides, use it to structure your ideas - but write the hook yourself, with your audience in mind.</p>
            </div>

            <p className="text-base text-[#2C2E3A] leading-7 mb-4">The difference in impressions between a generic AI-generated hook and one written with genuine understanding of your audience is significant. Tried, tested, and proven.</p>
            
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">On the visual side, remember that the image catches the eye even before the first line of text does. Use a photo that is relevant and relatable to the post. A strong visual hook paired with a strong written hook is the combination that stops the scroll.</p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-base text-yellow-800"><strong>Pro Tip:</strong> Study the first two lines of posts that made you stop scrolling. Save them. Build a personal swipe file of hooks that worked on you and use them as inspiration when you sit down to write.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Batch Your Content - Work Smarter</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">You do not need to sit down every day and think of something to post. That approach leads to burnout, inconsistency, and low-quality content. Instead, batch your content creation.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Set aside one to two hours per week, use AI with the prompts provided in the resources section, and create enough content for the entire week in one sitting. Schedule it out and you are done. This keeps your posting consistent without content creation becoming a daily source of stress.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">As you get more comfortable with the platform, explore beyond what this course covers. The strategies here are your foundation, not your ceiling.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Early Growth Hack</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Here is something most people in the growth space know but rarely talk about openly. LinkedIn reach is driven primarily by two things: shares and comments. You cannot fully control how many people share your post, but you can engineer comments in the early days.</p>
            
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">WhatsApp and Telegram groups exist specifically for this purpose. Creators join these groups, share their posts, and everyone in the group comments on each other's content. This signals to the LinkedIn algorithm that the post is generating engagement, which pushes it to a wider audience organically.</p>
            
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">There is nothing to be ashamed of here. Every major creator used some version of this strategy when they were starting out. Use it until you have a few thousand followers and until you understand the platform well enough to grow on the content's own merit. Then phase it out.</p>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <p className="text-base text-orange-800"><strong>The important caveat:</strong> Know when to stop. LinkedIn is a credibility platform. Artificially inflated engagement that does not match your content quality or follower count raises red flags for brands and potential collaborators. Use it as a launchpad, not a permanent crutch.</p>
            </div>
          </div>

          <div className="border-l-4 border-[#1D4ED8] pl-6">
            <h3 className="text-2xl font-bold text-[#1D4ED8] mb-6">The 60 Day Commitment - The Only Thing That Actually Matters</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Everything in this course works. But it only works if you show up consistently. Here is the commitment being asked of you:</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">For 60 days, post consistently. Try different content types. Study what performed well and why. Recreate the successful formats. Engage with others. Build connections. Follow every strategy laid out in this course without skipping steps.</p>
            <p className="text-base text-[#1D4ED8] font-bold leading-7">If you do all of that for 60 days and see no growth, the course fee comes back to you. That is the confidence behind everything taught here.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Keep It Simple - The Tools You Actually Need</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">There is no need to spend money on tools or subscriptions when you are starting out. Everything you need is free.</p>
            
            <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
              <h4 className="text-lg font-semibold text-green-700 mb-4">Free Tools Stack:</h4>
              <ul className="text-base text-[#2C2E3A] space-y-2 leading-7">
                <li>• <strong>Google Sheets</strong> - Track your content (date, content idea, posted status)</li>
                <li>• <strong>Canva</strong> - All design needs</li>
                <li>• <strong>AI Tools</strong> - Content drafting with provided prompts</li>
              </ul>
              <p className="text-base text-green-600 font-medium leading-7 mt-4">That is it. Simple, free, and effective.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Steal Smart - Learn From What Already Works</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Find the biggest creators in your niche and study their most viral posts. What topics did they cover? What hooks did they use? What format worked? Take those successful frameworks and create your own version around them.</p>
            
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Content that has performed well once will almost always perform well again when recreated with a fresh angle. This is not copying, it is learning from data. Every experienced creator does this.</p>
            
            <p className="text-base text-[#1D4ED8] font-medium leading-7">If you want a shortcut, the resources section of this course includes featured viral posts as a starting point for ideas.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Section Action Checklist</h3>
            <div className="bg-gradient-to-br from-white/95 to-green-50/30 border-2 border-green-500/20 rounded-3xl p-6">
              <ul className="text-base text-[#2C2E3A] space-y-3 leading-7">
                <li>✓ Write your next post using the Hook, Body, CTA structure. Do not post it until all three parts are solid.</li>
                <li>✓ Spend 30 minutes this week writing five hook options for your next five posts. Save the ones that feel strongest.</li>
                <li>✓ Block one to two hours this week for batch content creation. Use the AI prompts in the resources section and create at least five posts in one sitting.</li>
                <li>✓ Find and join one LinkedIn engagement group on WhatsApp or Telegram this week.</li>
                <li>✓ Open a Google Sheet right now and set up your content tracker - date, content, posted. Start filling it in today.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "LinkedIn Newsletters!",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">What is a LinkedIn Newsletter?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">A LinkedIn newsletter is a long-form content feature built directly into LinkedIn that allows you to publish regular editions on a specific topic and build a dedicated subscriber base, all without leaving the platform.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Think of it as your own mini publication. Every time you publish a new edition, every single subscriber receives both an in-app notification and an email directly in their inbox. This is fundamentally different from a regular post, which lives for a day or two in the feed and then disappears.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">A newsletter edition stays permanently on your profile, builds over time into an archive of your expertise, and reaches your audience directly, completely bypassing the algorithm.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Why LinkedIn Newsletter is a Big Deal?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Most content you post on LinkedIn is at the mercy of the algorithm. Whether a post reaches 500 people or 50,000 depends on early engagement, timing, and factors you cannot fully control. A newsletter removes that uncertainty for your most engaged audience. Your subscribers will hear from you every single time you publish, guaranteed.</p>
            
            <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6 mb-4">
              <h4 className="text-lg font-semibold text-blue-700 mb-3">Key Benefits:</h4>
              <ul className="text-base text-[#2C2E3A] space-y-2 leading-7">
                <li>• Direct inbox access - bypasses algorithm completely</li>
                <li>• Google searchable - extends visibility beyond LinkedIn</li>
                <li>• Permanent archive - builds expertise over time</li>
                <li>• Guaranteed reach to subscribers</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-base text-yellow-800"><strong>LinkedIn's Data:</strong> Close to 30 million members subscribed to at least one newsletter in less than six months of the feature going live, showing massive appetite for this format.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Who Should Start a Newsletter & When?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">A newsletter is not a day-one priority. Focus on building your posting habit, growing your connections, and understanding your audience first. Once you have a consistent presence and a clear sense of what topic you want to own, that is when a newsletter starts making sense.</p>
            
            <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
              <h4 className="text-lg font-semibold text-green-700 mb-4">The right time to start is when you can answer these three questions clearly:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">1.</span>
                  <span className="text-[#2C2E3A]">What specific topic will this newsletter cover?</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">2.</span>
                  <span className="text-[#2C2E3A]">Who is it written for?</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">3.</span>
                  <span className="text-[#2C2E3A]">Can you commit to publishing consistently, even once a month?</span>
                </div>
              </div>
              <p className="text-base text-green-600 font-medium leading-7 mt-4">If you cannot answer all three, keep posting regularly until the answers become clear.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">How to Set Up Your LinkedIn Newsletter?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">To access the newsletter feature, you first need to activate Creator Mode in your Creator Hub. The access criteria include having at least 150 connections, sharing content regularly, and following LinkedIn's Professional Community Policies.</p>
            
            <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/40 border-2 border-purple-200/50 rounded-3xl p-6 mb-4">
              <h4 className="text-lg font-semibold text-purple-700 mb-4">Setup Steps (Takes less than 5 minutes):</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <span className="text-[#2C2E3A]">Go to your LinkedIn feed and click "Write Article" at the top of the page</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <span className="text-[#2C2E3A]">In the article writing tool, click "Create a Newsletter"</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <span className="text-[#2C2E3A]">Add your newsletter title, description, publishing frequency, and optional logo</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <span className="text-[#2C2E3A]">Click Done and write your first edition</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-base text-yellow-800"><strong>Pro Tip:</strong> Choose your newsletter title carefully. It should immediately communicate the specific topic and the value a subscriber will get. A clear, specific title attracts the right subscribers and sets accurate expectations from day one.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">What to Write About?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">The most important decision you will make about your newsletter is choosing a focused topic and sticking to it. A newsletter that tries to cover everything ends up being memorable for nothing.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Pick one area where you have genuine knowledge, experience, or a strong perspective. It should be specific enough that a reader knows exactly what they are signing up for, and broad enough that you can sustain it for months without running out of things to say.</p>
            
            <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
              <h4 className="text-lg font-semibold text-green-700 mb-4">Strong Newsletter Topic Examples:</h4>
              <ul className="text-base text-[#2C2E3A] space-y-2 leading-7">
                <li>• A software developer writing weekly about system design concepts explained simply</li>
                <li>• A finance professional writing bi-weekly about personal finance decisions for working professionals in their 20s</li>
                <li>• A marketer writing monthly about what is actually working in content strategy right now</li>
              </ul>
              <p className="text-base text-green-600 font-medium leading-7 mt-4">The more specific your topic, the more loyal your subscriber base will be.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">How Often Should You Publish?</h3>
            <p className="text-base text-[#1D4ED8] font-medium leading-7 mb-4">Consistency matters far more than frequency. A newsletter published once a month without fail is significantly more valuable than one published weekly for a month and then abandoned.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-4">
                <h4 className="text-lg font-semibold text-red-700 mb-2">Weekly</h4>
                <p className="text-sm text-[#2C2E3A]">Works well for timely content - industry news, trends, what happened this week in your space</p>
              </div>
              
              <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-4">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">Bi-weekly</h4>
                <p className="text-sm text-[#2C2E3A]">Works well for educational or analytical content where you need more time to produce something genuinely valuable</p>
              </div>
              
              <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-4">
                <h4 className="text-lg font-semibold text-green-700 mb-2">Monthly</h4>
                <p className="text-sm text-[#2C2E3A]">Works well for deep dives, long-form perspectives, and high-effort editions that require research and thought</p>
              </div>
            </div>

            <p className="text-base text-[#2C2E3A] leading-7">Start with a cadence that is genuinely manageable for you. It is far better to deliver consistently once a month than to promise weekly and miss deadlines. You can always increase frequency as you build the habit.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Growing Your Newsletter Subscribers</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Your first wave of subscribers will come automatically when you publish your first edition - LinkedIn notifies your existing connections and followers. After that, growth depends on a few key habits:</p>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-4">
                <ul className="text-base text-[#2C2E3A] space-y-2 leading-7">
                  <li>• Mention your newsletter in your regular posts occasionally</li>
                  <li>• When you publish a new edition, write a regular post summarising the key insight and link to the full newsletter</li>
                  <li>• Add a link to your newsletter in your LinkedIn profile's Featured section</li>
                  <li>• Cross-promote on other platforms if you are active elsewhere</li>
                  <li>• Engage with every comment on your newsletter editions</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
              <p className="text-base text-blue-800"><strong>Additional Insight:</strong> The single fastest way to grow newsletter subscribers is to make your regular posts so consistently valuable that people want more. A subscriber who found you through a post is already warm - they subscribed because they actively want to hear from you. Focus on post quality and the newsletter growth follows naturally.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">What Makes a Newsletter Worth Subscribing To?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">The newsletters that build large, loyal subscriber bases all share the same core quality - they make the reader feel like they are getting something they cannot get anywhere else. That could be a unique perspective, insider knowledge, simplified explanations of complex topics, or just a voice they genuinely enjoy reading.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">Generic content that rephrases what everyone else is already saying will not hold subscribers. But a newsletter that consistently delivers a fresh, specific, and genuinely useful perspective will grow steadily and compound over time.</p>
          </div>
        </div>
      )
    },
    {
      title: "Making Money on LinkedIn",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Question Everyone is Asking</h3>
            <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-4">
              <p className="text-base text-gray-700 italic leading-7">"Do views on LinkedIn pay money?" "Does a company pay you when you post a job?" "You post so consistently, are you actually earning from this?"</p>
            </div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">These are real questions, and they deserve a straight answer. Here it is: LinkedIn does not pay you for views. There is no ad revenue model like YouTube. No per-impression payout. No monetization dashboard.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">But LinkedIn creators do earn - and some earn very well. The money just comes from a different place.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Where the Money Actually Comes From?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">There are five real monetization channels on LinkedIn, and understanding all five is important because most creators only ever discover one or two.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-green-700 mb-3">1. Sponsored Posts</h4>
                <p className="text-base text-[#2C2E3A] leading-7">A brand pays you to promote their product or service through your content. You create a post, in your own voice, on your own profile that highlights the brand in a way that is relevant and valuable to your audience. This is the most common and most visible form of LinkedIn monetization.</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-3">2. Brand Collaborations</h4>
                <p className="text-base text-[#2C2E3A] leading-7">These are longer-term or campaign-based partnerships where you work with a brand across multiple posts or activities over a period of time. Instead of a single post, you become part of their marketing campaign. These deals are typically higher value than one-off sponsored posts and build a more sustainable income stream.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/40 border-2 border-purple-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-purple-700 mb-3">3. Consulting</h4>
                <p className="text-base text-[#2C2E3A] leading-7">As your expertise becomes visible through your content, people begin to trust your knowledge and judgment. At a certain point, individuals and companies will approach you or you can proactively offer to hire you for consulting, strategy, or guidance in your area of expertise. Your LinkedIn presence is essentially a live portfolio of your thinking that makes this possible.</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50/80 to-orange-100/40 border-2 border-orange-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-orange-700 mb-3">4. Services</h4>
                <p className="text-base text-[#2C2E3A] leading-7">LinkedIn allows you to list services directly on your profile. Resume building, career coaching, marketing strategy, design, development, financial planning - whatever your skill is, your LinkedIn audience is a built-in market for it. Platforms like Topmate make it easy to set up paid calls and sessions that you can promote directly through your content.</p>
              </div>

              <div className="bg-gradient-to-br from-red-50/80 to-red-100/40 border-2 border-red-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-red-700 mb-3">5. Inbound Leads and Opportunities</h4>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">This is the most underrated monetization channel. When your content consistently delivers value, people reach out. Job offers, freelance projects, business partnerships, client inquiries - these come to you without you ever pitching.</p>
                <p className="text-base text-red-600 font-medium leading-7">Your content does the selling for you, passively and continuously.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">How to Get Your First Sponsored Post?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">The biggest mistake creators make is waiting for brands to come to them. At the beginning, you have to go to the brands. Here is exactly how to approach it strategically.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-4">Mine Your Own Network First</h4>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">Look at your existing connections and see who has done brand collaborations. Reach out to them - not just to ask for a contact, but to have a genuine conversation. Ask them:</p>
                <ul className="text-base text-[#2C2E3A] space-y-2 leading-7 ml-4">
                  <li>• Who was the contact at the brand and how did they reach them?</li>
                  <li>• What was the timeline from pitch to payment?</li>
                  <li>• Did they write the content themselves or did the brand provide a script?</li>
                  <li>• What did the brand actually expect in return - impressions, signups, leads?</li>
                  <li>• How did they report results - screenshots, analytics PDF?</li>
                  <li>• How long did payment take to come through?</li>
                </ul>
                <p className="text-base text-blue-600 font-medium leading-7 mt-4">Nobody shares these details publicly, but within a genuine relationship, people are surprisingly open. This information is worth more than any course or playbook because it is real, first-hand experience.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-green-700 mb-4">Find Brands Through Instagram</h4>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">This is one of the most effective and underused tactics for LinkedIn brand deals. Scroll through Instagram reels and identify brands that are actively running influencer campaigns. If a brand is spending money on Instagram creators, they have a budget for influencer marketing.</p>
                <p className="text-base text-[#2C2E3A] leading-7 mb-4">Research the brand, assess whether their product or service is relevant to your LinkedIn audience, and pitch them for a LinkedIn collaboration. Many brands have never been approached this way, which means you are entering a conversation with very little competition.</p>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <p className="text-base text-yellow-800"><strong>Pro Tip:</strong> When you pitch a brand, lead with your audience. Tell them who follows you, what they care about, and why this brand's product is a natural fit for that audience. A pitch that centres the brand's benefit will always convert better than one that centres your follower count.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Seasonal Campaigns - The Highest Conversion Window</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">This is a golden opportunity that most creators miss entirely. Brands plan their biggest marketing campaigns around key sales periods - Black Friday, New Year, Republic Day, Independence Day, Christmas, Valentine's Day, and similar high-spend dates.</p>
            
            <div className="bg-gradient-to-br from-orange-50/80 to-orange-100/40 border-2 border-orange-200/50 rounded-3xl p-6">
              <h4 className="text-lg font-semibold text-orange-700 mb-4">The Critical Insight:</h4>
              <p className="text-base text-[#2C2E3A] leading-7 mb-4">Approach brands two to three weeks before these dates, not on them. By the time the date arrives, campaign budgets have already been allocated and decisions have already been made.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-100 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">✅ Reach Out Early</h5>
                  <p className="text-sm text-green-700">You are part of the planning conversation</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg">
                  <h5 className="font-semibold text-red-800 mb-2">❌ Reach Out Late</h5>
                  <p className="text-sm text-red-700">You are told the budget is finished</p>
                </div>
              </div>
              <p className="text-base text-orange-600 font-medium leading-7 mt-4">Mark these dates in your calendar and build your outreach calendar around them. Consistent seasonal outreach, done early, significantly increases your conversion rate on brand deal pitches.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Protecting Yourself - What Brands Sometimes Do</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">This needs to be said clearly because it is a real part of working with brands that nobody talks about openly enough.</p>
            
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <h4 className="text-lg font-semibold text-red-700 mb-3">Common Brand Tactics:</h4>
              <ul className="text-base text-red-600 space-y-2 leading-7">
                <li>• Some brands will delay payment beyond agreed timelines</li>
                <li>• Some will try to negotiate terms after content has been delivered</li>
                <li>• Some will offer prolonged barter arrangements instead of cash</li>
              </ul>
              <p className="text-base text-red-600 font-medium leading-7 mt-3">These are tactics, not accidents.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-4">Protection Strategy:</h4>
              <ul className="text-base text-[#2C2E3A] space-y-2 leading-7 mb-4">
                <li>• Have your terms in writing before creating any content</li>
                <li>• Agree on deliverables, timeline, payment amount, and payment date in email</li>
                <li>• When payment is delayed, follow up consistently and professionally</li>
                <li>• Keep records of every message and email exchange</li>
              </ul>
              <p className="text-base text-blue-600 font-medium leading-7">Being firm on your terms is not rude - it is professional. The discomfort of having a direct conversation about money upfront is far smaller than the difficulty of chasing delayed payments after the work is done.</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
              <p className="text-base text-yellow-800"><strong>Additional Insight:</strong> As you build your track record with brand collaborations, create a simple one-page media kit. Include your follower count, average impressions, audience demographics, content niches, and past brand partnerships. This makes you look credible and prepared, and gives brands everything they need to make a decision quickly.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Building Relationships With Brands</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">The most valuable brand deals are not one-off posts. They are long-term partnerships built on trust, consistent delivery, and genuine alignment between your audience and the brand's product.</p>
            
            <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6 mb-4">
              <h4 className="text-lg font-semibold text-green-700 mb-4">Relationship Building Strategy:</h4>
              <ul className="text-base text-[#2C2E3A] space-y-2 leading-7">
                <li>• Treat every brand collaboration as the beginning of a relationship, not a transaction</li>
                <li>• Deliver beyond what was agreed</li>
                <li>• Share the results proactively</li>
                <li>• Stay in touch after the campaign ends</li>
              </ul>
            </div>

            <p className="text-base text-[#2C2E3A] leading-7 mb-4">The brands that see strong results from working with you will come back and they will refer you to other brands in their network.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">Networking with other creators in the monetization space works the same way it does in every other area of LinkedIn growth. The creators who share information, support each other's pitches, and build genuine relationships with each other collectively create more opportunities for everyone.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Section Action Checklist</h3>
            <div className="bg-gradient-to-br from-white/95 to-green-50/30 border-2 border-green-500/20 rounded-3xl p-6">
              <ul className="text-base text-[#2C2E3A] space-y-3 leading-7">
                <li>✓ List three skills or areas of expertise that you could offer as a service or consulting on LinkedIn today. Add them to your profile's Services section.</li>
                <li>✓ Identify five creators in your niche who have done brand collaborations. Reach out to at least two of them for a genuine conversation about their experience.</li>
                <li>✓ Scroll through Instagram reels this week and note down three brands whose products are relevant to your LinkedIn audience. Research each one and draft a basic outreach pitch.</li>
                <li>✓ Mark the next two major seasonal sales dates in your calendar and set a reminder to begin brand outreach two to three weeks before each one.</li>
                <li>✓ Draft a simple media kit with your current stats, follower count, average impressions, audience type, and content niche. Update it every month.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Business of LinkedIn",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Your Media Kit - The Foundation of Every Pitch</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">"Here is my profile, have a look" is not a pitch. A professional creator comes prepared, and that preparation starts with a media kit - a clean, one-page document that gives a brand everything they need to make a decision quickly.</p>
            
            <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6 mb-4">
              <h4 className="text-lg font-semibold text-blue-700 mb-4">Your media kit should include these eight elements:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-blue-600">1. Total Followers</span>
                    <p className="text-sm text-[#2C2E3A]">Current followers count on LinkedIn and other relevant platforms</p>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">2. Average Impressions Per Post</span>
                    <p className="text-sm text-[#2C2E3A]">How many people your content typically reaches - the number brands care about most</p>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">3. Engagement Rate</span>
                    <p className="text-sm text-[#2C2E3A]">Percentage of audience that actively likes, comments, or shares</p>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">4. Audience Breakdown</span>
                    <p className="text-sm text-[#2C2E3A]">Geography, professional stage, industry demographics</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-blue-600">5. Top Performing Posts</span>
                    <p className="text-sm text-[#2C2E3A]">Two or three best posts as proof of performance</p>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">6. Past Collaborations</span>
                    <p className="text-sm text-[#2C2E3A]">Brands you've worked with (credibility by association)</p>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">7. Clear Niche</span>
                    <p className="text-sm text-[#2C2E3A]">Exactly what topic you create content around</p>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">8. Contact Details</span>
                    <p className="text-sm text-[#2C2E3A]">Make it effortless for brands to reach you</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-base text-yellow-800"><strong>Pro Tip:</strong> Keep your media kit updated every month. As your numbers grow, your pricing power grows with them. A stale media kit with outdated numbers undersells you.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Think Like a Marketer, Not Just a Creator</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Here is the mindset shift that separates creators who close deals consistently from those who struggle to get responses. Brands do not care about your follower count in isolation. They care about return on investment. Every rupee they spend on a collaboration needs to come back to them in sales, traffic, signups, or brand awareness that they can measure.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-red-700 mb-3">❌ Wrong Approach</h4>
                <p className="text-base text-red-600 italic leading-7">"I have 45,000 followers and average 20,000 impressions"</p>
                <p className="text-sm text-red-500 mt-2">Makes you sound like a number</p>
              </div>
              
              <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3">✅ Right Approach</h4>
                <p className="text-base text-green-600 italic leading-7">"My audience is primarily working professionals in India actively making career and purchasing decisions. I create value-driven content that my audience trusts, which means when I recommend something, they act on it."</p>
                <p className="text-sm text-green-500 mt-2">Makes you sound like a growth partner</p>
              </div>
            </div>

            <p className="text-base text-[#1D4ED8] font-medium leading-7 mt-4">Brands pay significantly more for growth partners than they do for reach.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">What to Charge - Pricing With Data, Not Guesswork</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Pricing is where most creators either leave money on the table or lose deals entirely. The fix is simple: base your pricing on data, not on what feels comfortable or what you think a brand wants to hear.</p>
            
            <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/40 border-2 border-purple-200/50 rounded-3xl p-6 mb-4">
              <h4 className="text-lg font-semibold text-purple-700 mb-4">Pricing Factors:</h4>
              <ul className="text-base text-[#2C2E3A] space-y-2 leading-7">
                <li>• Average impressions per post</li>
                <li>• Engagement rate</li>
                <li>• Audience quality</li>
                <li>• Your niche specificity</li>
              </ul>
              <p className="text-base text-purple-600 font-medium leading-7 mt-3">A highly engaged, niche-specific audience commands a higher rate than a large but passive general audience.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
              <h4 className="text-lg font-semibold text-green-700 mb-4">Practical Pricing Approach:</h4>
              <div className="space-y-3">
                <p className="text-base text-[#2C2E3A] leading-7"><strong>First Deal:</strong> Don't quote high. Build reference and case study at reasonable rate.</p>
                <p className="text-base text-[#2C2E3A] leading-7"><strong>After Experience:</strong> Set minimum rate and never go below it under any circumstances.</p>
                <p className="text-base text-green-600 font-medium leading-7"><strong>Why:</strong> Protects your income and the entire creator ecosystem from devaluation.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Barter Trap - Why Free Collaborations Hurt Everyone</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Barter collaborations, where a brand offers you a free product instead of payment, are one of the most common traps for early-stage creators. The logic sounds reasonable: you get a product, they get content, everyone wins.</p>
            
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <h4 className="text-lg font-semibold text-red-700 mb-3">The Reality:</h4>
              <ul className="text-base text-red-600 space-y-2 leading-7">
                <li>• You spend time creating content</li>
                <li>• Brand gets paying customer's worth of exposure</li>
                <li>• You get a product you may not have wanted</li>
                <li>• Next creator gets told "we usually do barter"</li>
              </ul>
            </div>

            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Free and barter collaborations pollute the market for every creator. Be professional from your very first deal. If you are going to collaborate with a brand, do it on structured, paid terms with clear deliverables, clear pricing, and clear expectations.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">That is how you build a sustainable income, not a hobby.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Negotiating When a Brand Lowballs You</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">When a brand offers significantly less than your rate, you have two options: negotiate or walk away. Both are valid. What is not valid is silently accepting less than your worth because the conversation felt uncomfortable.</p>
            
            <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-4">Simple Negotiation Framework:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <span className="text-[#2C2E3A]">Counter with your rate and justify it with your data</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <span className="text-[#2C2E3A]">If they can't meet your rate, offer reduced scope for reduced price (one post instead of two)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <span className="text-[#2C2E3A]">If they still can't align with fair terms, wish them well and end the conversation cleanly</span>
                </div>
              </div>
              <p className="text-base text-blue-600 font-medium leading-7 mt-4">The brands worth working with long-term are the ones who respect your pricing.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Turning One Deal Into Many</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Closing a single sponsored post is good. Building a long-term relationship with a brand is significantly better. Once a collaboration goes well, do not disappear. Follow up with results. Show them the impressions, the comments, the clicks. Then proactively offer them more.</p>
            
            <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6 mb-4">
              <h4 className="text-lg font-semibold text-green-700 mb-4">Package Options for Continuity:</h4>
              <ul className="text-base text-[#2C2E3A] space-y-2 leading-7">
                <li>• A three-post series spread across a month</li>
                <li>• A one-month brand association with regular mentions and a dedicated post</li>
                <li>• A webinar or live session combined with supporting posts</li>
                <li>• A cross-platform bundle covering both LinkedIn and Instagram</li>
              </ul>
            </div>

            <p className="text-base text-[#1D4ED8] font-medium leading-7">Retention is where real income comes from. A brand that trusts you and keeps coming back is worth far more than constantly hunting for new deals.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Trust Rule - Do Not Become a Walking Billboard</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">One of the fastest ways to destroy the audience trust you have spent months building is to over-monetize. If every other post is sponsored, your audience stops trusting your recommendations - and when audience trust drops, brand deals drop with it. The two are directly connected.</p>
            
            <div className="bg-gradient-to-br from-orange-50/80 to-orange-100/40 border-2 border-orange-200/50 rounded-3xl p-6 mb-4">
              <h4 className="text-lg font-semibold text-orange-700 mb-4">Simple Rule That Works:</h4>
              <p className="text-base text-[#2C2E3A] leading-7 mb-3">For every two to three sponsored posts, publish at least four posts of pure, unsponsored value.</p>
              <p className="text-base text-orange-600 font-medium leading-7">Your audience should always feel that your primary motivation is to help them, with brand collaborations as an occasional addition - not the other way around.</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-base text-blue-800"><strong>Additional Insight:</strong> The creators who command the highest brand deal rates are almost always the ones whose audiences trust them most. That trust is built through consistent, genuine, non-promotional content. Protect it like the asset it is - because it is the direct source of your earning power.</p>
            </div>
          </div>

          <div className="border-l-4 border-[#1D4ED8] pl-6">
            <h3 className="text-2xl font-bold text-[#1D4ED8] mb-6">The LinkedIn Side Hustle Formula</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">LinkedIn monetization works as passive income - and it is not luck. It is a system, and the system has three components that all need to work together:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Consistency</h4>
                <p className="text-sm text-blue-700">Showing up regularly with content that your audience finds valuable</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Positioning</h4>
                <p className="text-sm text-green-700">Being known for a specific topic so the right brands find you</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Smart Outreach</h4>
                <p className="text-sm text-purple-700">Proactively approaching brands rather than waiting to be discovered</p>
              </div>
            </div>

            <p className="text-base text-[#1D4ED8] font-medium leading-7 mt-4">When all three are working together, paid collaborations become a natural and recurring outcome rather than a rare stroke of luck.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Section Action Checklist</h3>
            <div className="bg-gradient-to-br from-white/95 to-green-50/30 border-2 border-green-500/20 rounded-3xl p-6">
              <ul className="text-base text-[#2C2E3A] space-y-3 leading-7">
                <li>✓ Build your media kit this week using the eight elements listed above. Use Canva to keep it clean and professional.</li>
                <li>✓ Revisit your pitch language. Write one paragraph that leads with the brand's outcome rather than your follower count. Use this in every future pitch.</li>
                <li>✓ Set your minimum rate right now based on your current impressions and engagement data. Write it down. Do not go below it.</li>
                <li>✓ If you have an existing brand relationship, proactively reach out this week with a multi-post or monthly association package proposal.</li>
                <li>✓ Audit your last ten posts. Count how many were sponsored versus value-driven. Adjust your content balance if needed.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "LinkedIn Business Page",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">What is a LinkedIn Business Page?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">A LinkedIn Business Page is a dedicated page that represents your company, brand, or venture on LinkedIn, completely separate from your personal profile. Think of it as your business's own LinkedIn account. You post on behalf of the brand, engage with content as the business, and build a following that is connected to the company rather than to you as an individual.</p>
            <p className="text-base text-[#1D4ED8] font-medium leading-7">For anyone building a brand, a startup, a freelance business, or a venture like OwnUrGrowth, a Business Page gives you a professional, credible presence that exists independently of any one person.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Personal Profile vs Business Page - Which One Matters More?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">This is an important distinction to understand before you invest time in a Business Page.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">Personal Profile</h4>
                <ul className="text-base text-[#2C2E3A] space-y-2 leading-7">
                  <li>• Higher reach and engagement</li>
                  <li>• Better lead generation results</li>
                  <li>• People connect with people, not logos</li>
                  <li>• Should be your primary focus</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3">Business Page</h4>
                <ul className="text-base text-[#2C2E3A] space-y-2 leading-7">
                  <li>• Builds institutional credibility</li>
                  <li>• Creates searchable brand presence</li>
                  <li>• Allows LinkedIn Ads access</li>
                  <li>• Exists beyond personal activity</li>
                </ul>
              </div>
            </div>

            <p className="text-base text-[#1D4ED8] font-medium leading-7">Use both but prioritise your personal profile first and treat the Business Page as a supporting asset.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">How to Set Up Your LinkedIn Business Page - Step by Step</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Creating a Business Page takes less than ten minutes.</p>
            
            <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/40 border-2 border-purple-200/50 rounded-3xl p-6 mb-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  <span className="text-[#2C2E3A]">Log into your personal LinkedIn account (required before creating Business Page)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  <span className="text-[#2C2E3A]">Click "For Business" icon in top right corner and select "Create a Company Page"</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                  <span className="text-[#2C2E3A]">Choose page type - "Small Business" for most users, "Showcase Page" for sub-divisions</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                  <span className="text-[#2C2E3A]">Fill in business details - name, URL, website, industry, company size, type</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                  <span className="text-[#2C2E3A]">Upload logo (300 x 300 pixels) and cover image (1128 x 191 pixels)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</span>
                  <span className="text-[#2C2E3A]">Write company description (up to 2,000 characters) with keywords and clear value</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</span>
                  <span className="text-[#2C2E3A]">Add tagline (up to 120 characters) - your one-line pitch</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-200 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">8</span>
                  <span className="text-[#2C2E3A]">Review everything, confirm authorization, and click "Create Page"</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <p className="text-base text-green-800"><strong>Important:</strong> Pages with complete information get 30% more weekly views than incomplete pages. Fill out every single field before you start posting.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Optimising Your Page After Creation</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Creating the page is step one. Optimising it is what makes it actually work.</p>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">Complete Every Section</h4>
                <p className="text-base text-[#2C2E3A] leading-7">About, specialties, website, contact information, and location. An incomplete page looks abandoned and loses credibility instantly.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3">Use Keywords Strategically</h4>
                <p className="text-base text-[#2C2E3A] leading-7">Your page description and tagline are indexed by both LinkedIn and Google. Page name should match official business name, but tagline can incorporate strategic keywords.</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50/80 to-orange-100/40 border-2 border-orange-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-orange-700 mb-3">Add a CTA Button</h4>
                <p className="text-base text-[#2C2E3A] leading-7">Custom call-to-action button like "Visit Website," "Contact Us," or "Sign Up." Direct visitors to your most important business destination.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/40 border-2 border-purple-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-purple-700 mb-3">Feature Your Best Content</h4>
                <p className="text-base text-[#2C2E3A] leading-7">Use Featured section for top-performing posts, case studies, or product pages. First thing visitors see should communicate your value immediately.</p>
              </div>

              <div className="bg-gradient-to-br from-red-50/80 to-red-100/40 border-2 border-red-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-red-700 mb-3">Add Your Products Section</h4>
                <p className="text-base text-[#2C2E3A] leading-7">Showcase reviews, testimonials, and case studies. Builds social proof and attracts targeted audience with bottom-of-funnel content.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Growing Your Business Page Following</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Your first followers will come from your personal network. Start by inviting people in your LinkedIn network - customers, partners, advisors, and prospective clients who already know your business.</p>
            
            <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6 mb-4">
              <h4 className="text-lg font-semibold text-blue-700 mb-4">Growth Strategies:</h4>
              <ul className="text-base text-[#2C2E3A] space-y-2 leading-7">
                <li>• Mention your Business Page in personal profile posts occasionally</li>
                <li>• Cross-promote on other platforms</li>
                <li>• Ask employees to list company as workplace on their profiles</li>
                <li>• Invite people who engage with your page content to follow</li>
                <li>• Have team members invite their connections</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-base text-yellow-800"><strong>Additional Insight:</strong> A good time to create a LinkedIn Business Page for early-stage startups is after you get your first set of clients. You can then use the Products section to showcase real testimonials and case studies as proof of your work. Launching a page with zero social proof is harder than launching one with even two or three strong testimonials already in place.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">What to Post on Your Business Page</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">The content strategy for a Business Page is different from a personal profile. Your personal profile is where you share stories, opinions, and personal experiences. Your Business Page is where you build the brand - its voice, its expertise, and its credibility.</p>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-4">
                <h4 className="font-semibold text-green-700 mb-2">Company Updates and Announcements</h4>
                <p className="text-sm text-[#2C2E3A]">New offerings, milestones, launches, partnerships. Give audience reason to follow.</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-4">
                <h4 className="font-semibold text-blue-700 mb-2">Behind the Scenes Content</h4>
                <p className="text-sm text-[#2C2E3A]">How team works, process insights, product building. Humanizes brand and builds trust.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/40 border-2 border-purple-200/50 rounded-3xl p-4">
                <h4 className="font-semibold text-purple-700 mb-2">Educational Content</h4>
                <p className="text-sm text-[#2C2E3A]">Position brand as authority by teaching target audience valuable insights.</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50/80 to-orange-100/40 border-2 border-orange-200/50 rounded-3xl p-4">
                <h4 className="font-semibold text-orange-700 mb-2">Customer Success Stories</h4>
                <p className="text-sm text-[#2C2E3A]">Real outcomes from real clients. Most credible content any business can post.</p>
              </div>

              <div className="bg-gradient-to-br from-red-50/80 to-red-100/40 border-2 border-red-200/50 rounded-3xl p-4">
                <h4 className="font-semibold text-red-700 mb-2">Team Member Reposts</h4>
                <p className="text-sm text-[#2C2E3A]">Reshare relevant content from team's personal profiles. Amplifies both individual and brand reach.</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-base text-blue-800"><strong>Frequency Matters:</strong> Companies that post weekly see two times higher engagement than those that post less frequently. Consistency matters as much on a Business Page as it does on a personal profile.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">LinkedIn Ads - When and Why to Use Them?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">One of the most significant advantages a Business Page has over a personal profile is access to LinkedIn's advertising platform. Once your page is set up, you can run targeted paid campaigns directly to the professional audience you want to reach.</p>
            
            <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6 mb-4">
              <h4 className="text-lg font-semibold text-green-700 mb-4">LinkedIn Ads Targeting Options:</h4>
              <ul className="text-base text-[#2C2E3A] space-y-2 leading-7">
                <li>• Job title and seniority level</li>
                <li>• Industry and company size</li>
                <li>• Location and demographics</li>
                <li>• Professional interests and skills</li>
              </ul>
              <p className="text-base text-green-600 font-medium leading-7 mt-3">For B2B businesses, lead generation campaigns, and course promotions targeting specific professional demographics, this targeting precision is extremely powerful.</p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
              <p className="text-base text-orange-800"><strong>Important:</strong> LinkedIn Ads require a budget and should only be considered once your organic presence is established and you have a clear, tested offer to promote. Running ads to a weak page with no social proof is an expensive way to learn what doesn't work.</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-base text-yellow-800"><strong>Pro Tip:</strong> Before spending on ads, make sure your Business Page is fully optimised, your content is consistent, and you have clear social proof on the page. Ads amplify what is already there - they do not fix what is missing.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Tracking Performance - What to Measure?</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">LinkedIn provides built-in analytics for Business Pages that show you follower growth, post impressions, engagement rates, and visitor demographics. Use these metrics consistently to understand what content is working and what is not.</p>
            
            <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-4">Three Key Metrics to Track:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <h5 className="font-semibold text-blue-800 mb-2">Follower Growth Rate</h5>
                  <p className="text-sm text-blue-700">Is your audience growing?</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <h5 className="font-semibold text-green-800 mb-2">Average Post Impressions</h5>
                  <p className="text-sm text-green-700">Is your content reaching them?</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg text-center">
                  <h5 className="font-semibold text-purple-800 mb-2">Engagement Rate</h5>
                  <p className="text-sm text-purple-700">Are they engaging with posts?</p>
                </div>
              </div>
              <p className="text-base text-blue-600 font-medium leading-7 mt-4">Together, these tell you whether your audience is growing, whether your content is reaching them, and whether they are actually engaging. Make decisions based on this data, not on gut feel.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Beyond Brand Deals",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Most Underrated Monetization Strategy - Your Own Services</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Brand collaborations are one income stream. But the creators who build truly sustainable income on LinkedIn do not stop there. They leverage the trust they have built with their audience to sell their own services - and that is where the real compounding begins.</p>
            
            <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6 mb-4">
              <h4 className="text-lg font-semibold text-blue-700 mb-4">What This Looks Like in Practice:</h4>
              <p className="text-base text-[#2C2E3A] leading-7 mb-4">After building genuine trust with thousands of followers through consistent, valuable content, the natural next step was to offer direct guidance to the people who were already asking for it. 1:1 calls through Topmate. Real conversations with real people about their specific problems - career decisions, LinkedIn growth, job search strategy - in areas where the knowledge and experience to help them already existed.</p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <h4 className="text-lg font-semibold text-green-700 mb-3">The Impact Goes Beyond Income:</h4>
              <p className="text-base text-green-800 leading-7">Every person you help through a direct service becomes one of your most loyal followers. They have experienced your value firsthand. They trust you not because of your follower count but because you solved a real problem for them. That kind of credibility cannot be manufactured through content alone - it has to be earned through genuine impact.</p>
            </div>

            <p className="text-base text-[#1D4ED8] font-medium leading-7">Do not depend entirely on brand collaborations. Cross-sell your own services and products to your audience. The trust you build through content is the foundation - what you build on top of it is entirely up to you.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Level Framework - Progress is Never Wasted</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Here is a way to think about your LinkedIn journey that will keep you going when results feel slow.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-red-50/80 to-red-100/40 border-2 border-red-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-red-700 mb-3">Level 1</h4>
                <p className="text-base text-[#2C2E3A] leading-7">Building a consistent presence and a growing audience</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50/80 to-orange-100/40 border-2 border-orange-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-orange-700 mb-3">Level 2</h4>
                <p className="text-base text-[#2C2E3A] leading-7">Establishing credibility and receiving inbound opportunities - job offers, referrals, collaborations</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">Level 3</h4>
                <p className="text-base text-[#2C2E3A] leading-7">Monetizing actively through brand deals, services, and consulting</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3">Level 4</h4>
                <p className="text-base text-[#2C2E3A] leading-7">The full vision of whatever your ultimate goal on the platform looks like for you</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/40 border-2 border-purple-200/50 rounded-3xl p-6 mb-4">
              <h4 className="text-lg font-semibold text-purple-700 mb-4">The Key Insight:</h4>
              <p className="text-base text-[#2C2E3A] leading-7 mb-4">Your target is Level 4. But even if you do not reach Level 4 in your target timeline, you will cross Level 2 and possibly Level 3. And nothing you did to get there is wasted.</p>
              <p className="text-base text-purple-600 font-medium leading-7">You set out wanting brand collaborations but they have not come yet? The network you built along the way might bring you a job offer. Someone in your audience might become a paying client. A connection made through your content might lead to a partnership or a funding conversation.</p>
            </div>

            <p className="text-base text-[#1D4ED8] font-medium leading-7">LinkedIn has a way of delivering results that you were not even specifically chasing, because the visibility and credibility you build open doors you did not know existed.</p>
          </div>

          <div className="border-l-4 border-[#1D4ED8] pl-6">
            <h3 className="text-2xl font-bold text-[#1D4ED8] mb-6">The Decision You Will Never Regret</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Every strategy, framework, and tactic in this course works. But all of it starts with one decision: to show up consistently and give LinkedIn a real chance.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Not two weeks. Not five posts. Sixty days of genuine, consistent effort. That is the commitment being asked of you. And the confidence behind that ask comes from having lived it personally and having watched hundreds of others live it too.</p>
            <p className="text-base text-[#1D4ED8] font-bold leading-7">The decision to take LinkedIn seriously is one of the few professional decisions you can make today that will compound in your favour for years. Whatever stage you are at - student, professional, or business owner - the best time to start was yesterday. The second best time is right now.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">What Comes After This Course - Your Support System</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Buying this course is the beginning, not the end. Here is exactly what happens next.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3">Within the First Week</h4>
                <p className="text-base text-[#2C2E3A] leading-7">Start implementing. Explore, experiment, and begin posting. Do not wait until everything feels perfect - it never will. Start messy and get better in the process.</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">Within the First Month</h4>
                <p className="text-base text-[#2C2E3A] leading-7">You will have experimented enough to have real questions - specific doubts about your content, your profile, your outreach, or your strategy. Bring those questions to the first live Q&A session held one month after your purchase. This is a direct, personal conversation, not a pre-recorded answer.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/40 border-2 border-purple-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-purple-700 mb-3">By the Second Month</h4>
                <p className="text-base text-[#2C2E3A] leading-7">You will have data. You will know what is working and what is not. The second live Q&A session at the two-month mark is where you refine your strategy based on real results and real experience.</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50/80 to-orange-100/40 border-2 border-orange-200/50 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-orange-700 mb-3">Beyond Two Months</h4>
                <p className="text-base text-[#2C2E3A] leading-7">The support does not stop. Updates, new learnings, and continued guidance will always be available. This community does not close after sixty days.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Section Action Checklist</h3>
            <div className="bg-gradient-to-br from-white/95 to-green-50/30 border-2 border-green-500/20 rounded-3xl p-6">
              <ul className="text-base text-[#2C2E3A] space-y-3 leading-7">
                <li>✓ Write down your Level 4 - your ultimate goal on LinkedIn. Be specific. Then write what Level 2 and Level 3 look like for you. This is your roadmap.</li>
                <li>✓ Identify one service or skill you could offer directly to your audience through a platform like Topmate. Set it up before your thirtieth day of posting.</li>
                <li>✓ Commit to sixty days starting today. Write the date sixty days from now somewhere visible.</li>
                <li>✓ Mark your calendar for the Month 1 and Month 2 live Q&A sessions.</li>
                <li>✓ Close this document and post your first piece of content today. Everything else follows from that first step.</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Your LinkedIn Journey Starts Now</h3>
            <p className="text-lg text-blue-100 leading-7">You have the knowledge. You have the framework. You have the support system. The only thing left is to begin.</p>
          </div>
        </div>
      )
    },
    {
      title: "The Final Pro Tip",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Your Content Must Be Worth Someone's Time!</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Every person who stops scrolling to read your post is making a small bet. They are betting that what you have written is worth sixty seconds of their day. Your only job as a creator is to make sure that bet pays off, every single time.</p>
            
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <h4 className="text-lg font-semibold text-red-700 mb-3">The Harsh Reality:</h4>
              <p className="text-base text-red-600 leading-7 mb-4">If someone reads your post and finishes it thinking "that was a waste of my time, I learned nothing, I did not laugh, nothing changed for me", they will remember you. Not positively. They will remember your name as the person whose content they should skip.</p>
              <p className="text-base text-red-600 font-medium leading-7">And no matter how good your future posts become, that association is extremely difficult to undo.</p>
            </div>

            <p className="text-base text-[#1D4ED8] font-medium leading-7">A negative brand image is far more damaging than no brand image at all. You can recover from being unknown. Recovering from being known as someone whose content wastes people's time is a much longer and harder road.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">The Two Line Test</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Before you post anything, apply this simple test. Read your first two lines and ask yourself honestly: if I were a stranger scrolling past this, would I stop? Would I feel curious, intrigued, or compelled to read more?</p>
            
            <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6 mb-4">
              <h4 className="text-lg font-semibold text-blue-700 mb-4">The Two-Part Test:</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <p className="font-semibold text-blue-700">Hook Test</p>
                    <p className="text-[#2C2E3A] text-sm">If the answer is no, rewrite the hook before you post. The body can be exceptional, but it means nothing if the first two lines don't earn the read.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <p className="font-semibold text-blue-700">Value Test</p>
                    <p className="text-[#2C2E3A] text-sm">Once someone reads through, ask whether they walked away with something - a lesson, a laugh, a new perspective, a practical insight they can use.</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-base text-[#1D4ED8] font-medium leading-7">Every piece of content you publish should pass both tests: a hook that earns the click and a body that justifies the time.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Protect Your Reputation Like the Asset It Is</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Your personal brand on LinkedIn is built post by post, interaction by interaction, over months and years. It is one of the slowest things to build and one of the fastest things to damage. Be intentional about every piece of content that goes out under your name.</p>
            
            <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 border-2 border-green-200/50 rounded-3xl p-6 mb-4">
              <p className="text-base text-[#2C2E3A] leading-7 mb-4">This does not mean every post needs to be perfect. It means every post needs to have genuine intent behind it - to teach something, share something real, or start a conversation worth having.</p>
              <p className="text-base text-green-600 font-medium leading-7">Content posted just to maintain a streak, with nothing of value inside it, chips away at the trust your audience has placed in you.</p>
            </div>

            <p className="text-base text-[#1D4ED8] font-medium leading-7">Quality and consistency are not opposites. You can show up every day and still make every post worth someone's time. That combination - reliability plus value - is what builds a personal brand that lasts.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">There Will Be Hard Days - Keep Going Anyway</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">No growth journey is a straight line. There will be posts that flop despite your best effort. There will be weeks where nothing seems to work. There will be moments where you question whether any of this is worth it.</p>
            
            <div className="bg-gradient-to-br from-orange-50/80 to-orange-100/40 border-2 border-orange-200/50 rounded-3xl p-6 mb-4">
              <p className="text-base text-[#2C2E3A] leading-7 mb-4">That is normal. That is part of the process for every creator at every level. The difference between those who grow and those who quit is not talent, not timing, and not luck.</p>
              <p className="text-base text-orange-600 font-medium leading-7">It is the decision to keep going when results are not visible yet.</p>
            </div>

            <p className="text-base text-[#1D4ED8] font-medium leading-7">You have everything you need. The strategies are here. The framework is clear. The only variable left is your consistency.</p>
          </div>

          <div className="border-l-4 border-[#1D4ED8] pl-6">
            <h3 className="text-2xl font-bold text-[#1D4ED8] mb-6">A Final Word</h3>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">You have reached the end of this course. But in every real sense, you are just at the beginning.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">Start today. Not tomorrow, not after you feel more prepared, not once your profile looks perfect. Today. Post something. Reach out to someone. Leave a meaningful comment. Take one action that moves you forward.</p>
            <p className="text-base text-[#2C2E3A] leading-7 mb-4">LinkedIn will reward you for showing up. It may not happen in the first week or the first month, but it will happen. Stay consistent, stay genuine, keep learning, and keep growing.</p>
            <p className="text-base text-[#1D4ED8] font-bold leading-7">See you at the live Q&A. Until then - mehnat karo, grow karo!</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#141619] mb-6">Section Action Checklist</h3>
            <div className="bg-gradient-to-br from-white/95 to-green-50/30 border-2 border-green-500/20 rounded-3xl p-6">
              <ul className="text-base text-[#2C2E3A] space-y-3 leading-7">
                <li>✓ Before publishing your next post, apply the two line test. If the hook does not make you want to read more, rewrite it.</li>
                <li>✓ After writing any post, ask yourself — what does the reader walk away with? If the answer is nothing, add value before posting.</li>
                <li>✓ Write down three content ideas right now that you know would genuinely help your target audience. Schedule them for this week.</li>
                <li>✓ On days when motivation is low, post something small rather than nothing at all. Consistency beats perfection every time.</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl p-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">🚀 Course Complete!</h3>
            <p className="text-xl text-green-100 leading-7 mb-4">You now have everything you need to build a powerful LinkedIn presence.</p>
            <p className="text-lg text-blue-100 leading-7">The only thing left is to take action. Start today!</p>
          </div>
        </div>
      )
    },
  ];

  const { readSections, markRead, pct } = useReadTracker(sections.length, userId);

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
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center">
        <div className="h-12 w-12 rounded-full bg-[#1D4ED8]/20 flex items-center justify-center">
          <FileText className="h-6 w-6 text-[#1D4ED8]" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-[#141619]">Complete Course Notes</h2>
          <p className="text-[#B3B4BD] text-sm">87-page comprehensive LinkedIn growth guide</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-[#1D4ED8]">
          <BookOpen className="h-4 w-4" />
          {pct}% read
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-2 bg-[#B3B4BD]/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-[#B3B4BD] mt-1">{readSections.size} of {sections.length} sections read</p>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-2xl transition-all duration-700 hover:shadow-xl hover:shadow-[#1D4ED8]/15 hover:border-[#1D4ED8]/40">
            <button
              onClick={() => { toggleSection(index); markRead(index); }}
              className="w-full flex items-center justify-between p-6 hover:bg-white/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {readSections.has(index) && (
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</span>
                )}
                <h3 className="text-xl font-bold text-[#141619] text-left group-hover:text-[#1D4ED8] transition-colors duration-500">{section.title}</h3>
              </div>
              {expandedSections.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-[#1D4ED8] transition-transform duration-300" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#B3B4BD] group-hover:text-[#1D4ED8] transition-colors duration-300" />
              )}
            </button>
            {expandedSections.includes(index) && (
              <div className="px-6 pb-6 border-t border-[#1D4ED8]/10">
                <div className="pt-4">
                  {section.content}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
