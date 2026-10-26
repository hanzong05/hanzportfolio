import React from 'react';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';

// Every figure here comes from the resume / portfolio data:
// experience begins Sept 2024, 10 showcased projects, 19 campground hubs.
const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '10', label: 'Projects Showcased' },
  { value: '19', label: 'Campground Hubs Platform' },
];

export default function HeroSection() {
  return (
    <section id="top" className="relative overflow-x-clip px-4 pt-28 pb-16 sm:px-6 md:pt-36 md:pb-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* Copy */}
        <div className="animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Full-Stack &amp; CMS Developer <span className="mx-1 text-slate-400">•</span> Philippines
          </p>

          <h1 className="mt-5 text-[clamp(2.5rem,5.4vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight text-navy">
            I build digital products that solve <span className="text-brand">real business problems.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            I&apos;m Hanz Jansen Pillerva, a full-stack and CMS developer building web applications, business systems,
            and connected digital platforms for companies, organizations, and entrepreneurs.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-dark inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold">
              Let&apos;s Work Together <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#projects" className="btn-outline inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold">
              Explore My Work <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-bold text-navy sm:text-4xl">{s.value}</dd>
                <p className="mt-1 text-xs leading-snug text-slate-500" aria-hidden>{s.label}</p>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div aria-hidden className="absolute -right-4 top-6 h-[88%] w-[78%] rounded-[2rem] bg-gradient-to-br from-brand/80 to-blue-300/60 lg:-right-2" />
          <div className="relative ml-auto w-[88%] overflow-hidden rounded-[2rem] bg-slate-200 shadow-2xl shadow-brand/20 ring-1 ring-black/5">
            <img
              src="/dev.webp"
              width={503}
              height={496}
              fetchPriority="high"
              decoding="async"
              alt="Portrait of Hanz Jansen Pillerva, full-stack and CMS developer"
              className="block h-auto w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 right-2 flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3 shadow-xl sm:right-6">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <MapPin className="h-4 w-4" />
            </span>
            <div className="text-xs leading-tight">
              <p className="font-semibold text-navy">Based in the Philippines</p>
              <p className="mt-0.5 text-slate-500">Open to Freelance &amp; Remote Work</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
