import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(
      new URL("/?strava=error", request.url)
    );
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
      }),
    });

    const data = await tokenRes.json();

    if (!data.access_token) {
      throw new Error("No access token received");
    }

    const { access_token, refresh_token, expires_at, athlete } = data;

    // TODO: Save to Supabase:
    // await supabase.from('strava_tokens').upsert({
    //   athlete_id: athlete.id,
    //   access_token,
    //   refresh_token,
    //   expires_at,
    //   athlete_name: `${athlete.firstname} ${athlete.lastname}`,
    //   athlete_photo: athlete.profile,
    // })

    // For now: store in cookie and redirect
    const response = NextResponse.redirect(
      new URL("/?strava=connected", request.url)
    );

    response.cookies.set("strava_athlete_id", String(athlete.id), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    response.cookies.set("strava_access_token", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: expires_at - Math.floor(Date.now() / 1000),
    });

    response.cookies.set("strava_refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  } catch (err) {
    console.error("Strava OAuth error:", err);
    return NextResponse.redirect(
      new URL("/?strava=error", request.url)
    );
  }
}
