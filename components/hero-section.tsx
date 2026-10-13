import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SiReact, SiLaravel, SiPython, SiMysql, SiNextdotjs } from 'react-icons/si';
import { GithubIcon, LinkedinIcon, MailIcon } from './icons';

const techIcons = [
  { Icon: SiReact, color: '#61DAFB', name: 'React' },
  { Icon: SiLaravel, color: '#FF2D20', name: 'Laravel' },
  { Icon: SiNextdotjs, color: '#e5e7eb', name: 'Next.js' },
  { Icon: SiPython, color: '#3776AB', name: 'Python' },
  { Icon: SiMysql, color: '#4479A1', name: 'MySQL' },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/hanzong05', Icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hanz-pillerva-720a20349/', Icon: LinkedinIcon },
  { label: 'Email', href: 'mailto:hanzongpillerva@gmail.com', Icon: MailIcon },
];

export default function HeroSection() {
  return (
    <section id="top" className="relative overflow-x-clip px-4 pt-32 pb-16 sm:px-6 md:pt-40 md:pb-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Available for Opportunities
          </span>

          <p className="mt-6 text-sm text-slate-400">Hi, I&apos;m</p>
          <h1 className="mt-2 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-grad block pb-1">Hanz Jansen</span>
            <span className="block text-violet-200">Pillerva</span>
          </h1>

          <p className="mt-6 text-sm font-medium text-slate-200 sm:text-base">
            Full-Stack Developer <span className="mx-2 text-slate-600">|</span> System Developer{' '}
            <span className="mx-2 text-slate-600">|</span> AI Enthusiast
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            I specialize in building modern web systems, e-commerce platforms, and AI &amp; machine learning
            solutions using React, Laravel, Node.js, Python and more. I&apos;m passionate about creating efficient
            systems that solve real-world problems and help businesses grow.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="btn-grad inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
            >
              View My Work <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-violet-400/50"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={label}
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-white"
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Right: portrait with floating elements */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          {/* Halo */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-600/40 via-blue-600/20 to-cyan-400/30 blur-3xl" />

          <div className="animate-glow-shift relative overflow-hidden rounded-[2rem] ring-1 ring-white/10">
            <img
              src="/dev.png"
              alt="Hanz Pillerva, Full-Stack Developer"
              className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Floating code card */}
          <div className="glass animate-float absolute -left-2 top-6 hidden rounded-xl p-4 font-mono text-[11px] leading-6 text-slate-300 shadow-2xl sm:block md:-left-8">
            <div>
              <span className="text-violet-400">const</span> <span className="text-cyan-300">developer</span> = {'{'}
            </div>
            <div className="pl-4">
              <span className="text-slate-500">name:</span> <span className="text-emerald-300">&quot;Hanz Pillerva&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-slate-500">passion:</span> <span className="text-emerald-300">&quot;Build Solutions&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-slate-500">focus:</span> <span className="text-emerald-300">&quot;Web, Mobile, AI&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-slate-500">location:</span> <span className="text-emerald-300">&quot;Philippines&quot;</span>
            </div>
            <div>{'};'}</div>
          </div>

          {/* Tech icon bar */}
          <div className="glass absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-5 rounded-2xl px-6 py-3.5 shadow-2xl">
            {techIcons.map(({ Icon, color, name }) => (
              <Icon key={name} title={name} className="h-6 w-6 transition-transform hover:scale-125" style={{ color }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
