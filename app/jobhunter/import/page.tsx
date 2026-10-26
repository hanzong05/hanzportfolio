import Sidebar from "@/components/jobhunter/Sidebar";
import ImportForm from "@/components/jobhunter/ImportForm";
import { viewCounts } from "@/lib/jobhunter/jobs";

export const dynamic = "force-dynamic";

export default async function ImportPage() {
  const counts = await viewCounts();
  return (
    <div className="page">
      <Sidebar current="import" counts={counts} />
      <main className="center">
        <h1 style={{ marginBottom: 6 }}>Import jobs</h1>
        <p className="muted" style={{ marginBottom: 20 }}>
          Load a list of postings at once. Duplicates (same posting URL) are skipped, and each row is reported.
        </p>
        <ImportForm />
      </main>
    </div>
  );
}
