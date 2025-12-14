'use client';
import React, { useState } from 'react';
import DetailsModal from './detailsmodal';

interface Project {
  id: number;
  title: string;
  period: string;
  description: string[];
  technologies: string[];
  showGithub: boolean;
  showLive: boolean;
  githubUrl: string | null;
  liveUrl: string | null;
}

export default function Projects() {
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
  const projects = [
    {
      id: 1,
      title: "Smart Monitoring Management System",
      period: "2024",
      description: [
        "Developed a system to monitor and manage waste processing operations efficiently.",
        "Real-time monitoring dashboard for waste management."
      ],
      technologies: ["Laravel", "React", "MySQL", "PHP", "JavaScript"],
      showGithub: true,
      showLive: false,
      githubUrl: "https://github.com/hanzong05/SMMS",
      liveUrl: null
    },
    {
      id: 2,
      title: "BW HRIS",
      period: "Sept 2024 - Sept 2025",
      description: [
        "Built a custom HRIS system for Butter World Superbakeshop to manage employee records and payroll.",
        "Streamlined HR processes and automated payroll calculations."
      ],
      technologies: ["Laravel", "React", "MySQL", "PHP", "JavaScript"],
      showGithub: true,
      showLive: false,
      githubUrl: "#https://github.com/hanzong05/hris",
      liveUrl: null
    },
    {
      id: 3,
      title: "Milagros Masbate HRIS",
      period: "Sept 2025 - Nov 2025",
      description: [
        "Developed an HRIS system for the Municipality of Milagros to streamline employee management.",
        "Automated employee records and administrative workflows."
      ],
      technologies: ["CakePHP", "Angular", "MySQL"],
      showGithub: false,
      showLive: true,
      githubUrl: null,
      liveUrl: "https://ehrismilagros.ednc.solutions/login"
    },
    {
      id: 4,
      title: "Khoshipping Lines Booking System",
      period: "Sept 2025 - Nov 2025",
      description: [
        "Created a booking and scheduling system for Khoshipping Lines operations.",
        "Enabled efficient tracking of reservations and operational logistics."
      ],
      technologies: ["CakePHP", "Angular", "MySQL"],
      showGithub: false,
      showLive: true,
      githubUrl: null,
      liveUrl: "https://khoshipping.ednc.solutions/login#"
    },
    {
      id: 5,
      title: "Farm2Go E-commerce",
      period: "2024",
      description: [
        "Developed a multi-platform e-commerce application as part of a capstone project.",
        "Mobile-first design with seamless shopping experience."
      ],
      technologies: ["React Native", "PostgreSQL", "TypeScript"],
      showGithub: true,
      showLive: true,
      githubUrl: "https://github.com/hanzong05/farm2go",
      liveUrl: "https://farm2go.vercel.app/"
    },
    {
      id: 6,
      title: "Tsu Kiosk",
      period: "2024",
      description: [
        "Built a kiosk application for streamlined user interactions and service management.",
        "Touch-optimized interface for self-service operations."
      ],
      technologies: ["MySQL", "JavaScript", "HTML", "CSS", "PHP"],
      showGithub: true,
      showLive: false,
      githubUrl: "https://github.com/hanzong05/projectCkiosk",
      liveUrl: null
    },
    {
      id: 7,
      title: "Scholarship System",
      period: "2024",
      description: [
        "Developed a system to manage scholarship applications, approvals, and tracking.",
        "Automated workflow for scholarship management."
      ],
      technologies: ["MySQL", "JavaScript", "HTML", "CSS", "PHP"],
      showGithub: true,
      showLive: false,
      githubUrl: "https://github.com/wirudesu/Alumni-repo",
      liveUrl: null
    },
    {
      id: 8,
      title: "LGU Aroroy Masbate",
      period: "Sept 2025 - Nov 2025",
      description: [
        "Designed and developed the official website for a local government unit in Aroroy Masbate.",
        "Improved public access to information and services."
      ],
      technologies: ["WordPress"],
      showGithub: false,
      showLive: true,
      githubUrl: null,
      liveUrl: "https://aroroy.mycreativepanda.com/#"
    }
  ];

  return (
    <div id="projects" className="min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 dark:border-slate-700/60 rounded-xl p-6 hover:border-cyan-400/60 dark:hover:border-purple-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/20 dark:hover:shadow-purple-500/20 hover:scale-105 overflow-hidden shadow-lg"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
              </div>

              {/* Content wrapper */}
              <div className="relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-200">
                  {project.title}
                </h3>
                <button
                  onClick={() => openModal(project)}
                  className="text-xs text-gray-400 hover:text-cyan-400 border border-gray-700 px-3 py-1 rounded transition-colors"
                >
                  Details
                </button>
              </div>

              {/* Period */}
              <p className="text-xs text-gray-500 mb-4">
                Period: {project.period}
              </p>

              {/* Description */}
              <ul className="space-y-2 mb-6">
                {project.description.map((item, index) => (
                  <li key={index} className="flex gap-2 text-gray-400 text-sm">
                    <span className="text-gray-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="text-xs px-3 py-1 bg-gray-800 text-gray-400 rounded-full border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {project.showGithub && (
                  <a 
                    href={project.githubUrl}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View Code
                  </a>
                )}
                {project.showLive && (
                  <a 
                    href={project.liveUrl}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <DetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}