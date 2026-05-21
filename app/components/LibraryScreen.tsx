"use client";
import { useState } from "react";
import { LIBRARY } from "../store";

interface Props {
  onNavigate: (s: string) => void;
}

const CATS = ["All", "Run", "Bike", "Swim", "Brick"];

export default function LibraryScreen({ onNavigate }: Props) {
  const [cat, setCat] = useState("All");

  const filtered = cat === "All" ? LIBRARY : LIBRARY.filter(l => l.type === cat || (cat === "Swim" && l.type === "Swm") || (cat === "Brick" && l.type === "Bri"));

  return (
    <div className="screen">
      <div style={{ padding: "20px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <button
            onClick={() => onNavigate("plan")}
            style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontFamily: "inherit", fontSize: 14, padding: 0, marginBottom: 8, display: "block" }}
          >
            ← Plan
          </button>
          <div style={{ fontSize: 30, fontWeight: 800 }}>Library</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
            Targets shown are <span style={{ color: "var(--yellow)" }}>yours</span>, derived from your zones.
          </div>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace", marginTop: 36 }}>
          {LIBRARY.length} TYPES
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 6, padding: "0 16px 14px", overflowX: "auto" }}>
        {CATS.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            style={{
              padding: "8px 16px", borderRadius: 24,
              background: cat === c ? "#fff" : "var(--card)",
              color: cat === c ? "#000" : "#888",
              border: "none", fontSize: 14, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap"
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Workout list */}
      {filtered.map((l, i) => (
        <div key={i} className="lib-item" onClick={() => onNavigate("workout")}>
          <div style={{
            borderRadius: 8, padding: "5px 8px", fontSize: 11, fontWeight: 800,
            width: 44, textAlign: "center", flexShrink: 0,
            background: l.color, color: l.textColor
          }}>
            {l.type}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{l.name}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>
              {l.detail}
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{l.tss}</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 700 }}>TSS</div>
          </div>
        </div>
      ))}
    </div>
  );
}
