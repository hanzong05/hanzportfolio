'use client';
import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);

  const contactInfo = {
    email: 'hanzongpillerva@gmail.com',
    linkedin: 'https://linkedin.com/in/hanz-pillerva',
    github: 'https://github.com/hanzpillerva',
    location: 'Tarlac, Philippines',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const flash = (next: 'success' | 'error', ms: number) => {
    setStatus(next);
    setTimeout(() => setStatus('idle'), ms);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      flash('error', 3000);
      return;
    }

    setSubmitting(true);
    try {
      const time = new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      // Using EmailJS
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_fiihotp',
          template_id: 'template_vvxxgie',
          user_id: '5xiDKPJxihpTJ8bOh',
          template_params: {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            time,
          },
        }),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        flash('success', 5000);
      } else {
        flash('error', 3000);
      }
    } catch {
      flash('error', 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-lime focus:bg-white/10 focus:outline-none';

  const rowClass =
    'flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-slate-200 transition-colors hover:border-white/30 hover:text-white';

  return (
    <section id="contact" className="scroll-mt-24 bg-navy px-4 py-20 text-slate-300 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: pitch and details */}
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-lime">07 · Get in touch</p>
          <h2 className="mt-4 text-[clamp(2.25rem,4.4vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-white">
            Have something <span className="underline decoration-lime decoration-4 underline-offset-8">worth building?</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-slate-300">
            I&apos;m open to freelance projects, remote opportunities, and collaborations. Whether you need a WordPress
            website, a connected guest platform, a custom business application, or technical support, I&apos;d love to
            hear what you&apos;re working on.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact-form" className="btn-blue inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold">
              Start a Conversation <Send className="h-4 w-4" />
            </a>
            <a href={`mailto:${contactInfo.email}`} className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Send an Email <Mail className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 space-y-3">
            <a href={`mailto:${contactInfo.email}`} className={rowClass}>
              <Mail className="h-5 w-5 shrink-0 text-lime" aria-hidden />
              <span className="break-all">{contactInfo.email}</span>
            </a>
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className={rowClass}>
              <LinkedinIcon className="h-5 w-5 shrink-0 text-lime" />
              <span>linkedin.com/in/hanz-pillerva</span>
            </a>
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className={rowClass}>
              <GithubIcon className="h-5 w-5 shrink-0 text-lime" />
              <span>github.com/hanzpillerva</span>
            </a>
            <div className="flex items-center gap-4 p-4 text-slate-400">
              <MapPin className="h-5 w-5 shrink-0 text-lime" aria-hidden />
              <span>{contactInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Right: contact form (same EmailJS submission as before) */}
        <div id="contact-form" className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" autoComplete="name" className={inputClass} required />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" className={inputClass} required />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">Message</label>
              <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." className={`${inputClass} resize-none`} required />
            </div>

            {status === 'success' && (
              <div role="status" className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-300">
                <CheckCircle2 className="h-4 w-4 shrink-0" /> Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" /> Something went wrong. Please check the fields and try again.
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-blue flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Sending…' : 'Send Message'}
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
