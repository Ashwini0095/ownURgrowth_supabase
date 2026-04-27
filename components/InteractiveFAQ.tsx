'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How will you write content in my voice if you don't know me?",
    answer: "We start with a detailed onboarding where we understand your story, opinions, tone, and goals. Every piece of content goes through your approval before it goes live."
  },
  {
    question: "How long before I start seeing results?",
    answer: "LinkedIn growth is organic and takes time. Most clients start seeing meaningful traction within 60 to 90 days of consistent posting and engagement."
  },
  {
    question: "Is my LinkedIn account safe with you?",
    answer: "Absolutely. We follow LinkedIn's guidelines strictly no bots, no automation, no shortcuts that can get your account flagged."
  },
  {
    question: "What if I don't like the content you create?",
    answer: "Everything is shared with you before publishing. If something doesn't feel right, we rework it no questions asked."
  },
  {
    question: "Do you guarantee follower growth?",
    answer: "We don't believe in fake guarantees. What we guarantee is consistent quality work, the right strategy, and full transparency on what's working."
  },
  {
    question: "Do you guarantee sales or reach from the campaign?",
    answer: "No one can honestly guarantee exact sales numbers. What we guarantee is the right influencer match, professional execution, and full campaign reporting."
  },
  {
    question: "Are you a team or a solo operator?",
    answer: "We are a dedicated team that has been in the LinkedIn and creator economy space so you always get expert attention, not a one-person show."
  },
  {
    question: "How many influencers do you have in your network?",
    answer: "We don't work with a fixed roster we research and find the best fit influencers for every brand fresh. This ensures quality over quantity every single time."
  },
  {
    question: "Our budget is limited can you still help?",
    answer: "Yes. We can work with micro and nano influencers who often have higher engagement at lower cost sometimes more effective than big names."
  },
  {
    question: "What makes you different from a regular influencer marketing agency?",
    answer: "We come from the creator world we've negotiated brand deals from the influencer's side. So we understand both parties deeply, which means better deals, better content, and better results for your brand."
  },
  {
    question: "How do we get started?",
    answer: "Simply fill out our enquiry form. We'll review your details and reach out within 48 hours to discuss next steps."
  },
  {
    question: "Which niches do you specialise in?",
    answer: "We currently specialise in LinkedIn-first niches tech, career, finance, entrepreneurship, and personal development. However we can extend to Instagram and other platforms based on your needs."
  },
  {
    question: "How much visibility will I have into the campaign?",
    answer: "Full visibility. You get influencer shortlists for approval, content for review before it goes live, and a detailed report once the campaign wraps up."
  },
  {
    question: "What if an influencer doesn't deliver what was promised?",
    answer: "We manage that conversation on your behalf. Our job is to hold influencers accountable to the deliverables that were agreed upon."
  }
];

export default function InteractiveFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="mx-auto max-w-4xl px-4 lg:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#141619] sm:text-5xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[#2C2E3A] font-light max-w-2xl mx-auto">
            Got questions? We've got answers. Find everything you need to know about our services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            {faqs.slice(0, 7).map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors group"
                >
                  <span className="text-lg font-medium text-[#141619] pr-4 group-hover:text-[#1D4ED8] transition-colors">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="h-5 w-5 text-[#1D4ED8]" />
                    ) : (
                      <Plus className="h-5 w-5 text-gray-400 group-hover:text-[#1D4ED8] transition-colors" />
                    )}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5 border-t border-gray-100">
                    <div className="pt-4">
                      <p className="text-[#2C2E3A] leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {faqs.slice(7, 14).map((faq, index) => (
              <div
                key={index + 7}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === (index + 7) ? null : (index + 7))}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors group"
                >
                  <span className="text-lg font-medium text-[#141619] pr-4 group-hover:text-[#1D4ED8] transition-colors">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openIndex === (index + 7) ? (
                      <Minus className="h-5 w-5 text-[#1D4ED8]" />
                    ) : (
                      <Plus className="h-5 w-5 text-gray-400 group-hover:text-[#1D4ED8] transition-colors" />
                    )}
                  </div>
                </button>
                {openIndex === (index + 7) && (
                  <div className="px-6 pb-5 border-t border-gray-100">
                    <div className="pt-4">
                      <p className="text-[#2C2E3A] leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a 
            href="mailto:info@ownurgrowth.com" 
            className="inline-flex items-center gap-2 bg-[#1D4ED8] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1D4ED8]/90 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
