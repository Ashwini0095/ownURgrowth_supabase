'use client';

import { CheckCircle, Clock, DollarSign, MessageCircle, RefreshCw, FileText } from 'lucide-react';
import Navigation from '../../components/Navigation';

export default function AboutPage() {
  const features = [
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-400" />,
      title: "Lifetime Access",
      description: "Learn at your own pace with permanent access to all course materials and updates."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-green-400" />,
      title: "Affordable Pricing",
      description: "High-quality learning resources priced far below typical market rates."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-purple-400" />,
      title: "Live QNA Session",
      description: "Get your doubts cleared in live Q&A sessions with the instructor."
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-cyan-400" />,
      title: "Free Course Updates",
      description: "All future improvements and additional content are included at no extra cost."
    },
    {
      icon: <FileText className="h-8 w-8 text-yellow-400" />,
      title: "Concise & High-Signal Notes",
      description: "No fluff — only the ideas, patterns, and trade-offs that actually matter."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            Why Choose <span className="text-blue-400">ownURgrowth</span>?
          </h1>
          <p className="text-xl text-slate-300 mb-16">
            We focus on practical skills that make a real difference in your career and life.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
