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
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-100 placeholder-slate-600 transition-colors focus:border-violet-400/60 focus:bg-white/[0.05] focus:outline-none';

  return (
    <section id="contact" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: info */}
        <div>
          <span className="inline-block rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            Contact
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Have a project in mind? Let&apos;s build it.</h2>
          <p className="mt-4 max-w-md text-slate-400">
            I&apos;m open to freelance projects, remote opportunities, and collaborations. Whether you need a WordPress
            website, a connected guest platform, a custom business application, or technical support, I&apos;d love to
            hear what you&apos;re working on.
          </p>

          <div className="mt-10 space-y-4">
            <a href={`mailto:${contactInfo.email}`} className="glass glass-hover flex items-center gap-4 rounded-2xl p-4 text-slate-300 hover:text-white">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20"><Mail className="h-5 w-5 text-cyan-300" /></span>
              <span className="break-all">{contactInfo.email}</span>
            </a>
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="glass glass-hover flex items-center gap-4 rounded-2xl p-4 text-slate-300 hover:text-white">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20"><LinkedinIcon className="h-5 w-5 text-cyan-300" /></span>
              <span>linkedin.com/in/hanz-pillerva</span>
            </a>
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="glass glass-hover flex items-center gap-4 rounded-2xl p-4 text-slate-300 hover:text-white">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20"><GithubIcon className="h-5 w-5 text-cyan-300" /></span>
              <span>github.com/hanzpillerva</span>
            </a>
            <div className="flex items-center gap-4 p-4 text-slate-400">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20"><MapPin className="h-5 w-5 text-cyan-300" /></span>
              <span>{contactInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="glass glass-hover rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className={inputClass} required />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email" className={inputClass} required />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">Message</label>
              <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." className={`${inputClass} resize-none`} required />
            </div>

            {status === 'success' && (
              <div role="status" className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                <CheckCircle2 className="h-4 w-4 shrink-0" /> Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" /> Something went wrong. Please check the fields and try again.
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-grad flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
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
