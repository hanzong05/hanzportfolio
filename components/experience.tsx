import React from 'react';
import { CalendarDays } from 'lucide-react';
import SectionHeader from './section-header';

const experiences = [
  {
    id: 1,
    role: 'Part-Time Freelance Web Developer',
    company: 'Freelance',
    period: 'June 2026 – Present',
    responsibilities: [
      'Built a GoHighLevel-connected guest app platform for 19 campground and RV resort hubs, each with its own app, push notifications, and admin panel.',
      'Built and customized WordPress websites for resort and business clients using custom post types, ACF fields, and Beaver Builder layouts.',
    ],
  },
  {
    id: 2,
    role: 'System Developer',
    company: 'Central Azucarera de Tarlac',
    period: 'February 2026 – Present',
    responsibilities: [
      'Developed in-house web and mobile applications to improve internal processes and system accessibility.',
      'Provided technical troubleshooting for office computers, hardware, and printers.',
    ],
  },
  {
    id: 3,
    role: 'Web Developer',
    company: 'My Creative Panda',
    period: 'September 2025 – November 2025',
    responsibilities: [
      'Developed an official LGU website.',
      'Designed and contributed to a custom HRIS system for employee records, payroll, and administrative workflows.',
      'Built a booking and scheduling system for Khoshipping Lines.',
      'Performed debugging, optimization, maintenance, and ongoing support for client applications.',
    ],
  },
  {
    id: 4,
    role: 'IT Technician',
    company: 'Eljin Corporation (Butter World Superbakeshop)',
    period: 'September 2024 – September 2025',
    responsibilities: [
      'Supported computers, printers, CCTV, POS, and network systems.',
      'Built and maintained the Butter World Superbakeshop website.',
      'Designed a custom advertising platform.',
      "Assisted in developing the company's HRIS and payroll system.",
    ],
  },
];

export default function WorkExperience() {
  return (
    <section id="experience" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Experience" title="Experience across products, platforms, and business systems." />

        <ol className="relative">
          {/* Timeline rail */}
          <div className="grad-bar-v absolute left-[9px] top-3 bottom-3 w-px opacity-70" aria-hidden />

          <div className="space-y-8">
            {experiences.map((exp) => (
              <li key={exp.id} className="relative pl-12">
                {/* Node */}
                <span className="grad-bar absolute left-[1px] top-7 h-4 w-4 rounded-full ring-4 ring-ink" aria-hidden />

                <div className="glass glass-hover rounded-2xl p-6 sm:p-8">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white sm:text-xl">{exp.role}</h3>
                      <p className="mt-1 text-sm text-cyan-300">{exp.company}</p>
                    </div>
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-300">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {exp.period}
                    </span>
                  </div>

                  <ul className="list-disc space-y-3 pl-5 marker:text-violet-400">
                    {exp.responsibilities.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-slate-400 sm:text-base">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </div>
        </ol>
      </div>
    </section>
  );
}
