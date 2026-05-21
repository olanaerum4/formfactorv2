"use client";
import { useState } from "react";

interface Props {
  onNavigate: (s: string) => void;
}

const FEEL_OPTIONS = [
  { emoji: "😔", label: "Rough" },
  { emoji: "😐", label: "OK" },
  { emoji: "😊", label: "Good" },
  { emoji: "🔥", label: "Crushed" },
];

export default function LogSessionScreen({ onNavigate }: Props) {
  const [rpe, setRpe] = useState(8);
  const [feel, setFeel] = useState("Good");
  const [duration, setDuration] = useState(68);
  const [notes, setNotes] = useState("Legs heavy on rep 1 then clicked. Wind in last 200m of each.");
  const [saved, setSaved] = useState(false);

  const tss = Math.round(rpe * duration * 0.15);
  const rpeLabel = rpe <= 3 ? "easy, conversational" : rpe <= 5 ? "moderate, comfortable" : rpe <= 7 ? "hard, can speak in short sentences" : rpe <= 9 ? "hard, sustainable for the workout" : "maximal effort";

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => onNavigate("log"), 1200);
  };

  if (saved) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16 }}>
        <div style={{ fontSize: 56 }}>✅</div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Session logged!</div>
        <div style={{ fontSize: 14, color: "var(--text-muted)" }}>+{tss} TSS · ATL → {72}</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        background: "var(--surface)", borderBottom: "1px solid var(--border)",
        padding: "14px 16px", display: "flex", justifyContent: "space-between",
        alignItems: "center", flexShrink: 0
      }}>
        <button
          onClick={() => onNavigate("workout")}
          style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}
        >Cancel</button>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: .5 }}>LOG SESSION</div>
        <button
          onClick={handleSave}
          style={{ background: "none", border: "none", color: "var(--yellow)", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 700 }}
        >Save</button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflow: "hidden auto", padding: 16 }}>
        {/* Workout title */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "var(--yellow)", textTransform: "uppercase", marginBottom: 4 }}>
            VO₂MAX INTERVALS · TODAY
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 2 }}>5 × 800m @ 4:00/km</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
            PLANNED · 65 MIN · TSS 78
          </div>
        </div>

        {/* Duration */}
        <div style={{ background: "var(--card)", borderRadius: 14, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 12 }}>
            Actual Duration
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input
              type="range" min={20} max={120} value={duration} step={1}
              onChange={e => setDuration(Number(e.target.value))}
              style={{ flex: 1, accentColor: "var(--yellow)" }}
            />
            <div style={{ fontSize: 32, fontWeight: 800, minWidth: 80, textAlign: "right" }}>
              {duration}<span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 400 }}> min</span>
            </div>
          </div>
        </div>

        {/* RPE */}
        <div style={{ background: "var(--card)", borderRadius: 14, padding: 16, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "var(--text-muted)", textTransform: "uppercase" }}>
              RPE · Perceived Effort
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--yellow)" }}>
              {rpe} <span style={{ fontSize: 14, color: "var(--text-muted)" }}>/ 10</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <button key={n} className={`rpe-btn ${rpe >= n ? "active" : ""}`} onClick={() => setRpe(n)}>
                {n}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 8 }}>
            {rpe} = {rpeLabel}
          </div>
        </div>

        {/* Feel */}
        <div style={{ background: "var(--card)", borderRadius: 14, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 12 }}>
            How did it feel
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {FEEL_OPTIONS.map(f => (
              <button key={f.label} className={`feel-btn ${feel === f.label ? "active" : ""}`} onClick={() => setFeel(f.label)}>
                <div style={{ fontSize: 22 }}>{f.emoji}</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 4, fontWeight: 600 }}>{f.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div style={{ background: "var(--card)", borderRadius: 14, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 10 }}>
            Notes
          </div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="How did it go?"
            style={{
              background: "transparent", border: "none", color: "#ccc",
              fontFamily: "inherit", fontSize: 14, width: "100%", resize: "none",
              height: 64, outline: "none", lineHeight: 1.5
            }}
          />
        </div>

        {/* TSS preview */}
        <div style={{
          background: "#1f2000", border: "1px solid var(--yellow)", borderRadius: 12,
          padding: "12px 14px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "var(--yellow)"
        }}>
          +{tss} TSS from RPE×duration. ATL → {68 + Math.round(tss * 0.06)}.
        </div>
      </div>
    </div>
  );
}
