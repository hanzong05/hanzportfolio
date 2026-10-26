import Link from 'next/link';

type Item = { key: string; label: string; href: string; hint?: string; glyph: string; count?: string };

const SECTIONS: { title: string; items: Item[] }[] = [
  {
    title: 'Job Discovery',
    items: [
      { key: 'high', label: 'High', href: '/jobhunter?view=high', hint: 'High-priority job opportunities', glyph: '★', count: 'high' },
      { key: 'maybe', label: 'Maybe', href: '/jobhunter?view=maybe', hint: 'Jobs requiring further review', glyph: '?', count: 'maybe' },
      { key: 'import', label: 'Import jobs', href: '/jobhunter/import', hint: 'Load a list of postings', glyph: '⇪' },
    ],
  },
  {
    title: 'Applications',
    items: [
      { key: 'applied', label: 'Applied', href: '/jobhunter?view=applied', hint: 'Submitted applications', glyph: '→', count: 'applied' },
      { key: 'rejected', label: 'Rejected', href: '/jobhunter?view=rejected', hint: 'Unsuccessful applications', glyph: '✕', count: 'rejected' },
    ],
  },
  {
    title: 'After Applying',
    items: [
      { key: 'pipeline', label: 'Pipeline', href: '/jobhunter/pipeline', hint: 'Stages and follow-ups', glyph: '▤', count: 'pipeline' },
      { key: 'replies', label: 'Replies', href: '/jobhunter?view=replies', hint: 'Employer messages and responses', glyph: '✉', count: 'replies' },
      { key: 'interviews', label: 'Interviews', href: '/jobhunter?view=interviews', hint: 'Scheduled interviews', glyph: '◷', count: 'interviews' },
    ],
  },
  {
    title: 'Personal',
    items: [
      { key: 'stats', label: 'Stats', href: '/jobhunter/stats', hint: 'Job-search analytics', glyph: '▲' },
      { key: 'profile', label: 'My Info', href: '/jobhunter/profile', hint: 'Profile, skills, résumé, preferences', glyph: '◉' },
    ],
  },
  {
    title: 'Other',
    items: [
      { key: 'settings', label: 'Settings', href: '/jobhunter/settings', glyph: '⚙' },
    ],
  },
];

export default function Sidebar({ current, counts }: { current: string; counts: Record<string, number> }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <strong>Job Hunter</strong>
        <span>Find, write, apply</span>
      </div>

      <Link href="/jobhunter/add" className="btn primary" style={{ justifyContent: 'center' }}>
        + Add job
      </Link>

      {SECTIONS.map((s) => (
        <nav key={s.title} className="nav-section" aria-label={s.title}>
          <div className="nav-label">{s.title}</div>
          {s.items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`nav-item${current === item.key ? ' active' : ''}`}
              title={item.hint}
            >
              <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span className="glyph">{item.glyph}</span>
                <span>
                  {item.label}
                  {item.hint && <span className="hint">{item.hint}</span>}
                </span>
              </span>
              {item.count && <span className="badge-count">{counts[item.count] ?? 0}</span>}
            </Link>
          ))}
        </nav>
      ))}

      <div style={{ marginTop: 'auto' }} className="small muted">
        Private. Sign in at /admin to open this page.
      </div>
    </aside>
  );
}
