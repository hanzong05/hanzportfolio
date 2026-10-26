'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Profile } from '@/lib/jobhunter/profile';
import { CONTRACT_TYPES, PRIORITIES, PRIORITY_LABELS, WORK_ARRANGEMENTS } from '@/lib/jobhunter/types';

export function AddJobForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    company: '',
    source: '',
    url: '',
    description: '',
    salary: '',
    work_arrangement: '',
    contract_type: '',
    posted_at: '',
    priority: 'none',
  });
  const [error, setError] = useState('');
  const [duplicateId, setDuplicateId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form
      className="form-stack"
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setDuplicateId(null);
        const res = await fetch('/api/jobhunter/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json().catch(() => ({}));
        setSaving(false);
        if (res.status === 409) {
          setError(data.error);
          setDuplicateId(data.id);
          return;
        }
        if (!res.ok) {
          setError(data.error || 'Could not save the job.');
          return;
        }
        router.push(`/jobhunter?view=all&job=${data.id}`);
        router.refresh();
      }}
    >
      <div className="field-grid">
        <label>Job title *<input value={form.title} onChange={set('title')} required /></label>
        <label>Company *<input value={form.company} onChange={set('company')} required /></label>
        <label className="full">
          Posting URL (used to prevent duplicates)
          <input type="url" value={form.url} onChange={set('url')} placeholder="https://" />
        </label>
        <label>Source<input value={form.source} onChange={set('source')} placeholder="e.g. Indeed, LinkedIn, OnlineJobs.ph" /></label>
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
        <label className="full">
          Job description (paste the posting text for analysis)
          <textarea value={form.description} onChange={set('description')} style={{ minHeight: 220 }} />
        </label>
      </div>
      <div className="actions" style={{ alignItems: 'center' }}>
        <button className="btn primary" type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save job'}
        </button>
        {error && <span className="error">{error}</span>}
        {duplicateId && <Link href={`/jobhunter?view=all&job=${duplicateId}`}>Open the saved job</Link>}
      </div>
    </form>
  );
}

const joinList = (v: string[]) => v.join(', ');

export function ProfileForm({ initial }: { initial: Profile }) {
  const [form, setForm] = useState({
    name: initial.name,
    email: initial.email,
    phone: initial.phone,
    location: initial.location,
    timezone: initial.timezone,
    portfolio_url: initial.portfolio_url,
    resume_text: initial.resume_text,
    skills: joinList(initial.skills),
    years_experience: initial.years_experience?.toString() ?? '',
    preferred_titles: joinList(initial.preferred_titles),
    work_preference: initial.work_preference,
    salary_min: initial.salary_min?.toString() ?? '',
    salary_max: initial.salary_max?.toString() ?? '',
    employment_types: joinList(initial.employment_types),
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSaved(false);
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  return (
    <form
      className="form-stack"
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        const res = await fetch('/api/jobhunter/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        setSaving(false);
        if (!res.ok) {
          setError('Could not save the profile.');
          return;
        }
        setSaved(true);
      }}
    >
      <div className="card" style={{ margin: 0 }}>
        <h2 style={{ marginBottom: 12 }}>Contact</h2>
        <div className="field-grid">
          <label>Name<input value={form.name} onChange={set('name')} /></label>
          <label>Email<input type="email" value={form.email} onChange={set('email')} /></label>
          <label>Phone<input value={form.phone} onChange={set('phone')} /></label>
          <label>Location<input value={form.location} onChange={set('location')} /></label>
          <label>Time zone<input value={form.timezone} onChange={set('timezone')} placeholder="e.g. Asia/Taipei" /></label>
          <label>Portfolio URL<input type="url" value={form.portfolio_url} onChange={set('portfolio_url')} /></label>
        </div>
      </div>

      <div className="card" style={{ margin: 0 }}>
        <h2 style={{ marginBottom: 12 }}>Experience and skills</h2>
        <div className="field-grid">
          <label>Years of experience<input type="number" step="0.5" min="0" value={form.years_experience} onChange={set('years_experience')} /></label>
          <label>Work preference
            <select value={form.work_preference} onChange={set('work_preference')}>
              <option value="">No preference</option>
              {WORK_ARRANGEMENTS.map((w) => <option key={w}>{w}</option>)}
            </select>
          </label>
          <label className="full">
            Technical skills (comma-separated)
            <input value={form.skills} onChange={set('skills')} placeholder="WordPress, PHP, Laravel, React" />
          </label>
          <label className="full">
            Preferred job titles (comma-separated)
            <input value={form.preferred_titles} onChange={set('preferred_titles')} />
          </label>
          <label className="full">
            Résumé text (paste; this is what analysis reads)
            <textarea value={form.resume_text} onChange={set('resume_text')} style={{ minHeight: 220 }} />
          </label>
        </div>
      </div>

      <div className="card" style={{ margin: 0 }}>
        <h2 style={{ marginBottom: 12 }}>Preferences</h2>
        <div className="field-grid">
          <label>Desired salary, minimum<input type="number" min="0" value={form.salary_min} onChange={set('salary_min')} /></label>
          <label>Desired salary, maximum<input type="number" min="0" value={form.salary_max} onChange={set('salary_max')} /></label>
          <label className="full">
            Preferred employment types (comma-separated)
            <input value={form.employment_types} onChange={set('employment_types')} placeholder="Full-time, Contract" />
          </label>
        </div>
      </div>

      <div className="actions" style={{ alignItems: 'center' }}>
        <button className="btn primary" type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save profile'}
        </button>
        {saved && <span className="success">Saved</span>}
        {error && <span className="error">{error}</span>}
      </div>
    </form>
  );
}
