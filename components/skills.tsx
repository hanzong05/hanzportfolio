'use client';
import React, { useEffect, useState } from 'react';
import {
  SiJavascript, SiTypescript, SiPhp, SiPython, SiNodedotjs, SiLaravel, SiMysql, SiPostgresql,
  SiReact, SiNextdotjs, SiAngular, SiFlutter, SiWordpress, SiGit, SiCakephp,
} from 'react-icons/si';
import { Database, Globe, X } from 'lucide-react';
import SectionHeader from './section-header';

type Skill = {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  proficiency: number;
};

const skillsData: { id: number; category: string; skills: Skill[] }[] = [
  {
    id: 1,
    category: 'Programming Languages',
    skills: [
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', proficiency: 90 },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', proficiency: 90 },
      { name: 'PHP', icon: SiPhp, color: '#777BB4', proficiency: 90 },
      { name: 'Python', icon: SiPython, color: '#3776AB', proficiency: 80 },
    ],
  },
  {
    id: 2,
    category: 'Frontend Technologies',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB', proficiency: 85 },
      { name: 'Next.js', icon: SiNextdotjs, color: '#e5e7eb', proficiency: 85 },
      { name: 'Angular', icon: SiAngular, color: '#DD0031', proficiency: 85 },
      { name: 'React Native', icon: SiReact, color: '#61DAFB', proficiency: 85 },
      { name: 'Flutter', icon: SiFlutter, color: '#02569B', proficiency: 80 },
      { name: 'WordPress', icon: SiWordpress, color: '#21759B', proficiency: 80 },
    ],
  },
  {
    id: 3,
    category: 'Backend Technologies',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933', proficiency: 85 },
      { name: 'Laravel', icon: SiLaravel, color: '#FF2D20', proficiency: 90 },
      { name: 'CakePHP', icon: SiCakephp, color: '#D33C43', proficiency: 90 },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1', proficiency: 90 },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', proficiency: 85 },
    ],
  },
  {
    id: 4,
    category: 'Tools & Others',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032', proficiency: 85 },
      { name: 'SEO', icon: Globe, color: '#A78BFA', proficiency: 80 },
      { name: 'Database Mgmt', icon: Database, color: '#22D3EE', proficiency: 85 },
    ],
  },
];

export default function TechSkills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSkill(null), 300);
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <section id="skills" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Skills" title="Technical Skills" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {skillsData.map((category) => (
            <div key={category.id} className="glass glass-hover rounded-2xl p-6">
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white">{category.category}</h3>
                <div className="grad-bar mt-3 h-0.5 w-12 rounded-full" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {category.skills.map((skill) => {
                  const IconComponent = skill.icon;
                  return (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() => openModal(skill)}
                      className="group/skill flex flex-col items-center gap-2 rounded-xl p-2 transition-transform hover:-translate-y-0.5"
                      aria-label={`${skill.name} proficiency`}
                    >
                      <span className="grid aspect-square w-full place-items-center rounded-xl border border-white/10 bg-white/[0.03] transition-colors group-hover/skill:border-violet-400/50 group-hover/skill:bg-violet-500/10">
                        <IconComponent className="h-8 w-8 transition-transform group-hover/skill:scale-110" style={{ color: skill.color }} />
                      </span>
                      <span className="text-center text-xs text-slate-400">{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">Select a skill to see proficiency.</p>
      </div>

      {/* Proficiency Modal */}
      {isModalOpen && selectedSkill && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="glass animate-modal-in relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grad-bar h-1 w-full" />
            <div className="flex items-start justify-between gap-4 p-6">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-white/5">
                  {React.createElement(selectedSkill.icon, { className: 'h-8 w-8', style: { color: selectedSkill.color } })}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedSkill.name}</h3>
                  <p className="text-sm text-slate-500">Skill Proficiency</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 px-6 pb-6">
              <div className="flex items-end justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">Proficiency Level</span>
                <span className="text-3xl font-bold text-white">{selectedSkill.proficiency}%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
                <div
                  className="grad-bar h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${selectedSkill.proficiency}%` }}
                />
              </div>
              <p className="text-sm text-slate-400">
                {selectedSkill.proficiency >= 90 && 'Expert level proficiency with extensive hands-on experience.'}
                {selectedSkill.proficiency >= 85 && selectedSkill.proficiency < 90 && 'Advanced proficiency with strong practical knowledge.'}
                {selectedSkill.proficiency >= 80 && selectedSkill.proficiency < 85 && 'Proficient with solid understanding and experience.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
