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
      title: "Topic 1 — LinkedIn Headlines",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Your LinkedIn headline is the first thing people see. These prompts will help you create headlines that stop the scroll and attract the right audience.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1 — Quick</h4>
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
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 2 — Standard</h4>
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
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 3 — Detailed</h4>
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
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 4 — Situation Specific (For Students)</h4>
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
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 5 — Refinement</h4>
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
      title: "Topic 2 — About Section",
      content: (
        <div className="space-y-8">
          <div>
            <p className="text-base text-[#2C2E3A] leading-7 mb-6">Your LinkedIn About section is where you tell your story and connect with your audience. These prompts will help you create an About section that builds trust and drives action.</p>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 border-2 border-blue-200/50 rounded-3xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">Type 1 — Quick</h4>
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
            </div>
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
            🔒 This content is available to course purchasers only.
          </p>
        </div>

        <p className="text-gray-600 text-sm">
          Purchase the course to unlock The Prompt Vault and start creating compelling LinkedIn content with AI assistance.
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
