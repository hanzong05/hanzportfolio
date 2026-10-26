import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { runAudit, type Status } from "@/lib/seo-audit";
import { login, logout } from "./actions";
import PsiPanel from "./psi-panel";

export const dynamic = "force-dynamic";

const BADGE: Record<Status, string> = {
  pass: "bg-emerald-100 text-emerald-800",
  warn: "bg-amber-100 text-amber-800",
  fail: "bg-red-100 text-red-800",
};
const LABEL: Record<Status, string> = { pass: "Pass", warn: "Improve", fail: "Fix" };

function Ring({ score }: { score: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const color = score >= 90 ? "#059669" : score >= 60 ? "#d97706" : "#dc2626";
  return (
    <svg viewBox="0 0 120 120" className="h-36 w-36" role="img" aria-label={`SEO score ${score} out of 100`}>
      <circle cx="60" cy="60" r={r} fill="none" stroke="#e3ded0" strokeWidth="10" />
      <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} transform="rotate(-90 60 60)" />
      <text x="60" y="68" textAnchor="middle" fontSize="30" fontWeight="800" fill="#0b1224">{score}</text>
    </svg>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">{children}</main>;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!adminConfigured()) {
    return (
      <Shell>
        <div className="card-light rounded-2xl p-8">
          <h1 className="text-2xl font-extrabold">Admin is not set up</h1>
          <p className="mt-3 text-sm text-slate-600">
            Add an <code className="rounded bg-cream px-1.5 py-0.5">ADMIN_PASSWORD</code> environment variable in Vercel
            (Settings, then Environment Variables), then redeploy.
          </p>
        </div>
      </Shell>
    );
  }

  if (!(await isAdmin())) {
    const { error } = await searchParams;
    return (
      <Shell>
        <form action={login} className="card-light mx-auto mt-16 max-w-sm space-y-4 rounded-2xl p-8">
          <h1 className="text-2xl font-extrabold">Admin sign in</h1>
          <label className="block text-sm font-semibold" htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password"
            className="w-full rounded-lg border border-line bg-white px-3 py-2 outline-none focus:border-brand" />
          {error && <p className="text-sm text-red-600">Wrong password.</p>}
          <button type="submit" className="btn-dark w-full rounded-full px-5 py-2.5 text-sm font-semibold">Sign in</button>
        </form>
      </Shell>
    );
  }

  const audit = await runAudit();
  const groups = [...new Set(audit.checks.map((c) => c.group))];
  const count = (s: Status) => audit.checks.filter((c) => c.status === s).length;

  return (
    <Shell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">Admin</p>
          <h1 className="mt-1 text-3xl font-extrabold">Site scores</h1>
        </div>
        <form action={logout}><button type="submit" className="btn-outline rounded-full px-4 py-2 text-sm font-semibold text-brand">Sign out</button></form>
      </div>

      <section className="card-light mt-6 flex flex-col items-center gap-6 rounded-2xl p-6 sm:flex-row">
        <Ring score={audit.score} />
        <div>
          <h2 className="text-lg font-bold">SEO health of {audit.url.replace("https://", "")}</h2>
          <p className="mt-1 text-sm text-slate-600">
            {count("pass")} passed, {count("warn")} to improve, {count("fail")} to fix. Checked live at{" "}
            {new Date(audit.fetchedAt).toUTCString()}. Reload the page to run it again.
          </p>
        </div>
      </section>

      <div className="mt-6"><PsiPanel /></div>

      {groups.map((g) => (
        <section key={g} className="card-light mt-6 rounded-2xl p-6">
          <h2 className="text-lg font-bold">{g}</h2>
          <ul className="mt-4 divide-y divide-line">
            {audit.checks.filter((c) => c.group === g).map((c) => (
              <li key={c.id} className="flex items-start gap-3 py-3">
                <span className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${BADGE[c.status]}`}>{LABEL[c.status]}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{c.label}</p>
                  <p className="break-words text-xs text-slate-500">{c.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Shell>
  );
}
