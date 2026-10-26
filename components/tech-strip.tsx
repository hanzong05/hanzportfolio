import React from 'react';
import { SiWordpress, SiReact, SiNextdotjs, SiLaravel, SiPhp, SiMysql, SiFlutter, SiFirebase } from 'react-icons/si';

const tech = [
  { name: 'WordPress', Icon: SiWordpress, color: '#21759B' },
  { name: 'GoHighLevel', Icon: null, color: '#F5A623' },
  { name: 'React', Icon: SiReact, color: '#149ECA' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#111827' },
  { name: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
  { name: 'PHP', Icon: SiPhp, color: '#777BB4' },
  { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
  { name: 'Flutter', Icon: SiFlutter, color: '#02569B' },
  { name: 'Firebase', Icon: SiFirebase, color: '#F59E0B' },
];

export default function TechStrip() {
  return (
    <section aria-label="Technologies I work with" className="border-y border-line bg-cream px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
        <p className="shrink-0 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-brand">
          Technologies<br />I work with
        </p>
        <ul className="grid flex-1 grid-cols-3 gap-x-4 gap-y-5 sm:grid-cols-5 lg:flex lg:flex-wrap lg:items-center lg:justify-between">
          {tech.map(({ name, Icon, color }) => (
            <li key={name} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              {Icon ? <Icon className="h-5 w-5" style={{ color }} aria-hidden /> : <span aria-hidden className="h-2.5 w-2.5 rounded-sm" style={{ background: color }} />}
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
