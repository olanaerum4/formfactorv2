"use client";
import { type AthleteData } from "@/lib/useAthlete";
import { WEEK_PLAN, ZONE_COLORS } from "@/app/store";

interface Props { athlete: AthleteData; proMode: boolean; onNavigate: (s: string) => void; }

const today = new Date();
const DAY = today.toLocaleDateString("en-US", { weekday:"long" });
const DATE = today.toLocaleDateString("en-US", { month:"long", day:"numeric" });

export default function DashboardToday({ athlete, proMode, onNavigate }: Props) {
  const todayWorkout = WEEK_PLAN.find(d => d.today);
  const tsbColor = athlete.tsb > 5 ? "var(--green)" : athlete.tsb > -10 ? "var(--yellow)" : athlete.tsb > -25 ? "var(--orange)" : "var(--red)";
  const tsbLabel = athlete.tsb > 5 ? "Fresh" : athlete.tsb > -10 ? "Productive" : athlete.tsb > -25 ? "Overreaching" : "Overtrained";

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:12,fontWeight:700,letterSpacing:1,color:"var(--text-muted)",textTransform:"uppercase",marginBottom:6 }}>
          {DAY} · {DATE} · Week 11/17
        </div>
        <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, letterSpacing:-1 }}>
          Good morning, {athlete.name}.
        </h1>
      </div>

      {/* PMC Stats Row */}
      <div className="grid-4" style={{ marginBottom:20 }}>
        {[
          { label:"Fitness", value:athlete.ctl, sub:"CTL · 42d avg", color:"#fff" },
          { label:"Fatigue", value:athlete.atl, sub:"ATL · 7d avg", color:"var(--red)" },
          { label:"Form", value:athlete.tsb, sub:tsbLabel, color:tsbColor },
          { label:"Week TSS", value:athlete.weekTSS, sub:"vs 280 planned", color:"var(--yellow)" },
        ].map(m => (
          <div className="card" key={m.label} style={{ cursor:"pointer" }} onClick={() => onNavigate("progress")}>
            <div className="metric-label">{m.label}</div>
            <div className="metric-value" style={{ color:m.color, fontSize:40 }}>{m.value}</div>
            <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:6 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom:20, gap:20 }}>
        {/* Today's workout */}
        <div>
          <div className="section-eyebrow">Today's Workout</div>
          {todayWorkout ? (
            <div className="card-yellow" style={{ cursor:"pointer" }} onClick={() => onNavigate("workout")}>
              <div style={{ fontSize:11,fontWeight:800,letterSpacing:1.5,opacity:0.6,textTransform:"uppercase",marginBottom:6 }}>
                VO₂MAX INTERVALS
              </div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, lineHeight:1.1, marginBottom:8 }}>
                {todayWorkout.name}
              </div>
              <div style={{ fontSize:14, opacity:0.7, marginBottom:16 }}>{todayWorkout.sub}</div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", gap:8 }}>
                  <span style={{ background:"rgba(0,0,0,0.12)", borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:700 }}>
                    Z4 · 163–170 BPM
                  </span>
                  <span style={{ background:"rgba(0,0,0,0.12)", borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:700 }}>
                    TSS {todayWorkout.tss}
                  </span>
                </div>
                <button className="btn btn-ghost" style={{ background:"rgba(0,0,0,0.15)", border:"none", color:"#000", fontWeight:700 }}
                  onClick={e => { e.stopPropagation(); onNavigate("workout"); }}>
                  Start →
                </button>
              </div>
            </div>
          ) : (
            <div className="card" style={{ textAlign:"center", padding:32 }}>
              <div style={{ fontSize:32, marginBottom:12 }}>🎉</div>
              <div style={{ fontWeight:700, marginBottom:8 }}>Rest day</div>
              <div style={{ fontSize:13, color:"var(--text-muted)" }}>Recovery is part of training.</div>
            </div>
          )}

          {/* AI Bubble */}
          <div className="ai-bubble" style={{ marginTop:12 }} onClick={() => onNavigate("coach")}>
            <div className="ai-dot">AI</div>
            <div>
              <div style={{ fontSize:13, color:"#fff", fontWeight:600, marginBottom:4 }}>You're recovered.</div>
              <div style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.5 }}>
                Form is {athlete.tsb}, normal after a hard week. Hold 4:00 — don't chase 3:55. Ask me anything about today's session.
              </div>
            </div>
          </div>
        </div>

        {/* Week overview */}
        <div>
          <div className="section-eyebrow">This Week</div>
          <div className="card" style={{ padding:0, overflow:"hidden" }}>
            {WEEK_PLAN.map((d, i) => {
              const zoneColor = d.zone ? ZONE_COLORS[d.zone] : "#333";
              return (
                <div key={i} onClick={() => !d.rest && onNavigate("workout")}
                  style={{
                    display:"flex", alignItems:"center", gap:14, padding:"13px 16px",
                    borderBottom: i < WEEK_PLAN.length-1 ? "1px solid var(--border)" : "none",
                    cursor: d.rest ? "default" : "pointer",
                    background: d.today ? "rgba(255,230,0,0.04)" : "transparent",
                    transition:"background 0.15s"
                  }}>
                  <div style={{ width:3, height:36, background:d.rest?"#222":zoneColor, borderRadius:2, flexShrink:0 }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:10, color:"var(--text-muted)", fontWeight:700, textTransform:"uppercase", marginBottom:2 }}>
                      {d.day} {d.date} {d.today && "· TODAY"}
                    </div>
                    <div style={{ fontSize:14, fontWeight:600, color: d.rest?"var(--text-muted)":"#fff" }}>{d.name}</div>
                    {!d.rest && <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{d.sub}</div>}
                  </div>
                  <div style={{ flexShrink:0, textAlign:"right" }}>
                    {d.done && <div style={{ color:"var(--green)", fontSize:14, fontWeight:700 }}>✓</div>}
                    {!d.done && !d.rest && d.tss && <div style={{ fontSize:12, color:"var(--text-muted)", fontFamily:"'JetBrains Mono',monospace" }}>{d.tss}</div>}
                    {d.busy && <div style={{ fontSize:10, color:"var(--red)", fontWeight:700 }}>BUSY</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="section-eyebrow">Recent Activity</div>
      <div className="card" style={{ padding:0, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", padding:"10px 16px", borderBottom:"1px solid var(--border)" }}>
          {["Session","Date","Duration","RPE","TSS"].map(h => (
            <div key={h} style={{ fontSize:10, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:1 }}>{h}</div>
          ))}
        </div>
        {[
          { name:"Recovery run", date:"Thu May 14", time:"30 min", rpe:4, tss:22 },
          { name:"Threshold intervals", date:"Tue May 13", time:"62 min", rpe:8, tss:86 },
          { name:"Easy run", date:"Mon May 12", time:"35 min", rpe:3, tss:28 },
        ].map((s,i) => (
          <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", padding:"13px 16px", borderBottom: i<2?"1px solid var(--border)":"none", alignItems:"center" }}>
            <div style={{ fontSize:14, fontWeight:600 }}>{s.name}</div>
            <div style={{ fontSize:12, color:"var(--text-muted)" }}>{s.date}</div>
            <div style={{ fontSize:12, fontFamily:"'JetBrains Mono',monospace", color:"#ccc" }}>{s.time}</div>
            <div style={{ fontSize:12, color:"var(--yellow)", fontWeight:600 }}>{s.rpe}/10</div>
            <div style={{ fontSize:12, fontFamily:"'JetBrains Mono',monospace", color:"#ccc" }}>{s.tss}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
