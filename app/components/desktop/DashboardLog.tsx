"use client";
import { useState, useEffect } from "react";
import { RECENT_LOG } from "@/app/store";

interface Props { onNavigate: (s: string) => void; }

const FEEL_OPTIONS = [
  { emoji:"😔", label:"Rough" },
  { emoji:"😐", label:"OK" },
  { emoji:"😊", label:"Good" },
  { emoji:"🔥", label:"Crushed" },
];

export default function DashboardLog({ onNavigate }: Props) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [rpe, setRpe] = useState(8);
  const [feel, setFeel] = useState("Good");
  const [duration, setDuration] = useState(65);
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    import("@/lib/athlete").then(({ getSessions }) => {
      getSessions(20).then(data => {
        if (data.length > 0) setSessions(data);
      });
    });
  }, []);

  const tss = Math.round(rpe * duration * 0.15);

  const handleSave = async () => {
    try {
      const { logSession } = await import("@/lib/athlete");
      await logSession({ name:"Today's session", type:"Run", duration_min:duration, rpe, feel, tss, notes, date:new Date().toISOString().split("T")[0] });
      setSaved(true);
      setTimeout(() => { setShowForm(false); setSaved(false); }, 1500);
    } catch(e) { console.error(e); }
  };

  const displayLog = sessions.length > 0
    ? sessions.map(s => ({ date:new Date(s.date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}).toUpperCase(), name:s.name, time:`${s.duration_min} min`, rpe:s.rpe, feel:s.feel||"😊", tss:s.tss, notes:s.notes }))
    : RECENT_LOG;

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <div className="section-eyebrow">Training Log</div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800 }}>{displayLog.length} sessions logged</div>
        </div>
        <button className="btn btn-yellow btn-lg" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Log Session"}
        </button>
      </div>

      <div className="grid-2" style={{ gap:20 }}>
        {/* Log form */}
        {showForm && (
          <div className="card" style={{ marginBottom:20, gridColumn:"1/-1" }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, marginBottom:20 }}>
              {saved ? "✅ Session saved!" : "Log Today's Session"}
            </div>
            {!saved && (
              <>
                <div className="grid-2" style={{ gap:16, marginBottom:20 }}>
                  {/* Duration */}
                  <div>
                    <div className="metric-label" style={{ marginBottom:10 }}>Duration</div>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <input type="range" min={20} max={120} value={duration} step={1} onChange={e => setDuration(Number(e.target.value))} style={{ flex:1, accentColor:"var(--yellow)" }} />
                      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, minWidth:70 }}>{duration}<span style={{ fontSize:14, color:"var(--text-muted)", fontWeight:400 }}> min</span></div>
                    </div>
                  </div>
                  {/* RPE */}
                  <div>
                    <div className="metric-label" style={{ marginBottom:10 }}>Perceived Effort (RPE)</div>
                    <div style={{ display:"flex", gap:4 }}>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <button key={n} className={`rpe-btn ${rpe>=n?"active":""}`} onClick={() => setRpe(n)}>{n}</button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Feel */}
                <div style={{ marginBottom:20 }}>
                  <div className="metric-label" style={{ marginBottom:10 }}>How did it feel?</div>
                  <div style={{ display:"flex", gap:10 }}>
                    {FEEL_OPTIONS.map(f => (
                      <button key={f.label} className={`feel-btn ${feel===f.label?"active":""}`} onClick={() => setFeel(f.label)} style={{ flex:1 }}>
                        <div style={{ fontSize:24 }}>{f.emoji}</div>
                        <div style={{ fontSize:12, marginTop:4, fontWeight:600 }}>{f.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Notes */}
                <div style={{ marginBottom:20 }}>
                  <div className="metric-label" style={{ marginBottom:10 }}>Notes</div>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="How did it go?" className="input" style={{ height:80, resize:"none" }} />
                </div>
                {/* TSS preview */}
                <div style={{ background:"var(--yellow-bg)", border:"1px solid rgba(255,230,0,0.2)", borderRadius:10, padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                  <div style={{ fontSize:13, color:"var(--text-muted)" }}>Estimated TSS from RPE × duration</div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:800, color:"var(--yellow)" }}>+{tss}</div>
                </div>
                <button className="btn btn-yellow btn-lg" style={{ width:"100%" }} onClick={handleSave}>Save Session</button>
              </>
            )}
          </div>
        )}

        {/* Sessions table */}
        <div style={{ gridColumn:"1/-1" }}>
          <div className="card" style={{ padding:0, overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 3fr", padding:"10px 20px", borderBottom:"1px solid var(--border)" }}>
              {["Session","Date","Time","RPE","TSS","Notes"].map(h => (
                <div key={h} style={{ fontSize:10, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:1 }}>{h}</div>
              ))}
            </div>
            {displayLog.map((s,i) => (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 3fr", padding:"14px 20px", borderBottom:i<displayLog.length-1?"1px solid var(--border)":"none", alignItems:"center" }}>
                <div style={{ fontSize:14, fontWeight:600 }}>{s.name}</div>
                <div style={{ fontSize:12, color:"var(--text-muted)" }}>{s.date}</div>
                <div style={{ fontSize:12, fontFamily:"'JetBrains Mono',monospace", color:"#ccc" }}>{s.time}</div>
                <div style={{ fontSize:13, color:"var(--yellow)", fontWeight:600 }}>{s.rpe}/10</div>
                <div style={{ fontSize:12, fontFamily:"'JetBrains Mono',monospace", color:"#ccc" }}>{s.tss}</div>
                <div style={{ fontSize:12, color:"var(--text-muted)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.notes||"—"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
