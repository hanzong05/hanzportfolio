import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getProfile, type Profile, saveProfile } from "@/lib/jobhunter/profile";

export const dynamic = "force-dynamic";

const str = (v: unknown) => String(v ?? "").trim();
const num = (v: unknown) => {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};
const list = (v: unknown) =>
  Array.isArray(v)
    ? v.map((x) => str(x)).filter(Boolean)
    : str(v)
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  return NextResponse.json(await getProfile());
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });

  const profile: Profile = {
    name: str(body.name),
    email: str(body.email),
    phone: str(body.phone),
    location: str(body.location),
    timezone: str(body.timezone),
    portfolio_url: str(body.portfolio_url),
    resume_text: str(body.resume_text),
    skills: list(body.skills),
    years_experience: num(body.years_experience),
    preferred_titles: list(body.preferred_titles),
    work_preference: str(body.work_preference),
    salary_min: num(body.salary_min),
    salary_max: num(body.salary_max),
    employment_types: list(body.employment_types),
  };
  await saveProfile(profile);
  return NextResponse.json(await getProfile());
}
