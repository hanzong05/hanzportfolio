import React from 'react';
import { FolderKanban, Clock, Layers, BrainCircuit } from 'lucide-react';

const stats = [
  { value: '14+', label: 'Projects Completed', Icon: FolderKanban },
  { value: '2+', label: 'Years Experience', Icon: Clock },
  { value: 'Full-Stack', label: 'Web & Mobile Development', Icon: Layers },
  { value: 'AI / ML', label: 'Data & Analytics Systems', Icon: BrainCircuit },
];

export default function Stats() {
  return (
    <section className="px-4 sm:px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ value, label, Icon }) => (
          <div key={label} className="glass glass-hover flex items-center gap-4 rounded-2xl p-5">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 ring-1 ring-white/10">
              <Icon className="h-5 w-5 text-violet-300" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{value}</p>
              <p className="text-sm text-slate-400">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
