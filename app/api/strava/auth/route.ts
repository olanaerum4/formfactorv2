// This route is not needed for personal use (tokens are hardcoded in env vars).
// Kept as fallback if you ever want to re-authorize manually.
import { redirect } from "next/navigation";

export async function GET() {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_URL + "/api/strava/callback";

  const stravaAuthUrl = new URL("https://www.strava.com/oauth/authorize");
  stravaAuthUrl.searchParams.set("client_id", clientId!);
  stravaAuthUrl.searchParams.set("response_type", "code");
  stravaAuthUrl.searchParams.set("redirect_uri", redirectUri);
  stravaAuthUrl.searchParams.set("approval_prompt", "force");
  stravaAuthUrl.searchParams.set("scope", "read,activity:read_all,profile:read_all");

  redirect(stravaAuthUrl.toString());
}
