import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";
export const maxDuration = 60;

// Runs Google PageSpeed Insights on this site's own homepage. Admin only.
export async function GET(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const strategy = new URL(req.url).searchParams.get("strategy") === "desktop" ? "desktop" : "mobile";

  const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  api.searchParams.set("url", SITE_URL);
  api.searchParams.set("strategy", strategy);
  for (const c of ["performance", "seo", "accessibility", "best-practices"]) api.searchParams.append("category", c);
  if (process.env.PSI_API_KEY) api.searchParams.set("key", process.env.PSI_API_KEY);

  try {
    const res = await fetch(api, { cache: "no-store", signal: AbortSignal.timeout(55000) });
    const data = await res.json();
    if (!res.ok) {
      const quota = res.status === 429;
      return NextResponse.json(
        { error: quota ? "Google's PageSpeed quota is used up. Add PSI_API_KEY in Vercel or try again later." : data?.error?.message || `PageSpeed returned ${res.status}` },
        { status: 502 },
      );
    }
    const cats = data.lighthouseResult?.categories ?? {};
    const audits = data.lighthouseResult?.audits ?? {};
    const score = (k: string) => (typeof cats[k]?.score === "number" ? Math.round(cats[k].score * 100) : null);
    return NextResponse.json({
      strategy,
      scores: { performance: score("performance"), seo: score("seo"), accessibility: score("accessibility"), bestPractices: score("best-practices") },
      metrics: {
        lcp: audits["largest-contentful-paint"]?.displayValue ?? null,
        cls: audits["cumulative-layout-shift"]?.displayValue ?? null,
        tbt: audits["total-blocking-time"]?.displayValue ?? null,
        fcp: audits["first-contentful-paint"]?.displayValue ?? null,
      },
      fetchedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "PageSpeed took too long to respond. Try again." }, { status: 504 });
  }
}
