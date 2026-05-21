import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anon);

// Server-side only (service role — full access)
export const supabaseAdmin = () =>
  createClient(url, process.env.SUPABASE_SERVICE_KEY!);
