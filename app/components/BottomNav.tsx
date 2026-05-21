"use client";

type Screen = "today" | "plan" | "progress" | "log" | "profile";

interface Props {
  active: string;
  onNavigate: (s: string) => void;
}

const NAV_ITEMS = [
  {
    id: "today",
    label: "TODAY",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: "plan",
    label: "PLAN",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="4" x2="9" y2="9" />
        <line x1="15" y1="4" x2="15" y2="9" />
      </svg>
    ),
  },
  {
    id: "progress",
    label: "PROGRESS",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    id: "log",
    label: "LOG",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="16" y2="11" />
        <line x1="8" y1="15" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "PROFILE",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
];

const HIDDEN_SCREENS = ["coach", "workout", "logsession", "library", "onboard"];

export default function BottomNav({ active, onNavigate }: Props) {
  if (HIDDEN_SCREENS.includes(active)) return null;

  return (
    <nav style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      background: "var(--surface)", borderTop: "1px solid var(--border)",
      display: "flex", zIndex: 100
    }}>
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          className={`nav-btn ${active === item.id ? "active" : ""}`}
          onClick={() => onNavigate(item.id)}
        >
          {item.icon}
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: .8 }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
