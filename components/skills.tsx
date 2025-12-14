'use client';
import React, { useState } from 'react';
import {
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiNodedotjs,
  SiLaravel,
  SiMysql,
  SiPostgresql,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiWordpress,
  SiGit,
  SiCakephp
} from 'react-icons/si';
import { Database, Globe } from 'lucide-react';

type Skill = {
  name: string;
  icon: any;
  color: string;
  proficiency: number;
};

export default function TechSkills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSkill(null), 300);
  };

  const skillsData = [
    {
      id: 1,
      category: "Programming Languages",
      skills: [
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", proficiency: 90 },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6", proficiency: 90 },
        { name: "PHP", icon: SiPhp, color: "#777BB4", proficiency: 90 }
      ]
    },
    {
      id: 2,
      category: "Backend Technologies",
      skills: [
        { name: "Node.js", icon: SiNodedotjs, color: "#339933", proficiency: 85 },
        { name: "Laravel", icon: SiLaravel, color: "#FF2D20", proficiency: 90 },
        { name: "CakePHP", icon: SiCakephp, color: "#D33C43", proficiency: 90 },
        { name: "MySQL", icon: SiMysql, color: "#4479A1", proficiency: 90 },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", proficiency: 85 }
      ]
    },
    {
      id: 3,
      category: "Frontend Technologies",
      skills: [
        { name: "React", icon: SiReact, color: "#61DAFB", proficiency: 85 },
        { name: "Next.js", icon: SiNextdotjs, color: "#000000", proficiency: 85 },
        { name: "Angular", icon: SiAngular, color: "#DD0031", proficiency: 85 },
        { name: "React Native", icon: SiReact, color: "#61DAFB", proficiency: 85 },
        { name: "WordPress", icon: SiWordpress, color: "#21759B", proficiency: 80 }
      ]
    },
    {
      id: 4,
      category: "Developer Tools",
      skills: [
        { name: "Git", icon: SiGit, color: "#F05032", proficiency: 85 },
        { name: "SEO", icon: Globe, color: "#8B5CF6", proficiency: 80 },
        { name: "Database Management", icon: Database, color: "#06B6D4", proficiency: 85 }
      ]
    }
  ];

  return (
    <div id="skills" className="min-h-screen p-6 md:p-12 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-16 text-center text-gray-900 dark:text-gray-100">
          Technical Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.id}
              className="group relative bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 dark:border-slate-700/60 rounded-xl p-6 hover:border-cyan-400/60 dark:hover:border-purple-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/20 dark:hover:shadow-purple-500/20 hover:scale-[1.02] overflow-hidden shadow-lg"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content wrapper */}
              <div className="relative z-10">
                {/* Category Header */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">
                    {category.category}
                  </h3>
                  <div className="h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"></div>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-6">
                  {category.skills.map((skill, index) => {
                    const IconComponent = skill.icon;
                    return (
                      <div
                        key={index}
                        className="group/skill flex flex-col items-center gap-2"
                      >
                        <div
                          className="p-4 bg-gray-900/60 dark:bg-gray-900/80 rounded-lg border border-gray-800/50 dark:border-gray-700/50 transition-all hover:scale-105 hover:border-cyan-400/50 dark:hover:border-purple-500/50 cursor-pointer"
                          onClick={() => openModal(skill)}
                        >
                          <IconComponent
                            className="w-10 h-10 transition-all"
                            style={{ color: skill.color }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-500 text-center">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proficiency Modal */}
      {isModalOpen && selectedSkill && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative bg-slate-900/70 backdrop-blur-3xl border border-slate-700/70 rounded-xl max-w-md w-full shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-pink-500/10 rounded-xl pointer-events-none"></div>

            {/* Content wrapper */}
            <div className="relative z-10">
              {/* Modal Header */}
              <div className="sticky top-0 bg-slate-900/90 backdrop-blur-2xl border-b border-slate-700/60 p-6 flex justify-between items-start rounded-t-xl">
                <div className="flex items-center gap-4">
                  {(() => {
                    const IconComponent = selectedSkill.icon;
                    return (
                      <div className="p-3 bg-gray-900/60 rounded-lg border border-gray-800/50">
                        <IconComponent
                          className="w-8 h-8"
                          style={{ color: selectedSkill.color }}
                        />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="text-xl font-bold text-gray-200">
                      {selectedSkill.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Skill Proficiency
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Proficiency Level */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                        Proficiency Level
                      </span>
                      <span className="text-2xl font-bold text-gray-200">
                        {selectedSkill.proficiency}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-gray-700">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                        style={{ width: `${selectedSkill.proficiency}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Proficiency Description */}
                  <div className="mt-6">
                    <p className="text-sm text-gray-400">
                      {selectedSkill.proficiency >= 90 && "Expert level proficiency with extensive hands-on experience."}
                      {selectedSkill.proficiency >= 85 && selectedSkill.proficiency < 90 && "Advanced proficiency with strong practical knowledge."}
                      {selectedSkill.proficiency >= 80 && selectedSkill.proficiency < 85 && "Proficient with solid understanding and experience."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}