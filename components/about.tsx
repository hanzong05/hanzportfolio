import React from 'react';
import { Lightbulb, Zap, Users, Target } from 'lucide-react';

const traits = [
  { label: 'Problem Solver', Icon: Lightbulb },
  { label: 'Fast Learner', Icon: Zap },
  { label: 'Team Player', Icon: Users },
  { label: 'Open to Opportunities', Icon: Target },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-[360px_1fr_auto]">
        {/* Portrait */}
        <div className="mx-auto w-full max-w-[360px]">
          <div className="rounded-3xl bg-gradient-to-br from-violet-500/60 via-blue-500/40 to-cyan-400/50 p-[1px]">
            <div className="overflow-hidden rounded-3xl bg-ink">
              <img src="/profile.jpg" alt="Portrait of Hanz Pillerva" className="h-auto w-full object-cover" />
            </div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <span className="inline-block rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            About Me
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Turning Ideas Into <span className="text-grad">Real Solutions</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            I&apos;m an Information Systems graduate and a Full-Stack Developer with experience in building business
            systems, web applications, and AI-powered solutions. I enjoy solving problems, learning new technologies,
            and creating efficient systems that make a real impact.
          </p>
        </div>

        {/* Traits */}
        <ul className="grid grid-cols-2 gap-4 border-white/10 sm:grid-cols-2 lg:grid-cols-1 lg:border-l lg:pl-10">
          {traits.map(({ label, Icon }) => (
            <li key={label} className="flex items-center gap-3 text-sm text-slate-200 sm:text-base">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-400/20 ring-1 ring-white/10">
                <Icon className="h-4.5 w-4.5 text-cyan-300" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
