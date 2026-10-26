'use client';
import React, { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

const links = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-cream/85 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#top" className="flex items-center gap-1.5 text-lg font-bold tracking-tight text-navy">
          Hanz Pillerva
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-navy">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-slate-600 xl:inline-flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Available for Remote Work
          </span>
          <a
            href="#contact"
            className="btn-dark hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold sm:inline-flex"
          >
            Let&apos;s Talk <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-full border border-line bg-paper p-2.5 text-navy lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="mx-4 mb-4 flex flex-col rounded-2xl border border-line bg-paper p-2 shadow-lg lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-navy hover:bg-cream"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-dark mt-1 rounded-xl px-4 py-3 text-center font-semibold">
            Let&apos;s Talk
          </a>
        </nav>
      )}
    </header>
  );
}
