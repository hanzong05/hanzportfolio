import React from 'react';

const experiences = [
  {
    id: 1,
    period: 'June 2026 – Present',
    role: 'Part-Time Freelance Web Developer',
    company: 'Freelance',
    items: [
      'Built a GoHighLevel-connected guest app platform for 19 campground and RV resort hubs, each with its own app, push notifications, and admin panel.',
      'Built and customized WordPress websites for resort and business clients using custom post types, ACF fields, and Beaver Builder layouts.',
    ],
  },
  {
    id: 2,
    period: 'February 2026 – Present',
    role: 'System Developer',
    company: 'Central Azucarera de Tarlac',
    items: [
      'Developed in-house web and mobile applications to improve internal processes and system accessibility.',
      'Provided technical troubleshooting for office computers, hardware, and printers.',
    ],
  },
  {
    id: 3,
    period: 'September 2025 – November 2025',
    role: 'Web Developer',
    company: 'My Creative Panda',
    items: [
      'Developed an official LGU website.',
      'Designed and contributed to a custom HRIS system for employee records, payroll, and administrative workflows.',
      'Built a booking and scheduling system for Khoshipping Lines.',
      'Performed debugging, optimization, maintenance, and ongoing support for client applications.',
    ],
  },
  {
    id: 4,
    period: 'September 2024 – September 2025',
    role: 'IT Technician',
    company: 'Eljin Corporation (Butter World Superbakeshop)',
    items: [
      'Supported computers, printers, CCTV, POS, and network systems.',
      'Built and maintained the Butter World Superbakeshop website.',
      'Designed a custom advertising platform.',
      "Assisted in developing the company's HRIS and payroll system.",
    ],
  },
];

export default function WorkExperience() {
  return (
    <section id="experience" className="scroll-mt-24 border-t border-line px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">04 · Work experience</p>
            <h2 className="mt-4 text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-navy">
              Experience across products,<br />platforms, and business systems.
            </h2>
          </div>
        </div>

        <ol className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-line xl:block" />
          {experiences.map((e) => (
            <li key={e.id} className="relative">
              <span aria-hidden className="relative z-10 block h-3.5 w-3.5 rounded-full bg-brand ring-4 ring-cream" />
              <p className="mt-5 text-xs font-semibold text-slate-500">{e.period}</p>
              <h3 className="mt-2 text-lg font-bold leading-snug text-navy">{e.role}</h3>
              <p className="mt-1 text-sm font-semibold text-brand">{e.company}</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
                {e.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                    {i}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
