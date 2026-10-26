'use client';

import { useState } from 'react';

const COLUMNS = [
  'title', 'company', 'source', 'url', 'description', 'salary',
  'work_arrangement', 'contract_type', 'posted_at', 'priority',
];

const EXAMPLE_JSON = `[
  {
    "title": "Full Stack Web Developer (React / Next.js + WordPress)",
    "company": "Toffyjar Digital",
    "source": "Indeed",
    "url": "https://to.indeed.com/aakvzfr6d6y7",
    "salary": "Up to $6,000 a month",
    "work_arrangement": "Remote",
    "contract_type": "Full-time",
    "posted_at": "2026-10-01",
    "priority": "high",
    "description": "Paste the full posting text here."
  }
]`;

// Minimal RFC-4180-style CSV parser: handles quoted fields, escaped quotes, and newlines inside quotes.
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      rows.push(row); row = [];
    } else {
      field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  const [header, ...body] = rows.filter((r) => r.some((v) => v.trim() !== ''));
  if (!header) return [];
  const keys = header.map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'));
  return body.map((r) => {
    const obj: Record<string, string> = {};
    keys.forEach((k, idx) => { obj[k] = (r[idx] ?? '').trim(); });
    return obj;
  });
}

export function parseJobsInput(text: string, filename?: string): unknown[] {
  const trimmed = text.trim();
  if (!trimmed) throw new Error('Nothing to import.');
  const isJson = filename?.toLowerCase().endsWith('.json') || trimmed.startsWith('[') || trimmed.startsWith('{');
  if (isJson) {
    const data = JSON.parse(trimmed);
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.jobs)) return data.jobs;
    throw new Error('JSON must be an array of jobs, or an object with a "jobs" array.');
  }
  return parseCsv(trimmed);
}

type Result = {
  created: number;
  skipped: { row: number; title: string; reason: string }[];
  errors: { row: number; title: string; reason: string }[];
};

export default function ImportForm() {
  const [text, setText] = useState('');
  const [filename, setFilename] = useState<string | undefined>(undefined);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setFilename(file.name);
    setText(await file.text());
    setResult(null);
  }

  async function submit() {
    setBusy(true);
    setError('');
    setResult(null);
    try {
      const jobs = parseJobsInput(text, filename);
      const res = await fetch('/api/jobhunter/jobs/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobs }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Import failed.');
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Import failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="form-stack">
      <div className="card" style={{ margin: 0 }}>
        <h2 style={{ marginBottom: 8 }}>Upload a file</h2>
        <p className="small muted">
          Accepts a .json file (an array of jobs) or a .csv file with a header row. Columns:{' '}
          {COLUMNS.join(', ')}. Only title and company are required.
        </p>
        <input type="file" accept=".json,.csv,text/csv,application/json" onChange={(e) => onFile(e.target.files?.[0])} />
      </div>

      <div className="card" style={{ margin: 0 }}>
        <h2 style={{ marginBottom: 8 }}>Or paste JSON / CSV</h2>
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); setFilename(undefined); setResult(null); }}
          placeholder={EXAMPLE_JSON}
          style={{ minHeight: 220, fontFamily: 'ui-monospace, Menlo, Consolas, monospace' }}
        />
        <details style={{ marginTop: 10 }}>
          <summary className="small muted" style={{ cursor: 'pointer' }}>Show example</summary>
          <pre className="pre" style={{ marginTop: 8 }}>{EXAMPLE_JSON}</pre>
        </details>
      </div>

      <div className="actions" style={{ alignItems: 'center' }}>
        <button className="btn primary" onClick={submit} disabled={busy || !text.trim()}>
          {busy ? 'Importing…' : 'Import jobs'}
        </button>
        {error && <span className="error">{error}</span>}
      </div>

      {result && (
        <div className="card" style={{ margin: 0 }}>
          <h2 style={{ marginBottom: 8 }}>Import result</h2>
          <p><strong className="success">{result.created} added</strong>{' · '}{result.skipped.length} skipped{' · '}{result.errors.length} with errors</p>
          {result.skipped.length > 0 && (
            <>
              <h3 className="small muted" style={{ margin: '12px 0 6px' }}>Skipped</h3>
              <ul className="small">
                {result.skipped.map((s) => <li key={`s${s.row}`}>Row {s.row}: {s.title} — {s.reason}</li>)}
              </ul>
            </>
          )}
          {result.errors.length > 0 && (
            <>
              <h3 className="small muted" style={{ margin: '12px 0 6px' }}>Errors</h3>
              <ul className="small">
                {result.errors.map((s) => <li key={`e${s.row}`} className="error">Row {s.row}: {s.title} — {s.reason}</li>)}
              </ul>
            </>
          )}
          {result.created > 0 && (
            <p style={{ marginTop: 12 }}><a href="/jobhunter?view=all">View active jobs →</a></p>
          )}
        </div>
      )}
    </div>
  );
}
