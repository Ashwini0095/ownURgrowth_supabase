'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (error) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white text-[#141619]">
      <div className="mx-auto max-w-4xl px-4 py-16 lg:px-6 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#141619] mb-4">Get in Touch</h1>
          <p className="text-lg text-[#2C2E3A] max-w-2xl mx-auto">
            Have questions about our courses? Need support? We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#B3B4BD]/20 bg-white/800 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-[#1D4ED8]/20 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-[#1D4ED8]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#141619]">Email Us</h3>
                  <p className="text-[#B3B4BD]">Get in touch via email</p>
                </div>
              </div>
              <a 
                href="mailto:support@ownurgrowth.com" 
                className="text-[#1D4ED8] hover:text-[#1D4ED8] transition-colors"
              >
                support@ownurgrowth.com
              </a>
            </div>

            <div className="rounded-2xl border border-[#B3B4BD]/20 bg-white/800 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-[#0F172A]/20 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#141619]">Quick Response</h3>
                  <p className="text-[#B3B4BD]">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-[#B3B4BD]/20 bg-white/800 p-6">
            {success ? (
              <div className="text-center py-8">
                <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-[#141619] mb-2">Message Sent!</h3>
                <p className="text-[#2C2E3A]">We'll get back to you soon.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 text-[#1D4ED8] hover:text-[#1D4ED8] transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#141619] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-[#B3B4BD]/20 bg-white px-3 py-2 text-sm text-[#141619] outline-none placeholder:text-[#141619]0 focus:border-[#1D4ED8]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#141619] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-[#B3B4BD]/20 bg-white px-3 py-2 text-sm text-[#141619] outline-none placeholder:text-[#141619]0 focus:border-[#1D4ED8]"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#141619] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#B3B4BD]/20 bg-white px-3 py-2 text-sm text-[#141619] outline-none placeholder:text-[#141619]0 focus:border-[#1D4ED8]"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#141619] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-[#B3B4BD]/20 bg-white px-3 py-2 text-sm text-[#141619] outline-none placeholder:text-[#141619]0 focus:border-[#1D4ED8] resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#1D4ED8] text-white shadow-lg shadow-[#1D4ED8]/30 transition-all duration-300 hover:bg-blue-400 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
