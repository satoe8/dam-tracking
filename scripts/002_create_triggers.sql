-- Auto-create profile and beaver stats on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;

  insert into public.beaver_stats (user_id, energy, mood)
  values (new.id, 50, 'neutral')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Update beaver stats when habit is completed
create or replace function public.update_beaver_on_habit_complete()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  current_energy integer;
  new_energy integer;
  new_mood text;
begin
  -- Get current energy
  select energy into current_energy
  from public.beaver_stats
  where user_id = new.user_id;

  -- Increase energy by 10, cap at 100
  new_energy := least(current_energy + 10, 100);

  -- Determine mood based on energy
  if new_energy >= 70 then
    new_mood := 'happy';
  elsif new_energy >= 30 then
    new_mood := 'neutral';
  else
    new_mood := 'sad';
  end if;

  -- Update beaver stats
  update public.beaver_stats
  set energy = new_energy,
      mood = new_mood,
      last_updated = now()
  where user_id = new.user_id;

  return new;
end;
$$;

drop trigger if exists on_habit_completed on public.habit_logs;

create trigger on_habit_completed
  after insert on public.habit_logs
  for each row
  execute function public.update_beaver_on_habit_complete();
