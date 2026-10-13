'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle, Send, X } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

const greeting: Message = {
  role: 'assistant',
  content: "Hi! I'm Hanz's assistant. Ask me about his projects, skills, or experience.",
};

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m !== greeting) }),
      });
      const data = await res.json();
      const reply = res.ok && data.reply ? data.reply : data.error || 'Something went wrong. Please try again.';
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Connection problem. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3">
      {open && (
        <div className="glass animate-modal-in flex h-[480px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl shadow-2xl">
          <div className="grad-bar h-1 w-full" />
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
            <div>
              <p className="font-semibold text-white">Ask about Hanz</p>
              <p className="text-xs text-slate-500">AI assistant</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'btn-grad text-white'
                      : 'border border-cyan-400/40 bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-violet-500/20 text-white shadow-[0_0_18px_-6px_rgba(34,211,238,0.6)] ring-1 ring-violet-400/30'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <p className="text-xs text-slate-500">Typing…</p>}
            <div ref={endRef} />
          </div>

          <form onSubmit={send} className="flex gap-2 border-t border-white/5 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder="Ask a question…"
              aria-label="Your question"
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-violet-400/60 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="btn-grad grid w-11 place-items-center rounded-xl text-white disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <div className="flex items-center gap-3">
        {!open && (
          <div className="attn-bob flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 p-[1.5px] shadow-[0_0_24px_-4px_rgba(168,85,247,0.7)] transition-transform hover:scale-[1.03]"
            >
              <span className="block rounded-full bg-[#0b0b14] px-5 py-2.5 text-sm font-semibold">
                <span className="text-grad">Ask AI about me</span>
              </span>
            </button>
            <ArrowRight className="attn-nudge h-5 w-5 shrink-0 text-violet-400" aria-hidden />
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close assistant' : 'Ask AI about me'}
          className="attn-ring btn-grad grid h-14 w-14 shrink-0 place-items-center rounded-full text-white shadow-2xl"
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
