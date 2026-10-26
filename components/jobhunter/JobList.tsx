import Link from 'next/link';
import type { Job, View } from '@/lib/jobhunter/jobs';
import { PRIORITY_LABELS, STAGE_LABELS, Priority, Stage } from '@/lib/jobhunter/types';

const VIEW_TITLES: Record<View, string> = {
  high: 'High priority',
  maybe: 'Maybe',
  applied: 'Applied',
  rejected: 'Rejected',
  pipeline: 'Pipeline',
  replies: 'Replies',
  interviews: 'Interviews',
  all: 'All active jobs',
};

export default function JobList({
  view,
  jobs,
  q,
  sort,
  selectedId,
}: {
  view: View;
  jobs: Job[];
  q: string;
  sort: string;
  selectedId: number | null;
}) {
  const base = (extra: Record<string, string>) => {
    const params = new URLSearchParams({ view, ...(q ? { q } : {}), ...(sort ? { sort } : {}), ...extra });
    return `/jobhunter?${params.toString()}`;
  };

  return (
    <div>
      <div className="section-title">
        <h1>{VIEW_TITLES[view]}</h1>
        <span className="muted small">{jobs.length} job{jobs.length === 1 ? '' : 's'}</span>
      </div>

      <form method="get" className="toolbar">
        <input type="hidden" name="view" value={view} />
        <input name="q" defaultValue={q} placeholder="Search title, company, or keyword" />
        <select name="sort" defaultValue={sort || 'added'}>
          <option value="added">Date added</option>
          <option value="priority">Priority</option>
          <option value="relevance">Fit score</option>
        </select>
        <button className="btn" type="submit">Search</button>
      </form>

      {jobs.length === 0 ? (
        <div className="empty">
          {q ? 'No jobs match this search.' : 'Nothing here yet. Add a job to start tracking it.'}
          <div style={{ marginTop: 12 }}>
            <Link className="btn primary" href="/jobhunter/add">+ Add job</Link>
          </div>
        </div>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={base({ job: String(job.id) })}
              className={`job-row${selectedId === job.id ? ' selected' : ''}`}
            >
              <div className="title">{job.title}</div>
              <div className="meta">
                {job.company}
                {job.salary ? ` · ${job.salary}` : ''}
                {job.work_arrangement ? ` · ${job.work_arrangement}` : ''}
              </div>
              <div className="tags">
                {job.priority !== 'none' && (
                  <span className={`badge ${job.priority}`}>{PRIORITY_LABELS[job.priority as Priority]}</span>
                )}
                <span className="badge stage">{STAGE_LABELS[job.stage as Stage]}</span>
                {job.fit_score !== null && <span className="badge good">Fit {job.fit_score}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
