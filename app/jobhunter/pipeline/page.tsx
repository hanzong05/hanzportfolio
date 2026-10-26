import Sidebar from "@/components/jobhunter/Sidebar";
import { listJobs, viewCounts } from "@/lib/jobhunter/jobs";
import { PRIORITY_LABELS, STAGE_LABELS, STAGES, type Priority, type Stage } from "@/lib/jobhunter/types";

export const dynamic = "force-dynamic";

export default async function PipelinePage() {
  const [jobs, counts] = await Promise.all([listJobs("pipeline", "", "added"), viewCounts()]);
  const columns = STAGES.filter((s) => s !== "archived");

  return (
    <div className="page">
      <Sidebar current="pipeline" counts={counts} />
      <main className="center">
        <div className="section-title">
          <h1>Pipeline</h1>
          <span className="muted small">{jobs.length} active</span>
        </div>
        {jobs.length === 0 ? (
          <div className="empty">No active jobs. Add one from the sidebar to start the pipeline.</div>
        ) : (
          <div className="board">
            {columns.map((stage) => {
              const inStage = jobs.filter((j) => j.stage === stage);
              return (
                <section key={stage} className="column">
                  <h2>
                    <span>{STAGE_LABELS[stage as Stage]}</span>
                    <span className="muted">{inStage.length}</span>
                  </h2>
                  {inStage.map((j) => (
                    <a key={j.id} className="card-mini" href={`/jobhunter?view=all&job=${j.id}`}>
                      <div style={{ fontWeight: 600 }}>{j.title}</div>
                      <div className="muted small">{j.company}</div>
                      <div className="actions" style={{ marginTop: 6, gap: 6 }}>
                        {j.priority !== "none" && (
                          <span className={`badge ${j.priority}`}>{PRIORITY_LABELS[j.priority as Priority]}</span>
                        )}
                        {j.follow_up_date && <span className="badge">Follow up {j.follow_up_date}</span>}
                        {j.fit_score !== null && <span className="badge good">Fit {j.fit_score}</span>}
                      </div>
                    </a>
                  ))}
                  {inStage.length === 0 && <p className="muted small" style={{ margin: 0 }}>Empty</p>}
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
