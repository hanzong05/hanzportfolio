import React from 'react';
import { ArrowRight, Briefcase, Globe, Wrench } from 'lucide-react';

const themes = [
  { title: 'Business Systems', body: 'Internal tools, HRIS, payroll, and workflow automation.', Icon: Briefcase },
  { title: 'Websites & Digital Platforms', body: 'Modern websites, CMS solutions, and connected guest experiences.', Icon: Globe },
  { title: 'Technical Support', body: 'Practical IT support, system maintenance, and troubleshooting.', Icon: Wrench },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.8fr_1fr]">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">01 · About me</p>
          <h2 className="mt-4 text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-navy">
            Technology should solve <span className="text-brand">real problems.</span>
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed text-slate-600">
            I combine web development, CMS customization, and systems development to create practical digital solutions
            for businesses. My experience ranges from building connected campground platforms and WordPress websites to
            developing internal business applications and providing ongoing technical support.
          </p>
          <a href="#experience" className="btn-outline mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
            More About Me <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
          <div className="overflow-hidden rounded-[1.75rem] border border-line bg-slate-200 shadow-xl shadow-brand/10">
            <img src="/profile.webp" width={854} height={1280} loading="lazy" decoding="async" alt="Portrait of Hanz Pillerva" className="block h-auto w-full object-cover" />
          </div>
        </div>

        <ul className="space-y-4">
          {themes.map(({ title, body, Icon }) => (
            <li key={title} className="card-light flex gap-4 rounded-2xl p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-brand">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-navy">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
