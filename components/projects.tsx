'use client';
import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, ArrowUpRight, Briefcase, BrainCircuit, Globe, Smartphone, Wrench } from 'lucide-react';
import DetailsModal from './detailsmodal';

type Category = 'web' | 'business' | 'ai' | 'mobile' | 'tools';

interface Project {
  id: number;
  title: string;
  period: string;
  category: Category;
  /** Optional extra categories so the project also appears under those filters */
  alsoIn?: Category[];
  description: string[];
  technologies: string[];
  showGithub: boolean;
  showLive: boolean;
  githubUrl?: string;
  liveUrl?: string;
  /** Optional screenshot path under /public, e.g. "/projects/farm2go.png" */
  image?: string;
  /** Optional client name shown in the details popup */
  client?: string;
  /** Optional extra screenshots for the details popup gallery */
  screenshots?: string[];
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
      'Multi-platform e-commerce application developed as a capstone project.',
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
      'Python machine learning text recognition that digitizes documents with accurate OCR and export capabilities.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Python', 'OCR'],
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
    alsoIn: ['ai'],
    description: [
      'Machine learning (ANN) liquefaction prediction served through a hosted API, with an interactive map, real-time LPI computation, soil bearing capacity, settlement estimation, and foundation recommendations.',
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
    screenshots: [
      '/projects/hub-allatoona-landing-marine-resort.png',
      '/projects/hub-big-meadow-family-campground.png',
      '/projects/hub-blue-ridge-rv-resort.png',
      '/projects/hub-blue-water-rv-resort.png',
      '/projects/hub-buckeye-lake-koa-holiday.png',
      '/projects/hub-carolina-camp-cedar.png',
      '/projects/hub-forsyth-station-rv-resort.png',
      '/projects/hub-grandstand-rv-park.png',
      '/projects/hub-iron-mountain-park.png',
      '/projects/hub-little-river-campground.png',
      '/projects/hub-oak-lake-rv-resort.png',
      '/projects/hub-sanwar-rv-resort.png',
      '/projects/hub-splash-rv-resort.png',
      '/projects/hub-stay-wilder-campground.png',
      '/projects/hub-stone-mountain-park-campground.png',
      '/projects/hub-sweetwater-valley-rv-park.png',
      '/projects/hub-talking-rock-motorcoach-resort.png',
      '/projects/hub-winding-waters-rv-resort.png',
    ],
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
      'Mobile-first campground and RV travel guide with a filterable directory of Premier Properties, interactive maps, and personalized recently viewed listings.',
    ],
    technologies: ['WordPress', 'Beaver Builder'],
    showGithub: false,
    showLive: true,
    liveUrl: 'https://bluespotguide.com/',
  },
  {
    id: 16,
    title: 'Forsyth Station RV Resort',
    client: 'Forsyth Station RV Resort',
    image: '/projects/forsyth.png',
    screenshots: [
      '/projects/forsyth-01-home.jpg',
      '/projects/forsyth-02-ways-to-stay.jpg',
      '/projects/forsyth-03-amenities.jpg',
      '/projects/forsyth-04-pricing.jpg',
      '/projects/forsyth-05-gallery.jpg',
      '/projects/forsyth-06-map.jpg',
      '/projects/forsyth-07-book-now.jpg',
      '/projects/forsyth-08-things-to-do.jpg',
      '/projects/forsyth-09-about.jpg',
      '/projects/forsyth-10-contact.jpg',
    ],
    period: '',
    category: 'web',
    description: [
      'Full resort website with dynamic amenities, gallery, and events, built with WordPress, ACF, and custom post types.',
    ],
    technologies: ['WordPress', 'ACF', 'Custom Post Types'],
    showGithub: false,
    showLive: true,
    liveUrl: 'https://forsythstationrv.com/',
  },
  {
    id: 17,
    title: 'Bartow Business Association',
    client: 'Bartow Business Association',
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
  {
    id: 37,
    title: 'Pine Ridge Campground',
    client: 'Pine Ridge Campground',
    image: '/projects/pineridge-01-home.jpg',
    screenshots: [
      '/projects/pineridge-01-home.jpg',
      '/projects/pineridge-02-amenities.jpg',
      '/projects/pineridge-03-map.jpg',
      '/projects/pineridge-04-pricing.jpg',
      '/projects/pineridge-05-gallery.jpg',
      '/projects/pineridge-06-guest-info.jpg',
      '/projects/pineridge-07-faq.jpg',
      '/projects/pineridge-08-events.jpg',
      '/projects/pineridge-09-things-to-do.jpg',
      '/projects/pineridge-10-contact.jpg',
    ],
    period: '',
    category: 'web',
    description: [
      'Campground website for Pine Ridge Campground in Roebuck, South Carolina, with amenities, rates, a campground map, events calendar, FAQs and guest information.',
    ],
    technologies: ['WordPress'],
    showGithub: false,
    showLive: true,
    liveUrl: 'https://pineridgecampground.com/',
  },
];

const badgeTone: Record<Category, string> = {
  web: 'bg-blue-50 text-blue-700',
  business: 'bg-violet-50 text-violet-700',
  ai: 'bg-emerald-50 text-emerald-700',
  mobile: 'bg-rose-50 text-rose-700',
  tools: 'bg-amber-50 text-amber-700',
};

const FEATURED_ID = 13;

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

  const inCategory = (p: Project, key: Category) => p.category === key || (p.alsoIn ?? []).includes(key);
  const visible = active === 'all' ? projects : projects.filter((p) => inCategory(p, active));
  const countFor = (key: 'all' | Category) =>
    key === 'all' ? projects.length : projects.filter((p) => inCategory(p, key)).length;

  const featured = projects.find((p) => p.id === FEATURED_ID);
  const grid = visible.filter((p) => p.id !== FEATURED_ID);

  return (
    <section id="projects" className="scroll-mt-24 border-t border-line px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">03 · Featured projects</p>
            <h2 className="mt-4 text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-navy">
              Selected work,<br />built for real-world use.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            A selection of applications, platforms, and websites I&apos;ve worked on, from internal business tools to
            digital experiences.
          </p>
        </div>

        {featured && (
          <article className="card-light mt-12 grid items-center gap-8 overflow-hidden rounded-3xl p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="inline-flex rounded-full bg-lime px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy">
                Featured project
              </span>
              <h3 className="mt-5 text-[clamp(2rem,3.4vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-navy">
                BlueSpot Hub
              </h3>
              <p className="mt-1 text-lg font-semibold text-navy">Campground &amp; RV Resort Platform</p>
              <p className="mt-4 max-w-md leading-relaxed text-slate-600">
                A GoHighLevel-connected guest application platform for 19 campground and RV resort hubs, with individual
                guest apps, push notifications, and admin panels.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {['GoHighLevel', 'Firebase', 'Cloudflare Workers'].map((t) => (
                  <li key={t} className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">{t}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => openModal(featured)} className="btn-blue inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
                  View Project <ArrowRight className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => openModal(featured)} className="btn-outline inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
                  Browse the Hubs <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-line bg-slate-100 shadow-2xl shadow-brand/10">
              <img src={featured.image} alt="BlueSpot Hub guest app preview" className="block h-auto w-full" />
            </div>
          </article>
        )}

        {/* Filter chips */}
        <div className="mt-14 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {filters.filter((f) => countFor(f.key) > 0).map((f) => {
            const isActive = active === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'bg-navy text-white' : 'border border-line bg-paper text-slate-600 hover:border-navy hover:text-navy'
                }`}
              >
                {f.label}
                <span className={`ml-2 text-xs ${isActive ? 'text-white/70' : 'text-slate-400'}`}>{countFor(f.key)}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {grid.map((project) => {
            const meta = categoryMeta[project.category];
            const { Icon } = meta;
            return (
              <article key={project.id} className="card-light group flex flex-col overflow-hidden rounded-2xl">
                {project.image && (
                  <div className="relative h-44 overflow-hidden border-b border-line bg-slate-100">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className={`mb-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${badgeTone[project.category]}`}>
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {meta.label}
                  </span>
                  <h3 className="mb-2 text-base font-bold leading-snug text-navy">{project.title}</h3>
                  <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600">{project.description[0]}</p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="rounded-md border border-line bg-cream px-2.5 py-1 text-xs font-medium text-slate-700">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1 py-1 text-xs text-slate-400">+{project.technologies.length - 4}</span>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
                    {project.showLive && project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                        Live site <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <a href="#contact" className="text-sm font-semibold text-brand hover:underline">Request demo</a>
                    )}
                    <button
                      type="button"
                      onClick={() => openModal(project)}
                      className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-navy"
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
