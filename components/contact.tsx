'use client';
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const contactInfo = {
    email: "hanzongpillerva@gmail.com",
    phone: "09959164797",
    linkedin: "https://www.linkedin.com/in/hanz-pillerva-720a20349/",
    github: "https://github.com/hanzong05",
    portfolio: "https://portfolio-v2-2aua.vercel.app/"
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    try {
      // Get current time
      const now = new Date();
      const time = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      // Using EmailJS
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_fiihotp',
          template_id: 'template_vvxxgie',
          user_id: '5xiDKPJxihpTJ8bOh',
          template_params: {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            time: time,
          },
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div id="contact" className="min-h-screen p-6 md:p-12 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-16 text-center text-gray-900 dark:text-gray-100">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-2">
              Contact Information
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Feel free to contact me for any work or suggestions below.
            </p>

            <div className="space-y-4">
              {/* Email */}
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{contactInfo.email}</span>
              </a>

              {/* LinkedIn */}
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>linkedin.com/in/hanzpillerva</span>
              </a>

              {/* GitHub */}
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>github.com/hanzpillerva</span>
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="group relative bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 dark:border-slate-700/60 rounded-xl p-6 hover:border-cyan-400/60 dark:hover:border-purple-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/20 dark:hover:shadow-purple-500/20 hover:scale-[1.02] overflow-hidden shadow-lg">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Content wrapper */}
            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-transparent border border-slate-600/50 dark:border-slate-700/50 rounded-lg text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-600 focus:outline-none focus:border-cyan-600 dark:focus:border-cyan-400 transition-colors"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="w-full px-4 py-3 bg-transparent border border-slate-600/50 dark:border-slate-700/50 rounded-lg text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-600 focus:outline-none focus:border-cyan-600 dark:focus:border-cyan-400 transition-colors"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    className="w-full px-4 py-3 bg-transparent border border-slate-600/50 dark:border-slate-700/50 rounded-lg text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-600 focus:outline-none focus:border-cyan-600 dark:focus:border-cyan-400 transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-600 dark:text-green-400 text-sm">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-600 dark:text-red-400 text-sm">
                    ✗ Please fill in all fields correctly.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-purple-500 text-white dark:text-gray-900 font-semibold rounded-lg hover:from-cyan-700 hover:to-blue-700 dark:hover:from-cyan-500 dark:hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-400/50 dark:hover:shadow-purple-500/50"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}