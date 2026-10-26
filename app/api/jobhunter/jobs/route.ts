import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { createJob, DuplicateJobError, EDITABLE_FIELDS, type JobPatch } from "@/lib/jobhunter/jobs";
import { PRIORITIES, STAGES } from "@/lib/jobhunter/types";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });

  const title = String(body.title ?? "").trim();
  const company = String(body.company ?? "").trim();
  if (!title || !company) {
    return NextResponse.json({ error: "Job title and company are required." }, { status: 400 });
  }
  if (body.stage !== undefined && !(STAGES as readonly string[]).includes(String(body.stage))) {
    return NextResponse.json({ error: "Unknown stage." }, { status: 400 });
  }
  if (body.priority !== undefined && !(PRIORITIES as readonly string[]).includes(String(body.priority))) {
    return NextResponse.json({ error: "Unknown priority." }, { status: 400 });
  }

  const data: JobPatch = {};
  for (const k of EDITABLE_FIELDS) {
    if (k === "checklist" || k === "analysis") continue;
    if (k in body) data[k] = body[k];
  }
  data.title = title;
  data.company = company;

  try {
    const id = await createJob(data);
    return NextResponse.json({ id }, { status: 201 });
  } catch (e) {
    if (e instanceof DuplicateJobError) {
      return NextResponse.json({ error: e.message, id: e.existingId }, { status: 409 });
    }
    throw e;
  }
}
