"use client";
import { WEEK_PLAN, ZONE_COLORS, USER } from "../store";

interface Props {
  onNavigate: (s: string) => void;
}

export default function PlanScreen({ onNavigate }: Props) {
  return (
    <div className="screen">
      {/* Header */}
      <div style={{ padding: "20px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: 1.5, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>
            WEEK 11 / 17 · 5K BUILD
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.1 }}>May 12–18</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
          <button
            onClick={() => onNavigate("library")}
            style={{ background: "var(--card)", border: "1px solid var(--border)", color: "#888", borderRadius: 10, padding: "6px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}
          >
            Library
          </button>
          <div style={{ display: "flex", gap: 4 }}>
            <button style={{ background: "var(--card)", border: "none", color: "#555", borderRadius: 8, width: 28, height: 28, cursor: "pointer" }}>‹</button>
            <button style={{ background: "var(--card)", border: "none", color: "#555", borderRadius: 8, width: 28, height: 28, cursor: "pointer" }}>›</button>
          </div>
        </div>
      </div>

      {/* Week TSS bar */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div className="metric-label">Week TSS</div>
            <div style={{ fontSize: 30, fontWeight: 800 }}>{USER.weekTSS}</div>
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "right", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.6 }}>
            80 → 362 RAMP<br />BUILD WEEK
          </div>
        </div>
        <div style={{ display: "flex", gap: 3, height: 10 }}>
          {WEEK_PLAN.map((d, i) => {
            const col = d.done ? "#FFE600" : d.today ? "#FF6B6B" : d.rest ? "#222" : "#2a2a2a";
            return (
              <div key={i} style={{ flex: Math.max(d.tss || 8, 8), height: 10, background: col, borderRadius: 3 }} />
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
          {WEEK_PLAN.map((d, i) => (
            <div key={i} style={{ flex: Math.max(d.tss || 8, 8), fontSize: 9, color: "var(--text-muted)", fontWeight: 700, textAlign: "center" }}>
              {d.day.slice(0,1)}
            </div>
          ))}
        </div>
      </div>

      {/* Day rows */}
      {WEEK_PLAN.map((d, i) => {
        const zoneColor = d.zone ? ZONE_COLORS[d.zone] : "#333";

        if (d.rest) {
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
              border: "1px solid var(--border-light)", borderRadius: 12,
              margin: "0 16px 8px", background: "#0f0f0f", opacity: .45
            }}>
              <div style={{ width: 3, height: 36, background: "#333", borderRadius: 2 }} />
              <div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>{d.day} {d.date}</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{d.name}</div>
              </div>
            </div>
          );
        }

        return (
          <div key={i} className={`plan-row ${d.today ? "today-row" : ""}`} onClick={() => onNavigate("workout")}>
            <div style={{ width: 3, height: 44, background: zoneColor, borderRadius: 2, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>
                {d.day} {d.date}
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 2 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: "#666", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {d.sub}{d.tss ? ` · TSS ${d.tss}` : ""}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
              {d.done && <span style={{ color: "var(--green)", fontSize: 16 }}>✓</span>}
              {d.busy && <span style={{ color: "var(--red)", fontSize: 11, fontWeight: 700, letterSpacing: .5 }}>BUSY</span>}
            </div>
          </div>
        );
      })}

      {/* Bottom padding */}
      <div style={{ height: 8 }} />
    </div>
  );
}
