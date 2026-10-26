import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { deleteJob, DuplicateJobError, EDITABLE_FIELDS, getJob, isValidStage, type JobPatch, updateJob } from "@/lib/jobhunter/jobs";
import { PRIORITIES } from "@/lib/jobhunter/types";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const job = await getJob(Number((await params).id));
  if (!job) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(job);
}

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const id = Number((await params).id);
  if (!(await getJob(id))) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });

  if ("stage" in body && !isValidStage(body.stage)) {
    return NextResponse.json({ error: "Unknown stage." }, { status: 400 });
  }
  if ("priority" in body && !(PRIORITIES as readonly string[]).includes(String(body.priority))) {
    return NextResponse.json({ error: "Unknown priority." }, { status: 400 });
  }
  if ("title" in body && !String(body.title).trim()) {
    return NextResponse.json({ error: "Title cannot be empty." }, { status: 400 });
  }
  if ("company" in body && !String(body.company).trim()) {
    return NextResponse.json({ error: "Company cannot be empty." }, { status: 400 });
  }

  const patch: JobPatch = {};
  for (const k of EDITABLE_FIELDS) {
    if (k === "analysis") continue; // only the analyze route writes analysis
    if (k in body) patch[k] = body[k];
  }

  try {
    await updateJob(id, patch);
  } catch (e) {
    if (e instanceof DuplicateJobError) {
      return NextResponse.json({ error: "Another job already uses this posting URL." }, { status: 409 });
    }
    throw e;
  }
  return NextResponse.json(await getJob(id));
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  await deleteJob(Number((await params).id));
  return NextResponse.json({ ok: true });
}
