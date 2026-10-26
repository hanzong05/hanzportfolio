import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProject() {
  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="glass grid gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-[1fr_1.25fr] lg:items-center lg:gap-12">
          <div>
            <span className="inline-flex rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-3 py-1 text-xs font-semibold text-white">
              Featured project
            </span>
            <h3 className="mt-5 text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-white">
              Sugar Production Ticketing POS
            </h3>
            <p className="mt-4 leading-relaxed text-slate-400">
              Production tracking, ticketing, and sales reporting for sugar mill workflows.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {['Flutter', 'Dart'].map((t) => (
                <li key={t} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-200">
                  {t}
                </li>
              ))}
            </ul>
            <a href="#projects" className="btn-grad mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white">
              View all projects <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink">
            <img src="/projects/sugar-pos.png" alt="Sugar Production Ticketing POS screenshot" className="block h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
