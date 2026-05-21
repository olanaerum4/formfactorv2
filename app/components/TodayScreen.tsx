"use client";
import { WEEK_PLAN } from "../store";
import { type AthleteData } from "@/lib/useAthlete";

interface Props {
  athlete: AthleteData;
  proMode: boolean;
  onNavigate: (s: string) => void;
}

export default function TodayScreen({ athlete, proMode, onNavigate }: Props) {
  if (proMode) {
    return (
      <div className="screen">
        {/* Header */}
        <div style={{ padding: "16px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".5px", color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase" }}>
              FRI · MAY 15 · WK 11/17
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.1 }}>
              Morning,<br />{athlete.name}.
            </div>
          </div>
          <button
            onClick={() => onNavigate("profile")}
            style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--card)", border: "none", color: "#888", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
          >
            A
          </button>
        </div>

        {/* Training Load Card */}
        <div className="card" style={{ cursor: "pointer" }} onClick={() => onNavigate("progress")}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "var(--text-muted)", textTransform: "uppercase" }}>
              Training Load · 7D
            </div>
            <div style={{ fontSize: 13, color: "var(--green)", fontFamily: "'JetBrains Mono', monospace" }}>↑ 4.2</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, paddingRight: 16, borderRight: "1px solid var(--border)" }}>
              <div className="metric-label">Fitness</div>
              <div style={{ fontSize: 26, fontWeight: 800 }}>{athlete.ctl}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>CTL</div>
            </div>
            <div style={{ flex: 1, padding: "0 16px", borderRight: "1px solid var(--border)" }}>
              <div className="metric-label">Fatigue</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "var(--red)" }}>{athlete.atl}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>ATL</div>
            </div>
            <div style={{ flex: 1, paddingLeft: 16 }}>
              <div className="metric-label">Form</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "var(--yellow)" }}>{athlete.tsb}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>TSB · Productive</div>
            </div>
          </div>
          {/* Mini sparkline */}
          <div style={{ height: 40, marginTop: 10 }}>
            <svg width="100%" height="40" viewBox="0 0 320 40" preserveAspectRatio="none">
              <polyline points="0,30 30,28 60,25 90,22 120,26 150,20 180,24 210,18 240,22 270,18 300,20 320,16"
                fill="none" stroke="#FFE600" strokeWidth="1.5" opacity=".7" />
              <polyline points="0,34 30,33 60,30 90,32 120,28 150,32 180,26 210,30 240,24 270,28 300,22 320,24"
                fill="none" stroke="#FF6B6B" strokeWidth="1.5" opacity=".7" />
              <polyline points="0,20 30,18 60,14 90,12 120,15 150,10 180,14 210,8 240,12 270,8 300,10 320,6"
                fill="none" stroke="#555" strokeWidth="1" opacity=".5" />
            </svg>
          </div>
        </div>

        {/* Today's workout */}
        <div className="section-label" style={{ marginTop: 4 }}>TODAY · 06:30</div>
        <div className="yellow-card" onClick={() => onNavigate("workout")}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#000", opacity: .65, textTransform: "uppercase", marginBottom: 4 }}>
            VO₂MAX INTERVALS
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.1, marginBottom: 4 }}>5 × 800m @ 4:00/km</div>
          <div style={{ fontSize: 13, opacity: .65, marginBottom: 14 }}>2 min Z2 float · 65 min total · TSS 78</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ background: "rgba(0,0,0,.12)", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 700 }}>
                Z4 · 158–170 BPM
              </span>
              <span style={{ background: "rgba(0,0,0,.12)", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 700 }}>
                RPE 8
              </span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800 }}>Start →</span>
          </div>
        </div>

        {/* AI Bubble */}
        <div className="ai-bubble" onClick={() => onNavigate("coach")} style={{ marginTop: 4 }}>
          <div className="ai-dot">AI</div>
          <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>
            <span style={{ color: "#fff", fontWeight: 700 }}>You're recovered.</span> Form is −16, normal after a hard week. Hold 4:00 — don't chase 3:55.
          </div>
        </div>

        {/* Up next */}
        <div className="section-label" style={{ marginTop: 16 }}>UP NEXT</div>
        <div className="card-sm" style={{ opacity: .55 }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>FRI</div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Rest day</div>
        </div>
        <div className="card-sm" style={{ opacity: .4 }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>SAT</div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Long run · 1h 40m</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>20km @ 5:00/km</div>
        </div>
      </div>
    );
  }

  // Simple mode
  return (
    <div className="screen">
      <div style={{ padding: "16px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600, letterSpacing: ".5px", marginBottom: 4 }}>FRIDAY</div>
          <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.1 }}>Good<br />morning.</div>
        </div>
        <button
          onClick={() => onNavigate("profile")}
          style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--card)", border: "none", color: "#888", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
        >
          L
        </button>
      </div>

      {/* Progress ring */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="var(--border)" strokeWidth="4" />
              <circle cx="32" cy="32" r="28" fill="none" stroke="#FFE600" strokeWidth="4"
                strokeDasharray={`${28 * 2 * Math.PI}`}
                strokeDashoffset={`${28 * 2 * Math.PI * 0.2}`}
                strokeLinecap="round" transform="rotate(-90 32 32)" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800 }}>4/5</div>
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>4 of 5 sessions done.</div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 4, lineHeight: 1.5 }}>
              One more today and you close out the week.<br />🔥 7-week streak.
            </div>
          </div>
        </div>
      </div>

      <div className="section-label">TODAY</div>
      <div className="card-sm" onClick={() => onNavigate("workout")} style={{ cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>Easy run · 35 min</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>~5 km</div>
        </div>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 14, lineHeight: 1.5 }}>
          Run at a pace where you could hold a full conversation. If you can't talk, slow down.
        </div>
        <div style={{ background: "#0d2000", borderRadius: 10, padding: "10px 12px", display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
          <div style={{ width: 3, height: 36, background: "var(--green)", borderRadius: 2, flexShrink: 0 }} />
          <div>
            <div style={{ color: "var(--green)", fontWeight: 700, fontSize: 13 }}>You're ready.</div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Your body has recovered from Wednesday's hard session.</div>
          </div>
        </div>
        <button className="btn-yellow" onClick={(e) => { e.stopPropagation(); onNavigate("workout"); }}>
          Start workout
        </button>
      </div>

      <div className="section-label" style={{ marginTop: 8 }}>UP NEXT</div>
      <div className="card-sm" style={{ opacity: .6 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>SAT</div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Long run · 1h 20m</div>
        <div style={{ fontSize: 13, color: "#666" }}>Easy. Bring water.</div>
      </div>
    </div>
  );
}
