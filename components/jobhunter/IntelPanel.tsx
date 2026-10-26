import type { Job } from '@/lib/jobhunter/jobs';

export default function IntelPanel({ job }: { job: Job }) {
  const a = job.analysis;

  return (
    <aside className="intel">
      <h2>Job intelligence</h2>

      {!a ? (
        <div className="card" style={{ marginTop: 14 }}>
          <p className="muted">
            Not analyzed yet. Choose <strong>Analyze with Claude</strong> in the workspace to compare this posting with
            your profile.
          </p>
          <p className="small muted">Analysis uses only the job description and your saved profile.</p>
        </div>
      ) : (
        <>
          <h3>Summary</h3>
          <p>{a.summary}</p>

          <h3>Fit estimate</h3>
          <p>
            <strong style={{ fontSize: 22 }}>{a.fit_score}</strong>
            <span className="muted"> / 100</span>
          </p>
          <p className="small muted">{a.fit_explanation}</p>

          <h3>Matched skills</h3>
          <div className="chip-list">
            {a.matched_skills.length ? (
              a.matched_skills.map((s) => (
                <span key={s} className="chip ok">
                  {s}
                </span>
              ))
            ) : (
              <span className="muted small">None clearly shown in your profile.</span>
            )}
          </div>

          <h3>Missing skills or experience</h3>
          <div className="chip-list">
            {a.missing_skills.length ? (
              a.missing_skills.map((s) => (
                <span key={s} className="chip miss">
                  {s}
                </span>
              ))
            ) : (
              <span className="muted small">No gaps identified.</span>
            )}
          </div>

          <h3>Potential concerns</h3>
          {a.concerns.length ? (
            <ul>
              {a.concerns.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          ) : (
            <p className="muted small">None identified.</p>
          )}

          <h3>Recommended next steps</h3>
          {a.next_steps.length ? (
            <ul>
              {a.next_steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          ) : (
            <p className="muted small">None.</p>
          )}
        </>
      )}
    </aside>
  );
}
