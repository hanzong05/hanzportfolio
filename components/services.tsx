import React from 'react';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    n: '01',
    title: 'Custom Web Applications',
    items: ['Business systems & internal tools', 'HRIS and payroll workflows', 'Dashboards and reporting', 'Database-driven applications'],
  },
  {
    n: '02',
    title: 'WordPress & CMS Development',
    items: ['Custom WordPress websites', 'Beaver Builder layouts', 'Advanced Custom Fields (ACF)', 'Custom Post Types'],
  },
  {
    n: '03',
    title: 'Guest Apps & Digital Platforms',
    items: ['GoHighLevel integrations', 'Multi-location platforms', 'Push notifications', 'Admin panels and automation'],
  },
  {
    n: '04',
    title: 'Technical Support & Consulting',
    items: ['POS systems and hardware support', 'CCTV and network setup', 'Computer and printer troubleshooting', 'System optimization'],
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-line px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">02 · Services</p>
            <h2 className="mt-4 text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-navy">
              What I can help you build.
            </h2>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:max-w-xl">
            <p className="text-sm leading-relaxed text-slate-600">
              From internal systems to customer-facing websites, I turn business requirements into practical,
              maintainable solutions.
            </p>
            <a href="#contact" className="btn-outline inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-brand">
              Discuss a Project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line">
          {services.map((s) => (
            <li key={s.n} className="flex flex-col lg:px-7 lg:first:pl-0 lg:last:pr-0">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-lime font-mono text-sm font-bold text-navy">{s.n}</span>
              <h3 className="mt-5 text-lg font-bold leading-snug text-navy">{s.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {s.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                    {i}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand hover:underline">
                Learn More <ArrowRight className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
