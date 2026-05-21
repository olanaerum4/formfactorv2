"use client";
import { ZONES } from "../store";
import { type AthleteData } from "@/lib/useAthlete";

interface Props {
  athlete: AthleteData;
  proMode: boolean;
  setProMode: (v: boolean) => void;
  onNavigate: (s: string) => void;
}

export default function ProfileScreen({ athlete, proMode, setProMode, onNavigate }: Props) {
  return (
    <div className="screen">
      <div style={{ padding: "24px 16px 16px" }}>
        {/* Avatar + info */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "var(--card)", border: "2px solid var(--yellow)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, fontWeight: 800
          }}>A</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{athlete.name}</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{athlete.goal}</div>
          </div>
        </div>

        {/* Mode toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Mode</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
              {proMode ? "Full metrics, zones, TSS" : "Simple, no jargon"}
            </div>
          </div>
          <div style={{ display: "flex", background: "var(--card)", borderRadius: 12, padding: 3, gap: 2 }}>
            <button
              onClick={() => setProMode(false)}
              style={{
                padding: "7px 16px", borderRadius: 10, border: "none", fontFamily: "inherit",
                fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .2s",
                background: !proMode ? "#fff" : "transparent",
                color: !proMode ? "#000" : "#666"
              }}
            >Simple</button>
            <button
              onClick={() => setProMode(true)}
              style={{
                padding: "7px 16px", borderRadius: 10, border: "none", fontFamily: "inherit",
                fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .2s",
                background: proMode ? "var(--yellow)" : "transparent",
                color: proMode ? "#000" : "#666"
              }}
            >Pro</button>
          </div>
        </div>
      </div>

      {/* Zones */}
      <div className="section-label">YOUR ZONES</div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>
          Running · VDOT {athlete.vdot}
        </div>
        {ZONES.map((z, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
            borderBottom: i < ZONES.length - 1 ? "1px solid var(--border-light)" : "none"
          }}>
            <div style={{ width: 3, height: 32, background: z.color, borderRadius: 2, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{z.z}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace", marginTop: 1 }}>
                {z.pace} · {z.bpm} bpm
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats grid */}
      <div className="section-label">STATS</div>
      <div style={{ display: "flex", gap: 10, padding: "0 16px", marginBottom: 12 }}>
        {[
          { label: "5K PR", value: athlete.pr5k },
          { label: "Streak", value: `${athlete.streak}🔥` },
          { label: "Weeks", value: "11/17" },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, background: "var(--card)", borderRadius: 12, padding: 12 }}>
            <div className="metric-label">{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Connections */}
      <div className="section-label">CONNECTIONS</div>
      <div className="card-sm" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "#fc4c02", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>S</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Strava</div>
          <div style={{ fontSize: 12, color: "var(--green)" }}>Connected · syncing</div>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>✓</div>
      </div>
      <div className="card-sm" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, opacity: .5 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "#0099d6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>G</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Garmin</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Not connected</div>
        </div>
        <div style={{ fontSize: 12, color: "var(--yellow)", fontWeight: 700 }}>Connect</div>
      </div>

      {/* Actions */}
      <div style={{ padding: "8px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        <button className="btn-ghost" onClick={() => onNavigate("onboard")} style={{ width: "100%" }}>
          ↺ Restart onboarding
        </button>
        <button style={{
          background: "transparent", color: "var(--text-muted)", border: "none",
          fontFamily: "inherit", fontSize: 14, cursor: "pointer", padding: "8px 0"
        }}>
          Sign out
        </button>
      </div>
    </div>
  );
}
