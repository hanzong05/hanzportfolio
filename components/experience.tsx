import React from 'react';
import { CalendarDays, Check } from 'lucide-react';
import SectionHeader from './section-header';

export default function WorkExperience() {
  const experiences = [
    {
      id: 1,
      company: 'My Creative Panda',
      period: 'Sept 2025 - Nov 2025',
      responsibilities: [
        "Developed the LGU's official website, improving public access to information, services, and announcements.",
        'Designed and contributed to the development of a custom HRIS system to support employee records, payroll processes, and administrative workflows.',
        'Built a booking and scheduling platform for Khoshipping Lines, enabling efficient tracking of reservations and operational logistics.',
        'Provided technical support, debugging, and optimization for various client systems, ensuring stability, improved performance, and issue resolution.',
      ],
    },
    {
      id: 2,
      company: 'Eljin Corporation (Butter World Superbakeshop)',
      period: 'Sept. 2024 - Sept 2025',
      responsibilities: [
        'Designed and developed a custom advertising platform to support marketing operations and campaign management.',
        "Built and designed the Butter World Superbakeshop website, improving online presence and customer engagement.",
        "Assisted in the development of the company's HRIS and payroll system, enhancing internal processes and employee data management.",
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
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-300">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {exp.period}
                    </span>
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
