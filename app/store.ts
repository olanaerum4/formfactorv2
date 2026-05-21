
export type Screen =
  | "today"
  | "plan"
  | "progress"
  | "log"
  | "profile"
  | "coach"
  | "workout"
  | "logsession"
  | "library"
  | "onboard";

export interface WorkoutDay {
  day: string;
  date: number;
  name: string;
  sub: string;
  tss: number;
  zone: string | null;
  done: boolean;
  pace?: string | null;
  today?: boolean;
  rest?: boolean;
  busy?: boolean;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface AppState {
  screen: Screen;
  proMode: boolean;
  rpe: number;
  feel: string;
  goalText: string;
  onboardStep: number;
  chatHistory: ChatMessage[];
  chatLoading: boolean;
  setScreen: (s: Screen) => void;
  setProMode: (v: boolean) => void;
  setRpe: (n: number) => void;
  setFeel: (f: string) => void;
  setGoalText: (t: string) => void;
  setOnboardStep: (n: number) => void;
  addMessage: (m: ChatMessage) => void;
  setChatLoading: (v: boolean) => void;
}

// We'll implement with useState in components since zustand may need install
// Export data constants here

export const USER = {
  name: "Anders",
  ctl: 52,
  atl: 68,
  tsb: -16,
  vdot: 47,
  pr5k: "21:14",
  maxHR: 185,
  goal: "Sub-20 5K by Sept 14",
  weekTSS: 362,
  streak: 7,
};

export const WEEK_PLAN: WorkoutDay[] = [
  { day: "MON", date: 12, name: "Easy run", sub: "35 min", tss: 28, zone: "Z1", done: true, pace: null },
  { day: "TUE", date: 13, name: "Threshold intervals", sub: "4×8 min @ 4:24/km · 90s float", tss: 82, zone: "Z3", done: true, pace: "4:24/km" },
  { day: "WED", date: 14, name: "Recovery run", sub: "30 min", tss: 22, zone: "Z1", done: true, pace: null },
  { day: "THU", date: 15, name: "VO₂max intervals", sub: "5×800m @ 4:00/km · Z4", tss: 78, zone: "Z4", done: false, pace: "4:00/km", today: true },
  { day: "FRI", date: 16, name: "Rest", sub: "—", tss: 0, zone: null, done: false, rest: true },
  { day: "SAT", date: 17, name: "Long run", sub: "20km @ 5:00/km · last 5km @ MP", tss: 105, zone: "Z2", done: false, busy: true },
  { day: "SUN", date: 18, name: "Easy run", sub: "45 min", tss: 45, zone: "Z1", done: false },
];

export const LIBRARY = [
  { type: "Run", name: "Threshold Intervals", detail: "4×8 min @ 4:24/km", tss: 82, color: "#FFE600", textColor: "#000" },
  { type: "Run", name: "VO₂max Intervals", detail: "5×800m @ 4:00/km", tss: 78, color: "#FF6B6B", textColor: "#fff" },
  { type: "Bike", name: "Zone 2 Long Ride", detail: "3h @ 180–210W", tss: 165, color: "#4ADE80", textColor: "#000" },
  { type: "Run", name: "Recovery Run", detail: "30–40 min · <140 bpm", tss: 22, color: "#4ADE80", textColor: "#000" },
  { type: "Bri", name: "Brick Session", detail: "60 min bike → 20 min run", tss: 95, color: "#60A5FA", textColor: "#000" },
  { type: "Run", name: "Long Run", detail: "20 km @ 5:00/km", tss: 105, color: "#FFE600", textColor: "#000" },
  { type: "Swm", name: "Technique Swim", detail: "2.5km drills + sets", tss: 35, color: "#60A5FA", textColor: "#000" },
  { type: "Run", name: "VO₂max Open Water", detail: "5×800m open water", tss: 60, color: "#4ADE80", textColor: "#000" },
];

export const ZONES = [
  { z: "Z1 Easy", pace: "5:30–6:00/km", bpm: "<140", color: "#4ADE80" },
  { z: "Z2 Aerobic", pace: "5:00–5:30/km", bpm: "140–152", color: "#60A5FA" },
  { z: "Z3 Tempo", pace: "4:30–4:50/km", bpm: "152–163", color: "#FFE600" },
  { z: "Z4 Threshold", pace: "4:15–4:30/km", bpm: "163–170", color: "#FFa033" },
  { z: "Z5 VO₂max", pace: "3:55–4:10/km", bpm: "170+", color: "#FF6B6B" },
];

export const RECENT_LOG = [
  { date: "THU MAY 14", name: "Recovery run", time: "30 min", rpe: 4, feel: "😊", tss: 22, notes: "Legs felt fresh. HR stayed low." },
  { date: "TUE MAY 13", name: "Threshold intervals", time: "62 min", rpe: 8, feel: "🔥", tss: 86, notes: "Best threshold session in months." },
  { date: "MON MAY 12", name: "Easy run", time: "35 min", rpe: 3, feel: "😊", tss: 28, notes: "" },
  { date: "SAT MAY 10", name: "Long run", time: "1h 25m", rpe: 7, feel: "😐", tss: 112, notes: "Last 5km were tough. Need more fuel." },
  { date: "WED MAY 7", name: "VO₂max intervals", time: "65 min", rpe: 9, feel: "🔥", tss: 82, notes: "Hit every pace target." },
];

export const ZONE_COLORS: Record<string, string> = {
  Z1: "#4ADE80", Z2: "#60A5FA", Z3: "#FFE600", Z4: "#FF6B6B", Z5: "#FF4444",
};
