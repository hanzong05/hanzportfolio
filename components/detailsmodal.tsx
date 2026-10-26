'use client';
import React, { useEffect, useState } from 'react';
import { CalendarDays, Check, ChevronLeft, ChevronRight, Layers, Send, Sparkles, UserRound, X, Zap } from 'lucide-react';

interface Project {
  title: string;
  period: string;
  description: string[];
  technologies: string[];
  /** Optional client name, shown in the info cards when set */
  client?: string;
  /** Optional screenshot path under /public */
  image?: string;
  /** Optional extra screenshots for the gallery */
  screenshots?: string[];
  /** Optional note under the preview (e.g. marks a concept illustration) */
  imageCaption?: string;
  /** 'contain' shows each image whole; default scrolls tall full-page captures */
  galleryFit?: 'scroll' | 'contain';
  showGithub?: boolean;
  githubUrl?: string;
  showLive?: boolean;
  liveUrl?: string;
}

interface DetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const featureIcons = [Check, Zap, Layers, Sparkles, UserRound, Send];

export default function DetailsModal({ project, isOpen, onClose }: DetailsModalProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setActive(0);
  }, [project]);

  if (!isOpen || !project) return null;

  const shots = project.screenshots?.length
    ? project.screenshots
    : project.image
      ? [project.image]
      : [];
  const current = shots[active];
  const overview = project.description[0];
  const features = project.description.length > 1 ? project.description.slice(1) : project.description;

  const infoCards = [
    { label: 'Year', value: project.period || 'Ongoing', Icon: CalendarDays },
    ...(project.client ? [{ label: 'Client', value: project.client, Icon: UserRound }] : []),
    { label: 'Technologies', value: `${project.technologies.length} tools`, Icon: Layers },
  ];

  const step = (dir: number) => setActive((i) => (i + dir + shots.length) % shots.length);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="glass animate-modal-in relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grad-bar h-1 w-full" />

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_1fr]">
          {/* Left: screenshot gallery and technologies */}
          <div className="min-w-0 space-y-5">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-xl">
              <div className="flex items-center gap-1.5 border-b border-white/5 bg-white/[0.03] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 truncate text-xs text-slate-500">{project.title}</span>
              </div>
              {current && project.galleryFit === 'contain' ? (
                <div className="grid place-items-center bg-white p-3">
                  <img
                    key={current}
                    src={current}
                    alt={`${project.title} concept illustration ${active + 1}`}
                    className="block h-auto max-h-[62vh] w-auto max-w-full object-contain"
                  />
                </div>
              ) : current ? (
                <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden">
                  <img
                    key={current}
                    src={current}
                    alt={`${project.title} screenshot ${active + 1}`}
                    className="block h-auto w-full max-w-full"
                  />
                </div>
              ) : (
                <div className="grid aspect-[16/10] place-items-center text-sm text-slate-500">No screenshot yet</div>
              )}
              {shots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {project.imageCaption && <p className="-mt-2 text-xs text-slate-400">{project.imageCaption}</p>}

            {shots.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {shots.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show screenshot ${i + 1}`}
                    className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                      i === active ? 'border-violet-400' : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Built With</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: details */}
          <div className="min-w-0 space-y-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Project Details</p>
                <h3 className="mt-2 text-3xl font-bold leading-tight text-grad sm:text-4xl">{project.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{project.technologies.slice(0, 3).join(' · ')}</p>
              </div>
              <a
                href="#contact"
                onClick={onClose}
                className="btn-grad inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Send className="h-4 w-4" />
                Request Demo
              </a>
            </div>

            {overview && <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{overview}</p>}

            <div className={`grid gap-3 ${infoCards.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {infoCards.map(({ label, value, Icon }) => (
                <div key={label} className="glass rounded-xl p-4">
                  <Icon className="mb-2 h-4 w-4 text-cyan-300" />
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="break-words text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>

            <section>
              <h4 className="mb-4 text-sm font-semibold text-white">Key Features</h4>
              <ul className="grid gap-3 sm:grid-cols-2">
                {features.map((item, index) => {
                  const Icon = featureIcons[index % featureIcons.length];
                  return (
                    <li key={index} className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-cyan-400/30 to-violet-500/30">
                        <Icon className="h-4 w-4 text-cyan-200" />
                      </span>
                      <span className="text-sm leading-relaxed text-slate-300">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-5 rounded-full p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
