'use client';
import React, { useState, useEffect } from 'react';

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  
const titles =['Full-Stack Developer','Mobile Developer','Web Developer'];
  const typingSpeed = 100; // milliseconds per character
  const deletingSpeed = 50; // milliseconds per character when deleting
  const pauseAfterTyping = 2000; // pause after typing complete text
  const pauseAfterDeleting = 50; // pause after deleting complete text

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const currentTitle = titles[currentTitleIndex];

      const handleTyping = () => {
        if (!isDeleting) {
          // Typing
          if (displayedText.length < currentTitle.length) {
            setTimeout(() => {
              setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
            }, typingSpeed);
          } else {
            // Finished typing, wait before deleting
            setTimeout(() => {
              setIsDeleting(true);
            }, pauseAfterTyping);
          }
        } else {
          // Deleting
          if (displayedText.length > 0) {
            setTimeout(() => {
              setDisplayedText(displayedText.slice(0, -1));
            }, deletingSpeed);
          } else {
            // Finished deleting, move to next title
            setIsDeleting(false);
            setTimeout(() => {
              setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
            }, pauseAfterDeleting);
          }
        }
      };

      handleTyping();
    }
  }, [isLoading, displayedText, isDeleting, currentTitleIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 md:p-12">
        <div className="w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Skeleton Column 1 */}
          <div className="space-y-6">
            {/* Title skeleton */}
            <div className="h-8 md:h-10 lg:h-12 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]"></div>

            {/* Paragraph skeletons */}
            <div className="space-y-4">
              <div className="h-4 md:h-5 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]"></div>
              <div className="h-4 md:h-5 w-5/6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]"></div>
              <div className="h-4 md:h-5 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]"></div>
              <div className="h-4 md:h-5 w-4/5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]"></div>
              <div className="h-4 md:h-5 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]"></div>
              <div className="h-4 md:h-5 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]"></div>
            </div>
          </div>

          {/* Skeleton Column 2 - Image */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video max-w-md w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-shimmer bg-[length:200%_100%]">
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-12">
      <div className="w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Column 1: Description */}
        <div className="space-y-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {displayedText}
            </span>
            <span className="text-purple-500 animate-blink">|</span>
          </h1>

          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p className="text-base md:text-lg">
              I specialize in building custom HRIS systems, e-commerce platforms, and full-stack web applications using React, Angular, Node.js, Laravel, CakePHP, and modern databases like MySQL and PostgreSQL.
            </p>
            <p className="text-base md:text-lg">
              From developing government websites and booking systems to creating payroll solutions and mobile apps, I've delivered impactful projects for organizations like My Creative Panda, Eljin Corporation, and local government units in the Philippines.
            </p>
            <p className="text-base md:text-lg">
              BSc in Information Systems graduate with hands-on experience in system architecture, database management, and business analytics. Let's build something exceptional together.
            </p>
          </div>
        </div>

        {/* Column 2: Image */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative rounded-lg max-w-md w-full">
            <img
              src="/dev.png"
              alt="Hanz Pillerva - Full-Stack Developer"
              className="w-full h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-700 animate-glow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}