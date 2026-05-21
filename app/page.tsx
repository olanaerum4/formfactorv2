"use client";
import { useState, useEffect } from "react";
import { useAthlete } from "@/lib/useAthlete";
import Landing from "./landing/page";

// Desktop screens
import DashboardToday from "./components/desktop/DashboardToday";
import DashboardPlan from "./components/desktop/DashboardPlan";
import DashboardProgress from "./components/desktop/DashboardProgress";
import DashboardLog from "./components/desktop/DashboardLog";
import DashboardProfile from "./components/desktop/DashboardProfile";
import DashboardCoach from "./components/desktop/DashboardCoach";
import DashboardWorkout from "./components/desktop/DashboardWorkout";

// Mobile screens (original)
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

type Screen = "today"|"plan"|"progress"|"log"|"profile"|"coach"|"workout"|"logsession"|"library"|"onboard";

const NAV = [
  { id:"today", label:"Today", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { id:"plan", label:"Plan", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="4" x2="9" y2="9"/><line x1="15" y1="4" x2="15" y2="9"/></svg> },
  { id:"progress", label:"Progress", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
  { id:"log", label:"Log", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="12" y2="15"/></svg> },
  { id:"coach", label:"AI Coach", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> },
  { id:"profile", label:"Profile", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
];

const SCREEN_TITLES: Record<string, string> = {
  today:"Today's Dashboard", plan:"Training Plan", progress:"Progress & Analytics",
  log:"Session Log", coach:"AI Coach", profile:"Profile & Settings",
  workout:"Workout Detail", logsession:"Log Session", library:"Workout Library",
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("today");
  const [proMode, setProMode] = useState(true);
  const [showApp, setShowApp] = useState(false);
  const [checkedProfile, setCheckedProfile] = useState(false);
  const athlete = useAthlete();
  const nav = (s: string) => setScreen(s as Screen);

  useEffect(() => {
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

  if (!showApp) {
    return (
      <div>
        <Landing />
        <button onClick={() => { sessionStorage.setItem("ff_show_app","1"); setShowApp(true); }}
          style={{ position:"fixed",bottom:24,right:24,zIndex:999,background:"#FFE600",color:"#000",border:"none",borderRadius:12,padding:"12px 20px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 24px rgba(255,230,0,0.3)" }}>
          Open App →
        </button>
      </div>
    );
  }

  const mobileFullScreens = ["coach","logsession"];

  return (
    <>
      {/* ── DESKTOP (≥769px) ── */}
      <div className="app-shell">
        {/* Sidebar */}
        <aside className="app-sidebar">
          <div className="sidebar-logo">FormFactor</div>
          <nav className="sidebar-nav">
            {NAV.map(item => (
              <button key={item.id} className={`sidebar-btn ${screen===item.id?"active":""}`} onClick={() => nav(item.id)}>
                {item.icon}{item.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="sidebar-user" onClick={() => nav("profile")}>
              <div className="sidebar-avatar">{athlete.name?.[0]||"A"}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13,fontWeight:600,color:"#ccc",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{athlete.name||"Athlete"}</div>
                <div style={{ fontSize:11,color:"var(--text-muted)",marginTop:1 }}>{athlete.goal?.slice(0,28)||"No goal set"}</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="app-main">
          {/* Topbar */}
          <header className="app-topbar">
            <span className="topbar-title">{SCREEN_TITLES[screen]||"FormFactor"}</span>
            <div className="topbar-actions">
              {screen !== "coach" && (
                <button className="btn btn-ghost" style={{fontSize:12,padding:"7px 14px"}} onClick={() => nav("coach")}>
                  Ask AI Coach
                </button>
              )}
              <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                <div style={{ width:8,height:8,borderRadius:"50%",background:"var(--green)" }} />
                <span style={{ fontSize:12,color:"var(--text-muted)" }}>Strava synced</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="app-content">
            {screen==="today" && <DashboardToday athlete={athlete} proMode={proMode} onNavigate={nav} />}
            {screen==="plan" && <DashboardPlan onNavigate={nav} />}
            {screen==="progress" && <DashboardProgress athlete={athlete} onNavigate={nav} />}
            {screen==="log" && <DashboardLog onNavigate={nav} />}
            {screen==="coach" && <DashboardCoach athlete={athlete} onNavigate={nav} />}
            {screen==="profile" && <DashboardProfile athlete={athlete} proMode={proMode} setProMode={setProMode} onNavigate={nav} />}
            {screen==="workout" && <DashboardWorkout onNavigate={nav} />}
            {screen==="logsession" && <DashboardLog onNavigate={nav} />}
            {screen==="library" && <DashboardPlan onNavigate={nav} />}
            {screen==="onboard" && (
              <div style={{ maxWidth:600,margin:"0 auto",paddingTop:40 }}>
                <OnboardScreen onComplete={() => nav("today")} />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── MOBILE (≤768px) ── */}
      <div className="phone-shell">
        <div className="phone-frame">
          <div className="phone-status">
            <span>{new Date().getHours()}:{String(new Date().getMinutes()).padStart(2,"0")}</span>
            <div style={{display:"flex",gap:5,alignItems:"center"}}>
              <svg width="14" height="11" viewBox="0 0 14 11"><rect x="0" y="5" width="2.5" height="6" rx="1" fill="#fff"/><rect x="3.5" y="3" width="2.5" height="8" rx="1" fill="#fff"/><rect x="7" y="1" width="2.5" height="10" rx="1" fill="#fff"/><rect x="10.5" y="0" width="2.5" height="11" rx="1" fill="#fff" opacity=".4"/></svg>
              <svg width="22" height="11" viewBox="0 0 22 11"><rect x="0" y="1" width="18" height="9" rx="2" stroke="#fff" strokeWidth="1" fill="none"/><rect x="1.5" y="2.5" width="12" height="6" rx="1" fill="#fff"/><rect x="19" y="3.5" width="3" height="4" rx="1" fill="#fff" opacity=".5"/></svg>
            </div>
          </div>
          <div className="phone-progress">
            <div className="phone-progress-bar" style={{width:`${({today:20,plan:40,progress:60,log:80,profile:100}[screen]||20)}%`}} />
          </div>
          <div className="phone-body">
            {mobileFullScreens.includes(screen) ? (
              <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
                {screen==="coach" && <CoachScreen athlete={athlete} onNavigate={nav} />}
                {screen==="logsession" && <LogSessionScreen onNavigate={nav} />}
              </div>
            ) : (
              <div className="phone-scroll" style={{paddingBottom:screen==="onboard"?0:72}}>
                {screen==="today" && <TodayScreen athlete={athlete} proMode={proMode} onNavigate={nav} />}
                {screen==="plan" && <PlanScreen onNavigate={nav} />}
                {screen==="progress" && <ProgressScreen athlete={athlete} onNavigate={nav} />}
                {screen==="log" && <LogScreen onNavigate={nav} />}
                {screen==="profile" && <ProfileScreen athlete={athlete} proMode={proMode} setProMode={setProMode} onNavigate={nav} />}
                {screen==="workout" && <WorkoutScreen onNavigate={nav} />}
                {screen==="library" && <LibraryScreen onNavigate={nav} />}
                {screen==="onboard" && <OnboardScreen onComplete={() => nav("today")} />}
              </div>
            )}
            {!["onboard","logsession"].includes(screen) && <BottomNav active={screen} onNavigate={nav} />}
          </div>
        </div>
      </div>
    </>
  );
}
