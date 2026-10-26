import { NextResponse } from "next/server";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio-context";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };
type Turn = { role: "user" | "assistant"; content: string };

// Try each free provider in order. A provider is skipped if its key is not set.
// Models can be changed with env vars, since free model names change over time.

// Shown to the model before the portfolio facts. The chat box shows plain text,
// so markdown symbols like ** would appear as raw characters.
const STYLE =
  "Answer in plain text only, with no markdown, asterisks, or bullet symbols. " +
  "Give complete, friendly answers of 2 to 4 sentences, and more detail only when the visitor asks for it.\n\n";
const SYSTEM_PROMPT = STYLE + PORTFOLIO_CONTEXT;
// Room for the answer. Some Gemini models count hidden thinking tokens against this limit,
// so a small limit cut replies off mid-sentence.
const MAX_OUTPUT_TOKENS = 1024;

async function askGemini(turns: Turn[], key: string): Promise<string> {
  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
  const request = () =>
    fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: turns.map((t) => ({
          role: t.role === "assistant" ? "model" : "user",
          parts: [{ text: t.content }],
        })),
        generationConfig: { maxOutputTokens: MAX_OUTPUT_TOKENS },
      }),
    });
  // 503 ("high demand") and 429 are usually brief, so retry a couple of times before giving up.
  let res = await request();
  for (let attempt = 1; attempt <= 2 && (res.status === 503 || res.status === 429); attempt++) {
    await new Promise((r) => setTimeout(r, 700 * attempt));
    res = await request();
  }
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const parts: { text?: string; thought?: boolean }[] = data?.candidates?.[0]?.content?.parts ?? [];
  // Skip any hidden "thought" parts and join the visible text.
  return parts.filter((p) => !p.thought).map((p) => p.text ?? "").join("").trim();
}

// Groq and OpenRouter both use the OpenAI-compatible chat format.
async function askOpenAICompatible(url: string, key: string, model: string, turns: Turn[]): Promise<string> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      max_tokens: MAX_OUTPUT_TOKENS,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...turns],
    }),
  });
  if (!res.ok) throw new Error(`${url} ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "";
}

export async function POST(req: Request) {
  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Keep only recent, well-formed messages and cap their length.
  const incoming = Array.isArray(body.messages) ? (body.messages as ChatMessage[]) : [];
  const turns: Turn[] = incoming
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));

  if (turns.length === 0 || turns[turns.length - 1].role !== "user") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const providers: { name: string; run: () => Promise<string> }[] = [];

  if (process.env.GEMINI_API_KEY) {
    providers.push({ name: "gemini", run: () => askGemini(turns, process.env.GEMINI_API_KEY!) });
  }
  if (process.env.GROQ_API_KEY) {
    providers.push({
      name: "groq",
      run: () =>
        askOpenAICompatible(
          "https://api.groq.com/openai/v1/chat/completions",
          process.env.GROQ_API_KEY!,
          process.env.GROQ_MODEL || "openai/gpt-oss-120b",
          turns
        ),
    });
  }
  if (process.env.OPENROUTER_API_KEY) {
    providers.push({
      name: "openrouter",
      run: () =>
        askOpenAICompatible(
          "https://openrouter.ai/api/v1/chat/completions",
          process.env.OPENROUTER_API_KEY!,
          process.env.OPENROUTER_MODEL || "openrouter/free",
          turns
        ),
    });
  }

  if (providers.length === 0) {
    return NextResponse.json({ error: "The assistant is not set up yet." }, { status: 503 });
  }

  for (const provider of providers) {
    try {
      const reply = await provider.run();
      if (reply) return NextResponse.json({ reply });
      console.error(`${provider.name} returned an empty reply`);
    } catch (err) {
      // Log the reason (never the key), then try the next provider.
      console.error(`AI provider failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return NextResponse.json({ error: "The assistant is unavailable right now." }, { status: 502 });
}
