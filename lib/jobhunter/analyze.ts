import Anthropic from '@anthropic-ai/sdk';
import type { Job } from './jobs';
import type { Profile } from './profile';
import type { Analysis } from './types';

export interface AnalysisResult {
  analysis: Analysis;
  subject: string;
  instructions: string;
  draft: string;
}

const SYSTEM = `You help a job seeker evaluate job postings and draft applications.

Rules:
- Base every statement on the job description and the candidate profile you are given.
- Never invent qualifications, employers, dates, skills, metrics, or experience.
- If the job asks for something the profile does not show, list it under missing_skills.
- If pay, contract length, location, or other details are not stated, say they are unclear.
- Drafts may only use facts from the profile. Use [bracketed placeholders] where information is missing.
- Respond with a single JSON object and nothing else: no prose, no code fence.`;

function buildPrompt(job: Job, profile: Profile): string {
  const description = (job.description ?? '').slice(0, 20000) || '(No description saved.)';
  return `CANDIDATE PROFILE (JSON):
${JSON.stringify(profile, null, 2)}

JOB:
Title: ${job.title}
Company: ${job.company}
Source: ${job.source ?? 'unknown'}
Salary as posted: ${job.salary ?? 'not stated'}
Work arrangement: ${job.work_arrangement ?? 'not stated'}
Contract type: ${job.contract_type ?? 'not stated'}
Posted: ${job.posted_at ?? 'not stated'}

JOB DESCRIPTION:
${description}

Return JSON with exactly these keys:
{
  "summary": "2-3 sentence evaluation of the role",
  "matched_skills": ["skills the profile clearly shows that the job asks for"],
  "missing_skills": ["requirements the profile does not show"],
  "concerns": ["unclear pay, short contract, required experience, etc."],
  "fit_score": 0-100 integer,
  "fit_explanation": "why this score, based only on the above",
  "next_steps": ["concrete actions for the applicant"],
  "subject": "application subject line, or the employer's requested subject if stated",
  "instructions": "employer-specific application instructions from the posting, or 'None stated'",
  "draft": "short tailored application message using only profile facts"
}`;
}

function extractJson(text: string): Record<string, unknown> {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('Claude did not return JSON.');
  return JSON.parse(text.slice(start, end + 1)) as Record<string, unknown>;
}

const strList = (v: unknown): string[] =>
  Array.isArray(v) ? v.map((x) => String(x)).filter(Boolean) : [];

export async function analyzeJob(job: Job, profile: Profile): Promise<AnalysisResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not set on the server, so analysis cannot run.');
  }
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5';

  const msg = await client.messages.create({
    model,
    max_tokens: 3000,
    system: SYSTEM,
    messages: [{ role: 'user', content: buildPrompt(job, profile) }],
  });
  const text = msg.content.map((b) => (b.type === 'text' ? b.text : '')).join('');
  const j = extractJson(text);

  const score = Math.max(0, Math.min(100, Math.round(Number(j.fit_score) || 0)));
  return {
    analysis: {
      summary: String(j.summary ?? ''),
      matched_skills: strList(j.matched_skills),
      missing_skills: strList(j.missing_skills),
      concerns: strList(j.concerns),
      fit_score: score,
      fit_explanation: String(j.fit_explanation ?? ''),
      next_steps: strList(j.next_steps),
    },
    subject: String(j.subject ?? ''),
    instructions: String(j.instructions ?? ''),
    draft: String(j.draft ?? ''),
  };
}
