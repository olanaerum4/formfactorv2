"use client";
import { useState } from "react";

interface Props {
  onComplete: () => void;
}

const SUGGESTIONS = [
  "Finish my first half marathon",
  "Sub-3 marathon in spring",
  "2km hill in under 10 min",
  "Run 5K without walking",
];

export default function OnboardScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("Sub-20 5K by Sept 14");
  const [pr5k, setPr5k] = useState("21:14");
  const [maxHR, setMaxHR] = useState("185");
  const [days, setDays] = useState(5);

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const next = () => {
    if (step < totalSteps - 1) setStep(s => s + 1);
    else onComplete();
  };
  const back = () => setStep(s => s - 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Progress bar */}
      <div style={{ height: 2, background: "var(--border)", flexShrink: 0 }}>
        <div style={{ height: 2, background: "var(--yellow)", width: `${progress}%`, transition: "width .4s" }} />
      </div>

      {/* Header */}
      <div style={{ padding: "20px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 38, fontWeight: 900, color: "var(--yellow)" }}>F</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
          {step + 1} / {totalSteps}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden auto", padding: "24px 16px 120px" }}>

        {/* Step 0: Goal */}
        {step === 0 && (
          <div>
            <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>What are you training for?</div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24, lineHeight: 1.6 }}>
              Write it in your own words. No dropdowns. The plan bends around whatever you type.
            </div>
            <textarea
              value={goal}
              onChange={e => setGoal(e.target.value)}
              style={{
                background: "var(--card)", border: "1.5px solid var(--yellow)", borderRadius: 14,
                color: "#fff", fontFamily: "inherit", fontSize: 16, padding: 16,
                width: "100%", resize: "none", height: 130, outline: "none", marginBottom: 16
              }}
            />
            <div className="section-label">SUGGESTED</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} className="chip" onClick={() => setGoal(s)}>{s}</button>
              ))}
            </div>
            <div className="ai-bubble" style={{ marginTop: 4 }}>
              <div className="ai-dot">AI</div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>
                <span style={{ color: "#fff", fontWeight: 700 }}>I've read your goal.</span> That's 17 weeks. I'll build a VDOT-based plan around it. Let's get your current fitness numbers.
              </div>
            </div>
          </div>
        )}

        {/* Step 1: 5K time */}
        {step === 1 && (
          <div>
            <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Your best recent 5K time?</div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28, lineHeight: 1.6 }}>
              This sets all your personal pace zones using Jack Daniels' VDOT system. One number, all zones.
            </div>
            <input
              type="text"
              value={pr5k}
              onChange={e => setPr5k(e.target.value)}
              placeholder="e.g. 21:14"
              style={{
                background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: 14,
                color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 700,
                padding: "16px 18px", width: "100%", outline: "none", marginBottom: 20
              }}
            />
            {pr5k && (
              <div className="ai-bubble">
                <div className="ai-dot">AI</div>
                <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>
                  {pr5k} → <span style={{ color: "#fff", fontWeight: 700 }}>VDOT 47</span>. Your VO₂max pace is{" "}
                  <span style={{ color: "var(--yellow)", fontWeight: 700 }}>4:00/km</span>. Threshold:{" "}
                  <span style={{ color: "var(--yellow)", fontWeight: 700 }}>4:24/km</span>. Easy runs:{" "}
                  <span style={{ color: "var(--yellow)", fontWeight: 700 }}>5:30–6:00/km</span>.
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Max HR */}
        {step === 2 && (
          <div>
            <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Max heart rate?</div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28, lineHeight: 1.6 }}>
              If unsure, use 220 minus your age. You can update this anytime in profile.
            </div>
            <input
              type="text"
              value={maxHR}
              onChange={e => setMaxHR(e.target.value)}
              placeholder="e.g. 185"
              style={{
                background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: 14,
                color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 700,
                padding: "16px 18px", width: "100%", outline: "none", marginBottom: 20
              }}
            />
            {maxHR && (
              <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
                {[
                  { z: "Z1", bpm: `<${Math.round(Number(maxHR)*0.76)}`, color: "#4ADE80" },
                  { z: "Z2", bpm: `${Math.round(Number(maxHR)*0.76)}–${Math.round(Number(maxHR)*0.83)}`, color: "#60A5FA" },
                  { z: "Z3", bpm: `${Math.round(Number(maxHR)*0.83)}–${Math.round(Number(maxHR)*0.89)}`, color: "#FFE600" },
                  { z: "Z4", bpm: `${Math.round(Number(maxHR)*0.89)}–${Math.round(Number(maxHR)*0.94)}`, color: "#FFa033" },
                  { z: "Z5", bpm: `${Math.round(Number(maxHR)*0.94)}+`, color: "#FF6B6B" },
                ].map((z, i) => (
                  <div key={i} style={{ flex: 1, background: "var(--card)", borderRadius: 10, padding: "10px 6px", textAlign: "center" }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: z.color, marginBottom: 4 }}>{z.z}</div>
                    <div style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>{z.bpm}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Days per week */}
        {step === 3 && (
          <div>
            <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>How many days per week?</div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28, lineHeight: 1.6 }}>
              Be realistic. Consistency beats ambition. You can always add more later.
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              {[3, 4, 5, 6].map(n => (
                <button
                  key={n}
                  onClick={() => setDays(n)}
                  style={{
                    flex: 1, padding: "20px 8px", borderRadius: 14, border: "2px solid",
                    borderColor: days === n ? "var(--yellow)" : "var(--border)",
                    background: days === n ? "var(--yellow-bg)" : "var(--card)",
                    color: days === n ? "var(--yellow)" : "#888",
                    fontSize: 22, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
                    transition: "all .2s"
                  }}
                >
                  {n}
                  <div style={{ fontSize: 11, fontWeight: 600, marginTop: 4, opacity: .7 }}>days</div>
                </button>
              ))}
            </div>
            <div className="ai-bubble">
              <div className="ai-dot">AI</div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>
                {days} days/week → {days === 3 ? "2 quality sessions + 1 long run. Perfect for building base." : days === 4 ? "2 quality + 1 long + 1 easy. Classic structure." : days === 5 ? "This is your plan structure: Mon easy, Tue threshold, Wed recovery, Thu VO₂max, Sat long run." : "6 days is aggressive. I'll add a second easy day + extra brick sessions."}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Strava */}
        {step === 4 && (
          <div>
            <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Connect Strava?</div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28, lineHeight: 1.6 }}>
              I'll read your last 4 weeks to calibrate your starting load. Optional — skip if you prefer to start fresh.
            </div>
            <button
              onClick={() => next()}
              style={{
                width: "100%", background: "#fc4c02", color: "#fff", border: "none",
                borderRadius: 14, padding: 16, fontSize: 16, fontWeight: 700,
                fontFamily: "inherit", cursor: "pointer", marginBottom: 12
              }}
            >
              🟠 Connect Strava
            </button>
            <button className="btn-ghost" onClick={() => next()} style={{ width: "100%" }}>
              Skip for now
            </button>
            <div style={{ marginTop: 20 }} className="ai-bubble">
              <div className="ai-dot">AI</div>
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>
                <span style={{ color: "#fff", fontWeight: 700 }}>You're all set.</span> Goal locked. 17-week 5K build plan ready. First session starts Monday. Let's run.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom buttons — fixed inside the phone */}
      <div style={{
        position: "absolute", bottom: 80, left: 0, right: 0,
        padding: "0 16px", display: "flex", gap: 10, background: "transparent"
      }}>
        {step > 0 && (
          <button className="btn-ghost" onClick={back} style={{ flex: 1 }}>
            Back
          </button>
        )}
        <button
          className="btn-yellow"
          onClick={next}
          style={{ flex: step > 0 ? 2 : 1, margin: 0 }}
        >
          {step < totalSteps - 1 ? "Continue →" : "Build my plan →"}
        </button>
      </div>
    </div>
  );
}
