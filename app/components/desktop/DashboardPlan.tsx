"use client";
import { WEEK_PLAN, ZONE_COLORS, LIBRARY, ZONES } from "@/app/store";

interface Props { onNavigate: (s: string) => void; }

export default function DashboardPlan({ onNavigate }: Props) {
  const done = WEEK_PLAN.filter(d => d.done).length;
  const total = WEEK_PLAN.filter(d => !d.rest).length;
  const weekTSS = WEEK_PLAN.reduce((a, d) => a + (d.tss||0), 0);

  return (
    <div>
      <div className="grid-2" style={{ gap:20, marginBottom:20 }}>
        {/* Week plan */}
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div>
              <div className="section-eyebrow">Current Week</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800 }}>May 12–18 · Week 11/17</div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button className="btn btn-ghost" style={{padding:"7px 12px",fontSize:12}}>‹ Prev</button>
              <button className="btn btn-ghost" style={{padding:"7px 12px",fontSize:12}}>Next ›</button>
            </div>
          </div>

          {/* TSS bar */}
          <div className="card" style={{ marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
              <div>
                <div className="metric-label">Week TSS</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800 }}>{weekTSS}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div className="metric-label">Completion</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:"var(--yellow)" }}>{done}/{total}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:4, height:12, marginBottom:6 }}>
              {WEEK_PLAN.map((d,i) => (
                <div key={i} style={{
                  flex: Math.max(d.tss||10,10), height:12,
                  background: d.done?"var(--yellow)": d.today?"var(--red)": d.rest?"#1a1a1a":"#2a2a2a",
                  borderRadius:3
                }} />
              ))}
            </div>
            <div style={{ display:"flex", gap:4 }}>
              {WEEK_PLAN.map((d,i) => (
                <div key={i} style={{ flex:Math.max(d.tss||10,10), fontSize:9, color:"var(--text-muted)", fontWeight:700, textAlign:"center" }}>
                  {d.day.slice(0,1)}
                </div>
              ))}
            </div>
          </div>

          {/* Day rows */}
          {WEEK_PLAN.map((d, i) => {
            const zoneColor = d.zone ? ZONE_COLORS[d.zone] : "#333";
            return (
              <div key={i} className={`plan-row${d.today?" today":""}${d.done?" done":""}`}
                onClick={() => !d.rest && onNavigate("workout")}
                style={{ cursor: d.rest?"default":"pointer" }}>
                <div style={{ width:3, height:44, background:d.rest?"#222":zoneColor, borderRadius:2, flexShrink:0 }} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:10, color:"var(--text-muted)", fontWeight:700, textTransform:"uppercase", marginBottom:3 }}>
                    {d.day} {d.date}{d.today?" · TODAY":""}
                  </div>
                  <div style={{ fontSize:16, fontWeight:700 }}>{d.name}</div>
                  {!d.rest && <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{d.sub}</div>}
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4, flexShrink:0 }}>
                  {d.done && <span style={{ color:"var(--green)", fontSize:14, fontWeight:700 }}>✓ Done</span>}
                  {!d.done && !d.rest && d.tss && <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:"var(--text-muted)" }}>TSS {d.tss}</span>}
                  {d.zone && !d.done && <span className="badge badge-yellow" style={{fontSize:10}}>{d.zone}</span>}
                  {d.busy && <span className="badge badge-red" style={{fontSize:10}}>BUSY</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column: zones + library */}
        <div>
          <div className="section-eyebrow">Your Zones</div>
          <div className="card" style={{ marginBottom:20, padding:0, overflow:"hidden" }}>
            {ZONES.map((z, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:12, padding:"13px 16px",
                borderBottom: i<ZONES.length-1?"1px solid var(--border)":"none"
              }}>
                <div style={{ width:3, height:36, background:z.color, borderRadius:2, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600 }}>{z.z}</div>
                  <div style={{ fontSize:12, color:"var(--text-muted)", fontFamily:"'JetBrains Mono',monospace", marginTop:2 }}>
                    {z.pace} · {z.bpm} bpm
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-eyebrow">Workout Library</div>
          <div className="card" style={{ padding:0, overflow:"hidden" }}>
            {LIBRARY.slice(0,5).map((l,i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:12, padding:"12px 16px",
                borderBottom: i<4?"1px solid var(--border)":"none",
                cursor:"pointer", transition:"background 0.15s"
              }} onClick={() => onNavigate("workout")}>
                <div style={{ borderRadius:6, padding:"4px 8px", fontSize:11, fontWeight:800, background:l.color, color:l.textColor, flexShrink:0, minWidth:36, textAlign:"center" }}>
                  {l.type}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600 }}>{l.name}</div>
                  <div style={{ fontSize:11, color:"var(--text-muted)", fontFamily:"'JetBrains Mono',monospace", marginTop:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{l.detail}</div>
                </div>
                <div style={{ fontSize:13, fontFamily:"'JetBrains Mono',monospace", color:"var(--text-muted)", flexShrink:0 }}>{l.tss} TSS</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
