import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 border-t border-line px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">06 · Education</p>
          <h2 className="mt-4 text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-navy">
            Education &amp; foundation.
          </h2>
        </div>

        <div className="card-light flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-start sm:p-8">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-blue-50 text-brand">
            <GraduationCap className="h-7 w-7" aria-hidden />
          </span>
          <div>
            <h3 className="text-lg font-bold text-navy sm:text-xl">Bachelor of Science in Information Systems</h3>
            <p className="mt-1 font-semibold text-brand">Tarlac State University</p>
            <p className="mt-1 text-sm text-slate-500">August 2020 – July 2024</p>
            <p className="mt-4 text-sm text-slate-600">
              <span className="font-semibold text-navy">Major:</span> Business Analytics
            </p>
            <p className="mt-1 text-sm text-slate-600">
              <span className="font-semibold text-navy">Capstone:</span> Web-based Veterinary Management Information System
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
