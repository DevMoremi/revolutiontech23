-- supabase/migrations/0001_enrollments.sql
create extension if not exists "pgcrypto";

create table public.enrollments (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  first_name  text not null check (char_length(first_name) between 3 and 60),
  last_name   text not null check (char_length(last_name)  between 3 and 60),
  email       text not null unique check (char_length(email) <= 120),
  phone       text not null check (phone ~ '^0\d{10}$'),
  program     text not null check (program in (
                  'diploma-in-data-science',
                  'certified-drone-pilot',
                  'live-streaming-training',
                  'embedded-systems-training')),
  source      text check (source in (
                  'instagram','facebook','whatsapp','website','other')),
  ip_hash     text,
  user_agent  text check (user_agent is null or char_length(user_agent) <= 255)
);

alter table public.enrollments enable row level security;
-- Intentionally no policies. Only the service role can read/write.

create index enrollments_created_at_idx on public.enrollments (created_at desc);
