import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

async function getValidToken(): Promise<string> {
  const admin = supabaseAdmin();

  // Try Supabase first
  const { data: row } = await admin
    .from("strava_tokens")
    .select("*")
    .eq("id", 1)
    .single();

  const now = Math.floor(Date.now() / 1000);
  const token = row?.access_token || process.env.STRAVA_ACCESS_TOKEN;
  const expiresAt = row?.expires_at || Number(process.env.STRAVA_TOKEN_EXPIRES_AT || 0);

  if (token && expiresAt > now + 60) return token;

  // Refresh
  const refreshToken = row?.refresh_token || process.env.STRAVA_REFRESH_TOKEN;
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();
  if (!data.access_token) throw new Error("Token refresh failed");

  // Save refreshed tokens to Supabase
  await admin.from("strava_tokens").upsert({
    id: 1,
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at,
    updated_at: new Date().toISOString(),
  });

  return data.access_token;
}

export async function GET() {
  try {
    const token = await getValidToken();

    const after = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);
    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=60`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) throw new Error("Strava API error: " + res.status);
    const activities = await res.json();

    const processed = activities
      .filter((a: any) => ["Run", "Ride", "Swim"].includes(a.type))
      .map((a: any) => {
        const durationHours = a.moving_time / 3600;
        const avgHR = a.average_heartrate || 140;
        const maxHR = Number(process.env.ATHLETE_MAX_HR || 185);
        const tss = Math.round(durationHours * (avgHR / maxHR) * (avgHR / maxHR) * 100);
        return {
          id: a.id,
          name: a.name,
          type: a.type,
          date: a.start_date_local,
          distance: Math.round((a.distance / 1000) * 10) / 10,
          duration: a.moving_time,
          pace: a.average_speed ? formatPace(a.average_speed) : null,
          avgHR: a.average_heartrate,
          maxHR: a.max_heartrate,
          tss,
          elevation: a.total_elevation_gain,
        };
      });

    const metrics = calculatePMC(processed);
    return NextResponse.json({ activities: processed, metrics, count: processed.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function formatPace(mps: number) {
  const s = 1000 / mps;
  return `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}/km`;
}

function calculatePMC(activities: any[]) {
  const sorted = [...activities].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  let ctl = 0, atl = 0;
  for (const a of sorted) {
    const tss = a.tss || 0;
    ctl = ctl * (1 - 1 / 42) + tss * (1 / 42);
    atl = atl * (1 - 1 / 7) + tss * (1 / 7);
  }
  const tsb = Math.round(ctl - atl);
  return {
    ctl: Math.round(ctl), atl: Math.round(atl), tsb,
    status: tsb > 5 ? "Frisk" : tsb > -10 ? "Produktiv" : tsb > -25 ? "Overbelastet" : "Overtrening",
  };
}
