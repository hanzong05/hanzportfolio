import Sidebar from "@/components/jobhunter/Sidebar";
import { AddJobForm } from "@/components/jobhunter/Forms";
import { viewCounts } from "@/lib/jobhunter/jobs";

export const dynamic = "force-dynamic";

export default async function AddJobPage() {
  const counts = await viewCounts();
  return (
    <div className="page">
      <Sidebar current="add" counts={counts} />
      <main className="center">
        <h1 style={{ marginBottom: 6 }}>Add a job</h1>
        <p className="muted" style={{ marginBottom: 20 }}>
          Enter the posting details by hand. Paste the full description so the analysis has something to read.
        </p>
        <AddJobForm />
      </main>
    </div>
  );
}
