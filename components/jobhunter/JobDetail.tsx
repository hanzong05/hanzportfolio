import type { Job } from '@/lib/jobhunter/jobs';
import { DEFAULT_CHECKLIST, PRIORITY_LABELS, STAGE_LABELS, Priority, Stage } from '@/lib/jobhunter/types';
import { ChecklistEditor, CopyButton, JobActions, JobEditor } from './Controls';

const fmt = (v: string | null) => v || '—';

export default function JobDetail({ job }: { job: Job }) {
  const status =
    job.stage === 'rejected' ? 'Rejected' : job.stage === 'archived' ? 'Archived' : job.applied_at ? 'Applied' : 'Active';

  return (
    <div>
      <div className="job-head">
        <div>
          <h1>{job.title}</h1>
          <p className="muted" style={{ margin: '4px 0 10px' }}>
            {job.company}
            {job.source ? ` · via ${job.source}` : ''}
          </p>
          <div className="actions">
            {job.priority !== 'none' && (
              <span className={`badge ${job.priority}`}>{PRIORITY_LABELS[job.priority as Priority]}</span>
            )}
            <span className="badge stage">{STAGE_LABELS[job.stage as Stage]}</span>
            <span className="badge">{status}</span>
            {job.url && (
              <a className="badge" href={job.url} target="_blank" rel="noopener noreferrer">
                Original posting ↗
              </a>
            )}
          </div>
        </div>

        {job.fit_score !== null && (
          <div className="score-pill">
            <div className="num">{job.fit_score}</div>
            <div className="lbl">Fit score</div>
          </div>
        )}
      </div>

      <div className="meta-grid">
        <div>
          <div className="k">Salary</div>
          {fmt(job.salary)}
        </div>
        <div>
          <div className="k">Work arrangement</div>
          {fmt(job.work_arrangement)}
        </div>
        <div>
          <div className="k">Contract type</div>
          {fmt(job.contract_type)}
        </div>
        <div>
          <div className="k">Posted</div>
          {fmt(job.posted_at)}
        </div>
        <div>
          <div className="k">Applied</div>
          {fmt(job.applied_at)}
        </div>
        <div>
          <div className="k">Follow-up</div>
          {fmt(job.follow_up_date)}
        </div>
      </div>

      <div className="card">
        <div className="section-title">
          <h2>Actions</h2>
        </div>
        <JobActions job={job} />
      </div>

      <div className="card">
        <div className="section-title">
          <h2>Application checklist</h2>
        </div>
        <ChecklistEditor jobId={job.id} items={DEFAULT_CHECKLIST} checked={job.checklist} />
      </div>

      <div className="card">
        <div className="section-title">
          <h2>Employer instructions</h2>
        </div>
        {job.instructions ? (
          <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{job.instructions}</p>
        ) : (
          <p className="muted small" style={{ margin: 0 }}>
            Not extracted yet. Run Analyze with AI, or check the original posting.
          </p>
        )}
      </div>

      <div className="card">
        <div className="section-title">
          <h2>Subject line</h2>
          <CopyButton text={job.subject ?? ''} />
        </div>
        <p className="pre" style={{ margin: 0 }}>
          {job.subject || 'No subject yet.'}
        </p>
      </div>

      <div className="card">
        <div className="section-title">
          <h2>Application message draft</h2>
          <CopyButton text={job.draft ?? ''} label="Copy draft" />
        </div>
        <pre className="pre">{job.draft || 'No draft yet. Run Analyze with AI to create one from your profile.'}</pre>
      </div>

      <div className="card">
        <details className="details-block">
          <summary>Job description</summary>
          <pre className="pre" style={{ marginTop: 12 }}>
            {job.description || 'No description saved.'}
          </pre>
        </details>
      </div>

      <div className="card">
        <JobEditor job={job} />
      </div>
    </div>
  );
}
