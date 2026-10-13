import React from 'react';
import { GithubIcon, LinkedinIcon, MailIcon } from './icons';

const quickLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hanz-pillerva-720a20349/', Icon: LinkedinIcon },
  { label: 'GitHub', href: 'https://github.com/hanzong05', Icon: GithubIcon },
  { label: 'Email', href: 'mailto:hanzongpillerva@gmail.com', Icon: MailIcon },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t border-white/5 bg-ink/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <a href="#top" className="text-xl font-bold text-white">
              Hanz <span className="text-grad">Pillerva</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              Full-Stack Developer <span className="text-slate-600">|</span> Building solutions for a better tomorrow.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-slate-400 transition-colors hover:text-cyan-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:justify-self-end">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">Connect</h3>
            <div className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center text-sm text-slate-500">
          © {currentYear} Hanz Pillerva. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
