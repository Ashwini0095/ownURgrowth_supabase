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

      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="group relative overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-2xl transition-all duration-700 hover:shadow-xl hover:shadow-[#1D4ED8]/15 hover:border-[#1D4ED8]/40">
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex items-center justify-between p-6 hover:bg-white/50 transition-colors"
            >
              <h3 className="text-xl font-bold text-[#141619] text-left group-hover:text-[#1D4ED8] transition-colors duration-500">{section.title}</h3>
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
