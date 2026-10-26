import Sidebar from "@/components/jobhunter/Sidebar";
import { viewCounts } from "@/lib/jobhunter/jobs";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const counts = await viewCounts();
  const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY);
  const hasSupabase = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
  return (
    <div className="page">
      <Sidebar current="settings" counts={counts} />
      <main className="center">
        <h1 style={{ marginBottom: 20 }}>Settings</h1>

        <div className="card">
          <h2 style={{ marginBottom: 10 }}>Claude analysis</h2>
          <p>
            Status:{" "}
            {hasAnthropic ? <span className="success">API key found</span> : <span className="error">ANTHROPIC_API_KEY is not set</span>}
          </p>
          <p className="muted small">Model: {model} (override with the ANTHROPIC_MODEL variable)</p>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: 10 }}>Storage</h2>
          <p>
            Status:{" "}
            {hasSupabase ? <span className="success">Supabase connected</span> : <span className="error">SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set</span>}
          </p>
          <p className="small muted">Jobs and your profile are stored in Supabase, so they persist on Vercel.</p>
        </div>
      </main>
    </div>
  );
}
