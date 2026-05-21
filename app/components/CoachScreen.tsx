"use client";
import { useState, useRef, useEffect } from "react";
import { USER } from "../store";

interface Message {
  role: "user" | "assistant";
  content: string;
  inline?: React.ReactNode;
}

interface Props {
  onNavigate: (s: string) => void;
}

const INITIAL_MESSAGES: Message[] = [
  { role: "user", content: "I'm feeling tired today." },
  {
    role: "assistant",
    content: `Your Form is at −18, which is normal after a hard week. ATL jumped to 71 yesterday.`,
    inline: (
      <div style={{ background: "#222", borderRadius: 10, padding: "10px 14px", marginTop: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#555", textTransform: "uppercase", marginBottom: 4 }}>
          TODAY · RECOVERY RUN
        </div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>30 min · don't exceed 140 bpm</div>
      </div>
    )
  },
  { role: "user", content: "Can't train Thursday or Friday next week." },
  {
    role: "assistant",
    content: "Done. Moved 142 TSS to Sat + Sun. Saturday is your threshold session now, Sunday gets the long run.",
    inline: (
      <div style={{ marginTop: 10 }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
          {[
            { d: "MON", v: 28, type: "normal" },
            { d: "TUE", v: 62, type: "normal" },
            { d: "WED", v: 40, type: "normal" },
            { d: "THU", v: "—", type: "off" },
            { d: "FRI", v: "—", type: "off" },
            { d: "SAT", v: 92, type: "moved" },
            { d: "SUN", v: 85, type: "moved" },
          ].map((x, i) => {
            const bg = x.type === "moved" ? "#2a2700" : x.type === "off" ? "#3a1a1a" : "#2a2a2a";
            const col = x.type === "moved" ? "#FFE600" : x.type === "off" ? "#FF6B6B" : "#fff";
            return (
              <div key={i} style={{ flex: 1, background: bg, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
                <div style={{ fontSize: 9, color: col, fontWeight: 700, marginBottom: 3, opacity: .7 }}>{x.d}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: col }}>{x.v}</div>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 11, color: "#555" }}>Week TSS unchanged: 362. Calendar updated.</div>
      </div>
    )
  },
];

export default function CoachScreen({ onNavigate }: Props) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setLoading(true);

    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);

    const apiHistory = [...messages, userMsg]
      .filter(m => !m.inline)
      .map(m => ({ role: m.role, content: m.content }));
    // Include all messages in history
    const fullHistory = [...messages, userMsg].map(m => ({
      role: m.role,
      content: m.content
    }));

    const systemPrompt = `You are the FormFactor AI Coach — an embedded, data-driven running coach. Be direct, specific, and concise (max 3 sentences). Use exact numbers. Sound like a knowledgeable coach, not a chatbot.

User context:
- Name: ${USER.name}, Goal: "${USER.goal}"
- VDOT: ${USER.vdot}, 5K PR: ${USER.pr5k}, Max HR: ${USER.maxHR}
- Today: 5×800m @ 4:00/km (VO₂max intervals, TSS 78, Z4)
- Fitness (CTL): ${USER.ctl}, Fatigue (ATL): ${USER.atl}, Form (TSB): ${USER.tsb}
- Week 11/17 of 5K build plan, streak: ${USER.streak} weeks
- Zones: Z1 <5:30/km, Z2 5:00–5:30, Z3 4:30–4:50, Z4 4:15–4:30, Z5 3:55–4:10
- HR zones: Z1 <140, Z2 140–152, Z3 152–163, Z4 163–170, Z5 170+

No emojis. No fluff. Give concrete answers with numbers.`;

    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: systemPrompt, messages: fullHistory }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Connection issue — try again.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Can't reach the server right now. Try again in a moment." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        background: "var(--surface)", borderBottom: "1px solid var(--border)",
        padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0
      }}>
        <button
          onClick={() => onNavigate("today")}
          style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 14, fontFamily: "inherit", padding: 0 }}
        >
          ← Today
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
          <div className="ai-dot">AI</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Coach</div>
            <div style={{ fontSize: 11, color: "var(--green)", fontWeight: 600 }}>● Online · knows your plan</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflow: "hidden auto", padding: "16px" }}>
        {messages.map((m, i) => (
          <div key={i}>
            {m.role === "user" ? (
              <div className="chat-msg-user">{m.content}</div>
            ) : (
              <div className="chat-msg-ai">
                <span style={{ color: "#FFE600", fontWeight: 700 }}>
                  {m.content.split(",")[0].includes("Form") || m.content.startsWith("Done") ? "" : ""}
                </span>
                {m.content}
                {m.inline}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="chat-msg-ai" style={{ display: "flex", gap: 4 }}>
            <div className="loading-dot" />
            <div className="loading-dot" />
            <div className="loading-dot" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "10px 16px", display: "flex", gap: 10, alignItems: "center", background: "var(--surface)", flexShrink: 0 }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask anything about your training..."
          style={{
            flex: 1, background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: 24, padding: "10px 16px", color: "#fff", fontFamily: "inherit",
            fontSize: 14, outline: "none"
          }}
        />
        <button
          onClick={send}
          disabled={loading}
          style={{
            width: 38, height: 38, background: "var(--yellow)", border: "none",
            borderRadius: "50%", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", flexShrink: 0,
            opacity: loading ? .5 : 1
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
