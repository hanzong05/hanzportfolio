import { db } from "./supabase";

export interface Profile {
  name: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  portfolio_url: string;
  resume_text: string;
  skills: string[];
  years_experience: number | null;
  preferred_titles: string[];
  work_preference: string;
  salary_min: number | null;
  salary_max: number | null;
  employment_types: string[];
}

const str = (v: unknown) => (typeof v === "string" ? v : "");
const list = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : []);
const num = (v: unknown): number | null => (typeof v === "number" ? v : null);

export async function getProfile(): Promise<Profile> {
  const { data, error } = await db().from("profile").select("*").eq("id", 1).single();
  if (error) throw error;
  const r = data as Record<string, unknown>;
  return {
    name: str(r.name),
    email: str(r.email),
    phone: str(r.phone),
    location: str(r.location),
    timezone: str(r.timezone),
    portfolio_url: str(r.portfolio_url),
    resume_text: str(r.resume_text),
    skills: list(r.skills),
    years_experience: num(r.years_experience),
    preferred_titles: list(r.preferred_titles),
    work_preference: str(r.work_preference),
    salary_min: num(r.salary_min),
    salary_max: num(r.salary_max),
    employment_types: list(r.employment_types),
  };
}

export async function saveProfile(p: Profile): Promise<void> {
  const { error } = await db()
    .from("profile")
    .update({ ...p, updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) throw error;
}

/** Enough profile data to evaluate fit honestly. */
export function profileIsFilled(p: Profile): boolean {
  return Boolean(p.name && p.skills.length > 0 && (p.resume_text.trim() || p.years_experience !== null));
}
