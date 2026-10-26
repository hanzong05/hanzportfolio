import { SITE_URL } from "@/lib/site";

export type Status = "pass" | "warn" | "fail";
export type Check = { id: string; group: string; label: string; status: Status; detail: string; weight: number };
export type AuditResult = { score: number; checks: Check[]; fetchedAt: string; responseMs: number; url: string };

function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(/([a-zA-Z:-]+)\s*=\s*("([^"]*)"|'([^']*)')/g)) out[m[1].toLowerCase()] = m[3] ?? m[4] ?? "";
  return out;
}

async function get(url: string): Promise<{ ok: boolean; status: number; text: string; ms: number }> {
  const start = Date.now();
  try {
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(15000), headers: { "user-agent": "HanzSEOAudit/1.0" } });
    const text = await res.text();
    return { ok: res.ok, status: res.status, text, ms: Date.now() - start };
  } catch {
    return { ok: false, status: 0, text: "", ms: Date.now() - start };
  }
}

const norm = (u: string) => u.replace(/\/+$/, "");

// Audits only this site's own pages, never an address supplied by a visitor.
export async function runAudit(): Promise<AuditResult> {
  const home = await get(SITE_URL);
  const html = home.text;
  const metas = [...html.matchAll(/<meta\s[^>]*>/gi)].map((m) => attrs(m[0]));
  const meta = (key: string, value: string) =>
    metas.find((m) => (m[key] ?? "").toLowerCase() === value)?.content?.trim() ?? "";
  const links = [...html.matchAll(/<link\s[^>]*>/gi)].map((m) => attrs(m[0]));

  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
  const description = meta("name", "description");
  const canonical = links.find((l) => (l.rel ?? "").toLowerCase() === "canonical")?.href ?? "";
  const lang = html.match(/<html[^>]*\slang=["']([^"']+)["']/i)?.[1] ?? "";
  const h1 = (html.match(/<h1[\s>]/gi) ?? []).length;
  const h2 = (html.match(/<h2[\s>]/gi) ?? []).length;
  const imgs = [...html.matchAll(/<img\s[^>]*>/gi)].map((m) => attrs(m[0]));
  const imgsWithAlt = imgs.filter((i) => typeof i.alt === "string" && i.alt.trim() !== "").length;
  const ogImage = meta("property", "og:image");
  const jsonLd = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  let jsonLdOk = jsonLd.length > 0;
  for (const block of jsonLd) {
    try {
      JSON.parse(block);
    } catch {
      jsonLdOk = false;
    }
  }
  const noindex = /noindex/i.test(meta("name", "robots"));

  const [robots, sitemap, og] = await Promise.all([
    get(`${SITE_URL}/robots.txt`),
    get(`${SITE_URL}/sitemap.xml`),
    ogImage && ogImage.startsWith(SITE_URL) ? get(ogImage) : Promise.resolve(null),
  ]);

  const checks: Check[] = [];
  const add = (group: string, id: string, label: string, status: Status, detail: string, weight = 1) =>
    checks.push({ group, id, label, status, detail, weight });

  add("Technical", "https", "Served over HTTPS", SITE_URL.startsWith("https://") ? "pass" : "fail", SITE_URL, 2);
  add("Technical", "status", "Homepage responds with 200", home.ok ? "pass" : "fail", home.status ? `HTTP ${home.status}` : "Could not be reached", 3);
  add("Technical", "speed", "Server response time", home.ms < 800 ? "pass" : home.ms < 1800 ? "warn" : "fail", `${home.ms} ms (under 800 ms is good)`, 1);
  add("Technical", "lang", "Page language is declared", lang ? "pass" : "fail", lang ? `lang="${lang}"` : "Missing lang on <html>");
  add("Technical", "viewport", "Mobile viewport is set", meta("name", "viewport") ? "pass" : "fail", meta("name", "viewport") || "Missing viewport meta", 2);
  add("Technical", "noindex", "Page is allowed in search", noindex ? "fail" : "pass", noindex ? "A noindex tag is present" : "No noindex tag", 3);
  add("Technical", "favicon", "Favicon is linked", links.some((l) => /icon/i.test(l.rel ?? "")) ? "pass" : "warn", "Browser tab icon");

  add("Content", "title", "Title tag length (30 to 60)", !title ? "fail" : title.length >= 30 && title.length <= 60 ? "pass" : "warn", title ? `${title.length} characters: ${title}` : "Missing title", 3);
  add("Content", "description", "Meta description length (70 to 160)", !description ? "fail" : description.length >= 70 && description.length <= 160 ? "pass" : "warn", description ? `${description.length} characters` : "Missing description", 3);
  add("Content", "canonical", "Canonical URL matches the site", !canonical ? "fail" : norm(canonical) === norm(SITE_URL) ? "pass" : "warn", canonical || "Missing canonical link", 2);
  add("Content", "h1", "Exactly one H1 heading", h1 === 1 ? "pass" : h1 === 0 ? "fail" : "warn", `${h1} found`, 2);
  add("Content", "h2", "Sections use H2 headings", h2 >= 2 ? "pass" : "warn", `${h2} found`);
  add("Content", "alt", "Images have alt text", imgs.length === 0 ? "pass" : imgsWithAlt === imgs.length ? "pass" : imgsWithAlt / imgs.length >= 0.8 ? "warn" : "fail", `${imgsWithAlt} of ${imgs.length} images`, 2);

  const ogMissing = ["og:title", "og:description", "og:image", "og:url"].filter((k) => !meta("property", k));
  add("Social & structured data", "og", "Open Graph tags complete", ogMissing.length === 0 ? "pass" : ogMissing.length <= 1 ? "warn" : "fail", ogMissing.length ? `Missing: ${ogMissing.join(", ")}` : "Title, description, image, URL", 2);
  add("Social & structured data", "ogimage", "Share image loads", !ogImage ? "fail" : og === null ? "warn" : og.ok ? "pass" : "fail", og ? `HTTP ${og.status}` : ogImage ? "Hosted elsewhere, not checked" : "No og:image");
  add("Social & structured data", "twitter", "Twitter card is set", meta("name", "twitter:card") ? "pass" : "warn", meta("name", "twitter:card") || "Missing twitter:card");
  add("Social & structured data", "jsonld", "Structured data (JSON-LD) is valid", jsonLdOk ? "pass" : jsonLd.length ? "fail" : "warn", jsonLd.length ? `${jsonLd.length} block(s)` : "None found", 2);

  add("Crawling", "robots", "robots.txt is reachable", robots.ok ? "pass" : "fail", robots.ok ? "Found" : `HTTP ${robots.status}`, 2);
  add("Crawling", "robotsmap", "robots.txt lists the sitemap", /sitemap:/i.test(robots.text) ? "pass" : "warn", "Sitemap line");
  add("Crawling", "sitemap", "sitemap.xml is reachable", sitemap.ok && /<loc>/i.test(sitemap.text) ? "pass" : "fail", sitemap.ok ? `${(sitemap.text.match(/<loc>/gi) ?? []).length} URL(s)` : `HTTP ${sitemap.status}`, 2);

  const total = checks.reduce((n, c) => n + c.weight, 0);
  const earned = checks.reduce((n, c) => n + c.weight * (c.status === "pass" ? 1 : c.status === "warn" ? 0.5 : 0), 0);
  return { score: Math.round((earned / total) * 100), checks, fetchedAt: new Date().toISOString(), responseMs: home.ms, url: SITE_URL };
}
