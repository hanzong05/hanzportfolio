import React from 'react';
import { CalendarDays, Check } from 'lucide-react';
import SectionHeader from './section-header';

export default function WorkExperience() {
  const experiences = [
    {
      id: 1,
      company: 'Central Azucarera de Tarlac',
      period: '',
      responsibilities: [
        'Developed in-house web and mobile applications for internal company use, improving internal processes and system accessibility.',
        'Provided technical troubleshooting support for office computers, hardware issues, and printers, ensuring minimal downtime.',
      ],
    },
    {
      id: 2,
      company: 'My Creative Panda',
      period: 'Sept 2025 - Nov 2025',
      responsibilities: [
        'Developed an official LGU website, improving public access to government information, services, and announcements.',
        'Designed and contributed to a custom HRIS system supporting employee records, payroll processes, and administrative workflows.',
        'Built a booking and scheduling system for Khoshipping Lines to improve reservation tracking and operational efficiency.',
        'Performed debugging, optimization, and maintenance across multiple client systems to ensure performance and stability.',
        'Provided ongoing technical support and issue resolution for deployed web applications.',
      ],
    },
    {
      id: 3,
      company: 'Eljin Corporation (Butter World Superbakeshop)',
      period: 'Sept. 2024 - Sept 2025',
      responsibilities: [
        'Provided technical support by diagnosing and resolving issues with computers, printers, CCTV systems, POS systems, and network/internet connectivity.',
        'Designed and developed a custom advertising platform to streamline marketing operations and manage campaigns effectively.',
        'Built and maintained the Butter World Superbakeshop website, enhancing online presence and improving customer engagement.',
        "Assisted in the development of the company's HRIS and payroll system, optimizing employee data management and internal workflows.",
        'Collaborated with internal stakeholders to gather requirements and implement system improvements, ensuring scalable and efficient solutions.',
      ],
    },
  ];

  return (
    <section id="experience" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Experience" title="Work Experience" />

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
                    <h3 className="text-lg font-semibold text-white sm:text-xl">{exp.company}</h3>
                    {exp.period && (
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-300">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {exp.period}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {exp.responsibilities.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-violet-400" />
                        <span>{item}</span>
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
