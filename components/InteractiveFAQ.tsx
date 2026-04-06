'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How long do I have access to the courses?",
    answer: "You get lifetime access to all course materials, including future updates and improvements at no extra cost."
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Yes! You can upgrade to any higher plan by paying just the difference. All payments are one-time with lifetime access."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 7-day money-back guarantee if you're not satisfied with the course content."
  },
  {
    question: "Are the courses suitable for beginners?",
    answer: "Absolutely! Our courses are designed for all skill levels, from complete beginners to experienced professionals looking to level up."
  },
  {
    question: "How do the live Q&A sessions work?",
    answer: "Live Q&A sessions are available with the Master Program. We conduct regular sessions where you can ask questions and get personalized guidance."
  }
];

export default function InteractiveFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-white relative">
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#1D4ED8]/5 rounded-full blur-2xl"></div>
      
      <div className="mx-auto max-w-4xl px-4 lg:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#141619] sm:text-5xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[#2C2E3A] font-light">
            Everything you need to know about our courses
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-[#B3B4BD]/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-[#141619]">{faq.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-[#1D4ED8] transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-[#2C2E3A] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
