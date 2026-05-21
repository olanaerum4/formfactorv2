-- Run this in Supabase SQL editor

-- Athlete profile (one row per user, keyed by device_id for now)
create table if not exists athletes (
  id uuid primary key default gen_random_uuid(),
  device_id text unique not null,
  name text default 'Athlete',
  goal text,
  pr_5k text,
  max_hr int default 185,
  vdot int default 45,
  training_days int default 5,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Session log
create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  device_id text not null,
  name text,
  type text default 'Run',
  date date default current_date,
  duration_min int,
  rpe int,
  feel text,
  tss int,
  notes text,
  strava_id bigint,
  created_at timestamptz default now()
);

-- Strava tokens (personal use — one row)
create table if not exists strava_tokens (
  id int primary key default 1,
  access_token text,
  refresh_token text,
  expires_at bigint,
  updated_at timestamptz default now()
);

-- Enable RLS but allow all for now (tighten later)
alter table athletes enable row level security;
alter table sessions enable row level security;
alter table strava_tokens enable row level security;

create policy "allow all athletes" on athletes for all using (true) with check (true);
create policy "allow all sessions" on sessions for all using (true) with check (true);
create policy "allow all strava_tokens" on strava_tokens for all using (true) with check (true);
