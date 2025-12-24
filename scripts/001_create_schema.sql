-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_all"
  on public.profiles for select
  using (true);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Create habits table
create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  frequency text not null check (frequency in ('daily', 'weekly')),
  created_at timestamptz default now()
);

alter table public.habits enable row level security;

create policy "habits_select_own"
  on public.habits for select
  using (auth.uid() = user_id);

create policy "habits_insert_own"
  on public.habits for insert
  with check (auth.uid() = user_id);

create policy "habits_update_own"
  on public.habits for update
  using (auth.uid() = user_id);

create policy "habits_delete_own"
  on public.habits for delete
  using (auth.uid() = user_id);

-- Create habit_logs table
create table if not exists public.habit_logs (
  id uuid primary key default gen_random_uuid(),
  habit_id uuid not null references public.habits(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  completed_at timestamptz default now(),
  date date not null default current_date
);

alter table public.habit_logs enable row level security;

create policy "habit_logs_select_own"
  on public.habit_logs for select
  using (auth.uid() = user_id);

create policy "habit_logs_insert_own"
  on public.habit_logs for insert
  with check (auth.uid() = user_id);

create policy "habit_logs_delete_own"
  on public.habit_logs for delete
  using (auth.uid() = user_id);

-- Create friends table
create table if not exists public.friends (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  friend_id uuid not null references auth.users(id) on delete cascade,
  status text not null check (status in ('pending', 'accepted')) default 'pending',
  created_at timestamptz default now(),
  unique(user_id, friend_id)
);

alter table public.friends enable row level security;

create policy "friends_select_own"
  on public.friends for select
  using (auth.uid() = user_id or auth.uid() = friend_id);

create policy "friends_insert_own"
  on public.friends for insert
  with check (auth.uid() = user_id);

create policy "friends_update_own"
  on public.friends for update
  using (auth.uid() = friend_id);

create policy "friends_delete_own"
  on public.friends for delete
  using (auth.uid() = user_id);

-- Create beaver_stats table (for pet state)
create table if not exists public.beaver_stats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  energy integer not null default 50 check (energy >= 0 and energy <= 100),
  mood text not null check (mood in ('happy', 'neutral', 'sad')) default 'neutral',
  last_updated timestamptz default now()
);

alter table public.beaver_stats enable row level security;

create policy "beaver_stats_select_own"
  on public.beaver_stats for select
  using (auth.uid() = user_id);

create policy "beaver_stats_insert_own"
  on public.beaver_stats for insert
  with check (auth.uid() = user_id);

create policy "beaver_stats_update_own"
  on public.beaver_stats for update
  using (auth.uid() = user_id);

-- Allow friends to see each other's beaver stats
create policy "beaver_stats_select_friends"
  on public.beaver_stats for select
  using (
    exists (
      select 1 from public.friends
      where (friends.user_id = auth.uid() and friends.friend_id = beaver_stats.user_id and friends.status = 'accepted')
         or (friends.friend_id = auth.uid() and friends.user_id = beaver_stats.user_id and friends.status = 'accepted')
    )
  );
