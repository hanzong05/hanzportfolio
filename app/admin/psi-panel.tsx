"use client";
import { useState } from "react";

type Psi = {
  strategy: string;
  scores: Record<"performance" | "seo" | "accessibility" | "bestPractices", number | null>;
  metrics: Record<"lcp" | "cls" | "tbt" | "fcp", string | null>;
};

const tone = (n: number | null) => (n === null ? "text-slate-400" : n >= 90 ? "text-emerald-600" : n >= 50 ? "text-amber-600" : "text-red-600");
const LABELS: [keyof Psi["scores"], string][] = [["performance", "Performance"], ["seo", "SEO"], ["accessibility", "Accessibility"], ["bestPractices", "Best practices"]];

export default function PsiPanel() {
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [data, setData] = useState<Psi | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function run(s: "mobile" | "desktop") {
    setStrategy(s);
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/psi?strategy=${s}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Request failed");
      setData(json);
    } catch (e) {
      setData(null);
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-light rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">Google PageSpeed scores</h2>
          <p className="text-sm text-slate-500">Live Lighthouse results for the homepage. Takes 10 to 30 seconds.</p>
        </div>
        <div className="flex gap-2">
          {(["mobile", "desktop"] as const).map((s) => (
            <button key={s} type="button" disabled={loading} onClick={() => run(s)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${strategy === s && data ? "btn-dark" : "btn-outline text-brand"} disabled:opacity-50`}>
              {loading && strategy === s ? "Running…" : `Run ${s}`}
            </button>
          ))}
        </div>
      </div>
      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {data && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {LABELS.map(([k, label]) => (
              <div key={k} className="rounded-xl border border-line bg-cream p-4 text-center">
                <p className={`text-4xl font-extrabold ${tone(data.scores[k])}`}>{data.scores[k] ?? "n/a"}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
              </div>
            ))}
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {([["lcp", "Largest paint"], ["fcp", "First paint"], ["tbt", "Blocking time"], ["cls", "Layout shift"]] as const).map(([k, label]) => (
              <div key={k}><dt className="text-slate-500">{label}</dt><dd className="font-semibold">{data.metrics[k] ?? "n/a"}</dd></div>
            ))}
          </dl>
        </>
      )}
    </div>
  );
}
