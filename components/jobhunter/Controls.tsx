'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Job } from '@/lib/jobhunter/jobs';
import { PRIORITIES, PRIORITY_LABELS, STAGES, STAGE_LABELS, WORK_ARRANGEMENTS, CONTRACT_TYPES } from '@/lib/jobhunter/types';

async function api(url: string, method: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

const today = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in local time

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="btn ghost small"
      disabled={!text}
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
    >
      {done ? 'Copied' : label}
    </button>
  );
}

export function ChecklistEditor({ jobId, items, checked }: { jobId: number; items: string[]; checked: boolean[] }) {
  const router = useRouter();
  const [values, setValues] = useState<boolean[]>(checked);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const dirty = values.some((v, i) => v !== checked[i]);

  return (
    <div>
      <ul className="checklist">
        {items.map((item, i) => (
          <li key={item}>
            <label>
              <input
                type="checkbox"
                checked={!!values[i]}
                onChange={(e) => {
                  setSaved(false);
                  setValues((prev) => prev.map((v, j) => (j === i ? e.target.checked : v)));
                }}
              />
              <span className={values[i] ? 'done' : ''}>
                {i + 1}. {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div className="actions" style={{ marginTop: 12, alignItems: 'center' }}>
        <button
          className="btn green"
          disabled={!dirty || saving}
          onClick={async () => {
            setSaving(true);
            setError('');
            try {
              await api(`/api/jobhunter/jobs/${jobId}`, 'PATCH', { checklist: values });
              setSaved(true);
              router.refresh();
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setSaving(false);
            }
          }}
        >
          {saving ? 'Saving…' : 'Save progress'}
        </button>
        {saved && !dirty && <span className="success">Saved</span>}
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
}

export function JobActions({ job }: { job: Job }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function run(name: string, fn: () => Promise<unknown>, after?: () => void) {
    setBusy(name);
    setError('');
    try {
      await fn();
      if (after) after();
      else router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <div className="actions">
        <button
          className="btn primary"
          disabled={busy !== null}
          onClick={() => { if (confirm('Run AI analysis on this job? It uses your AI key quota.')) run('analyze', () => api(`/api/jobhunter/jobs/${job.id}/analyze`, 'POST')); }}
        >
          {busy === 'analyze' ? 'Analyzing…' : job.analysis ? 'Re-analyze with AI' : 'Analyze with AI'}
        </button>
        <button
          className="btn"
          disabled={!job.url}
          onClick={() => window.open(job.url ?? '', '_blank', 'noopener,noreferrer')}
        >
          Open job
        </button>
        <button
          className="btn amber"
          disabled={busy !== null || job.priority === 'maybe'}
          onClick={() => run('later', () => api(`/api/jobhunter/jobs/${job.id}`, 'PATCH', { priority: 'maybe' }))}
        >
          Later
        </button>
        <button
          className="btn"
          disabled={busy !== null || job.stage === 'archived'}
          onClick={() => {
            if (!confirm('Skip this job? It will be archived.')) return;
            run('skip', () => api(`/api/jobhunter/jobs/${job.id}`, 'PATCH', { stage: 'archived' }));
          }}
        >
          Skip
        </button>
        <button
          className="btn red"
          disabled={busy !== null || job.stage === 'rejected'}
          onClick={() => {
            if (!confirm('Reject this job and remove it from active consideration?')) return;
            run('reject', () => api(`/api/jobhunter/jobs/${job.id}`, 'PATCH', { stage: 'rejected' }));
          }}
        >
          Reject
        </button>
        <button
          className="btn green"
          disabled={busy !== null || job.stage === 'applied' || !!job.applied_at}
          onClick={() => {
            if (!confirm('Confirm: have you actually submitted this application? Only mark it once you have.')) return;
            run('applied', () => api(`/api/jobhunter/jobs/${job.id}`, 'PATCH', { stage: 'applied', applied_at: today() }));
          }}
        >
          Mark as submitted
        </button>
        <button
          className="btn red"
          disabled={busy !== null}
          onClick={() => {
            if (!confirm('Delete this job permanently? This cannot be undone.')) return;
            run(
              'delete',
              () => api(`/api/jobhunter/jobs/${job.id}`, 'DELETE'),
              () => router.push('/jobhunter?view=all'),
            );
          }}
        >
          Delete
        </button>
      </div>
      {error && <p className="error" style={{ marginTop: 10 }}>{error}</p>}
    </div>
  );
}

const toInput = (v: string | null) => v ?? '';

export function JobEditor({ job }: { job: Job }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: job.title,
    company: job.company,
    source: toInput(job.source),
    url: toInput(job.url),
    salary: toInput(job.salary),
    work_arrangement: toInput(job.work_arrangement),
    contract_type: toInput(job.contract_type),
    posted_at: toInput(job.posted_at),
    priority: job.priority,
    stage: job.stage,
    follow_up_date: toInput(job.follow_up_date),
    applied_at: toInput(job.applied_at),
    interview_at: toInput(job.interview_at),
    reply_at: toInput(job.reply_at),
    reply_note: toInput(job.reply_note),
    notes: toInput(job.notes),
    description: toInput(job.description),
    subject: toInput(job.subject),
    draft: toInput(job.draft),
    instructions: toInput(job.instructions),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSaved(false);
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  return (
    <details className="editor">
      <summary>Edit details, stage, dates, and notes</summary>
      <form
        className="form-stack"
        onSubmit={async (e) => {
          e.preventDefault();
          setSaving(true);
          setError('');
          try {
            await api(`/api/jobhunter/jobs/${job.id}`, 'PATCH', form);
            setSaved(true);
            router.refresh();
          } catch (err) {
            setError((err as Error).message);
          } finally {
            setSaving(false);
          }
        }}
      >
        <div className="field-grid">
          <label>Title<input value={form.title} onChange={set('title')} required /></label>
          <label>Company<input value={form.company} onChange={set('company')} required /></label>
          <label>Source<input value={form.source} onChange={set('source')} placeholder="e.g. Indeed, LinkedIn" /></label>
          <label>Posting URL<input type="url" value={form.url} onChange={set('url')} /></label>
          <label>Salary (as posted)<input value={form.salary} onChange={set('salary')} /></label>
          <label>
            Work arrangement
            <select value={form.work_arrangement} onChange={set('work_arrangement')}>
              <option value="">Not stated</option>
              {WORK_ARRANGEMENTS.map((w) => <option key={w}>{w}</option>)}
            </select>
          </label>
          <label>
            Contract type
            <select value={form.contract_type} onChange={set('contract_type')}>
              <option value="">Not stated</option>
              {CONTRACT_TYPES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label>Posted date<input type="date" value={form.posted_at} onChange={set('posted_at')} /></label>
          <label>
            Priority
            <select value={form.priority} onChange={set('priority')}>
              {PRIORITIES.map((p) => <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>)}
            </select>
          </label>
          <label>
            Stage
            <select value={form.stage} onChange={set('stage')}>
              {STAGES.map((s) => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
            </select>
          </label>
          <label>Application date<input type="date" value={form.applied_at} onChange={set('applied_at')} /></label>
          <label>Interview date<input type="date" value={form.interview_at} onChange={set('interview_at')} /></label>
          <label>Follow-up reminder<input type="date" value={form.follow_up_date} onChange={set('follow_up_date')} /></label>
          <label>Employer reply date<input type="date" value={form.reply_at} onChange={set('reply_at')} /></label>
          <label className="full">
            Reply summary
            <input value={form.reply_note} onChange={set('reply_note')} placeholder="What did the employer say?" />
          </label>
          <label className="full">
            Notes
            <textarea value={form.notes} onChange={set('notes')} />
          </label>
          <label className="full">
            Subject line
            <input value={form.subject} onChange={set('subject')} />
          </label>
          <label className="full">
            Message draft
            <textarea value={form.draft} onChange={set('draft')} style={{ minHeight: 160 }} />
          </label>
          <label className="full">
            Employer instructions
            <textarea value={form.instructions} onChange={set('instructions')} />
          </label>
          <label className="full">
            Job description
            <textarea value={form.description} onChange={set('description')} style={{ minHeight: 200 }} />
          </label>
        </div>
        <div className="actions" style={{ alignItems: 'center' }}>
          <button className="btn primary" type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save details'}
          </button>
          {saved && <span className="success">Saved</span>}
          {error && <span className="error">{error}</span>}
        </div>
      </form>
    </details>
  );
}
