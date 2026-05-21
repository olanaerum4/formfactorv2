"use client";

interface Props { onNavigate: (s: string) => void; }

const INTERVALS = [
  { n:"1", dist:"800m", time:"3:12", pace:"4:00/km", hr:162, rest:false },
  { n:"R", dist:"2 min", time:"2:00", pace:"Z2 float", hr:138, rest:true },
  { n:"2", dist:"800m", time:"3:11", pace:"4:00/km", hr:165, rest:false },
  { n:"R", dist:"2 min", time:"2:00", pace:"Z2 float", hr:140, rest:true },
  { n:"3", dist:"800m", time:"3:13", pace:"4:00/km", hr:167, rest:false },
  { n:"R", dist:"2 min", time:"2:00", pace:"Z2 float", hr:141, rest:true },
  { n:"4", dist:"800m", time:"3:10", pace:"4:01/km", hr:169, rest:false },
  { n:"R", dist:"2 min", time:"2:00", pace:"Z2 float", hr:143, rest:true },
  { n:"5", dist:"800m", time:"3:09", pace:"3:59/km", hr:172, rest:false },
];

export default function DashboardWorkout({ onNavigate }: Props) {
  return (
    <div>
      <button className="btn btn-ghost" style={{ marginBottom:20 }} onClick={() => onNavigate("today")}>← Back to Today</button>

      <div className="grid-2" style={{ gap:20 }}>
        {/* Left: detail */}
        <div>
          <div style={{ marginBottom:20 }}>
            <div className="section-eyebrow">VO₂MAX INTERVALS · Session 11/68</div>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:36, fontWeight:800, letterSpacing:-1, lineHeight:1.1, marginBottom:12 }}>
              5 × 800m<br />at 4:00/km
            </h1>
          </div>

          {/* Meta */}
          <div className="grid-3" style={{ gap:12, marginBottom:20 }}>
            {[
              { label:"Duration", value:"65", unit:"min" },
              { label:"TSS", value:"78", unit:null },
              { label:"Zone", value:"Z4", unit:"threshold", color:"var(--red)" },
            ].map(m => (
              <div className="card-sm" key={m.label}>
                <div className="metric-label">{m.label}</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color:m.color||"#fff" }}>
                  {m.value}
                  {m.unit && <span style={{ fontSize:13, fontWeight:400, color:"var(--text-muted)", marginLeft:4 }}>{m.unit}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Interval table */}
          <div className="card" style={{ padding:0, overflow:"hidden", marginBottom:16 }}>
            <div style={{ display:"grid", gridTemplateColumns:".4fr 1fr 1fr 1.2fr .8fr", padding:"10px 16px", borderBottom:"1px solid var(--border)" }}>
              {["#","DIST","TIME","PACE","HR"].map(h => (
                <div key={h} style={{ fontSize:10, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:1 }}>{h}</div>
              ))}
            </div>
            {INTERVALS.map((r,i) => (
              <div key={i} style={{
                display:"grid", gridTemplateColumns:".4fr 1fr 1fr 1.2fr .8fr",
                padding:"11px 16px",
                borderBottom: i<INTERVALS.length-1 ? "1px solid var(--border)" : "none",
                background: r.rest ? "transparent" : "rgba(255,230,0,0.02)"
              }}>
                <div style={{ fontSize:13, fontWeight:700, color:r.rest?"var(--text-muted)":"var(--yellow)" }}>{r.n}</div>
                <div style={{ fontSize:13, color:r.rest?"var(--text-muted)":"#ccc" }}>{r.dist}</div>
                <div style={{ fontSize:13, color:r.rest?"var(--text-muted)":"#ccc", fontFamily:"'JetBrains Mono',monospace" }}>{r.time}</div>
                <div style={{ fontSize:13, color:r.rest?"var(--text-muted)":"#ccc", fontFamily:"'JetBrains Mono',monospace" }}>{r.pace}</div>
                <div style={{ fontSize:13, color:r.rest?"var(--text-muted)":"#ccc" }}>{r.hr}</div>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", gap:10 }}>
            <button className="btn btn-ghost btn-lg" style={{ flex:1 }}>Send to watch</button>
            <button className="btn btn-yellow btn-lg" style={{ flex:2 }} onClick={() => onNavigate("logsession")}>Log this session</button>
          </div>
        </div>

        {/* Right: context */}
        <div>
          {/* Why this pace */}
          <div className="card" style={{ marginBottom:16, background:"rgba(61,219,129,0.05)", border:"1px solid rgba(61,219,129,0.15)" }}>
            <div style={{ fontWeight:700, color:"var(--green)", marginBottom:8 }}>Why 4:00/km?</div>
            <div style={{ fontSize:14, color:"#aaa", lineHeight:1.6 }}>
              Derived from your 5K PR of 21:14. VDOT 47 → vVO₂max = 4:00/km. This is the optimal pace for maximum aerobic adaptation without exceeding your ability to recover.
            </div>
          </div>

          {/* Warmup */}
          <div className="card" style={{ marginBottom:16 }}>
            <div className="metric-label" style={{ marginBottom:10 }}>Warmup Protocol</div>
            <div style={{ fontSize:14, color:"#aaa", lineHeight:1.8 }}>
              <div>1. 10 min easy @ Z1 (&lt;5:30/km)</div>
              <div>2. 4 × 20s strides with full recovery</div>
              <div>3. 5 min Z2 float before rep 1</div>
            </div>
          </div>

          {/* Cool down */}
          <div className="card" style={{ marginBottom:16 }}>
            <div className="metric-label" style={{ marginBottom:10 }}>Cool Down</div>
            <div style={{ fontSize:14, color:"#aaa", lineHeight:1.8 }}>
              <div>1. 10 min easy jog @ Z1</div>
              <div>2. Dynamic stretching (hip flexors, calves)</div>
            </div>
          </div>

          {/* HR zones breakdown */}
          <div className="card">
            <div className="metric-label" style={{ marginBottom:12 }}>Target HR Range</div>
            {[
              { label:"Intervals", range:"163–172 bpm", zone:"Z4/Z5", color:"var(--red)" },
              { label:"Float recoveries", range:"138–145 bpm", zone:"Z2", color:"var(--blue)" },
              { label:"Warmup/Cooldown", range:"<140 bpm", zone:"Z1", color:"var(--green)" },
            ].map(z => (
              <div key={z.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:"1px solid var(--border)" }}>
                <div style={{ fontSize:13, color:"var(--text-muted)" }}>{z.label}</div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:13, fontWeight:600, color:z.color, fontFamily:"'JetBrains Mono',monospace" }}>{z.range}</div>
                  <div style={{ fontSize:10, color:"var(--text-muted)" }}>{z.zone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
