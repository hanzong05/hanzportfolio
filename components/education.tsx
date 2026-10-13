import React from 'react';
import { CheckCircle2, GraduationCap, MapPin, CalendarDays } from 'lucide-react';
import SectionHeader from './section-header';

export default function Education() {
  const education = {
    degree: 'Bachelor of Science in Information Systems',
    school: 'Tarlac State University',
    location: 'Tarlac, Philippines',
    period: 'Aug 2020 - July 2024',
    major: 'Major in Business Analytics',
    capstone:
      'Web-based Veterinary Management Information System with Data Analysis and Visualization',
    achievements: [
      'Specialized in Business Analytics and System Development',
      'Developed comprehensive capstone project combining web development with data analysis',
      'Gained hands-on experience in database management and system architecture',
    ],
  };

  return (
    <section id="education" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Education" title="Educational Background" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Degree card */}
          <div className="glass glass-hover rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 ring-1 ring-white/10">
                <GraduationCap className="h-8 w-8 text-violet-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white sm:text-2xl">{education.degree}</h3>
                <p className="mt-1 font-semibold text-cyan-300">{education.school}</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />
                    {education.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {education.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-6 border-t border-white/5 pt-6">
              <span className="inline-block rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-300">
                {education.major}
              </span>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-300">Capstone Project</h4>
                <p className="italic leading-relaxed text-slate-300">&ldquo;{education.capstone}&rdquo;</p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="glass glass-hover rounded-2xl p-6 sm:p-8">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-wider text-cyan-300">Highlights</h4>
            <ul className="space-y-4">
              {education.achievements.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
