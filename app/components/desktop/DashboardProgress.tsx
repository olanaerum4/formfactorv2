"use client";
import { type AthleteData } from "@/lib/useAthlete";

interface Props { athlete: AthleteData; onNavigate: (s: string) => void; }

const WEEKLY = [
  { w:"W4", tss:180 },{ w:"W5", tss:220 },{ w:"W6", tss:200 },
  { w:"W7", tss:260 },{ w:"W8", tss:290 },{ w:"W9", tss:240 },
  { w:"W10", tss:310 },{ w:"W11", tss:362 },
];
const maxTSS = Math.max(...WEEKLY.map(w => w.tss));

const PMC_DATA = [
  { d:"W4", ctl:34,atl:40,tsb:-6 },{ d:"W5", ctl:38,atl:48,tsb:-10 },
  { d:"W6", ctl:40,atl:38,tsb:2 },{ d:"W7", ctl:43,atl:52,tsb:-9 },
  { d:"W8", ctl:46,atl:58,tsb:-12 },{ d:"W9", ctl:48,atl:44,tsb:4 },
  { d:"W10", ctl:50,atl:60,tsb:-10 },{ d:"W11", ctl:52,atl:68,tsb:-16 },
];

export default function DashboardProgress({ athlete, onNavigate }: Props) {
  const tsbColor = athlete.tsb > 5 ? "var(--green)" : athlete.tsb > -10 ? "var(--yellow)" : athlete.tsb > -25 ? "var(--orange)" : "var(--red)";
  const tsbLabel = athlete.tsb > 5 ? "Fresh" : athlete.tsb > -10 ? "Productive" : athlete.tsb > -25 ? "Overreaching" : "Overtrained";

  return (
    <div>
      {/* Top metrics */}
      <div className="grid-4" style={{ marginBottom:20 }}>
        {[
          { label:"Fitness (CTL)", value:athlete.ctl, delta:"+18", color:"#fff", sub:"42-day EMA" },
          { label:"Fatigue (ATL)", value:athlete.atl, delta:"+22", color:"var(--red)", sub:"7-day EMA" },
          { label:"Form (TSB)", value:athlete.tsb, delta:"", color:tsbColor, sub:tsbLabel },
          { label:"5K PR", value:athlete.pr5k, delta:"−47s", color:"var(--yellow)", sub:"VDOT " + athlete.vdot },
        ].map(m => (
          <div className="card" key={m.label}>
            <div className="metric-label">{m.label}</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:4 }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:36, fontWeight:800, color:m.color, lineHeight:1 }}>{m.value}</div>
              {m.delta && <div style={{ fontSize:13, color:"var(--green)", fontWeight:600 }}>{m.delta}</div>}
            </div>
            <div style={{ fontSize:12, color:"var(--text-muted)" }}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ gap:20, marginBottom:20 }}>
        {/* Weekly TSS chart */}
        <div className="card">
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
            <div>
              <div className="metric-label">Weekly TSS Load</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800 }}>Last 8 weeks</div>
            </div>
            <div className="badge badge-yellow">Build phase</div>
          </div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:100 }}>
            {WEEKLY.map((w,i) => (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div style={{
                  width:"100%", background: i===WEEKLY.length-1 ? "var(--yellow)" : "#2a2a2a",
                  borderRadius:"4px 4px 0 0",
                  height: `${(w.tss/maxTSS)*100}%`,
                  transition:"height 0.3s", minHeight:4
                }} />
                <div style={{ fontSize:10, color:"var(--text-muted)", fontWeight:600 }}>{w.w}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:16, paddingTop:16, borderTop:"1px solid var(--border)" }}>
            <div style={{ fontSize:12, color:"var(--text-muted)" }}>8-week avg: <span style={{ color:"#fff", fontWeight:600 }}>258 TSS</span></div>
            <div style={{ fontSize:12, color:"var(--text-muted)" }}>This week: <span style={{ color:"var(--yellow)", fontWeight:600 }}>362 TSS</span></div>
          </div>
        </div>

        {/* PMC chart (SVG) */}
        <div className="card">
          <div style={{ marginBottom:16 }}>
            <div className="metric-label">Performance Management</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800 }}>CTL / ATL / TSB</div>
          </div>
          <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none" style={{ display:"block", marginBottom:12 }}>
            {/* CTL */}
            <polyline
              points={PMC_DATA.map((d,i) => `${i*57},${100-(d.ctl/70)*90}`).join(" ")}
              fill="none" stroke="#fff" strokeWidth="2" opacity="0.8"
            />
            {/* ATL */}
            <polyline
              points={PMC_DATA.map((d,i) => `${i*57},${100-(d.atl/70)*90}`).join(" ")}
              fill="none" stroke="var(--red)" strokeWidth="2" opacity="0.7"
            />
            {/* TSB */}
            <polyline
              points={PMC_DATA.map((d,i) => `${i*57},${50-(d.tsb/30)*30}`).join(" ")}
              fill="none" stroke="#FFE600" strokeWidth="2" opacity="0.9" strokeDasharray="4 2"
            />
          </svg>
          <div style={{ display:"flex", gap:20, fontSize:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}><div style={{width:16,height:2,background:"#fff"}}/>CTL</div>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}><div style={{width:16,height:2,background:"var(--red)"}}/>ATL</div>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}><div style={{width:16,height:2,background:"var(--yellow)"}}/>TSB</div>
          </div>
        </div>
      </div>

      {/* Recent PRs / milestones */}
      <div className="section-eyebrow">Milestones</div>
      <div className="card" style={{ padding:0, overflow:"hidden" }}>
        {[
          { label:"New 5K PR", value:athlete.pr5k, delta:"−47s vs March", color:"var(--yellow)" },
          { label:"VDOT", value:String(athlete.vdot), delta:"+2 from base", color:"var(--green)" },
          { label:"Current streak", value:`${athlete.streak} weeks`, delta:"Personal best", color:"var(--yellow)" },
          { label:"Plan progress", value:"11/17 weeks", delta:"65% complete", color:"var(--blue)" },
        ].map((m,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", borderBottom:i<3?"1px solid var(--border)":"none" }}>
            <div style={{ fontSize:14, color:"var(--text-muted)" }}>{m.label}</div>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ fontSize:14, color:"var(--text-muted)" }}>{m.delta}</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:m.color }}>{m.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
