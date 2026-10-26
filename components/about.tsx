import React from 'react';
import { Briefcase, Globe, Wrench } from 'lucide-react';

const themes = [
  {
    title: 'Custom business applications',
    body: 'Internal systems, HRIS and payroll workflows, booking tools, and POS-connected operations.',
    Icon: Briefcase,
  },
  {
    title: 'Websites & connected platforms',
    body: 'WordPress builds with custom post types and ACF, plus GoHighLevel-connected guest apps.',
    Icon: Globe,
  },
  {
    title: 'Technical support & optimization',
    body: 'Debugging, maintenance, and hands-on support for computers, printers, CCTV, and networks.',
    Icon: Wrench,
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <span className="inline-block rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            About
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Technology should <span className="text-grad">solve real problems.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            I combine web development, CMS customization, and systems development to create practical digital
            solutions for businesses. My experience ranges from building connected campground guest platforms and
            WordPress websites to developing internal business applications and supporting deployed systems.
          </p>
        </div>

        <ul className="space-y-4">
          {themes.map(({ title, body, Icon }) => (
            <li key={title} className="glass glass-hover flex gap-5 rounded-2xl p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 ring-1 ring-white/10">
                <Icon className="h-5 w-5 text-cyan-300" />
              </span>
              <div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
