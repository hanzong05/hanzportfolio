import Sidebar from "@/components/jobhunter/Sidebar";
import JobList from "@/components/jobhunter/JobList";
import JobDetail from "@/components/jobhunter/JobDetail";
import IntelPanel from "@/components/jobhunter/IntelPanel";
import { getJob, listJobs, viewCounts, type View, VIEWS } from "@/lib/jobhunter/jobs";

export const dynamic = "force-dynamic";

type SearchParams = { view?: string; q?: string; sort?: string; job?: string };

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const view = (VIEWS.includes(sp.view as View) ? sp.view : "all") as View;
  const q = sp.q ?? "";
  const sort = sp.sort ?? "added";
  const selectedId = Number(sp.job) || null;

  const [jobs, job, counts] = await Promise.all([
    listJobs(view, q, sort),
    selectedId ? getJob(selectedId) : Promise.resolve(null),
    viewCounts(),
  ]);

  return (
    <div className={`shell${job ? " has-job" : ""}`}>
      <Sidebar current={view} counts={counts} />
      <main className="center">
        {job ? (
          <>
            <p className="small" style={{ marginTop: 0 }}>
              <a href={`/jobhunter?view=${view}${q ? `&q=${encodeURIComponent(q)}` : ""}${sort ? `&sort=${sort}` : ""}`}>
                ← Back to list
              </a>
            </p>
            <JobDetail job={job} />
          </>
        ) : (
          <JobList view={view} jobs={jobs} q={q} sort={sort} selectedId={selectedId} />
        )}
      </main>
      {job && <IntelPanel job={job} />}
    </div>
  );
}
