"use client";
import { type AthleteData } from "@/lib/useAthlete";
import { ZONES } from "@/app/store";

interface Props { athlete: AthleteData; proMode: boolean; setProMode: (v:boolean) => void; onNavigate: (s:string) => void; }

export default function DashboardProfile({ athlete, proMode, setProMode, onNavigate }: Props) {
  return (
    <div>
      <div className="grid-2" style={{ gap:20 }}>
        {/* Left: user info */}
        <div>
          {/* Avatar + info */}
          <div className="card" style={{ marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20 }}>
              <div style={{ width:64, height:64, borderRadius:"50%", background:"var(--yellow-bg)", border:"2px solid var(--yellow)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, fontWeight:800, color:"var(--yellow)", flexShrink:0 }}>
                {athlete.name?.[0]||"A"}
              </div>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800 }}>{athlete.name||"Athlete"}</div>
                <div style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>{athlete.goal||"No goal set"}</div>
              </div>
            </div>
            <div className="divider" style={{ margin:"0 0 16px" }} />
            <div className="grid-2" style={{ gap:12 }}>
              {[
                { label:"5K PR", value:athlete.pr5k },
                { label:"VDOT", value:String(athlete.vdot) },
                { label:"Max HR", value:`${athlete.maxHR} bpm` },
                { label:"Plan", value:"Week 11/17" },
              ].map(s => (
                <div key={s.label}>
                  <div className="metric-label">{s.label}</div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800 }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mode toggle */}
          <div className="card" style={{ marginBottom:16 }}>
            <div style={{ fontWeight:700, fontSize:15, marginBottom:4 }}>Display Mode</div>
            <div style={{ fontSize:13, color:"var(--text-muted)", marginBottom:16 }}>
              {proMode ? "Full metrics, zones, TSS, CTL/ATL/TSB" : "Simple language, no jargon"}
            </div>
            <div style={{ display:"flex", background:"var(--bg)", borderRadius:12, padding:4, gap:4 }}>
              {[{v:false,label:"Simple"},{v:true,label:"Pro"}].map(opt => (
                <button key={opt.label} onClick={() => setProMode(opt.v)} style={{
                  flex:1, padding:"10px 0", borderRadius:9, border:"none",
                  background: proMode===opt.v ? (opt.v?"var(--yellow)":"#fff") : "transparent",
                  color: proMode===opt.v ? "#000" : "var(--text-muted)",
                  fontFamily:"inherit", fontSize:14, fontWeight:700, cursor:"pointer"
                }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connections */}
          <div className="card">
            <div style={{ fontWeight:700, fontSize:15, marginBottom:16 }}>Connections</div>
            {[
              { name:"Strava", color:"#FC4C02", status:"Connected · syncing", connected:true },
              { name:"Garmin", color:"#0099d6", status:"Not connected", connected:false },
            ].map(c => (
              <div key={c.name} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:"1px solid var(--border)", opacity:c.connected?1:0.5 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:c.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800, color:"#fff", flexShrink:0 }}>
                  {c.name[0]}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600 }}>{c.name}</div>
                  <div style={{ fontSize:12, color: c.connected?"var(--green)":"var(--text-muted)", marginTop:2 }}>{c.status}</div>
                </div>
                {!c.connected && <button className="btn btn-ghost" style={{ fontSize:12, padding:"6px 12px" }}>Connect</button>}
                {c.connected && <span style={{ fontSize:12, color:"var(--green)", fontWeight:600 }}>✓</span>}
              </div>
            ))}
            <div style={{ height:12 }} />
            <button className="btn btn-ghost" style={{ width:"100%", fontSize:13 }} onClick={() => onNavigate("onboard")}>
              ↺ Restart onboarding
            </button>
          </div>
        </div>

        {/* Right: zones */}
        <div>
          <div className="section-eyebrow">Your Training Zones</div>
          <div className="card" style={{ marginBottom:16 }}>
            <div style={{ fontSize:12, color:"var(--text-muted)", marginBottom:16 }}>
              Running · VDOT {athlete.vdot} · derived from {athlete.pr5k} 5K
            </div>
            {ZONES.map((z,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:i<ZONES.length-1?"1px solid var(--border)":"none" }}>
                <div style={{ width:3, height:40, background:z.color, borderRadius:2, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600 }}>{z.z}</div>
                  <div style={{ fontSize:12, color:"var(--text-muted)", fontFamily:"'JetBrains Mono',monospace", marginTop:2 }}>
                    {z.pace} · {z.bpm} bpm
                  </div>
                </div>
                <div style={{ width:40, height:8, borderRadius:4, background:z.color, opacity:0.4 }} />
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="section-eyebrow">Stats</div>
          <div className="grid-2" style={{ gap:12 }}>
            {[
              { label:"Streak", value:`${athlete.streak} 🔥`, sub:"weeks" },
              { label:"Sessions", value:"47", sub:"total" },
              { label:"Distance", value:"312", sub:"km this month" },
              { label:"Best week", value:"412", sub:"TSS" },
            ].map(s => (
              <div className="card-sm" key={s.label}>
                <div className="metric-label">{s.label}</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:800, marginBottom:2 }}>{s.value}</div>
                <div style={{ fontSize:11, color:"var(--text-muted)" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
