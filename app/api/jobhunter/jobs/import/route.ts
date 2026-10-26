import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { createJob, DuplicateJobError, type JobPatch } from "@/lib/jobhunter/jobs";
import { CONTRACT_TYPES, PRIORITIES, WORK_ARRANGEMENTS } from "@/lib/jobhunter/types";

export const dynamic = "force-dynamic";

const FIELDS = [
  "title", "company", "source", "url", "description", "salary",
  "work_arrangement", "contract_type", "posted_at", "priority",
] as const;

interface ImportResult {
  created: number;
  skipped: { row: number; title: string; reason: string }[];
  errors: { row: number; title: string; reason: string }[];
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const body = (await req.json().catch(() => null)) as { jobs?: unknown } | null;
  if (!body || !Array.isArray(body.jobs)) {
    return NextResponse.json({ error: 'Expected { "jobs": [...] }.' }, { status: 400 });
  }

  const result: ImportResult = { created: 0, skipped: [], errors: [] };

  for (let i = 0; i < body.jobs.length; i++) {
    const row = i + 1;
    const j = (body.jobs[i] ?? {}) as Record<string, unknown>;
    const title = String(j.title ?? "").trim();
    const company = String(j.company ?? "").trim();
    if (!title || !company) {
      result.errors.push({ row, title: title || "(no title)", reason: "Title and company are required." });
      continue;
    }
    const priority = String(j.priority ?? "none").trim().toLowerCase() || "none";
    if (!(PRIORITIES as readonly string[]).includes(priority)) {
      result.errors.push({ row, title, reason: `Unknown priority "${priority}".` });
      continue;
    }
    const wa = String(j.work_arrangement ?? "").trim();
    if (wa && !(WORK_ARRANGEMENTS as readonly string[]).includes(wa)) {
      result.errors.push({ row, title, reason: `Unknown work arrangement "${wa}".` });
      continue;
    }
    const ct = String(j.contract_type ?? "").trim();
    if (ct && !(CONTRACT_TYPES as readonly string[]).includes(ct)) {
      result.errors.push({ row, title, reason: `Unknown contract type "${ct}".` });
      continue;
    }

    const data: JobPatch = {};
    for (const k of FIELDS) {
      if (j[k] !== undefined) data[k] = j[k] === null ? null : String(j[k]);
    }
    data.title = title;
    data.company = company;
    data.priority = priority;

    try {
      await createJob(data);
      result.created++;
    } catch (e) {
      if (e instanceof DuplicateJobError) {
        result.skipped.push({ row, title, reason: "Already saved (same posting URL)." });
      } else {
        result.errors.push({ row, title, reason: e instanceof Error ? e.message : "Could not save." });
      }
    }
  }

  return NextResponse.json(result);
}
