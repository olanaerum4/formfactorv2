"use client";
import { useState, useEffect } from "react";
import { RECENT_LOG } from "../store";

interface Props {
  onNavigate: (s: string) => void;
}

export default function LogScreen({ onNavigate }: Props) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    import("@/lib/athlete").then(({ getSessions }) => {
      getSessions(20).then(data => {
        setSessions(data);
        setLoaded(true);
      });
    });
  }, []);

  const displayLog = loaded && sessions.length > 0
    ? sessions.map(s => ({
        date: new Date(s.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).toUpperCase(),
        name: s.name,
        time: `${s.duration_min} min`,
        rpe: s.rpe,
        feel: s.feel,
        tss: s.tss,
        notes: s.notes,
      }))
    : RECENT_LOG;

  return (
    <div className="screen">
      <div style={{ padding: "20px 16px 12px" }}>
        <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 16 }}>Log</div>
        <button className="btn-yellow" onClick={() => onNavigate("logsession")}>
          + Log today's session
        </button>
      </div>

      <div className="section-label" style={{ marginTop: 8 }}>RECENT SESSIONS</div>
      {displayLog.map((l, i) => (
        <div key={i} className="card-sm" style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8, cursor: "pointer" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700, marginBottom: 4, letterSpacing: .5 }}>{l.date}</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{l.name}</div>
            <div style={{ fontSize: 12, color: "#666" }}>
              {l.time} · RPE {l.rpe} · TSS {l.tss}
            </div>
            {l.notes && (
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, fontStyle: "italic" }}>
                "{l.notes}"
              </div>
            )}
          </div>
          <div style={{ fontSize: 26 }}>{l.feel}</div>
        </div>
      ))}

      {/* Weekly summary */}
      <div className="section-label" style={{ marginTop: 8 }}>THIS WEEK</div>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          {[
            { label: "Sessions", value: "4/5" },
            { label: "Total TSS", value: "218" },
            { label: "Avg Feel", value: "😊" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="metric-label">{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          {["MON","TUE","WED","THU","FRI","SAT","SUN"].map((d, i) => {
            const done = i < 3;
            const today = i === 3;
            return (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{
                  height: 32, borderRadius: 6,
                  background: done ? "var(--yellow)" : today ? "var(--card-hover)" : "var(--border)",
                  border: today ? "1px solid var(--yellow)" : "none",
                  marginBottom: 4
                }} />
                <div style={{ fontSize: 9, color: done ? "var(--yellow)" : "var(--text-muted)", fontWeight: 700 }}>{d.slice(0,1)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
