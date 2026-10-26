import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
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
  { label: 'GitHub', href: 'https://github.com/hanzpillerva', Icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hanz-pillerva', Icon: LinkedinIcon },
  { label: 'Email', href: 'mailto:hanzongpillerva@gmail.com', Icon: MailIcon },
];

export default function HeroSection() {
  return (
    <section id="top" className="relative overflow-x-clip px-4 pt-32 pb-16 sm:px-6 md:pt-40 md:pb-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Available for freelance &amp; remote work
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            I build digital experiences and <span className="text-grad">systems that work.</span>
          </h1>

          <p className="mt-6 text-sm font-medium tracking-wide text-slate-200 sm:text-base">
            Full-Stack Developer <span className="mx-2 text-slate-600">·</span> CMS Developer{' '}
            <span className="mx-2 text-slate-600">·</span> Systems Developer
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            I&apos;m Hanz Jansen Pillerva, a full-stack and CMS developer building business websites, custom
            applications, and connected digital platforms that solve real-world problems.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="btn-grad inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
            >
              Let&apos;s Work Together <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#projects"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-violet-400/50"
            >
              Explore My Work
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-cyan-300" /> Based in the Philippines
            </span>
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={label}
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-white"
              >
                <Icon className="h-4 w-4" />
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
