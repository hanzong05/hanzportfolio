import { NextResponse } from "next/server";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio-context";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "The assistant is not set up yet." }, { status: 503 });
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Keep only recent, well-formed messages and cap their length.
  const incoming = Array.isArray(body.messages) ? (body.messages as ChatMessage[]) : [];
  const messages = incoming
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12)
    .map((m) => ({
      // Gemini calls the assistant role "model".
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content.slice(0, 1000) }],
    }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: PORTFOLIO_CONTEXT }] },
          contents: messages,
          generationConfig: { maxOutputTokens: 400 },
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "The assistant is unavailable right now." }, { status: 502 });
    }

    const data = await res.json();
    const reply: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "The assistant is unavailable right now." }, { status: 502 });
  }
}
