'use client';
import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Briefcase, BrainCircuit, Globe, Smartphone, Wrench } from 'lucide-react';
import DetailsModal from './detailsmodal';

type Category = 'web' | 'business' | 'ai' | 'mobile' | 'tools';

interface Project {
  id: number;
  title: string;
  period: string;
  category: Category;
  description: string[];
  technologies: string[];
  showGithub: boolean;
  showLive: boolean;
  githubUrl?: string;
  liveUrl?: string;
  /** Optional screenshot path under /public, e.g. "/projects/farm2go.png" */
  image?: string;
}

const categoryMeta: Record<Category, { label: string; grad: string; Icon: LucideIcon }> = {
  web: { label: 'Web App', grad: 'from-cyan-500 to-blue-600', Icon: Globe },
  business: { label: 'Business System', grad: 'from-violet-500 to-purple-700', Icon: Briefcase },
  ai: { label: 'AI / ML', grad: 'from-teal-400 to-emerald-600', Icon: BrainCircuit },
  mobile: { label: 'Mobile App', grad: 'from-pink-500 to-rose-600', Icon: Smartphone },
  tools: { label: 'Tools / Other', grad: 'from-amber-400 to-orange-600', Icon: Wrench },
};

const filters: { key: 'all' | Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'business', label: 'Business Systems' },
  { key: 'ai', label: 'AI/ML' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'tools', label: 'Tools' },
];

const projects: Project[] = [
  {
    id: 5,
    title: 'Farm2Go E-commerce',
    image: '/projects/farm2go.png',
    period: '2024',
    category: 'mobile',
    description: [
      'Developed a multi-platform e-commerce application as part of a capstone project.',
      'Mobile-first design with seamless shopping experience.',
    ],
    technologies: ['React Native', 'PostgreSQL', 'TypeScript'],
    showGithub: true,
    showLive: true,
    githubUrl: 'https://github.com/hanzong05/farm2go',
    liveUrl: 'https://farm2go.vercel.app/',
  },
  {
    id: 9,
    title: 'Sugar Production Ticketing POS',
    image: '/projects/sugar-pos.png',
    period: '2026',
    category: 'mobile',
    description: [
      'Built a point-of-sale and ticketing application for managing sugar production operations and transactions.',
      'Streamlined production tracking, ticket generation, and sales reporting for sugar mill workflows.',
    ],
    technologies: ['Flutter', 'Dart'],
    showGithub: true,
    showLive: false,
    githubUrl: 'https://github.com/hanzong05/sugar-production',
  },
  {
    id: 10,
    title: 'Affecta – AI-Powered Call Monitoring',
    image: '/projects/affecta.png',
    period: '2026',
    category: 'ai',
    description: [
      'Built an AI-driven call center monitoring platform with real-time risk scoring and emotional trend analysis.',
      'Provides agent performance insights and supervisor alerts to prevent escalations before they occur.',
      'Python backend uses Whisper speech recognition and MFCC-based emotion classification to analyze calls.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Python', 'Whisper', 'scikit-learn'],
    showGithub: true,
    showLive: true,
    githubUrl: 'https://github.com/hanzong05/whspr',
    liveUrl: 'https://affecta-six.vercel.app/',
  },
  {
    id: 11,
    title: 'OCR Document Scanner',
    image: '/projects/ocr-document-scanner.png',
    period: '2026',
    category: 'ai',
    description: [
      'Developed an OCR-powered web application for extracting and digitizing text from documents and images.',
      'Streamlined document processing with accurate text recognition and export capabilities.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'OCR'],
    showGithub: true,
    showLive: true,
    githubUrl: 'https://github.com/hanzong05/ocr-fe',
    liveUrl: 'https://ocr-fe-lyart.vercel.app/',
  },
  {
    id: 12,
    title: 'LiqueFact – Soil Liquefaction Analysis',
    image: '/projects/liquefact.png',
    period: '2026',
    category: 'web',
    description: [
      'Built a geotechnical web app for soil liquefaction risk assessment using borehole data across Tarlac, Philippines.',
      'Interactive map with real-time LPI computation, soil bearing capacity, settlement estimation, and foundation recommendations.',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Leaflet'],
    showGithub: true,
    showLive: true,
    githubUrl: 'https://github.com/hanzong05/liquefact',
    liveUrl: 'https://liquefact-ry9t.vercel.app/analysis',
  },
  {
    id: 13,
    title: 'BlueSpot Hub – Campground & RV Resort PWA Platform',
    image: '/projects/bluespot-hub.png',
    period: '2026',
    category: 'web',
    description: [
      'Built a multi-tenant guest app platform powering 19+ campground and RV resort hubs, each with amenities, things-to-do guides, booking links, maps, and live weather/radar.',
      'Installable PWA with push notifications, geofenced alerts, guest chat, an admin panel, and hub onboarding, served through Cloudflare Workers with locked-down Firebase security rules.',
    ],
    technologies: ['JavaScript', 'HTML', 'CSS', 'Firebase', 'Cloudflare Workers', 'PWA'],
    showGithub: true,
    showLive: true,
    githubUrl: 'https://github.com/hanzong05/GHL',
    liveUrl: 'https://hub.bluespotguide.com',
  },
  {
    id: 15,
    title: 'BlueSpot Guide',
    image: '/projects/bluespot.png',
    period: '',
    category: 'web',
    description: [
      'Travel site for finding campgrounds, RV parks, RV resorts, and marinas across the U.S., with BlueSpot Premier listings.',
      'Local area guides covering dining, attractions, and RV services, plus trip planning and travel inspiration.',
    ],
    technologies: ['WordPress', 'Beaver Builder'],
    showGithub: false,
    showLive: true,
    liveUrl: 'https://bluespotguide.com/',
  },
  {
    id: 16,
    title: 'Forsyth Station RV Resort',
    image: '/projects/forsyth.png',
    period: '',
    category: 'web',
    description: [
      'Website for an independently owned RV resort in Forsyth, Georgia, featuring full-hookup sites, cabin stays, and monthly stay applications.',
      'Online booking, guest reviews, nearby attractions guide, and a resort map and FAQ.',
    ],
    technologies: ['WordPress'],
    showGithub: false,
    showLive: true,
    liveUrl: 'https://forsythstationrv.com/',
  },
  {
    id: 17,
    title: 'Bartow Business Association',
    image: '/projects/bartow.png',
    period: '',
    category: 'web',
    description: [
      'Website for a membership group connecting Cartersville and Bartow County businesses through networking, events, and resources.',
      'Member directory, events calendar, member portal, and online membership sign-up.',
    ],
    technologies: ['WordPress'],
    showGithub: false,
    showLive: true,
    liveUrl: 'https://bartowbusiness.org/',
  },
];

export default function Projects() {
  const [active, setActive] = useState<'all' | Category>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const visible = active === 'all' ? projects : projects.filter((p) => p.category === active);
  const countFor = (key: 'all' | Category) =>
    key === 'all' ? projects.length : projects.filter((p) => p.category === key).length;

  return (
    <section id="projects" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-block rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              Projects
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Featured Projects</h2>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const isActive = active === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActive(f.key)}
                  aria-pressed={isActive}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'btn-grad text-white'
                      : 'glass text-slate-300 hover:border-violet-400/40 hover:text-white'
                  }`}
                >
                  {f.label}
                  <span className={`ml-2 text-xs ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                    {countFor(f.key)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => {
            const meta = categoryMeta[project.category];
            const { Icon } = meta;
            return (
              <article
                key={project.id}
                className="glass glass-hover group flex flex-col overflow-hidden rounded-2xl"
              >
                {project.image && (
                  <div className="relative h-44 overflow-hidden border-b border-white/5 bg-slate-900">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className={`mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r ${meta.grad} px-3 py-1 text-xs font-medium text-white`}>
                    <Icon className="h-3.5 w-3.5" />
                    {meta.label}
                  </span>
                  <h3 className="mb-2 text-base font-semibold leading-snug text-white">{project.title}</h3>
                  {project.period && <p className="mb-4 text-xs text-slate-500">Period: {project.period}</p>}

                  <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-slate-400">
                    {project.description[0]}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="rounded-md px-2 py-1 text-xs text-slate-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/5 pt-4">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 transition-colors hover:text-white"
                    >
                      Request Demo
                    </a>
                    <button
                      type="button"
                      onClick={() => openModal(project)}
                      className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-violet-400/50 hover:text-white"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <DetailsModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}
