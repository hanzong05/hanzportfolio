-- Job Hunter tables. Run this once in Supabase: SQL Editor, paste, Run.
-- The site connects with the service role key on the server only, so Row Level Security
-- is enabled with no public policies: the browser cannot read these tables directly.

create table if not exists public.jobs (
  id bigint generated always as identity primary key,
  title text not null,
  company text not null,
  source text,
  url text unique,
  description text,
  salary text,
  work_arrangement text,
  contract_type text,
  posted_at text,
  priority text not null default 'none',
  stage text not null default 'discovered',
  fit_score integer,
  analysis jsonb,
  checklist jsonb not null default '[]'::jsonb,
  instructions text,
  subject text,
  draft text,
  notes text,
  follow_up_date text,
  applied_at text,
  interview_at text,
  reply_at text,
  reply_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profile (
  id integer primary key check (id = 1),
  name text,
  email text,
  phone text,
  location text,
  timezone text,
  portfolio_url text,
  resume_text text,
  skills text[] not null default '{}',
  years_experience numeric,
  preferred_titles text[] not null default '{}',
  work_preference text,
  salary_min integer,
  salary_max integer,
  employment_types text[] not null default '{}',
  updated_at timestamptz not null default now()
);

insert into public.profile (id) values (1) on conflict (id) do nothing;

alter table public.jobs enable row level security;
alter table public.profile enable row level security;
