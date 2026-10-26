import React from 'react';
import SectionHeader from './section-header';

// Skills are taken directly from the resume. No proficiency levels or percentages.
const skillGroups: { category: string; items: string[] }[] = [
  { category: 'CMS & Platforms', items: ['WordPress', 'Beaver Builder', 'Advanced Custom Fields (ACF)', 'Custom Post Types', 'GoHighLevel'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'AngularJS', 'React Native', 'Flutter'] },
  { category: 'Backend', items: ['Laravel', 'Node.js', 'CakePHP', 'PHP', 'Python'] },
  { category: 'Databases & Cloud', items: ['MySQL', 'PostgreSQL', 'Firebase', 'Cloudflare Workers'] },
  { category: 'Programming Languages', items: ['JavaScript', 'TypeScript', 'PHP', 'Python', 'Dart'] },
  { category: 'Tools & Technical Support', items: ['Git', 'SEO', 'System optimization', 'CCTV, POS, printers & networks'] },
];

export default function TechSkills() {
  return (
    <section id="skills" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Skills" title="The technologies behind my work." />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.category} className="glass glass-hover rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white">{group.category}</h3>
              <div className="grad-bar mt-3 mb-5 h-0.5 w-12 rounded-full" />
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-200"
                  >
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
