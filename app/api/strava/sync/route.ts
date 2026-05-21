import { NextResponse } from "next/server";

async function getValidToken(): Promise<string> {
  const expiresAt = Number(process.env.STRAVA_TOKEN_EXPIRES_AT || "0");
  const now = Math.floor(Date.now() / 1000);

  // Use existing access token if still valid (with 60s buffer)
  if (process.env.STRAVA_ACCESS_TOKEN && expiresAt > now + 60) {
    return process.env.STRAVA_ACCESS_TOKEN;
  }

  // Refresh using refresh token
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();

  if (!data.access_token) {
    throw new Error("Token refresh failed: " + JSON.stringify(data));
  }

  // NOTE: On Vercel env vars are read-only at runtime.
  // The new token will work for this request. To avoid refreshing every time,
  // update STRAVA_ACCESS_TOKEN and STRAVA_TOKEN_EXPIRES_AT in Vercel dashboard
  // when they expire (or add Supabase later to persist them automatically).
  console.log("Token refreshed. New expires_at:", data.expires_at);
  console.log("Update STRAVA_ACCESS_TOKEN in Vercel env vars to:", data.access_token);

  return data.access_token;
}

export async function GET() {
  try {
    const token = await getValidToken();

    // Fetch last 30 days of activities
    const after = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);
    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=60`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error("Strava API error: " + JSON.stringify(err));
    }

    const activities = await res.json();

    const processed = activities
      .filter((a: any) =>
        a.type === "Run" || a.type === "Ride" || a.type === "Swim"
      )
      .map((a: any) => {
        const durationHours = a.moving_time / 3600;
        const avgHR = a.average_heartrate || 140;
        const maxHR = Number(process.env.ATHLETE_MAX_HR || "185");
        const hrTSS = Math.round(
          durationHours * (avgHR / maxHR) * (avgHR / maxHR) * 100
        );

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
          tss: hrTSS,
          elevation: a.total_elevation_gain,
          kudos: a.kudos_count,
        };
      });

    const metrics = calculatePMC(processed);

    return NextResponse.json({
      activities: processed,
      metrics,
      count: processed.length,
    });
  } catch (err: any) {
    console.error("Strava sync error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function formatPace(metersPerSecond: number): string {
  const secPerKm = 1000 / metersPerSecond;
  const min = Math.floor(secPerKm / 60);
  const sec = Math.round(secPerKm % 60);
  return `${min}:${sec.toString().padStart(2, "0")}/km`;
}

function calculatePMC(activities: any[]) {
  const sorted = [...activities].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let ctl = 0;
  let atl = 0;
  const ctlDecay = 1 - 1 / 42;
  const atlDecay = 1 - 1 / 7;

  for (const activity of sorted) {
    const tss = activity.tss || 0;
    ctl = ctl * ctlDecay + tss * (1 - ctlDecay);
    atl = atl * atlDecay + tss * (1 - atlDecay);
  }

  const tsb = Math.round(ctl - atl);
  return {
    ctl: Math.round(ctl),
    atl: Math.round(atl),
    tsb,
    status:
      tsb > 5
        ? "Frisk"
        : tsb > -10
        ? "Produktiv"
        : tsb > -25
        ? "Overbelastet"
        : "Overtrening",
  };
}
