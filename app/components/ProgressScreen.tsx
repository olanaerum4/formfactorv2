"use client";
import { type AthleteData } from "@/lib/useAthlete";

interface Props {
  athlete: AthleteData;
  onNavigate: (s: string) => void;
}

export default function ProgressScreen({ athlete, onNavigate }: Props) {
  const weeklyTSS = [180, 220, 200, 260, 290, 240, 310, 362];
  const weekLabels = ["W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11"];
  const maxTSS = Math.max(...weeklyTSS);

  return (
    <div className="screen">
      <div style={{ padding: "20px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 30, fontWeight: 800 }}>Progress</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>60 D</div>
      </div>

      {/* TSB / Form card */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <div className="metric-label">Form · TSB</div>
            <div style={{ fontSize: 52, fontWeight: 800, color: "var(--yellow)", lineHeight: 1 }}>{athlete.tsb}</div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 6, lineHeight: 1.5 }}>
              Loaded but recoverable.<br />Below −25 = risk zone.
            </div>
          </div>
          <div style={{ background: "#1f2000", color: "var(--yellow)", border: "1px solid var(--yellow)", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, letterSpacing: .5 }}>
            PRODUCTIVE
          </div>
        </div>
        <div style={{ height: 64, marginTop: 12 }}>
          <svg width="100%" height="64" viewBox="0 0 320 64" preserveAspectRatio="none">
            <polyline
              points="0,32 25,22 50,38 75,18 100,32 125,12 150,30 175,14 200,28 225,10 250,24 275,14 300,30 320,18"
              fill="none" stroke="#FFE600" strokeWidth="2.5" strokeLinejoin="round"
            />
            <circle cx="320" cy="18" r="4" fill="#FFE600" />
          </svg>
        </div>
      </div>

      {/* CTL / ATL card */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div className="metric-label">Fitness · CTL</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 38, fontWeight: 800 }}>{athlete.ctl}</span>
              <span style={{ color: "var(--green)", fontSize: 14, fontWeight: 700 }}>+18</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="metric-label">Fatigue · ATL</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, justifyContent: "flex-end" }}>
              <span style={{ fontSize: 38, fontWeight: 800, color: "var(--red)" }}>{athlete.atl}</span>
              <span style={{ color: "var(--red)", fontSize: 14, fontWeight: 700 }}>+22</span>
            </div>
          </div>
        </div>
        <div style={{ height: 80 }}>
          <svg width="100%" height="80" viewBox="0 0 320 80" preserveAspectRatio="none">
            <polyline points="0,72 40,67 80,60 120,56 160,52 200,47 240,43 280,39 320,36"
              fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" />
            <polyline points="0,74 30,70 60,62 90,67 120,57 150,64 180,52 210,60 240,47 270,54 300,42 320,46"
              fill="none" stroke="#FF6B6B" strokeWidth="1.5" />
          </svg>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 2, background: "rgba(255,255,255,.6)", borderRadius: 1 }} />
            <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>CTL Fitness</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 2, background: "var(--red)", borderRadius: 1 }} />
            <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>ATL Fatigue</span>
          </div>
        </div>
      </div>

      {/* PR milestone */}
      <div className="card" style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 44, height: 44, background: "#2a2700", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
          ⭐
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>New 5K PR · {USER.pr5k}</div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>−47s vs March · VDOT {USER.vdot}</div>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>4 D AGO</div>
      </div>

      {/* Weekly TSS bar chart */}
      <div className="card">
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>
          Weekly TSS — Last 8 Weeks
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 64 }}>
          {weeklyTSS.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, height: "100%" }}>
              <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                <div style={{
                  width: "100%",
                  height: `${Math.round((v / maxTSS) * 100)}%`,
                  minHeight: 6,
                  background: i === 7 ? "#FFE600" : "#2a2a2a",
                  borderRadius: "4px 4px 0 0"
                }} />
              </div>
              <div style={{ fontSize: 9, color: "var(--text-muted)" }}>{weekLabels[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="section-label" style={{ marginTop: 4 }}>MILESTONES</div>
      {[
        { icon: "🏃", title: "100km this month", sub: "82km logged so far", pct: 82 },
        { icon: "🔥", title: "7-week streak", sub: "Personal best", pct: 100 },
        { icon: "📈", title: "CTL +18 in 60 days", sub: "From 34 → 52", pct: 72 },
      ].map((m, i) => (
        <div key={i} className="card-sm" style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>{m.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{m.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{m.sub}</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--yellow)" }}>{m.pct}%</div>
          </div>
          <div style={{ height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${m.pct}%`, background: "var(--yellow)", borderRadius: 2 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
