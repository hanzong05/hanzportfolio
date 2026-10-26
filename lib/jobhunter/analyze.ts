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

// Uses the same AI keys as the portfolio chat: Gemini first, then Groq, then OpenRouter.
async function askGemini(prompt: string, key: string): Promise<string> {
  const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 3000 },
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const parts: { text?: string; thought?: boolean }[] = data?.candidates?.[0]?.content?.parts ?? [];
  return parts.filter((p) => !p.thought).map((p) => p.text ?? '').join('').trim();
}

async function askOpenAICompatible(url: string, key: string, model: string, prompt: string): Promise<string> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      max_tokens: 3000,
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: prompt },
      ],
    }),
  });
  if (!res.ok) throw new Error(`${url} ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  return String(data?.choices?.[0]?.message?.content ?? '').trim();
}

async function runModel(prompt: string): Promise<string> {
  const providers: (() => Promise<string>)[] = [];
  if (process.env.GEMINI_API_KEY) providers.push(() => askGemini(prompt, process.env.GEMINI_API_KEY!));
  if (process.env.GROQ_API_KEY) {
    providers.push(() =>
      askOpenAICompatible(
        'https://api.groq.com/openai/v1/chat/completions',
        process.env.GROQ_API_KEY!,
        process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
        prompt,
      ),
    );
  }
  if (process.env.OPENROUTER_API_KEY) {
    providers.push(() =>
      askOpenAICompatible(
        'https://openrouter.ai/api/v1/chat/completions',
        process.env.OPENROUTER_API_KEY!,
        process.env.OPENROUTER_MODEL || 'openrouter/free',
        prompt,
      ),
    );
  }
  if (providers.length === 0) {
    throw new Error('No AI key is set on the server (GEMINI_API_KEY, GROQ_API_KEY, or OPENROUTER_API_KEY).');
  }
  const errors: string[] = [];
  for (const run of providers) {
    try {
      const text = await run();
      if (text) return text;
      errors.push('empty response');
    } catch (e) {
      errors.push(e instanceof Error ? e.message : String(e));
    }
  }
  throw new Error(`All AI providers failed: ${errors.join(' | ')}`);
}

export async function analyzeJob(job: Job, profile: Profile): Promise<AnalysisResult> {
  const text = await runModel(buildPrompt(job, profile));
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
