'use client';
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 73;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Name */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              Hanz Pillerva
            </h1>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('experience')}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('education')}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300"
              >
                Education
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300"
              >
                Contact
              </button>
            </nav>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="relative group p-2 md:p-3 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5 md:w-6 md:h-6">
                <Sun
                  className={`absolute inset-0 w-5 h-5 md:w-6 md:h-6 text-amber-600 transition-all duration-500 ${
                    isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                  }`}
                  strokeWidth={2}
                />
                <Moon
                  className={`absolute inset-0 w-5 h-5 md:w-6 md:h-6 text-slate-300 transition-all duration-500 ${
                    isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                  }`}
                  strokeWidth={2}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Animated Gradient Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500 animate-shimmer-border"></div>
        </div>
      </header>
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-[73px]"></div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
      </>
      

  );
}