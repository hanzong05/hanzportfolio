import React from 'react';
import { GraduationCap, MapPin, CalendarDays } from 'lucide-react';
import SectionHeader from './section-header';

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Education" title="Education & foundation." />

        <div className="glass glass-hover rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 ring-1 ring-white/10">
              <GraduationCap className="h-8 w-8 text-violet-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white sm:text-2xl">Bachelor of Science in Information Systems</h3>
              <p className="mt-1 font-semibold text-cyan-300">Tarlac State University</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  August 2020 – July 2024
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  Tarlac, Philippines
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-5 border-t border-white/5 pt-6">
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">Major:</span> Business Analytics
            </p>
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">Capstone:</span> Web-based Veterinary Management Information System
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
