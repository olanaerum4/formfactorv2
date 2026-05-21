"use client";
import { useState, useEffect } from "react";
import TodayScreen from "./components/TodayScreen";
import PlanScreen from "./components/PlanScreen";
import ProgressScreen from "./components/ProgressScreen";
import LogScreen from "./components/LogScreen";
import ProfileScreen from "./components/ProfileScreen";
import CoachScreen from "./components/CoachScreen";
import WorkoutScreen from "./components/WorkoutScreen";
import LogSessionScreen from "./components/LogSessionScreen";
import LibraryScreen from "./components/LibraryScreen";
import OnboardScreen from "./components/OnboardScreen";
import BottomNav from "./components/BottomNav";
import { useAthlete } from "@/lib/useAthlete";
import Landing from "./landing/page";

type Screen = "today" | "plan" | "progress" | "log" | "profile" | "coach" | "workout" | "logsession" | "library" | "onboard";

export default function App() {
  const [screen, setScreen] = useState<Screen>("today");
  const [proMode, setProMode] = useState(true);
  const [checkedProfile, setCheckedProfile] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const athlete = useAthlete();

  const navigate = (s: string) => setScreen(s as Screen);

  useEffect(() => {
    // Show app if ?app=1 in URL or stored in sessionStorage
    const params = new URLSearchParams(window.location.search);
    if (params.get("app") === "1" || sessionStorage.getItem("ff_show_app")) {
      sessionStorage.setItem("ff_show_app", "1");
      setShowApp(true);
    }
  }, []);

  useEffect(() => {
    if (athlete.loaded && !checkedProfile && showApp) {
      setCheckedProfile(true);
      if (!athlete.hasProfile) setScreen("onboard");
    }
  }, [athlete.loaded, athlete.hasProfile, checkedProfile, showApp]);

  // Show landing page by default
  if (!showApp) {
    return (
      <div>
        <Landing />
        {/* Floating "Open App" button for dev/testing */}
        <button
          onClick={() => { sessionStorage.setItem("ff_show_app","1"); setShowApp(true); }}
          style={{
            position:"fixed", bottom:24, right:24, zIndex:999,
            background:"#FFE600", color:"#000", border:"none", borderRadius:12,
            padding:"12px 20px", fontSize:14, fontWeight:700, cursor:"pointer",
            fontFamily:"inherit", boxShadow:"0 4px 24px rgba(255,230,0,0.3)"
          }}
        >
          Åpne app →
        </button>
      </div>
    );
  }

  const PROGRESS = { today: 20, plan: 40, progress: 60, log: 80, profile: 100 };
  const progress = PROGRESS[screen as keyof typeof PROGRESS] || 20;
  const FULL_SCREENS = ["coach", "logsession"];
  const isFull = FULL_SCREENS.includes(screen);

  return (
    <div style={{
      minHeight:"100vh", background:"#0a0a0a",
      display:"flex", justifyContent:"center", alignItems:"flex-start",
      padding:"20px 0"
    }}>
      {/* Desktop sidebar */}
      <div style={{
        display:"none",
        width:220, paddingTop:60, paddingRight:32, flexShrink:0,
        flexDirection:"column", gap:8, alignItems:"flex-end"
      }} className="ff-sidebar">
        {[
          { id:"today", label:"Today", icon:"○" },
          { id:"plan", label:"Plan", icon:"◫" },
          { id:"progress", label:"Progress", icon:"▲" },
          { id:"log", label:"Log", icon:"≡" },
          { id:"profile", label:"Profile", icon:"◉" },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            style={{
              background: screen === item.id ? "rgba(255,230,0,0.1)" : "transparent",
              border: "none", borderRadius:10, padding:"10px 16px",
              color: screen === item.id ? "#FFE600" : "#444",
              fontFamily:"inherit", fontSize:13, fontWeight:600,
              cursor:"pointer", display:"flex", alignItems:"center", gap:10,
              transition:"all 0.2s", width:"100%", justifyContent:"flex-end"
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Phone frame */}
      <div style={{
        width:390, minHeight:844, height:"calc(100vh - 40px)", maxHeight:932,
        background:"#111", borderRadius:44, border:"2px solid #1f1f1f",
        overflow:"hidden", position:"relative", display:"flex", flexDirection:"column"
      }}>
        {/* Status bar */}
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"14px 28px 8px", fontSize:13, fontWeight:600, flexShrink:0
        }}>
          <span>{new Date().getHours()}:{String(new Date().getMinutes()).padStart(2,"0")}</span>
          <div style={{ display:"flex", gap:5, alignItems:"center" }}>
            <svg width="14" height="11" viewBox="0 0 14 11">
              <rect x="0" y="5" width="2.5" height="6" rx="1" fill="#fff" />
              <rect x="3.5" y="3" width="2.5" height="8" rx="1" fill="#fff" />
              <rect x="7" y="1" width="2.5" height="10" rx="1" fill="#fff" />
              <rect x="10.5" y="0" width="2.5" height="11" rx="1" fill="#fff" opacity=".4" />
            </svg>
            <svg width="22" height="11" viewBox="0 0 22 11">
              <rect x="0" y="1" width="18" height="9" rx="2" stroke="#fff" strokeWidth="1" fill="none" />
              <rect x="1.5" y="2.5" width="12" height="6" rx="1" fill="#fff" />
              <rect x="19" y="3.5" width="3" height="4" rx="1" fill="#fff" opacity=".5" />
            </svg>
          </div>
        </div>

        <div style={{ height:2, background:"var(--border)", flexShrink:0 }}>
          <div style={{ height:2, background:"var(--yellow)", width:`${progress}%`, transition:"width .4s" }} />
        </div>

        <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
          {isFull ? (
            <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
              {screen === "coach" && <CoachScreen athlete={athlete} onNavigate={navigate} />}
              {screen === "logsession" && <LogSessionScreen onNavigate={navigate} />}
            </div>
          ) : (
            <div style={{ height:"100%", paddingBottom:screen === "onboard" ? 0 : 72, overflow:"hidden auto" }}>
              {screen === "today" && <TodayScreen athlete={athlete} proMode={proMode} onNavigate={navigate} />}
              {screen === "plan" && <PlanScreen onNavigate={navigate} />}
              {screen === "progress" && <ProgressScreen athlete={athlete} onNavigate={navigate} />}
              {screen === "log" && <LogScreen onNavigate={navigate} />}
              {screen === "profile" && <ProfileScreen athlete={athlete} proMode={proMode} setProMode={setProMode} onNavigate={navigate} />}
              {screen === "workout" && <WorkoutScreen onNavigate={navigate} />}
              {screen === "library" && <LibraryScreen onNavigate={navigate} />}
              {screen === "onboard" && <OnboardScreen onComplete={() => { navigate("today"); }} />}
            </div>
          )}
        </div>

        {screen !== "onboard" && <BottomNav active={screen} onNavigate={navigate} />}
      </div>

      <style>{`
        @media (min-width: 900px) {
          .ff-sidebar { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
