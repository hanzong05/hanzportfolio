'use client';
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface Project {
  title: string;
  period: string;
  description: string[];
  technologies: string[];
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

export default function DetailsModal({ project, isOpen, onClose }: DetailsModalProps) {
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

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="glass animate-modal-in relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grad-bar h-1 w-full" />

        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/5 bg-panel/90 p-6 backdrop-blur-xl">
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">{project.title}</h3>
            <p className="mt-1 text-sm text-slate-500">Period: {project.period}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-7 p-6">
          <section>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-300">Project Overview</h4>
            <ul className="space-y-2.5">
              {project.description.map((item, index) => (
                <li key={index} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-300">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-slate-200">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section>
            <a
              href="#contact"
              onClick={onClose}
              className="btn-grad inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
            >
              Request Demo
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
