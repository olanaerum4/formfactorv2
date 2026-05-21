"use client";

interface Props {
  onNavigate: (s: string) => void;
}

const INTERVALS = [
  { n: "1", dist: "800m", time: "3:12", pace: "4:00/km", hr: 162, rest: false },
  { n: "R", dist: "2 min", time: "2:00", pace: "Z2 float", hr: 138, rest: true },
  { n: "2", dist: "800m", time: "3:11", pace: "4:00/km", hr: 165, rest: false },
  { n: "R", dist: "2 min", time: "2:00", pace: "Z2 float", hr: 140, rest: true },
  { n: "3", dist: "800m", time: "3:13", pace: "4:00/km", hr: 167, rest: false },
];

export default function WorkoutScreen({ onNavigate }: Props) {
  return (
    <div className="screen">
      <div style={{ padding: "16px" }}>
        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <button
            onClick={() => onNavigate("today")}
            style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontFamily: "inherit", fontSize: 14, padding: 0 }}
          >
            ← Today
          </button>
          <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>SESSION 11/68</div>
        </div>

        {/* Title */}
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: "var(--yellow)", textTransform: "uppercase", marginBottom: 4 }}>
          VO₂MAX INTERVALS
        </div>
        <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>
          5 × 800m<br />at 4:00 /km
        </div>

        {/* Meta */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Time", value: "65", unit: "min" },
            { label: "TSS", value: "78", unit: null },
            { label: "Zone", value: "Z4", unit: "thr", color: "#FF6B6B" },
          ].map((m, i) => (
            <div key={i} style={{ flex: 1, background: "var(--card)", borderRadius: 12, padding: "12px 10px" }}>
              <div className="metric-label">{m.label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: m.color || "#fff" }}>
                {m.value}
                {m.unit && <span style={{ fontSize: 13, fontWeight: 400, color: "var(--text-muted)", marginLeft: 2 }}>{m.unit}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Interval table */}
        <div style={{ background: "var(--card)", borderRadius: 14, overflow: "hidden", marginBottom: 14 }}>
          <div style={{ display: "flex", padding: "10px 14px", borderBottom: "1px solid var(--border-light)" }}>
            {["#", "DIST", "TIME", "PACE", "HR"].map((h, i) => (
              <div key={i} style={{ flex: [.4,1,1,1.2,.8][i], fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textAlign: i===4?"right":"left" }}>
                {h}
              </div>
            ))}
          </div>
          {INTERVALS.map((r, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", padding: "11px 14px",
              borderBottom: i < INTERVALS.length - 1 ? "1px solid var(--border-light)" : "none"
            }}>
              <div style={{ flex: .4, fontSize: 13, fontWeight: 700, color: r.rest ? "#555" : "var(--yellow)" }}>{r.n}</div>
              <div style={{ flex: 1, fontSize: 13, color: r.rest ? "#555" : "#ccc" }}>{r.dist}</div>
              <div style={{ flex: 1, fontSize: 13, color: r.rest ? "#555" : "#ccc", fontFamily: "'JetBrains Mono', monospace" }}>{r.time}</div>
              <div style={{ flex: 1.2, fontSize: 13, color: r.rest ? "#555" : "#ccc", fontFamily: "'JetBrains Mono', monospace" }}>{r.pace}</div>
              <div style={{ flex: .8, fontSize: 13, color: r.rest ? "#555" : "#ccc", textAlign: "right" }}>{r.hr}</div>
            </div>
          ))}
          <div style={{ textAlign: "center", padding: "10px", fontSize: 12, color: "var(--text-muted)" }}>
            + 2 more intervals
          </div>
        </div>

        {/* Why this pace */}
        <div style={{
          background: "#0d1a0d", border: "1px solid #1f3a1f", borderRadius: 12,
          padding: "12px 14px", marginBottom: 20
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6 }}>
            WHY 4:00/km
          </div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>
            Derived from your 5K of 21:14. VDOT 47 → vVO₂max pace = 4:00/km.
          </div>
        </div>

        {/* Warmup */}
        <div style={{ background: "var(--card)", borderRadius: 12, padding: "12px 14px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>
            WARMUP
          </div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>
            10 min easy @ Z1 → 4× 20s strides → 5 min Z2 float before first interval.
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-ghost" style={{ flex: 1 }}>
            Send to watch
          </button>
          <button
            className="btn-yellow"
            style={{ flex: 2, margin: 0 }}
            onClick={() => onNavigate("logsession")}
          >
            Start now
          </button>
        </div>
      </div>
    </div>
  );
}
