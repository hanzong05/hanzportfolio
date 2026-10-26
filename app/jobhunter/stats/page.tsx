import Link from "next/link";
import Sidebar from "@/components/jobhunter/Sidebar";
import { getStats, viewCounts } from "@/lib/jobhunter/jobs";
import { STAGE_LABELS, STAGES, type Stage } from "@/lib/jobhunter/types";

export const dynamic = "force-dynamic";

const RANGES: { key: string; label: string; days: number | null }[] = [
  { key: "30", label: "Last 30 days", days: 30 },
  { key: "90", label: "Last 90 days", days: 90 },
  { key: "365", label: "Last year", days: 365 },
  { key: "all", label: "All time", days: null },
];

export default async function StatsPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  const sp = await searchParams;
  const range = RANGES.find((r) => r.key === sp.range) ?? RANGES[3];
  const [stats, counts] = await Promise.all([getStats(range.days), viewCounts()]);
  const maxWeek = Math.max(1, ...stats.weekly.map((w) => w.n));
  const maxStage = Math.max(1, ...Object.values(stats.byStage));

  return (
    <div className="page">
      <Sidebar current="stats" counts={counts} />
      <main className="center">
        <div className="section-title">
          <h1>Stats</h1>
          <div className="pill-row" style={{ margin: 0 }}>
            {RANGES.map((r) => (
              <Link key={r.key} href={`/jobhunter/stats?range=${r.key}`} className={r.key === range.key ? "active" : ""}>
                {r.label}
              </Link>
            ))}
          </div>
        </div>

        {stats.total === 0 ? (
          <div className="empty">No jobs saved yet. Statistics appear here once you add jobs and record applications.</div>
        ) : (
          <>
            <div className="grid-cards" style={{ marginBottom: 18 }}>
              <div className="stat"><div className="value">{stats.total}</div><div className="label">Jobs discovered</div></div>
              <div className="stat"><div className="value">{stats.reviewed}</div><div className="label">Jobs reviewed</div></div>
              <div className="stat"><div className="value">{stats.applied}</div><div className="label">Applications submitted</div></div>
              <div className="stat"><div className="value">{stats.interviews}</div><div className="label">Interview invitations</div></div>
              <div className="stat"><div className="value">{stats.offers}</div><div className="label">Offers received</div></div>
              <div className="stat">
                <div className="value">{stats.responseRate === null ? "—" : `${Math.round(stats.responseRate * 100)}%`}</div>
                <div className="label">Response rate</div>
              </div>
            </div>

            <div className="card">
              <div className="section-title"><h2>Applications by week</h2></div>
              {stats.weekly.length === 0 ? (
                <p className="muted small" style={{ margin: 0 }}>No submitted applications in this range.</p>
              ) : (
                stats.weekly.map((w) => (
                  <div key={w.label} className="bar-row">
                    <span>Week of {w.label}</span>
                    <div className="bar-track"><div className="bar-fill" style={{ width: `${(w.n / maxWeek) * 100}%` }} /></div>
                    <span>{w.n}</span>
                  </div>
                ))
              )}
            </div>

            <div className="card">
              <div className="section-title"><h2>Jobs by stage</h2></div>
              {STAGES.map((s) => {
                const n = stats.byStage[s] ?? 0;
                return (
                  <div key={s} className="bar-row">
                    <span>{STAGE_LABELS[s as Stage]}</span>
                    <div className="bar-track"><div className="bar-fill good" style={{ width: `${(n / maxStage) * 100}%` }} /></div>
                    <span>{n}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
