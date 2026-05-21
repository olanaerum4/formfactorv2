"use client";
import { useState, useRef, useEffect } from "react";
import { type AthleteData } from "@/lib/useAthlete";

interface Props { athlete: AthleteData; onNavigate: (s: string) => void; }
interface Msg { role:"user"|"assistant"; content: string; }

const INITIAL: Msg[] = [
  { role:"user", content:"I'm feeling tired today." },
  { role:"assistant", content:"Your Form is at −16, normal after a hard week — ATL jumped to 68 yesterday. Today's VO₂max session is still on, but cap effort at RPE 8, not 9. Hold 4:00/km precisely; don't chase 3:55." },
  { role:"user", content:"Can't train Thursday or Friday next week." },
  { role:"assistant", content:"Done. Moved 142 TSS to Saturday and Sunday. Saturday becomes your threshold session at 4:24/km, Sunday gets the long run at 5:00/km. Week TSS unchanged at 362." },
];

const SUGGESTIONS = [
  "What pace should I run tomorrow?",
  "Am I overtraining?",
  "When will I be ready for a race?",
  "Explain my CTL and ATL numbers",
];

export default function DashboardCoach({ athlete, onNavigate }: Props) {
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  const systemPrompt = `You are the FormFactor AI Coach — a data-driven running coach. Be direct, specific, concise (max 3 sentences). Use exact numbers. Sound like a knowledgeable coach, not a chatbot.

Athlete: ${athlete.name} | Goal: "${athlete.goal}" | VDOT: ${athlete.vdot} | 5K PR: ${athlete.pr5k} | Max HR: ${athlete.maxHR}
Today: VO₂max intervals 5×800m @ 4:00/km (TSS 78, Z4)
Fitness CTL: ${athlete.ctl} | Fatigue ATL: ${athlete.atl} | Form TSB: ${athlete.tsb}
Week 11/17 of 5K build plan | Streak: ${athlete.streak} weeks
Zones: Z1 <5:30, Z2 5:00–5:30, Z3 4:30–4:50, Z4 4:15–4:30, Z5 3:55–4:10
No emojis. No fluff. Concrete answers with numbers.`;

  const send = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || loading) return;
    setInput("");
    setLoading(true);
    const userMsg: Msg = { role:"user", content };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch("/api/coach", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ system:systemPrompt, messages:[...messages, userMsg].map(m => ({ role:m.role, content:m.content })) }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Connection issue — try again.";
      setMessages(prev => [...prev, { role:"assistant", content:reply }]);
    } catch {
      setMessages(prev => [...prev, { role:"assistant", content:"Can't reach the server right now." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display:"flex", gap:20, height:"calc(100vh - 160px)" }}>
      {/* Chat */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        <div className="card" style={{ flex:1, overflow:"hidden auto", marginBottom:12, display:"flex", flexDirection:"column", gap:0 }}>
          <div style={{ flex:1, overflow:"hidden auto", padding:4 }}>
            {messages.map((m,i) => (
              <div key={i} style={{ marginBottom:12 }}>
                {m.role==="user" ? (
                  <div className="chat-user">{m.content}</div>
                ) : (
                  <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                    <div className="ai-dot" style={{ flexShrink:0, marginTop:2 }}>AI</div>
                    <div className="chat-ai" style={{ margin:0 }}>{m.content}</div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <div className="ai-dot" style={{ flexShrink:0 }}>AI</div>
                <div className="chat-ai" style={{ margin:0, display:"flex", gap:4 }}>
                  <div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Suggestions */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
          {SUGGESTIONS.map(s => (
            <button key={s} className="chip" onClick={() => send(s)} style={{ fontSize:12 }}>{s}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ display:"flex", gap:10 }}>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && send()}
            placeholder="Ask anything about your training..." className="input" style={{ flex:1 }} />
          <button className="btn btn-yellow" onClick={() => send()} disabled={loading} style={{ flexShrink:0, opacity:loading?0.5:1 }}>
            Send
          </button>
        </div>
      </div>

      {/* Context sidebar */}
      <div style={{ width:260, flexShrink:0, display:"flex", flexDirection:"column", gap:12 }}>
        <div className="card">
          <div className="metric-label" style={{ marginBottom:12 }}>Your Stats</div>
          {[
            { label:"Fitness (CTL)", value:String(athlete.ctl), color:"#fff" },
            { label:"Fatigue (ATL)", value:String(athlete.atl), color:"var(--red)" },
            { label:"Form (TSB)", value:String(athlete.tsb), color:"var(--yellow)" },
            { label:"VDOT", value:String(athlete.vdot), color:"var(--green)" },
          ].map(s => (
            <div key={s.label} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid var(--border)" }}>
              <div style={{ fontSize:13, color:"var(--text-muted)" }}>{s.label}</div>
              <div style={{ fontSize:14, fontWeight:700, color:s.color, fontFamily:"'JetBrains Mono',monospace" }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="metric-label" style={{ marginBottom:12 }}>Today's Workout</div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, marginBottom:6 }}>5 × 800m @ 4:00/km</div>
          <div style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.5 }}>VO₂max intervals · Z4 · TSS 78</div>
          <button className="btn btn-ghost" style={{ width:"100%", marginTop:12, fontSize:12 }} onClick={() => onNavigate("workout")}>View Details</button>
        </div>
      </div>
    </div>
  );
}
