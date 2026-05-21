import { supabase } from "./supabase";

export interface Athlete {
  id?: string;
  device_id: string;
  name: string;
  goal: string;
  pr_5k: string;
  max_hr: number;
  vdot: number;
  training_days: number;
}

// Generate or retrieve a stable device ID
export function getDeviceId(): string {
  if (typeof window === "undefined") return "server";
  let id = localStorage.getItem("ff_device_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("ff_device_id", id);
  }
  return id;
}

export async function getAthlete(): Promise<Athlete | null> {
  const device_id = getDeviceId();
  const { data } = await supabase
    .from("athletes")
    .select("*")
    .eq("device_id", device_id)
    .single();
  return data;
}

export async function saveAthlete(athlete: Partial<Athlete>): Promise<Athlete | null> {
  const device_id = getDeviceId();
  const { data } = await supabase
    .from("athletes")
    .upsert({ ...athlete, device_id, updated_at: new Date().toISOString() }, { onConflict: "device_id" })
    .select()
    .single();
  return data;
}

export async function logSession(session: {
  name: string;
  type?: string;
  duration_min: number;
  rpe: number;
  feel: string;
  tss: number;
  notes: string;
  date?: string;
}) {
  const device_id = getDeviceId();
  const { data } = await supabase
    .from("sessions")
    .insert({ ...session, device_id })
    .select()
    .single();
  return data;
}

export async function getSessions(limit = 20) {
  const device_id = getDeviceId();
  const { data } = await supabase
    .from("sessions")
    .select("*")
    .eq("device_id", device_id)
    .order("date", { ascending: false })
    .limit(limit);
  return data || [];
}
