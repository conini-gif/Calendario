create table if not exists public.app_states (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.app_states enable row level security;

create policy "Users can read their own app state"
on public.app_states
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own app state"
on public.app_states
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own app state"
on public.app_states
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
