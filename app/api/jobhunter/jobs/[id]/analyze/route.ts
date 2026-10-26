import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { analyzeJob } from "@/lib/jobhunter/analyze";
import { getJob, updateJob } from "@/lib/jobhunter/jobs";
import { getProfile, profileIsFilled } from "@/lib/jobhunter/profile";

export const dynamic = "force-dynamic";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const job = await getJob(Number((await params).id));
  if (!job) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const profile = await getProfile();
  if (!profileIsFilled(profile)) {
    return NextResponse.json(
      { error: "Fill in your profile first: name, skills, and résumé text or years of experience." },
      { status: 400 },
    );
  }

  try {
    const result = await analyzeJob(job, profile);
    await updateJob(job.id, {
      fit_score: result.analysis.fit_score,
      analysis: result.analysis,
      subject: result.subject,
      instructions: result.instructions,
      draft: result.draft,
      stage: job.stage === "discovered" ? "reviewing" : job.stage,
    });
    return NextResponse.json({ ok: true, fit_score: result.analysis.fit_score });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Analysis failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
