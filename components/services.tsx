import React from 'react';
import { ArrowRight, Code2, Globe2, ShoppingBag, Wrench } from 'lucide-react';
import SectionHeader from './section-header';

const services = [
  {
    title: 'Custom Web Systems',
    body: 'Business systems, HRIS, payroll, dashboards, and booking tools.',
    Icon: Code2,
  },
  {
    title: 'Website Development',
    body: 'WordPress, Beaver Builder, and custom sites built with Laravel, React, and Next.js.',
    Icon: Globe2,
  },
  {
    title: 'E-commerce Solutions',
    body: 'Shopify setup, customization, and integrations.',
    Icon: ShoppingBag,
  },
  {
    title: 'IT Support & Setup',
    body: 'POS systems, networking, CCTV, PC setup, and troubleshooting.',
    Icon: Wrench,
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">What I do</p>
            <h2 className="mt-3 text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-white">
              Services for <br className="hidden sm:block" />
              <span className="text-grad">growing businesses</span>
            </h2>
            <p className="mt-4 max-w-lg text-slate-400">
              I help businesses build, improve, and run digital systems, from custom platforms to websites and technical
              support.
            </p>
          </div>
          <a href="#contact" className="glass inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-slate-100">
            Discuss a project <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map(({ title, body, Icon }) => (
            <div key={title} className="glass glass-hover flex flex-col rounded-2xl p-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-violet-500/25 to-cyan-400/20 ring-1 ring-white/10">
                <Icon className="h-5 w-5 text-cyan-300" />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
