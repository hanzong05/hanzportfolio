import React from 'react';
import { ArrowRight, Code2, LayoutTemplate, Network, Wrench } from 'lucide-react';
import SectionHeader from './section-header';

const services = [
  {
    title: 'Custom Web Applications',
    Icon: Code2,
    items: ['Business applications', 'Internal management systems', 'HRIS and payroll workflows', 'Dashboards and database-driven tools'],
  },
  {
    title: 'WordPress & CMS Development',
    Icon: LayoutTemplate,
    items: ['Custom WordPress websites', 'Beaver Builder layouts', 'Advanced Custom Fields', 'Custom Post Types', 'Website customization and maintenance'],
  },
  {
    title: 'Guest Apps & Digital Platforms',
    Icon: Network,
    items: ['GoHighLevel-connected guest applications', 'Multi-location platform setups', 'Push notification integrations', 'Admin panels and connected workflows'],
  },
  {
    title: 'Technical Support & System Maintenance',
    Icon: Wrench,
    items: ['POS systems', 'Computer and printer troubleshooting', 'CCTV and network systems', 'Application debugging and optimization'],
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Services" title="Digital solutions built around your business." />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map(({ title, Icon, items }) => (
            <div key={title} className="glass glass-hover flex flex-col rounded-2xl p-7">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 ring-1 ring-white/10">
                  <Icon className="h-5 w-5 text-cyan-300" />
                </span>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              </div>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-400 marker:text-violet-400">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="btn-grad inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          >
            Discuss a project <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
