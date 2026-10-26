import React from 'react';

// Taken directly from the resume. No proficiency ratings or percentages.
const skillGroups: { category: string; items: string[] }[] = [
  { category: 'CMS & Platforms', items: ['WordPress', 'Beaver Builder', 'Advanced Custom Fields (ACF)', 'Custom Post Types', 'GoHighLevel'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'AngularJS', 'React Native', 'Flutter'] },
  { category: 'Backend', items: ['Laravel', 'Node.js', 'CakePHP', 'PHP', 'Python'] },
  { category: 'Databases & Cloud', items: ['MySQL', 'PostgreSQL', 'Firebase', 'Cloudflare Workers'] },
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'PHP', 'Python', 'Dart'] },
  { category: 'Tools & Support', items: ['Git', 'SEO', 'System optimization', 'CCTV, POS, printers & networks'] },
];

export default function TechSkills() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-line px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">05 · Technical skills</p>
            <h2 className="mt-4 text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-navy">
              Tools I work with.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            Technologies, platforms, and tools I use to build modern, scalable, and efficient solutions.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.category} className="card-light rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy">{g.category}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item} className="rounded-lg border border-line bg-cream px-3 py-1.5 text-xs font-semibold text-slate-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
