import React from 'react';

export default function WorkExperience() {
  const experiences = [
    {
      id: 1,
      company: "My Creative Panda",
      period: "Sept 2025 - Nov 2025",
      responsibilities: [
        "Developed the LGU's official website, improving public access to information, services, and announcements.",
        "Designed and contributed to the development of a custom HRIS system to support employee records, payroll processes, and administrative workflows.",
        "Built a booking and scheduling platform for Khoshipping Lines, enabling efficient tracking of reservations and operational logistics.",
        "Provided technical support, debugging, and optimization for various client systems, ensuring stability, improved performance, and issue resolution."
      ]
    },
    {
      id: 2,
      company: "Eljin Corporation (Butter World Superbakeshop)",
      period: "Sept. 2024 - Sept 2025",
      responsibilities: [
        "Designed and developed a custom advertising platform to support marketing operations and campaign management.",
        "Built and designed the Butter World Superbakeshop website, improving online presence and customer engagement.",
        "Assisted in the development of the company's HRIS and payroll system, enhancing internal processes and employee data management."
      ]
    }
  ];

  return (
    <div id="experience" className="min-h-screen p-6 md:p-12 py-20">
      <div className="w-full">
        {/* Centered Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-900 dark:text-gray-100">
          Work Experience
        </h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative pl-20">
                {/* Timeline Dot */}
                <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 border-4 border-white dark:border-slate-950 shadow-lg"></div>

                {/* Content Card */}
                <div className="group relative bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 dark:border-slate-700/60 rounded-xl p-6 hover:border-cyan-400/50 dark:hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/20 dark:hover:shadow-purple-500/20 hover:scale-[1.02] overflow-hidden shadow-lg">
                  {/* Subtle gradient overlay initially visible */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-500/5 to-pink-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Content wrapper */}
                  <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-200">
                      {exp.company}
                    </h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 md:mt-0 font-medium">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-gray-700 dark:text-gray-400 text-sm md:text-base"
                      >
                        <span className="text-cyan-400 dark:text-purple-400 mt-1.5 flex-shrink-0">▹</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}