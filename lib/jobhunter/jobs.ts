import { db } from "./supabase";
import { Analysis, DEFAULT_CHECKLIST, Stage, STAGES } from "./types";

export interface Job {
  id: number;
  title: string;
  company: string;
  source: string | null;
  url: string | null;
  description: string | null;
  salary: string | null;
  work_arrangement: string | null;
  contract_type: string | null;
  posted_at: string | null;
  priority: string;
  stage: Stage;
  fit_score: number | null;
  analysis: Analysis | null;
  checklist: boolean[];
  instructions: string | null;
  subject: string | null;
  draft: string | null;
  notes: string | null;
  follow_up_date: string | null;
  applied_at: string | null;
  interview_at: string | null;
  reply_at: string | null;
  reply_note: string | null;
  created_at: string;
  updated_at: string;
}

export type View = "high" | "maybe" | "applied" | "rejected" | "pipeline" | "replies" | "interviews" | "all";
export const VIEWS: View[] = ["high", "maybe", "applied", "rejected", "pipeline", "replies", "interviews", "all"];

const CLOSED = ["archived", "rejected"];

const PREDICATES: Record<View, (j: Job) => boolean> = {
  high: (j) => j.priority === "high" && !CLOSED.includes(j.stage),
  maybe: (j) => j.priority === "maybe" && !CLOSED.includes(j.stage),
  applied: (j) => ["applied", "interview", "offer"].includes(j.stage),
  rejected: (j) => j.stage === "rejected",
  pipeline: (j) => j.stage !== "archived",
  replies: (j) => Boolean(j.reply_at),
  interviews: (j) => j.stage === "interview",
  all: (j) => j.stage !== "archived",
};

const PRIORITY_RANK: Record<string, number> = { high: 0, maybe: 1, none: 2 };

function hydrate(r: Record<string, unknown>): Job {
  const checklist = Array.isArray(r.checklist) ? r.checklist.map(Boolean) : [];
  while (checklist.length < DEFAULT_CHECKLIST.length) checklist.push(false);
  return { ...(r as unknown as Job), checklist, stage: r.stage as Stage };
}

async function fetchAll(): Promise<Job[]> {
  const { data, error } = await db().from("jobs").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r) => hydrate(r as Record<string, unknown>));
}

export async function listJobs(view: View, q = "", sort = "added"): Promise<Job[]> {
  const term = q.trim().toLowerCase();
  let jobs = (await fetchAll()).filter(PREDICATES[view]);
  if (term) {
    jobs = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(term) ||
        j.company.toLowerCase().includes(term) ||
        (j.description ?? "").toLowerCase().includes(term),
    );
  }
  if (sort === "priority") {
    jobs.sort(
      (a, b) =>
        (PRIORITY_RANK[a.priority] ?? 2) - (PRIORITY_RANK[b.priority] ?? 2) ||
        (b.fit_score ?? -1) - (a.fit_score ?? -1),
    );
  } else if (sort === "relevance") {
    jobs.sort((a, b) => (b.fit_score ?? -1) - (a.fit_score ?? -1));
  }
  return jobs;
}

export async function getJob(id: number): Promise<Job | null> {
  const { data, error } = await db().from("jobs").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? hydrate(data as Record<string, unknown>) : null;
}

export async function viewCounts(): Promise<Record<View, number>> {
  const jobs = await fetchAll();
  const out = {} as Record<View, number>;
  for (const v of VIEWS) out[v] = jobs.filter(PREDICATES[v]).length;
  return out;
}

export const EDITABLE_FIELDS = [
  "title", "company", "source", "url", "description", "salary", "work_arrangement",
  "contract_type", "posted_at", "priority", "stage", "instructions", "subject", "draft",
  "notes", "follow_up_date", "applied_at", "interview_at", "reply_at", "reply_note",
  "fit_score", "analysis", "checklist",
] as const;

export type JobPatch = Partial<Record<(typeof EDITABLE_FIELDS)[number], unknown>>;

function serialize(key: string, v: unknown): unknown {
  if (key === "checklist" || key === "analysis") return v ?? null;
  if (v === "" || v === undefined) return null;
  if (typeof v === "string") return v.trim();
  return v;
}

export class DuplicateJobError extends Error {
  existingId: number;
  constructor(existingId: number) {
    super("A job with this posting URL is already saved.");
    this.existingId = existingId;
  }
}

async function findByUrl(url: string): Promise<number | null> {
  const { data, error } = await db().from("jobs").select("id").eq("url", url).maybeSingle();
  if (error) throw error;
  return data ? (data as { id: number }).id : null;
}

export async function createJob(data: JobPatch): Promise<number> {
  const url = typeof data.url === "string" && data.url.trim() ? data.url.trim() : null;
  if (url) {
    const existing = await findByUrl(url);
    if (existing !== null) throw new DuplicateJobError(existing);
  }
  const row: Record<string, unknown> = { checklist: DEFAULT_CHECKLIST.map(() => false) };
  for (const k of EDITABLE_FIELDS) {
    if (k === "checklist" || k === "analysis") continue;
    if (k in data) row[k] = k === "url" ? url : serialize(k, data[k]);
  }
  const { data: inserted, error } = await db().from("jobs").insert(row).select("id").single();
  if (error) {
    if (error.code === "23505" && url) throw new DuplicateJobError((await findByUrl(url)) ?? 0);
    throw error;
  }
  return (inserted as { id: number }).id;
}

export async function updateJob(id: number, patch: JobPatch): Promise<void> {
  const row: Record<string, unknown> = {};
  for (const k of EDITABLE_FIELDS) {
    if (k in patch) row[k] = serialize(k, patch[k]);
  }
  if (!Object.keys(row).length) return;
  row.updated_at = new Date().toISOString();
  const { error } = await db().from("jobs").update(row).eq("id", id);
  if (error) {
    if (error.code === "23505") throw new DuplicateJobError(0);
    throw error;
  }
}

export async function deleteJob(id: number): Promise<void> {
  const { error } = await db().from("jobs").delete().eq("id", id);
  if (error) throw error;
}

export function isValidStage(v: unknown): v is Stage {
  return typeof v === "string" && (STAGES as readonly string[]).includes(v);
}

export interface Stats {
  total: number;
  reviewed: number;
  applied: number;
  interviews: number;
  offers: number;
  responded: number;
  responseRate: number | null;
  weekly: { label: string; n: number }[];
  byStage: Record<string, number>;
}

/** Monday of the week containing this date (YYYY-MM-DD). */
function weekStart(dateStr: string): string {
  const d = new Date(dateStr.slice(0, 10) + "T00:00:00Z");
  const day = (d.getUTCDay() + 6) % 7; // Monday = 0
  d.setUTCDate(d.getUTCDate() - day);
  return d.toISOString().slice(0, 10);
}

/** days = null means all time. Filters use the application date, falling back to the date added. */
export async function getStats(days: number | null): Promise<Stats> {
  const jobs = await fetchAll();
  const cutoff = days ? Date.now() - days * 86400000 : -Infinity;
  const inRange = (j: Job) => Date.parse((j.applied_at ?? j.created_at).slice(0, 10)) >= cutoff;

  const applied = jobs.filter((j) => j.applied_at && inRange(j));
  const responded = applied.filter((j) => j.reply_at || ["interview", "offer", "rejected"].includes(j.stage));
  const interviews = jobs.filter((j) => (j.stage === "interview" || j.stage === "offer" || j.interview_at) && inRange(j));
  const offers = jobs.filter((j) => j.stage === "offer" && inRange(j));

  const weeklyMap = new Map<string, number>();
  for (const j of applied) {
    const key = weekStart(j.applied_at as string);
    weeklyMap.set(key, (weeklyMap.get(key) ?? 0) + 1);
  }
  const weekly = [...weeklyMap.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([label, n]) => ({ label, n }));

  const byStage: Record<string, number> = {};
  for (const j of jobs) byStage[j.stage] = (byStage[j.stage] ?? 0) + 1;

  return {
    total: jobs.length,
    reviewed: jobs.filter((j) => j.stage !== "discovered").length,
    applied: applied.length,
    interviews: interviews.length,
    offers: offers.length,
    responded: responded.length,
    responseRate: applied.length > 0 ? responded.length / applied.length : null,
    weekly,
    byStage,
  };
}
