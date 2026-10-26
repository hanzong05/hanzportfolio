import React from 'react';

const quickLinks = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <a href="#top" className="flex items-center gap-1.5 text-lg font-bold text-navy">
            Hanz Pillerva <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
          </a>
          <p className="mt-1 text-xs text-slate-500">Full-Stack Developer · CMS Developer · Systems Developer</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-slate-600">
          {quickLinks.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-navy">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="text-xs text-slate-500 lg:text-right">
          <p>© {currentYear} Hanz Pillerva.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
