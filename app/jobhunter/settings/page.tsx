import Sidebar from "@/components/jobhunter/Sidebar";
import { viewCounts } from "@/lib/jobhunter/jobs";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const counts = await viewCounts();
  const providers = [
    process.env.GEMINI_API_KEY && "Gemini",
    process.env.GROQ_API_KEY && "Groq",
    process.env.OPENROUTER_API_KEY && "OpenRouter",
  ].filter(Boolean) as string[];
  const hasSupabase = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  return (
    <div className="page">
      <Sidebar current="settings" counts={counts} />
      <main className="center">
        <h1 style={{ marginBottom: 20 }}>Settings</h1>

        <div className="card">
          <h2 style={{ marginBottom: 10 }}>AI analysis</h2>
          <p>
            Status:{" "}
            {providers.length ? <span className="success">Ready ({providers.join(", ")})</span> : <span className="error">No AI key found (GEMINI_API_KEY, GROQ_API_KEY or OPENROUTER_API_KEY)</span>}
          </p>
          <p className="muted small">Uses the same keys as the portfolio chat. Gemini is tried first, then Groq, then OpenRouter.</p>
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
