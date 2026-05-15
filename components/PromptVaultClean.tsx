'use client';

import { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, FileText } from 'lucide-react';

interface PromptVaultCleanProps {
  hasAccess: boolean;
}

export default function PromptVaultClean({ hasAccess }: PromptVaultCleanProps) {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>({});

  const copyToClipboard = async (text: string, promptId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(promptId);
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const sections = [
    {
      title: "Topic 1: LinkedIn Headlines",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Your LinkedIn headline is the first thing people see. These prompts will help you create headlines that stop the scroll and attract the right audience.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 3 LinkedIn headline options for a [your role, e.g. software engineer / MBA student / freelance designer]. Keep each under 200 characters. Make them specific and outcome focused."</p>
                  <button
                    onClick={() => copyToClipboard('Write 3 LinkedIn headline options for a [your role, e.g. software engineer / MBA student / freelance designer]. Keep each under 200 characters. Make them specific and outcome focused.', 'headline-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'headline-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"Software Engineer helping early-stage startups build scalable products | Python, AWS, System Design"</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 5 LinkedIn headline options for me. Role: [your current role or status] Audience I help: [who you work with or help] Value I deliver: [what outcome you create] Keep each under 220 characters. Avoid generic phrases like 'passionate about' or 'aspiring'."</p>
                  <button
                    onClick={() => copyToClipboard('Write 5 LinkedIn headline options for me. Role: [your current role or status] Audience I help: [who you work with or help] Value I deliver: [what outcome you create] Keep each under 220 characters. Avoid generic phrases like \'passionate about\' or \'aspiring\'.', 'headline-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'headline-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"Helping CS students from tier 2 and 3 colleges crack FAANG | SWE at Google | Sharing what actually worked"</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 7 LinkedIn headline options for me. Here are my full details: Current role or status: [e.g. Final year CS student] Company or college: [e.g. VIT Pune] Who I help: [e.g. Students trying to break into top tech companies] What outcome I create: [e.g. Help them land their first FAANG internship] My top skills: [e.g. DSA, system design, competitive programming] My content niche on LinkedIn: [e.g. Career growth in tech for non-IIT students] Tone I want: [e.g. Confident, direct, no fluff] Mix formats — some short and punchy, some descriptive. No generic phrases."</p>
                  <button
                    onClick={() => copyToClipboard('Write 7 LinkedIn headline options for me. Here are my full details: Current role or status: [e.g. Final year CS student] Company or college: [e.g. VIT Pune] Who I help: [e.g. Students trying to break into top tech companies] What outcome I create: [e.g. Help them land their first FAANG internship] My top skills: [e.g. DSA, system design, competitive programming] My content niche on LinkedIn: [e.g. Career growth in tech for non-IIT students] Tone I want: [e.g. Confident, direct, no fluff] Mix formats — some short and punchy, some descriptive. No generic phrases.', 'headline-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'headline-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"Final year CS student → FAANG-focused | Cracked Google internship from a tier 3 college | Sharing the full playbook"</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (For Students)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 5 LinkedIn headlines specifically for a college student with no work experience yet. They are in [year and branch, e.g. 3rd year Computer Science]. Their goal on LinkedIn is [e.g. landing a software engineering internship at a top company]. They have [mention any projects, achievements, or skills, e.g. built two full-stack projects and solved 300+ LeetCode problems]. Make the headlines aspirational but honest — no fake credentials."</p>
                  <button
                    onClick={() => copyToClipboard('Write 5 LinkedIn headlines specifically for a college student with no work experience yet. They are in [year and branch, e.g. 3rd year Computer Science]. Their goal on LinkedIn is [e.g. landing a software engineering internship at a top company]. They have [mention any projects, achievements, or skills, e.g. built two full-stack projects and solved 300+ LeetCode problems]. Make the headlines aspirational but honest — no fake credentials.', 'headline-student')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'headline-student' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"3rd Year CS Student | 300+ LeetCode | Building in public | Targeting SWE internships at top tech companies"</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Here is my current LinkedIn headline: [paste your existing headline] Problems with it: [e.g. too vague / sounds like everyone else / does not mention who I help] Rewrite it into 5 better versions. Keep each under 220 characters. Make them specific, outcome focused, and memorable."</p>
                  <button
                    onClick={() => copyToClipboard('Here is my current LinkedIn headline: [paste your existing headline] Problems with it: [e.g. too vague / sounds like everyone else / does not mention who I help] Rewrite it into 5 better versions. Keep each under 220 characters. Make them specific, outcome focused, and memorable.', 'headline-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'headline-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <div className="space-y-2">
                    <p className="text-base text-[#2C2E3A]"><span className="font-semibold">Original:</span> <span className="italic">"Software Engineer | Passionate about technology | Open to opportunities"</span></p>
                    <p className="text-base text-[#2C2E3A]"><span className="font-semibold">Rewritten:</span> <span className="italic">"Software Engineer at [Company] | Building backend systems that scale | Helping CS students navigate their first tech job"</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Using These Prompts:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Replace all bracketed placeholders with your specific information</li>
              <li>• Test multiple variations and see which resonates with your audience</li>
              <li>• Update your headline every 2-3 months as you grow and evolve</li>
              <li>• Use the refinement prompt to improve headlines that aren't performing</li>
              <li>• Keep a copy of all generated options for future reference</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 2: About Section",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Your LinkedIn About section is where you tell your story and connect with your audience. These prompts will help you create an About section that builds trust and drives action.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn About section for me in first person. I am a [your role]. I help [your audience] with [what you help them do]. My tone should be [e.g. conversational and direct]. Keep it under 150 words. End with a call to action."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn About section for me in first person. I am a [your role]. I help [your audience] with [what you help them do]. My tone should be [e.g. conversational and direct]. Keep it under 150 words. End with a call to action.', 'about-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'about-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"I am a software engineer at a MAANG company who spends most of my spare time helping students from smaller colleges break into top tech. On LinkedIn I share everything I learned the hard way — DSA strategy, system design, and what no one tells you about the interview process. If you are preparing for FAANG, follow along. I post three times a week. DMs are open if you need help."</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn About section for me. Who I am: [your background in one line] What I do professionally: [your work or study] What I am passionate about: [what drives you] What I share on LinkedIn: [your content topics] Call to action: [what you want people to do — follow, DM, visit website] Tone: [e.g. conversational, no corporate jargon] Keep it between 150 and 200 words. Start with a hook."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn About section for me. Who I am: [your background in one line] What I do professionally: [your work or study] What I am passionate about: [what drives you] What I share on LinkedIn: [your content topics] Call to action: [what you want people to do — follow, DM, visit website] Tone: [e.g. conversational, no corporate jargon] Keep it between 150 and 200 words. Start with a hook.', 'about-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'about-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"Three years ago I was sending cold applications into the void, getting no responses, wondering what I was doing wrong. Today I am a software engineer at [Company] and spend half my time helping people avoid the exact mistakes I made. I post about DSA, system design, and the career game nobody teaches you in college. No fluff, no gatekeeping — just the real strategy that works, especially if you are not from an IIT or NIT. If you are a student or early-career professional navigating tech hiring, follow along. DMs open for anyone who needs direction."</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn About section for me in first person. Here are all my details: My background: [e.g. 3 years as SWE at a MAANG company, tier 3 college background] My professional work: [e.g. build backend systems for a fintech product used by 10 million users] My LinkedIn content niche: [e.g. career growth in tech, DSA, system design] My target audience: [e.g. students and early-career engineers from non-IIT colleges] What I have achieved that builds credibility: [e.g. helped 200+ students, 45K followers, featured in XYZ] Services I offer: [e.g. 1-on-1 career coaching, resume reviews, mock interviews on Topmate] My personality and tone: [e.g. direct, honest, no motivational fluff] CTA: [e.g. follow for weekly posts, book a session on Topmate] Length: 220 to 260 words. Start with a story or a strong hook, not 'Hi I am'. No corporate buzzwords."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn About section for me in first person. Here are all my details: My background: [e.g. 3 years as SWE at a MAANG company, tier 3 college background] My professional work: [e.g. build backend systems for a fintech product used by 10 million users] My LinkedIn content niche: [e.g. career growth in tech, DSA, system design] My target audience: [e.g. students and early-career engineers from non-IIT colleges] What I have achieved that builds credibility: [e.g. helped 200+ students, 45K followers, featured in XYZ] Services I offer: [e.g. 1-on-1 career coaching, resume reviews, mock interviews on Topmate] My personality and tone: [e.g. direct, honest, no motivational fluff] CTA: [e.g. follow for weekly posts, book a session on Topmate] Length: 220 to 260 words. Start with a story or a strong hook, not \'Hi I am\'. No corporate buzzwords.', 'about-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'about-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"I got rejected by 11 companies before I cracked my first FAANG interview. Not because I lacked talent. Because I was preparing the wrong things, the wrong way, for far too long — and nobody around me knew any different. I am a software engineer at [Company] by day. I build backend systems for a product used by millions. Outside of work, I have spent the last two years doing the thing I wish someone had done for me — giving honest, practical guidance to students and early-career engineers who are figuring out the tech industry without the advantage of a top college or a strong network. On LinkedIn I post three times a week about DSA strategy, system design, and the career game the top colleges never bother to teach. Over 45,000 people follow along, and I am proud that a large part of that audience comes from exactly the background I come from. If any of this resonates, follow along. If you want more personalised help — a resume review, a mock interview, or just someone to tell you honestly what is and is not working in your prep — you can book a session with me on Topmate. Link in the featured section. The playing field is not level. But it is more navigable than you think."</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (For Business Owners)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn About section for a business owner or freelancer. Here are the details: Business or service: [e.g. LinkedIn ghostwriting and content strategy for founders] Target client: [e.g. startup founders and coaches who want to grow on LinkedIn but do not have time to post] Result I deliver: [e.g. help them go from 0 to 5000 followers in 90 days with organic content] My credibility: [e.g. managed accounts for 10+ clients, grown personal LinkedIn to 20K followers] Tone: [e.g. professional but approachable] CTA: [e.g. DM me to discuss working together] Keep it between 150 and 200 words. Make it feel like a pitch that does not feel like a pitch."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn About section for a business owner or freelancer. Here are the details: Business or service: [e.g. LinkedIn ghostwriting and content strategy for founders] Target client: [e.g. startup founders and coaches who want to grow on LinkedIn but do not have time to post] Result I deliver: [e.g. help them go from 0 to 5000 followers in 90 days with organic content] My credibility: [e.g. managed accounts for 10+ clients, grown personal LinkedIn to 20K followers] Tone: [e.g. professional but approachable] CTA: [e.g. DM me to discuss working together] Keep it between 150 and 200 words. Make it feel like a pitch that does not feel like a pitch.', 'about-business')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'about-business' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"Most founders know they should be on LinkedIn. Very few actually make it work. The problem is usually not the idea — it is the time, the consistency, and knowing exactly what to say to the right audience. I run a LinkedIn content and ghostwriting service for founders, coaches, and consultants who want to build a genuine presence on the platform without spending hours a week writing posts. My clients have gone from zero to 5,000 followers in under 90 days. Some have closed clients directly from LinkedIn within the first month of working together. All of them have stopped guessing and started growing. If you are building something worth talking about and need someone to help you say it well — DM me. Happy to have a 15-minute conversation about what that could look like for you."</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Here is my current LinkedIn About section: [paste your existing About section] What I think is wrong with it: [e.g. too formal / sounds like a resume / no clear audience / weak CTA] Rewrite it keeping the core facts but making it more human, more engaging, and more specific. Keep the same length or shorter. Same tone as: [e.g. Ashwini's LinkedIn — direct, honest, conversational]."</p>
                  <button
                    onClick={() => copyToClipboard('Here is my current LinkedIn About section: [paste your existing About section] What I think is wrong with it: [e.g. too formal / sounds like a resume / no clear audience / weak CTA] Rewrite it keeping the core facts but making it more human, more engaging, and more specific. Keep the same length or shorter. Same tone as: [e.g. Ashwini\'s LinkedIn — direct, honest, conversational].', 'about-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'about-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Topic 3: Experience Entry Rewriting",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Transform your LinkedIn experience entries from boring job descriptions into compelling achievement stories that showcase your impact and value.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Rewrite this LinkedIn experience entry to show impact, not just responsibilities: [paste your current entry]. Use strong action verbs and add numbers where possible."</p>
                  <button
                    onClick={() => copyToClipboard('Rewrite this LinkedIn experience entry to show impact, not just responsibilities: [paste your current entry]. Use strong action verbs and add numbers where possible.', 'experience-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'experience-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <div className="space-y-2">
                    <p className="text-base text-[#2C2E3A]"><span className="font-semibold">Before:</span> <span className="italic">"Worked on the backend team and helped fix issues."</span></p>
                    <p className="text-base text-[#2C2E3A]"><span className="font-semibold">After:</span> <span className="italic">"Resolved 12 critical backend bugs over a 3-month internship, reducing system error rate by an estimated 30% and directly improving checkout reliability."</span></p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Rewrite my LinkedIn experience entry into 3 to 4 strong bullet points. Job title: [e.g. Product Management Intern] Company: [e.g. Razorpay] What I actually did: [e.g. conducted user research, wrote PRDs, ran sprint planning] Any results or outcomes: [e.g. feature I worked on launched to 50K users] Start each bullet with an action verb. Focus on impact over activity."</p>
                  <button
                    onClick={() => copyToClipboard('Rewrite my LinkedIn experience entry into 3 to 4 strong bullet points. Job title: [e.g. Product Management Intern] Company: [e.g. Razorpay] What I actually did: [e.g. conducted user research, wrote PRDs, ran sprint planning] Any results or outcomes: [e.g. feature I worked on launched to 50K users] Start each bullet with an action verb. Focus on impact over activity.', 'experience-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'experience-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"Led end-to-end user research for a new onboarding feature, conducting 20+ interviews that directly shaped the product brief. Authored 3 PRDs adopted into the sprint cycle, reducing back-and-forth between product and engineering by streamlining requirements documentation. Contributed to the launch of a checkout improvement feature rolled out to 50,000+ users within two weeks of going live."</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Rewrite my LinkedIn experience entry into 4 to 5 strong, specific bullet points. Job title: [e.g. Software Engineering Intern] Company: [e.g. Swiggy] Team or domain: [e.g. payments backend] Duration: [e.g. May to August 2024] What I built or worked on: [describe in plain language] Any metrics or outcomes you know: [e.g. reduced API response time, feature went live, test coverage improved] Technologies used: [e.g. Python, Django, PostgreSQL, Redis] Cross-functional work: [e.g. worked with design and product teams] Make each bullet start with a strong action verb. Quantify wherever possible. If exact numbers are unknown, use conservative estimates or qualitative impact statements."</p>
                  <button
                    onClick={() => copyToClipboard('Rewrite my LinkedIn experience entry into 4 to 5 strong, specific bullet points. Job title: [e.g. Software Engineering Intern] Company: [e.g. Swiggy] Team or domain: [e.g. payments backend] Duration: [e.g. May to August 2024] What I built or worked on: [describe in plain language] Any metrics or outcomes you know: [e.g. reduced API response time, feature went live, test coverage improved] Technologies used: [e.g. Python, Django, PostgreSQL, Redis] Cross-functional work: [e.g. worked with design and product teams] Make each bullet start with a strong action verb. Quantify wherever possible. If exact numbers are unknown, use conservative estimates or qualitative impact statements.', 'experience-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'experience-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (For Students With No Internship)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"I am a student with no formal work experience. Help me rewrite my college projects and extracurricular activities into LinkedIn experience entries that still look professional and impressive. Project or activity: [e.g. Built a full-stack e-commerce app as a college project] Tech or skills used: [e.g. React, Node.js, MongoDB] What I did specifically: [e.g. designed the database, built the cart feature, deployed on AWS] Any outcome or feedback: [e.g. Professor gave it as a reference to junior batch, got 40 GitHub stars] Write 2 to 3 bullet points as if it were a real work experience entry."</p>
                  <button
                    onClick={() => copyToClipboard('I am a student with no formal work experience. Help me rewrite my college projects and extracurricular activities into LinkedIn experience entries that still look professional and impressive. Project or activity: [e.g. Built a full-stack e-commerce app as a college project] Tech or skills used: [e.g. React, Node.js, MongoDB] What I did specifically: [e.g. designed the database, built the cart feature, deployed on AWS] Any outcome or feedback: [e.g. Professor gave it as a reference to junior batch, got 40 GitHub stars] Write 2 to 3 bullet points as if it were a real work experience entry.', 'experience-student')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'experience-student' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"Designed and developed a full-stack e-commerce platform using React, Node.js, and MongoDB, implementing a complete cart and checkout flow from scratch. Deployed the application on AWS with a basic CI pipeline, gaining hands-on experience with cloud infrastructure and production-level deployment. Repository received 40+ GitHub stars and was referenced by the course instructor as a learning resource for the following batch."</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Here is my current experience entry: [paste entry] It reads too much like a job description. Rewrite it to sound like achievements, not responsibilities. Keep the same facts but change the framing entirely. Add quantification wherever it is reasonable to estimate."</p>
                  <button
                    onClick={() => copyToClipboard('Here is my current experience entry: [paste entry] It reads too much like a job description. Rewrite it to sound like achievements, not responsibilities. Keep the same facts but change the framing entirely. Add quantification wherever it is reasonable to estimate.', 'experience-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'experience-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Experience Entries:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Start each bullet point with a strong action verb (Led, Built, Implemented, Optimized)</li>
              <li>• Include specific numbers and metrics whenever possible</li>
              <li>• Focus on outcomes and impact, not just tasks and responsibilities</li>
              <li>• Use the STAR method: Situation, Task, Action, Result</li>
              <li>• Tailor your experience to match the roles you're targeting</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 4: Cover Image Tagline",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Your LinkedIn cover image tagline is the first thing people see when they visit your profile. Create memorable, punchy taglines that instantly communicate your value.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 5 short taglines for my LinkedIn cover image. I am a [your role] who helps [your audience] with [what you do]. Keep each under 10 words. Make them punchy and memorable."</p>
                  <button
                    onClick={() => copyToClipboard('Write 5 short taglines for my LinkedIn cover image. I am a [your role] who helps [your audience] with [what you do]. Keep each under 10 words. Make them punchy and memorable.', 'tagline-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'tagline-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"Helping engineers go from campus to MAANG."</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 5 cover image taglines for my LinkedIn profile. My role: [e.g. Career coach for tech professionals] My audience: [e.g. Software engineers looking to grow their career] My key value: [e.g. Helping people go from stuck to promoted] Style: [e.g. Direct and confident] Keep each under 12 words. These will appear as text on a Canva-designed cover image."</p>
                  <button
                    onClick={() => copyToClipboard('Write 5 cover image taglines for my LinkedIn profile. My role: [e.g. Career coach for tech professionals] My audience: [e.g. Software engineers looking to grow their career] My key value: [e.g. Helping people go from stuck to promoted] Style: [e.g. Direct and confident] Keep each under 12 words. These will appear as text on a Canva-designed cover image.', 'tagline-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'tagline-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 8 cover image tagline options for my LinkedIn profile. I need options in different styles — some outcome-focused, some identity-based, some question-based. My name: [optional] My role: [e.g. LinkedIn Content Strategist and Career Coach] My niche: [e.g. Helping professionals build a LinkedIn presence that works] My audience: [e.g. Working professionals and students] Tone options I like: [e.g. Bold, warm, direct] My brand name if any: [e.g. OwnUrGrowth] For each tagline suggest where it would work best — profile, newsletter banner, or course landing page."</p>
                  <button
                    onClick={() => copyToClipboard('Write 8 cover image tagline options for my LinkedIn profile. I need options in different styles — some outcome-focused, some identity-based, some question-based. My name: [optional] My role: [e.g. LinkedIn Content Strategist and Career Coach] My niche: [e.g. Helping professionals build a LinkedIn presence that works] My audience: [e.g. Working professionals and students] Tone options I like: [e.g. Bold, warm, direct] My brand name if any: [e.g. OwnUrGrowth] For each tagline suggest where it would work best — profile, newsletter banner, or course landing page.', 'tagline-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'tagline-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (For Personal Brand Builders)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 5 cover image taglines for someone building a personal brand on LinkedIn. They want people to immediately understand what they stand for when they land on the profile. Core message: [e.g. You do not need a top college or connections to build a career you are proud of]. Keep each under 10 words. Make it feel like a belief statement, not a service description."</p>
                  <button
                    onClick={() => copyToClipboard('Write 5 cover image taglines for someone building a personal brand on LinkedIn. They want people to immediately understand what they stand for when they land on the profile. Core message: [e.g. You do not need a top college or connections to build a career you are proud of]. Keep each under 10 words. Make it feel like a belief statement, not a service description.', 'tagline-brand')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'tagline-brand' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"Your college name is not your ceiling."</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"My current cover image tagline is: [paste current tagline]. It feels [e.g. too generic / too long / unclear]. Rewrite it into 5 sharper versions that say the same thing more memorably. Keep each under 12 words."</p>
                  <button
                    onClick={() => copyToClipboard('My current cover image tagline is: [paste current tagline]. It feels [e.g. too generic / too long / unclear]. Rewrite it into 5 sharper versions that say the same thing more memorably. Keep each under 12 words.', 'tagline-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'tagline-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Cover Image Taglines:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Keep it under 10-12 words for maximum impact</li>
              <li>• Focus on the outcome you deliver, not what you do</li>
              <li>• Use active language and strong verbs</li>
              <li>• Make it specific to your niche and audience</li>
              <li>• Test different versions and see what resonates</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 5: Connection Request Note",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Your connection request note is your first impression on LinkedIn. Create personalized, genuine messages that get accepted and start meaningful professional relationships.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn connection request note under 200 characters. I am sending it to a [their role] at [their company]. I want to connect because [one genuine reason]. Make it feel human, not copy-pasted."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn connection request note under 200 characters. I am sending it to a [their role] at [their company]. I want to connect because [one genuine reason]. Make it feel human, not copy-pasted.', 'connection-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'connection-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"Hi [Name], your post on burnout in tech really resonated. I am a fellow engineer navigating similar challenges — would love to connect and learn from your perspective."</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 3 LinkedIn connection request notes under 250 characters each. Who I am sending it to: [their role and company] Why I genuinely want to connect: [honest reason] Something specific about them I noticed: [a post, achievement, or detail from their profile] My background in one line: [who I am] Do not mention jobs, referrals, or asks. Keep it purely about connecting."</p>
                  <button
                    onClick={() => copyToClipboard('Write 3 LinkedIn connection request notes under 250 characters each. Who I am sending it to: [their role and company] Why I genuinely want to connect: [honest reason] Something specific about them I noticed: [a post, achievement, or detail from their profile] My background in one line: [who I am] Do not mention jobs, referrals, or asks. Keep it purely about connecting.', 'connection-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'connection-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 5 LinkedIn connection request notes for me, each under 280 characters. Recipient details: [their role, company, and anything notable about them] Specific thing I noticed about them: [post content, career milestone, something from their profile] Genuine reason for connecting: [what draws me to them] My background: [who I am in one line] My goal with this connection long term: [e.g. learn from them, be in their network, potential collaboration] Write 5 different tones — professional, conversational, curiosity-led, compliment-led, and shared interest-led."</p>
                  <button
                    onClick={() => copyToClipboard('Write 5 LinkedIn connection request notes for me, each under 280 characters. Recipient details: [their role, company, and anything notable about them] Specific thing I noticed about them: [post content, career milestone, something from their profile] Genuine reason for connecting: [what draws me to them] My background: [who I am in one line] My goal with this connection long term: [e.g. learn from them, be in their network, potential collaboration] Write 5 different tones — professional, conversational, curiosity-led, compliment-led, and shared interest-led.', 'connection-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'connection-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (For Students Reaching Out to Seniors)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 5 LinkedIn connection request notes from a college student reaching out to a senior professional or alumni. The student is from [college name or tier] in [branch/field]. They are reaching out to someone who is now at [company or role]. They want to [reason — e.g. learn about their career path, get advice, understand their industry]. Keep each under 250 characters. Make them respectful but not overly formal or sycophantic."</p>
                  <button
                    onClick={() => copyToClipboard('Write 5 LinkedIn connection request notes from a college student reaching out to a senior professional or alumni. The student is from [college name or tier] in [branch/field]. They are reaching out to someone who is now at [company or role]. They want to [reason — e.g. learn about their career path, get advice, understand their industry]. Keep each under 250 characters. Make them respectful but not overly formal or sycophantic.', 'connection-student')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'connection-student' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"Hi [Name], came across your profile while researching careers in product management. Your journey from engineering to PM at [Company] is exactly the path I am trying to understand. Would love to connect."</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Here is my current connection request note: [paste note]. It feels [e.g. too generic / too formal / too long]. Rewrite it into 3 better versions — one short and punchy, one warm and personal, one curiosity-driven. All under 280 characters."</p>
                  <button
                    onClick={() => copyToClipboard('Here is my current connection request note: [paste note]. It feels [e.g. too generic / too formal / too long]. Rewrite it into 3 better versions — one short and punchy, one warm and personal, one curiosity-driven. All under 280 characters.', 'connection-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'connection-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Connection Requests:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Always personalize with something specific from their profile</li>
              <li>• Keep it under 280 characters to avoid truncation</li>
              <li>• Focus on genuine connection, not what you want from them</li>
              <li>• Mention a shared interest, mutual connection, or their content</li>
              <li>• Be authentic and avoid generic templates</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 6: Cold Outreach DM",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Cold outreach on LinkedIn requires finesse. Create messages that build genuine connections before making asks, leading to higher response rates and meaningful conversations.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn DM under 100 words to [describe the person — their role and why you are reaching out]. My ask is [one specific thing]. Lead with something genuine about them before making the ask."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn DM under 100 words to [describe the person — their role and why you are reaching out]. My ask is [one specific thing]. Lead with something genuine about them before making the ask.', 'outreach-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'outreach-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn cold outreach DM for me. Who I am messaging: [their role, company, and something specific about them] What I noticed about them: [a post, their career story, something from their profile] What I want: [specific ask — referral, advice call, collaboration] My background: [who I am in one line] Instruction: Do not open with the ask. Build genuine context first. Keep the full message under 120 words."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn cold outreach DM for me. Who I am messaging: [their role, company, and something specific about them] What I noticed about them: [a post, their career story, something from their profile] What I want: [specific ask — referral, advice call, collaboration] My background: [who I am in one line] Instruction: Do not open with the ask. Build genuine context first. Keep the full message under 120 words.', 'outreach-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'outreach-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn cold outreach DM for me. Recipient: [name, role, company] Something personal or professional I know about them: [post they wrote, book they published, achievement, interest] Why I specifically chose them and not someone else: [be specific] My ask: [exactly what I want — a 15 min call, a referral, feedback on my work] My background: [who I am and why I am relevant] Tone: [e.g. confident but not desperate, warm but professional] Length: under 150 words. Write 3 versions — one that leads with their content, one that leads with a shared experience, and one that leads with a specific question about their work."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn cold outreach DM for me. Recipient: [name, role, company] Something personal or professional I know about them: [post they wrote, book they published, achievement, interest] Why I specifically chose them and not someone else: [be specific] My ask: [exactly what I want — a 15 min call, a referral, feedback on my work] My background: [who I am and why I am relevant] Tone: [e.g. confident but not desperate, warm but professional] Length: under 150 words. Write 3 versions — one that leads with their content, one that leads with a shared experience, and one that leads with a specific question about their work.', 'outreach-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'outreach-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (For Referral Requests)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn DM to ask for a referral at [company name]. I am reaching out to a [their role] who works there. I know [specific thing about them — post, interest, or background]. My background: [relevant details — college, skills, projects, internships]. The role I am applying for: [job title and department]. Instruction: Do not ask for the referral in the first message. Build a genuine connection first. Write two messages — the first one that builds rapport, and the second follow-up where the referral request is made naturally."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn DM to ask for a referral at [company name]. I am reaching out to a [their role] who works there. I know [specific thing about them — post, interest, or background]. My background: [relevant details — college, skills, projects, internships]. The role I am applying for: [job title and department]. Instruction: Do not ask for the referral in the first message. Build a genuine connection first. Write two messages — the first one that builds rapport, and the second follow-up where the referral request is made naturally.', 'outreach-referral')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'outreach-referral' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-[#2C2E3A] mb-1">Message 1:</p>
                      <p className="text-base text-[#2C2E3A] italic">"Hi [Name], came across your post about your journey from a tier 3 college to [Company] — the part about how you approached your system design prep was genuinely useful. I am in a similar position right now. Would love to connect and hear more about your experience if you are open to it."</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#2C2E3A] mb-1">Message 2:</p>
                      <p className="text-base text-[#2C2E3A] italic">"Hi [Name], really appreciated our last conversation — your advice about focusing on distributed systems concepts changed how I am approaching prep. I wanted to ask — I have applied for the SWE role at [Company] and was wondering if a referral is something you would be comfortable with, given my background. No pressure at all if not — just thought it was worth asking."</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Here is a cold outreach DM I sent that got no response: [paste message]. Analyse what is wrong with it and rewrite it into a version that is more likely to get a reply. Explain the two or three key changes you made and why."</p>
                  <button
                    onClick={() => copyToClipboard('Here is a cold outreach DM I sent that got no response: [paste message]. Analyse what is wrong with it and rewrite it into a version that is more likely to get a reply. Explain the two or three key changes you made and why.', 'outreach-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'outreach-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Cold Outreach:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Never lead with your ask — build context and rapport first</li>
              <li>• Reference something specific from their profile or content</li>
              <li>• Keep messages under 150 words for better response rates</li>
              <li>• Be specific about what you want and why you chose them</li>
              <li>• Follow up thoughtfully if no response after a week</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 7: Follow-Up Message",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Follow-up messages are crucial for LinkedIn networking success. Create thoughtful, non-pushy follow-ups that maintain relationships and increase your response rates.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a short LinkedIn follow-up message under 50 words. I messaged [their role] about [topic] around [X] days ago and got no reply. Be polite and confident. Do not repeat the full ask."</p>
                  <button
                    onClick={() => copyToClipboard('Write a short LinkedIn follow-up message under 50 words. I messaged [their role] about [topic] around [X] days ago and got no reply. Be polite and confident. Do not repeat the full ask.', 'followup-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'followup-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"Hi [Name], just circling back on my message from last week — completely understand if things are busy. Wanted to make sure it did not get buried. No rush at all."</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 3 follow-up LinkedIn messages for the same scenario — one sent after 3 days, one after 7 days, and one final message after 14 days. Context: I reached out to [their role] about [what I asked for]. They have not responded. Tone: Polite, professional, not desperate. Each message should be under 70 words and feel slightly different in approach."</p>
                  <button
                    onClick={() => copyToClipboard('Write 3 follow-up LinkedIn messages for the same scenario — one sent after 3 days, one after 7 days, and one final message after 14 days. Context: I reached out to [their role] about [what I asked for]. They have not responded. Tone: Polite, professional, not desperate. Each message should be under 70 words and feel slightly different in approach.', 'followup-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'followup-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write follow-up messages for a LinkedIn outreach sequence. Original message topic: [what I asked for] Who I messaged: [their role and context] Follow-up 1 (3 days): Gentle, assume they are busy, restate value briefly. Follow-up 2 (7 days): Slightly more direct, add a new piece of value or context. Follow-up 3 (14 days): Final message, leave the door open for the future without pressure. Keep each under 80 words. Make all three feel like natural, human messages not a sales sequence."</p>
                  <button
                    onClick={() => copyToClipboard('Write follow-up messages for a LinkedIn outreach sequence. Original message topic: [what I asked for] Who I messaged: [their role and context] Follow-up 1 (3 days): Gentle, assume they are busy, restate value briefly. Follow-up 2 (7 days): Slightly more direct, add a new piece of value or context. Follow-up 3 (14 days): Final message, leave the door open for the future without pressure. Keep each under 80 words. Make all three feel like natural, human messages not a sales sequence.', 'followup-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'followup-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (After a Networking Event or Webinar)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn follow-up message to someone I met or interacted with at [event name or webinar topic]. We [briefly describe the interaction — commented on the same post, were both in a LinkedIn Live, etc.]. I want to continue the conversation and [what I want — stay in touch, ask a question, collaborate]. Keep it under 100 words. Reference the specific event or interaction so it does not feel cold."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn follow-up message to someone I met or interacted with at [event name or webinar topic]. We [briefly describe the interaction — commented on the same post, were both in a LinkedIn Live, etc.]. I want to continue the conversation and [what I want — stay in touch, ask a question, collaborate]. Keep it under 100 words. Reference the specific event or interaction so it does not feel cold.', 'followup-event')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'followup-event' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"My follow-up message got ignored again. Here it is: [paste message]. What is it doing wrong? Rewrite it into a version that feels warmer, more genuine, and less like a follow-up script. Keep it under 70 words."</p>
                  <button
                    onClick={() => copyToClipboard('My follow-up message got ignored again. Here it is: [paste message]. What is it doing wrong? Rewrite it into a version that feels warmer, more genuine, and less like a follow-up script. Keep it under 70 words.', 'followup-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'followup-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Follow-Up Messages:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Wait 3-7 days before your first follow-up</li>
              <li>• Keep follow-ups shorter than your original message</li>
              <li>• Add new value or context in each follow-up</li>
              <li>• Never sound desperate or pushy — stay professional</li>
              <li>• Limit yourself to 3 follow-ups maximum</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 8: Meaningful Comment",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">LinkedIn comments are powerful for building visibility and relationships. Create thoughtful comments that add genuine value and get you noticed by the right people.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a thoughtful LinkedIn comment for this post: [paste post]. My background: [one line about who you are]. Make it add genuine value, not just praise. Under 60 words."</p>
                  <button
                    onClick={() => copyToClipboard('Write a thoughtful LinkedIn comment for this post: [paste post]. My background: [one line about who you are]. Make it add genuine value, not just praise. Under 60 words.', 'comment-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'comment-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 3 different LinkedIn comments for the following post: [paste post]. My background and perspective: [who I am and what I know about this topic] Comment 1: Add a new perspective or insight. Comment 2: Share a relevant personal experience. Comment 3: Ask a specific, thoughtful question. Each comment should be between 40 and 80 words."</p>
                  <button
                    onClick={() => copyToClipboard('Write 3 different LinkedIn comments for the following post: [paste post]. My background and perspective: [who I am and what I know about this topic] Comment 1: Add a new perspective or insight. Comment 2: Share a relevant personal experience. Comment 3: Ask a specific, thoughtful question. Each comment should be between 40 and 80 words.', 'comment-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'comment-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 5 LinkedIn comments for the following post: [paste post]. My background: [your role and relevant expertise] My goal with this comment: [e.g. get noticed by the author / add value to the discussion / grow my profile visibility] Write 5 different styles: A new perspective that respectfully adds to the post. A personal experience that validates or complicates the post's point. A follow-up question that invites the author to go deeper. A contrarian view that starts a healthy debate. A data point or example that strengthens the post's argument. Each between 50 and 90 words. No generic praise."</p>
                  <button
                    onClick={() => copyToClipboard('Write 5 LinkedIn comments for the following post: [paste post]. My background: [your role and relevant expertise] My goal with this comment: [e.g. get noticed by the author / add value to the discussion / grow my profile visibility] Write 5 different styles: A new perspective that respectfully adds to the post. A personal experience that validates or complicates the post\'s point. A follow-up question that invites the author to go deeper. A contrarian view that starts a healthy debate. A data point or example that strengthens the post\'s argument. Each between 50 and 90 words. No generic praise.', 'comment-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'comment-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (Commenting to Get Noticed by a Recruiter or Founder)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn comment designed to get me noticed by [a recruiter / a founder / a senior professional] who posted the following: [paste post]. My goal is to appear smart, relevant, and worth connecting with. My background: [who I am and what I do]. The comment should feel genuine and add real value — not performative. Under 80 words."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn comment designed to get me noticed by [a recruiter / a founder / a senior professional] who posted the following: [paste post]. My goal is to appear smart, relevant, and worth connecting with. My background: [who I am and what I do]. The comment should feel genuine and add real value — not performative. Under 80 words.', 'comment-recruiter')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'comment-recruiter' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Here is a comment I left on a LinkedIn post: [paste comment]. It got very little engagement. Analyse what it is doing wrong and rewrite it into a version that is more likely to get a reply from the author or visibility in the comment section. Keep it under 80 words."</p>
                  <button
                    onClick={() => copyToClipboard('Here is a comment I left on a LinkedIn post: [paste comment]. It got very little engagement. Analyse what it is doing wrong and rewrite it into a version that is more likely to get a reply from the author or visibility in the comment section. Keep it under 80 words.', 'comment-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'comment-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Meaningful Comments:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Add value, don't just agree or praise the post</li>
              <li>• Share specific examples or personal experiences</li>
              <li>• Ask thoughtful questions that invite deeper discussion</li>
              <li>• Be early — comment within the first hour for maximum visibility</li>
              <li>• Engage with other commenters to build relationships</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 9: Post Idea Generation",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Never run out of content ideas again. Generate engaging LinkedIn post concepts that resonate with your audience and showcase your expertise across different content types.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Give me 10 LinkedIn post ideas for someone in [your niche — e.g. tech career coaching]. Mix personal stories, educational content, and opinions. One line per idea."</p>
                  <button
                    onClick={() => copyToClipboard('Give me 10 LinkedIn post ideas for someone in [your niche — e.g. tech career coaching]. Mix personal stories, educational content, and opinions. One line per idea.', 'postidea-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'postidea-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Generate 7 LinkedIn post ideas for me. My niche: [e.g. Career growth in tech] My audience: [e.g. Students and early-career engineers] My recent experiences or thoughts: [e.g. just helped someone crack Google, thinking about the role of networking in job searches] For each idea include: content type, suggested hook, and one line description of the body."</p>
                  <button
                    onClick={() => copyToClipboard('Generate 7 LinkedIn post ideas for me. My niche: [e.g. Career growth in tech] My audience: [e.g. Students and early-career engineers] My recent experiences or thoughts: [e.g. just helped someone crack Google, thinking about the role of networking in job searches] For each idea include: content type, suggested hook, and one line description of the body.', 'postidea-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'postidea-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Generate a full LinkedIn content ideation list for me — 20 post ideas across all 6 content types. My niche: [e.g. LinkedIn growth and personal branding] My audience: [e.g. Working professionals who want to grow their LinkedIn] My personal experiences I can draw from: [list 3 to 5 things that happened to you recently] My opinions I hold strongly: [list 2 to 3 opinions you have about your industry] Distribute ideas across: personal stories, educational how-to, industry opinions, behind the scenes, career milestones, and polls. For each idea give: content type, hook, body summary, and suggested CTA."</p>
                  <button
                    onClick={() => copyToClipboard('Generate a full LinkedIn content ideation list for me — 20 post ideas across all 6 content types. My niche: [e.g. LinkedIn growth and personal branding] My audience: [e.g. Working professionals who want to grow their LinkedIn] My personal experiences I can draw from: [list 3 to 5 things that happened to you recently] My opinions I hold strongly: [list 2 to 3 opinions you have about your industry] Distribute ideas across: personal stories, educational how-to, industry opinions, behind the scenes, career milestones, and polls. For each idea give: content type, hook, body summary, and suggested CTA.', 'postidea-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'postidea-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (For Students During Placement Season)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Generate 10 LinkedIn post ideas for a final year engineering student going through campus placements. The content should feel real and relatable to other students in the same situation. Mix of: lessons from interviews, preparation tips, honest reflections, small wins, and motivational content that does not feel forced. For each idea give a suggested hook line."</p>
                  <button
                    onClick={() => copyToClipboard('Generate 10 LinkedIn post ideas for a final year engineering student going through campus placements. The content should feel real and relatable to other students in the same situation. Mix of: lessons from interviews, preparation tips, honest reflections, small wins, and motivational content that does not feel forced. For each idea give a suggested hook line.', 'postidea-student')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'postidea-student' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <div className="space-y-2">
                    <p className="text-base text-[#2C2E3A]"><span className="font-semibold">Post idea:</span> <span className="italic">The one mistake I kept making in every technical interview before I figured out what was wrong.</span></p>
                    <p className="text-base text-[#2C2E3A]"><span className="font-semibold">Hook:</span> <span className="italic">"I failed the same round in 7 different companies before I understood why."</span></p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"I posted these topics recently and they did not perform well: [list 3 to 5 post topics]. Analyse why they might have underperformed and suggest 10 new post ideas that cover similar themes but are more likely to get engagement. Explain what you changed for each."</p>
                  <button
                    onClick={() => copyToClipboard('I posted these topics recently and they did not perform well: [list 3 to 5 post topics]. Analyse why they might have underperformed and suggest 10 new post ideas that cover similar themes but are more likely to get engagement. Explain what you changed for each.', 'postidea-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'postidea-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Post Idea Generation:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Mix content types: personal stories, educational, opinions, behind-the-scenes</li>
              <li>• Draw from recent experiences and conversations you've had</li>
              <li>• Address common pain points your audience faces</li>
              <li>• Share contrarian views that spark healthy debate</li>
              <li>• Create content batches to maintain consistency</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 10: Full LinkedIn Post Writing",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Transform your ideas into compelling LinkedIn posts that engage your audience and drive meaningful conversations. Get complete posts written with proper structure and tone.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn post about [your topic or idea] for [your audience]. Hook in the first two lines, value in the body, soft CTA at the end. Under 150 words. Tone: [conversational / professional / inspirational]."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn post about [your topic or idea] for [your audience]. Hook in the first two lines, value in the body, soft CTA at the end. Under 150 words. Tone: [conversational / professional / inspirational].', 'fullpost-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'fullpost-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn post for me. Topic or rough idea: [describe your idea in a few sentences or bullet points] Target audience: [who this is for] Key message or lesson: [what you want them to take away] Tone: [e.g. honest, personal, no fluff] Length: 150 to 200 words. Structure: Strong hook, story or explanation in the body, takeaway, CTA."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn post for me. Topic or rough idea: [describe your idea in a few sentences or bullet points] Target audience: [who this is for] Key message or lesson: [what you want them to take away] Tone: [e.g. honest, personal, no fluff] Length: 150 to 200 words. Structure: Strong hook, story or explanation in the body, takeaway, CTA.', 'fullpost-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'fullpost-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a complete LinkedIn post for me. Topic: [your full idea with any relevant details or bullet points] Audience: [detailed description of who is reading this] Hook style I want: [e.g. bold statement / surprising fact / relatable situation / question] Body structure: [e.g. personal story leading to a lesson / step-by-step breakdown / contrasting comparison] Key lesson or takeaway: [the one thing you want them to remember] Tone: [detailed tone description — e.g. like talking to a smart friend, not a corporate presentation] CTA: [what you want them to do — comment, follow, DM, share] Length: 200 to 250 words. Also write 3 alternative hook options I can choose from."</p>
                  <button
                    onClick={() => copyToClipboard('Write a complete LinkedIn post for me. Topic: [your full idea with any relevant details or bullet points] Audience: [detailed description of who is reading this] Hook style I want: [e.g. bold statement / surprising fact / relatable situation / question] Body structure: [e.g. personal story leading to a lesson / step-by-step breakdown / contrasting comparison] Key lesson or takeaway: [the one thing you want them to remember] Tone: [detailed tone description — e.g. like talking to a smart friend, not a corporate presentation] CTA: [what you want them to do — comment, follow, DM, share] Length: 200 to 250 words. Also write 3 alternative hook options I can choose from.', 'fullpost-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'fullpost-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (Personal Milestone Post)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn post about a personal milestone I recently achieved: [describe the milestone — e.g. got my first job, hit 10K followers, launched a product]. Make it feel genuine and humble, not braggy. Include the story of what it took to get here, one lesson learned, and a line of encouragement for others in a similar journey. Under 200 words."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn post about a personal milestone I recently achieved: [describe the milestone — e.g. got my first job, hit 10K followers, launched a product]. Make it feel genuine and humble, not braggy. Include the story of what it took to get here, one lesson learned, and a line of encouragement for others in a similar journey. Under 200 words.', 'fullpost-milestone')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'fullpost-milestone' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"Six months ago I was refreshing my email every hour waiting for an offer letter. Today I signed with [Company]. The honest version of this story is not inspiring in a clean way. I applied to 38 companies. I got 6 first rounds. 2 reached the final stage. 1 said yes. The thing that changed between application 1 and application 38 was not luck — it was that I stopped applying to everything and started applying to the right things with a much sharper story about why I was the right person. If you are in the middle of a job search right now and it feels like nothing is working — it is probably not your resume. It is your targeting. Happy to share what changed for me if it helps. Drop a comment or DM."</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Here is a LinkedIn post I wrote: [paste post]. It performed below my expectations. Analyse what is weak about it — the hook, the structure, the CTA, or the clarity — and rewrite it into a stronger version. Keep the same core message but make it significantly more engaging. Explain your changes."</p>
                  <button
                    onClick={() => copyToClipboard('Here is a LinkedIn post I wrote: [paste post]. It performed below my expectations. Analyse what is weak about it — the hook, the structure, the CTA, or the clarity — and rewrite it into a stronger version. Keep the same core message but make it significantly more engaging. Explain your changes.', 'fullpost-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'fullpost-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for LinkedIn Post Writing:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Start with a strong hook that stops the scroll</li>
              <li>• Keep paragraphs short (1-2 sentences) for readability</li>
              <li>• Include a clear takeaway or lesson for your audience</li>
              <li>• End with a soft CTA that invites engagement</li>
              <li>• Use line breaks and emojis strategically for visual appeal</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 11: Hook Writing",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Master the art of writing compelling hooks that stop the scroll and draw readers into your LinkedIn posts. Create opening lines that demand attention and drive engagement.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 10 hook options for a LinkedIn post about [your topic]. Each hook should be the first one to two lines of a post. Make them varied — some bold statements, some questions, some surprising facts."</p>
                  <button
                    onClick={() => copyToClipboard('Write 10 hook options for a LinkedIn post about [your topic]. Each hook should be the first one to two lines of a post. Make them varied — some bold statements, some questions, some surprising facts.', 'hook-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'hook-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 10 LinkedIn post hooks for the following topic: [your topic]. My audience: [who will read this] My angle or main point: [what the post argues or teaches] Write hooks in 5 different styles: bold statement, counterintuitive claim, relatable situation, specific number or data, and personal confession. Two hooks per style."</p>
                  <button
                    onClick={() => copyToClipboard('Write 10 LinkedIn post hooks for the following topic: [your topic]. My audience: [who will read this] My angle or main point: [what the post argues or teaches] Write hooks in 5 different styles: bold statement, counterintuitive claim, relatable situation, specific number or data, and personal confession. Two hooks per style.', 'hook-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'hook-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 15 LinkedIn post hooks for the following topic and angle: [describe topic and main argument in detail]. My audience: [detailed audience description] The emotion I want to trigger in the first two lines: [curiosity / discomfort / recognition / surprise / motivation] Hooks I already tried that did not work: [paste any previous hooks] Write hooks across these styles: bold claim, vulnerable confession, surprising statistic, contrarian take, relatable failure, future prediction, and specific scenario. At least 2 per style. Rate each hook on a scale of 1 to 10 for likely scroll-stopping power and explain why."</p>
                  <button
                    onClick={() => copyToClipboard('Write 15 LinkedIn post hooks for the following topic and angle: [describe topic and main argument in detail]. My audience: [detailed audience description] The emotion I want to trigger in the first two lines: [curiosity / discomfort / recognition / surprise / motivation] Hooks I already tried that did not work: [paste any previous hooks] Write hooks across these styles: bold claim, vulnerable confession, surprising statistic, contrarian take, relatable failure, future prediction, and specific scenario. At least 2 per style. Rate each hook on a scale of 1 to 10 for likely scroll-stopping power and explain why.', 'hook-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'hook-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (Hooks for Educational Posts)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write 10 hooks specifically for educational LinkedIn posts in the [your niche] space. These posts teach something practical. The hooks should make people think — I did not know that — or — I need to read this. Each hook should be under 2 lines and create a clear knowledge gap that the post promises to fill."</p>
                  <button
                    onClick={() => copyToClipboard('Write 10 hooks specifically for educational LinkedIn posts in the [your niche] space. These posts teach something practical. The hooks should make people think — I did not know that — or — I need to read this. Each hook should be under 2 lines and create a clear knowledge gap that the post promises to fill.', 'hook-educational')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'hook-educational' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <p className="text-base text-[#2C2E3A] italic">"Most people prepare for system design interviews the wrong way. Here is the exact framework that changed everything for me."</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Here are 5 hooks I wrote. Rate each one on scroll-stopping potential and explain why. Then rewrite each one into a stronger version. Hook 1: [paste] Hook 2: [paste] Hook 3: [paste] Hook 4: [paste] Hook 5: [paste]"</p>
                  <button
                    onClick={() => copyToClipboard('Here are 5 hooks I wrote. Rate each one on scroll-stopping potential and explain why. Then rewrite each one into a stronger version. Hook 1: [paste] Hook 2: [paste] Hook 3: [paste] Hook 4: [paste] Hook 5: [paste]', 'hook-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'hook-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Hook Writing:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Create curiosity gaps that demand to be filled</li>
              <li>• Use specific numbers and data points for credibility</li>
              <li>• Start with contrarian or counterintuitive statements</li>
              <li>• Make it personal and vulnerable when appropriate</li>
              <li>• Test multiple hooks for the same post to see what works</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 12: Content Calendar",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Plan your LinkedIn content strategically with organized calendars that ensure consistent posting, varied content types, and audience engagement. Never run out of content ideas again.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Create a 2-week LinkedIn content calendar for someone in [your niche]. Include post topic, content type, and suggested posting day for each. Keep it simple."</p>
                  <button
                    onClick={() => copyToClipboard('Create a 2-week LinkedIn content calendar for someone in [your niche]. Include post topic, content type, and suggested posting day for each. Keep it simple.', 'calendar-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'calendar-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Create a 30-day LinkedIn content calendar for me. My niche: [e.g. career coaching for tech professionals] My audience: [e.g. students and early career engineers] Posting frequency: [e.g. 5 times a week] Content mix I want: [e.g. 2 educational, 1 personal story, 1 opinion, 1 engagement post per week] Include: date, content type, topic, hook idea, and CTA for each post."</p>
                  <button
                    onClick={() => copyToClipboard('Create a 30-day LinkedIn content calendar for me. My niche: [e.g. career coaching for tech professionals] My audience: [e.g. students and early career engineers] Posting frequency: [e.g. 5 times a week] Content mix I want: [e.g. 2 educational, 1 personal story, 1 opinion, 1 engagement post per week] Include: date, content type, topic, hook idea, and CTA for each post.', 'calendar-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'calendar-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Create a full 30-day LinkedIn content calendar for me. My niche: [detailed description] My audience: [detailed description] My personal experiences I can draw from this month: [list recent events, lessons, or observations] Content types to include each week: personal story, educational, opinion, behind the scenes, poll, and one meme or motivational post. Upcoming dates relevant to my audience: [e.g. placement season, a product launch, a festival, an industry event] For each post include: day and date, content type, topic and angle, suggested hook, estimated reading time, and CTA."</p>
                  <button
                    onClick={() => copyToClipboard('Create a full 30-day LinkedIn content calendar for me. My niche: [detailed description] My audience: [detailed description] My personal experiences I can draw from this month: [list recent events, lessons, or observations] Content types to include each week: personal story, educational, opinion, behind the scenes, poll, and one meme or motivational post. Upcoming dates relevant to my audience: [e.g. placement season, a product launch, a festival, an industry event] For each post include: day and date, content type, topic and angle, suggested hook, estimated reading time, and CTA.', 'calendar-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'calendar-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (First Month on LinkedIn)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Create a content calendar for someone posting on LinkedIn for the very first time. They are a [describe the person — e.g. final year engineering student]. They are just starting and want to build a presence, test different content types, and find what works. Create a 30-day plan with one post per day. Keep topics beginner-friendly — no need for deep expertise, just genuine personal experiences and learnings. Include a variety of formats across the month."</p>
                  <button
                    onClick={() => copyToClipboard('Create a content calendar for someone posting on LinkedIn for the very first time. They are a [describe the person — e.g. final year engineering student]. They are just starting and want to build a presence, test different content types, and find what works. Create a 30-day plan with one post per day. Keep topics beginner-friendly — no need for deep expertise, just genuine personal experiences and learnings. Include a variety of formats across the month.', 'calendar-beginner')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'calendar-beginner' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Here is my current content calendar for the month: [paste calendar]. Identify any gaps — missing content types, repetitive topics, lack of variety in hooks or formats — and suggest improvements. Then rewrite the calendar with the suggested changes integrated."</p>
                  <button
                    onClick={() => copyToClipboard('Here is my current content calendar for the month: [paste calendar]. Identify any gaps — missing content types, repetitive topics, lack of variety in hooks or formats — and suggest improvements. Then rewrite the calendar with the suggested changes integrated.', 'calendar-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'calendar-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Content Calendar Planning:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Mix content types to keep your audience engaged</li>
              <li>• Plan around industry events and seasonal trends</li>
              <li>• Batch create content to maintain consistency</li>
              <li>• Leave room for spontaneous, timely posts</li>
              <li>• Track performance to refine your content strategy</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 13: Newsletter Topic Ideas",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Build a successful LinkedIn newsletter with strategic topic planning. Generate compelling edition ideas that keep subscribers engaged and attract new readers consistently.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Give me 10 LinkedIn newsletter topic ideas for someone in [your niche]. Each idea should be specific enough to build an entire edition around. One line per idea."</p>
                  <button
                    onClick={() => copyToClipboard('Give me 10 LinkedIn newsletter topic ideas for someone in [your niche]. Each idea should be specific enough to build an entire edition around. One line per idea.', 'newsletter-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'newsletter-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Generate 15 LinkedIn newsletter edition ideas for me. My niche: [e.g. career growth in tech] My audience: [e.g. students and early-career engineers] My newsletter publishing frequency: [e.g. bi-weekly] Mix the ideas across: educational deep-dives, personal stories, industry trends, practical guides, and opinion pieces. For each idea give a title and a one line description."</p>
                  <button
                    onClick={() => copyToClipboard('Generate 15 LinkedIn newsletter edition ideas for me. My niche: [e.g. career growth in tech] My audience: [e.g. students and early-career engineers] My newsletter publishing frequency: [e.g. bi-weekly] Mix the ideas across: educational deep-dives, personal stories, industry trends, practical guides, and opinion pieces. For each idea give a title and a one line description.', 'newsletter-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'newsletter-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Generate a full 3-month content plan for my LinkedIn newsletter. Newsletter name: [your newsletter name] Niche: [detailed description] Audience: [detailed description] Publishing frequency: [weekly, bi-weekly, or monthly] Themes I want to cover in the next 3 months: [list any topics, trends, or experiences you want to explore] For each edition suggest: edition number, title, main topic, key sections to cover, and a hook for the opening paragraph."</p>
                  <button
                    onClick={() => copyToClipboard('Generate a full 3-month content plan for my LinkedIn newsletter. Newsletter name: [your newsletter name] Niche: [detailed description] Audience: [detailed description] Publishing frequency: [weekly, bi-weekly, or monthly] Themes I want to cover in the next 3 months: [list any topics, trends, or experiences you want to explore] For each edition suggest: edition number, title, main topic, key sections to cover, and a hook for the opening paragraph.', 'newsletter-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'newsletter-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (For a Brand New Newsletter)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"I am launching a LinkedIn newsletter for the first time. My niche is [your niche]. My audience is [your audience]. Help me plan the first 6 editions. For each edition suggest a title, a clear topic, why this topic is the right one for that stage of building an audience, and what the reader should walk away knowing or feeling after reading it."</p>
                  <button
                    onClick={() => copyToClipboard('I am launching a LinkedIn newsletter for the first time. My niche is [your niche]. My audience is [your audience]. Help me plan the first 6 editions. For each edition suggest a title, a clear topic, why this topic is the right one for that stage of building an audience, and what the reader should walk away knowing or feeling after reading it.', 'newsletter-launch')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'newsletter-launch' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Here is the topic idea for my next newsletter edition: [describe topic]. It feels broad and unfocused. Help me narrow it down into a specific, compelling angle that would make someone immediately want to read it. Suggest 5 sharper versions of the same topic with different angles and explain which one would perform best and why."</p>
                  <button
                    onClick={() => copyToClipboard('Here is the topic idea for my next newsletter edition: [describe topic]. It feels broad and unfocused. Help me narrow it down into a specific, compelling angle that would make someone immediately want to read it. Suggest 5 sharper versions of the same topic with different angles and explain which one would perform best and why.', 'newsletter-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'newsletter-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Newsletter Topic Planning:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Focus on specific, actionable topics rather than broad themes</li>
              <li>• Mix educational content with personal stories and industry insights</li>
              <li>• Plan topics around seasonal trends and industry events</li>
              <li>• Create series or multi-part topics to build anticipation</li>
              <li>• Survey your audience to understand what they want to read</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 14: Newsletter Edition Writing",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Transform your newsletter ideas into compelling, well-structured editions that engage readers and build your authority. Get complete newsletter content written with professional formatting and flow.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a short LinkedIn newsletter edition on [your topic] for [your audience]. Keep it under 400 words. Opening hook, main insight, key takeaway, and CTA."</p>
                  <button
                    onClick={() => copyToClipboard('Write a short LinkedIn newsletter edition on [your topic] for [your audience]. Keep it under 400 words. Opening hook, main insight, key takeaway, and CTA.', 'newsletter-edition-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'newsletter-edition-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn newsletter edition for me. Topic: [your topic] Audience: [who is reading] Main insight or lesson: [the core thing you want to communicate] Personal story or example to include: [any real experience that relates] Length: 500 to 700 words. Structure: Opening hook, context, main content in 2 to 3 sections, key takeaway, CTA."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn newsletter edition for me. Topic: [your topic] Audience: [who is reading] Main insight or lesson: [the core thing you want to communicate] Personal story or example to include: [any real experience that relates] Length: 500 to 700 words. Structure: Opening hook, context, main content in 2 to 3 sections, key takeaway, CTA.', 'newsletter-edition-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'newsletter-edition-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a full LinkedIn newsletter edition for me. Newsletter name: [your newsletter name] Edition number and title: [e.g. Edition 12 — The One Mistake That Kills Most LinkedIn Profiles] Topic: [detailed description of what this edition covers] Main argument or thesis: [what you want the reader to believe or do differently after reading] Personal story or case study to include: [real experience] Data points or examples to reference: [any stats, studies, or examples you know of] Tone: [e.g. direct, honest, like a smart friend giving advice] Sections to include: opening hook, background or context, main insight broken into 2 to 3 parts, common mistakes related to the topic, action steps, closing thought, CTA. Length: 800 to 1000 words."</p>
                  <button
                    onClick={() => copyToClipboard('Write a full LinkedIn newsletter edition for me. Newsletter name: [your newsletter name] Edition number and title: [e.g. Edition 12 — The One Mistake That Kills Most LinkedIn Profiles] Topic: [detailed description of what this edition covers] Main argument or thesis: [what you want the reader to believe or do differently after reading] Personal story or case study to include: [real experience] Data points or examples to reference: [any stats, studies, or examples you know of] Tone: [e.g. direct, honest, like a smart friend giving advice] Sections to include: opening hook, background or context, main insight broken into 2 to 3 parts, common mistakes related to the topic, action steps, closing thought, CTA. Length: 800 to 1000 words.', 'newsletter-edition-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'newsletter-edition-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (Opinion Edition)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn newsletter edition that takes a strong opinion on a controversial or debated topic in [your industry]. The opinion should be: [describe your take]. Build the argument with evidence, examples, and personal experience. Acknowledge the counterargument briefly and address it. Make the reader feel like they are reading something they have never quite seen stated this clearly before. Length: 600 to 800 words."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn newsletter edition that takes a strong opinion on a controversial or debated topic in [your industry]. The opinion should be: [describe your take]. Build the argument with evidence, examples, and personal experience. Acknowledge the counterargument briefly and address it. Make the reader feel like they are reading something they have never quite seen stated this clearly before. Length: 600 to 800 words.', 'newsletter-edition-opinion')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'newsletter-edition-opinion' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Here is a draft of my LinkedIn newsletter edition: [paste draft]. It feels too long, too dry, or too generic. Identify the three biggest problems with it and rewrite it into a tighter, more engaging version. Keep the core message but make every paragraph earn its place. Target length: [your preferred word count]."</p>
                  <button
                    onClick={() => copyToClipboard('Here is a draft of my LinkedIn newsletter edition: [paste draft]. It feels too long, too dry, or too generic. Identify the three biggest problems with it and rewrite it into a tighter, more engaging version. Keep the core message but make every paragraph earn its place. Target length: [your preferred word count].', 'newsletter-edition-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'newsletter-edition-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Newsletter Edition Writing:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Start with a compelling hook that draws readers in immediately</li>
              <li>• Use personal stories and examples to make abstract concepts concrete</li>
              <li>• Break content into digestible sections with clear subheadings</li>
              <li>• Include actionable takeaways readers can implement right away</li>
              <li>• End with a clear CTA that encourages engagement or action</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 15: Cold Brand Pitch",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Land brand collaborations and sponsorship deals with professional pitch emails that showcase your value and get responses. Turn your LinkedIn presence into revenue opportunities.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a short cold email to pitch a brand collaboration on LinkedIn. Brand: [brand name and what they do]. My profile: [follower count, niche, audience type]. Keep it under 150 words. Professional but not stiff."</p>
                  <button
                    onClick={() => copyToClipboard('Write a short cold email to pitch a brand collaboration on LinkedIn. Brand: [brand name and what they do]. My profile: [follower count, niche, audience type]. Keep it under 150 words. Professional but not stiff.', 'brand-pitch-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'brand-pitch-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a cold pitch email for a LinkedIn brand collaboration. Brand I am pitching: [brand name, what they sell, why they are relevant to my audience] My profile stats: [followers, average impressions, engagement rate] My audience: [who follows me — profession, industry, demographics] What I am proposing: [e.g. 2 sponsored posts over 4 weeks] My value to them: [why my audience would respond well to their product] Length: under 200 words. Subject line included."</p>
                  <button
                    onClick={() => copyToClipboard('Write a cold pitch email for a LinkedIn brand collaboration. Brand I am pitching: [brand name, what they sell, why they are relevant to my audience] My profile stats: [followers, average impressions, engagement rate] My audience: [who follows me — profession, industry, demographics] What I am proposing: [e.g. 2 sponsored posts over 4 weeks] My value to them: [why my audience would respond well to their product] Length: under 200 words. Subject line included.', 'brand-pitch-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'brand-pitch-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a complete brand collaboration pitch email for me. Brand: [detailed description — name, product, target customer, recent campaigns if known] Why this brand fits my audience: [specific reasoning] My profile stats: [followers, average impressions, engagement rate, audience breakdown] Past collaborations if any: [brand names and brief outcome] Proposed collaboration: [exactly what I am offering — number of posts, format, timeline, platform] My pricing: [optional — include or leave for conversation] What outcome I can deliver for them: [leads, awareness, traffic, signups] Tone: [professional but personable — not a cold sales email, more like a business proposal from someone who has done their research] Length: 250 to 300 words. Include subject line and a clear CTA."</p>
                  <button
                    onClick={() => copyToClipboard('Write a complete brand collaboration pitch email for me. Brand: [detailed description — name, product, target customer, recent campaigns if known] Why this brand fits my audience: [specific reasoning] My profile stats: [followers, average impressions, engagement rate, audience breakdown] Past collaborations if any: [brand names and brief outcome] Proposed collaboration: [exactly what I am offering — number of posts, format, timeline, platform] My pricing: [optional — include or leave for conversation] What outcome I can deliver for them: [leads, awareness, traffic, signups] Tone: [professional but personable — not a cold sales email, more like a business proposal from someone who has done their research] Length: 250 to 300 words. Include subject line and a clear CTA.', 'brand-pitch-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'brand-pitch-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (Pitching Around a Seasonal Campaign)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a LinkedIn brand collaboration pitch email timed around [specific occasion — e.g. Black Friday / New Year / Independence Day]. Brand: [brand name and product]. My pitch should communicate that I am reaching out ahead of their campaign planning window, that my audience is relevant to their product, and that I have a specific idea for what the collaboration could look like. Keep it under 200 words. Urgent but not pushy."</p>
                  <button
                    onClick={() => copyToClipboard('Write a LinkedIn brand collaboration pitch email timed around [specific occasion — e.g. Black Friday / New Year / Independence Day]. Brand: [brand name and product]. My pitch should communicate that I am reaching out ahead of their campaign planning window, that my audience is relevant to their product, and that I have a specific idea for what the collaboration could look like. Keep it under 200 words. Urgent but not pushy.', 'brand-pitch-seasonal')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'brand-pitch-seasonal' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <div className="text-base text-[#2C2E3A] italic space-y-2">
                    <p><span className="font-semibold">Subject:</span> LinkedIn Collaboration for Black Friday — [Your Name]</p>
                    <p>Hi [Name],</p>
                    <p>With Black Friday six weeks away, I wanted to reach out before your campaign budget is finalised.</p>
                    <p>I run a LinkedIn page focused on [niche] with [X] followers and an average of [X] impressions per post. My audience is primarily [audience type] — exactly the people likely to act on [brand's product].</p>
                    <p>I have a specific content idea in mind that I think would perform well for your brand without feeling like a promotion to my audience. Happy to share the full concept on a quick call.</p>
                    <p>Would you be open to a 15-minute conversation this week?</p>
                    <p>[Your name]</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Here is a brand pitch email I sent that got no response: [paste email]. Tell me what is wrong with it and rewrite it into a version that is more compelling, specific, and likely to get a reply. Explain the key changes."</p>
                  <button
                    onClick={() => copyToClipboard('Here is a brand pitch email I sent that got no response: [paste email]. Tell me what is wrong with it and rewrite it into a version that is more compelling, specific, and likely to get a reply. Explain the key changes.', 'brand-pitch-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'brand-pitch-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Brand Pitch Emails:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Research the brand's recent campaigns and target audience</li>
              <li>• Lead with specific metrics and audience demographics</li>
              <li>• Propose concrete deliverables with clear timelines</li>
              <li>• Show how your audience aligns with their customer base</li>
              <li>• Include a clear, low-pressure call-to-action</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 16: Negotiation Response",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Navigate brand collaboration negotiations with confidence and professionalism. Secure fair compensation while maintaining positive relationships for future opportunities.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a professional reply to a brand that offered [their offer, e.g. Rs 3000] when my rate is [your rate, e.g. Rs 8000]. Politely counter and hold firm on my value. Under 100 words."</p>
                  <button
                    onClick={() => copyToClipboard('Write a professional reply to a brand that offered [their offer, e.g. Rs 3000] when my rate is [your rate, e.g. Rs 8000]. Politely counter and hold firm on my value. Under 100 words.', 'negotiation-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'negotiation-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a negotiation response email to a brand collaboration offer. What they offered: [amount or terms] My rate: [your standard rate] My justification for the rate: [impressions, engagement, audience quality, past results] What I am willing to offer instead if they cannot meet my rate: [e.g. smaller deliverable for lower price] Tone: Professional, confident, not apologetic. Under 150 words."</p>
                  <button
                    onClick={() => copyToClipboard('Write a negotiation response email to a brand collaboration offer. What they offered: [amount or terms] My rate: [your standard rate] My justification for the rate: [impressions, engagement, audience quality, past results] What I am willing to offer instead if they cannot meet my rate: [e.g. smaller deliverable for lower price] Tone: Professional, confident, not apologetic. Under 150 words.', 'negotiation-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'negotiation-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a full negotiation email responding to a lowball brand collaboration offer. Brand: [brand name] Their offer: [exact amount and terms they proposed] My standard rate: [your rate and what it includes] Data I have to justify my rate: [impressions, engagement rate, audience demographics, past collaboration results] What I am willing to compromise on if needed: [e.g. one post instead of two, shorter timeline, smaller scope] What I am not willing to compromise on: [minimum rate, content rights, payment timeline] Tone: Firm but professional. Make clear this is a counter-proposal, not begging. Include a specific next step — a call, a revised proposal, or a deadline for their response. Length: under 200 words."</p>
                  <button
                    onClick={() => copyToClipboard('Write a full negotiation email responding to a lowball brand collaboration offer. Brand: [brand name] Their offer: [exact amount and terms they proposed] My standard rate: [your rate and what it includes] Data I have to justify my rate: [impressions, engagement rate, audience demographics, past collaboration results] What I am willing to compromise on if needed: [e.g. one post instead of two, shorter timeline, smaller scope] What I am not willing to compromise on: [minimum rate, content rights, payment timeline] Tone: Firm but professional. Make clear this is a counter-proposal, not begging. Include a specific next step — a call, a revised proposal, or a deadline for their response. Length: under 200 words.', 'negotiation-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'negotiation-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (Walking Away Professionally)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a polite but firm email declining a brand collaboration because the offer is too far below my rate and there is no room for negotiation. Brand: [brand name]. Their final offer: [amount]. I want to decline in a way that keeps the relationship warm for the future, makes clear why I am declining, and leaves the door open if their budget changes. Under 100 words."</p>
                  <button
                    onClick={() => copyToClipboard('Write a polite but firm email declining a brand collaboration because the offer is too far below my rate and there is no room for negotiation. Brand: [brand name]. Their final offer: [amount]. I want to decline in a way that keeps the relationship warm for the future, makes clear why I am declining, and leaves the door open if their budget changes. Under 100 words.', 'negotiation-walkaway')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'negotiation-walkaway' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="bg-white border-l-4 border-blue-400 p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Sample Output:</p>
                  <div className="text-base text-[#2C2E3A] italic space-y-2">
                    <p>Hi [Name],</p>
                    <p>Thank you for the updated offer — I genuinely appreciate the back and forth.</p>
                    <p>After careful consideration, I am not able to make it work at this rate without compromising the quality and authenticity of the content, which would not serve either of us well.</p>
                    <p>I hope we can revisit this when your campaign budget allows for a fuller collaboration. I remain a genuine admirer of what [Brand] is building and would love to work together in a future cycle.</p>
                    <p>Wishing you all the best with the campaign.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Here is my negotiation email: [paste email]. It comes across as [too desperate / too aggressive / too vague]. Rewrite it to be firm, professional, and confident without being difficult to work with. Keep the same key points."</p>
                  <button
                    onClick={() => copyToClipboard('Here is my negotiation email: [paste email]. It comes across as [too desperate / too aggressive / too vague]. Rewrite it to be firm, professional, and confident without being difficult to work with. Keep the same key points.', 'negotiation-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'negotiation-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Negotiation Responses:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Always justify your rates with specific data and metrics</li>
              <li>• Offer alternative solutions if they can't meet your full rate</li>
              <li>• Be firm but never apologetic about your value</li>
              <li>• Keep relationships warm even when walking away</li>
              <li>• Set clear deadlines for responses to maintain momentum</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Topic 17: Media Kit Description",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Create professional media kit descriptions that showcase your value to brands and secure collaboration opportunities. Present your LinkedIn presence as a serious business asset.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1: Quick</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write a short professional bio paragraph for my LinkedIn media kit. I am a [your role] with [follower count] followers. My niche is [topic]. My audience is [description]. 3 to 4 sentences maximum."</p>
                  <button
                    onClick={() => copyToClipboard('Write a short professional bio paragraph for my LinkedIn media kit. I am a [your role] with [follower count] followers. My niche is [topic]. My audience is [description]. 3 to 4 sentences maximum.', 'mediakit-quick')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'mediakit-quick' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2: Standard</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write the bio and value proposition section for my LinkedIn media kit. My name: [optional] My role and background: [e.g. Software engineer turned LinkedIn creator] Follower count: [number] Average impressions: [number] Niche: [your content topic] Audience type: [description] What I offer brands: [type of content and value] Tone: Professional but personable. Under 150 words."</p>
                  <button
                    onClick={() => copyToClipboard('Write the bio and value proposition section for my LinkedIn media kit. My name: [optional] My role and background: [e.g. Software engineer turned LinkedIn creator] Follower count: [number] Average impressions: [number] Niche: [your content topic] Audience type: [description] What I offer brands: [type of content and value] Tone: Professional but personable. Under 150 words.', 'mediakit-standard')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'mediakit-standard' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3: Detailed</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write all the text sections for my LinkedIn media kit. Section 1 — Creator Bio: Who I am, my background, my content niche, and my credibility. 100 words max. Section 2 — Audience Profile: Description of my audience — profession, demographics, interests, and why they are valuable to brands. 80 words max. Section 3 — What I Offer: Types of collaborations I do — sponsored posts, carousels, newsletter features, webinars. Describe each in one to two sentences. Section 4 — Why Partner With Me: My unique value as a creator — engagement quality, audience trust, content authenticity. 80 words max. My details: Follower count: [X]. Average impressions: [X]. Engagement rate: [X%]. Audience breakdown: [demographics]. Past collaborations: [brand names]. Content niche: [topic]. Tone: Professional, confident, data-backed. Like a business document that still feels human."</p>
                  <button
                    onClick={() => copyToClipboard('Write all the text sections for my LinkedIn media kit. Section 1 — Creator Bio: Who I am, my background, my content niche, and my credibility. 100 words max. Section 2 — Audience Profile: Description of my audience — profession, demographics, interests, and why they are valuable to brands. 80 words max. Section 3 — What I Offer: Types of collaborations I do — sponsored posts, carousels, newsletter features, webinars. Describe each in one to two sentences. Section 4 — Why Partner With Me: My unique value as a creator — engagement quality, audience trust, content authenticity. 80 words max. My details: Follower count: [X]. Average impressions: [X]. Engagement rate: [X%]. Audience breakdown: [demographics]. Past collaborations: [brand names]. Content niche: [topic]. Tone: Professional, confident, data-backed. Like a business document that still feels human.', 'mediakit-detailed')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'mediakit-detailed' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4: Situation Specific (For a Creator With No Past Brand Deals)</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Write the bio and value proposition sections for a LinkedIn media kit for someone who has never done a brand collaboration before. They have [follower count] followers and [average impressions]. Their niche is [topic]. Help them present themselves professionally and credibly despite having no past brand references. Focus on audience quality, content consistency, and organic reach as the value proposition."</p>
                  <button
                    onClick={() => copyToClipboard('Write the bio and value proposition sections for a LinkedIn media kit for someone who has never done a brand collaboration before. They have [follower count] followers and [average impressions]. Their niche is [topic]. Help them present themselves professionally and credibly despite having no past brand references. Focus on audience quality, content consistency, and organic reach as the value proposition.', 'mediakit-newcreator')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'mediakit-newcreator' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5: Refinement</h4>
                <div className="bg-blue-100 p-4 rounded-lg mb-4 relative">
                  <p className="text-base text-blue-800 font-mono leading-7 pr-12">"Here is my current media kit bio: [paste bio]. It reads as [too informal / too corporate / too generic]. Rewrite it into a version that sounds professional, confident, and data-backed. Keep the same facts but make it feel like it belongs in a premium media kit. Under 150 words."</p>
                  <button
                    onClick={() => copyToClipboard('Here is my current media kit bio: [paste bio]. It reads as [too informal / too corporate / too generic]. Rewrite it into a version that sounds professional, confident, and data-backed. Keep the same facts but make it feel like it belongs in a premium media kit. Under 150 words.', 'mediakit-refinement')}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy prompt"
                  >
                    {copiedPrompt === 'mediakit-refinement' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tips for Media Kit Descriptions:</h4>
            <ul className="text-base text-yellow-700 space-y-2 leading-7">
              <li>• Lead with specific metrics and audience demographics</li>
              <li>• Highlight audience quality over just follower count</li>
              <li>• Include concrete examples of past performance or engagement</li>
              <li>• Use professional language while maintaining authenticity</li>
              <li>• Focus on business outcomes brands can expect</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  if (!hasAccess) {
    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">The Prompt Vault</h3>
            <p className="text-gray-600">Ready-to-use AI prompts for LinkedIn success</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">What's Inside:</h4>
          <ul className="text-gray-700 space-y-2">
            <li>• 5 different LinkedIn headline prompt types</li>
            <li>• Ready-to-copy prompts for AI tools</li>
            <li>• Sample outputs for each prompt</li>
            <li>• Pro tips for maximum effectiveness</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 font-medium">
            🔒 The Prompt Vault is available exclusively to Pro Program and Master Program users.
          </p>
        </div>

        <p className="text-gray-600 text-sm">
          Upgrade to the Pro Program or Master Program to unlock The Prompt Vault and start creating compelling LinkedIn content with AI assistance.
        </p>
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
          <h2 className="text-xl font-semibold text-[#141619]">The Prompt Vault</h2>
          <p className="text-[#B3B4BD] text-sm">Ready-to-use AI prompts for every LinkedIn need</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => toggleSection(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                expandedSections[index]
                  ? 'bg-[#1D4ED8] text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-200">
        {sections.map((section, index) => (
          <div key={index} className="bg-white">
            <button
              onClick={() => toggleSection(index)}
              className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              {expandedSections[index] ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {expandedSections[index] && (
              <div className="px-6 pb-6">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
