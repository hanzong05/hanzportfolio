import React from 'react';

export default function Education() {
  const education = {
    degree: "Bachelor of Science in Information Systems",
    school: "Tarlac State University",
    location: "Tarlac, Philippines",
    period: "Aug 2020 - July 2024",
    major: "Major in Business Analytics",
    capstone: "Web-based Veterinary Management Information System with Data Analysis and Visualization",
    achievements: [
      "Specialized in Business Analytics and System Development",
      "Developed comprehensive capstone project combining web development with data analysis",
      "Gained hands-on experience in database management and system architecture"
    ]
  };

  return (
    <div id="education" className="min-h-screen p-6 md:p-12 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-16 text-center text-gray-900 dark:text-gray-100">
          Education
        </h2>

        <div className="group relative bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 dark:border-slate-700/60 rounded-xl p-6 hover:border-cyan-400/60 dark:hover:border-purple-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/20 dark:hover:shadow-purple-500/20 hover:scale-[1.02] overflow-hidden shadow-lg">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Content wrapper */}
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                  {education.degree}
                </h3>
                <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 md:mt-0 font-medium">
                  {education.period}
                </span>
              </div>
              <p className="text-cyan-600 dark:text-cyan-400 text-lg mb-1 font-semibold">
                {education.school}
              </p>
              <p className="text-gray-600 dark:text-gray-500 text-sm mb-3">
                {education.location}
              </p>
              <div className="h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"></div>
            </div>

            {/* Major */}
            <div className="mb-4">
              <p className="text-purple-600 dark:text-purple-400 font-semibold">
                {education.major}
              </p>
            </div>

            {/* Capstone */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
                Capstone Project
              </h4>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "{education.capstone}"
              </p>
            </div>

            {/* Achievements */}
            <div>
              <h4 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-3">
                Highlights
              </h4>
              <ul className="space-y-2">
                {education.achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-gray-700 dark:text-gray-400 text-sm"
                  >
                    <span className="text-cyan-600 dark:text-cyan-400 mt-1.5 flex-shrink-0">▹</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}