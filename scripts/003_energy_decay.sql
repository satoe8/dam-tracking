-- Function to decay beaver energy over time
create or replace function public.decay_beaver_energy()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  beaver_record record;
  new_energy integer;
  new_mood text;
  hours_since_update numeric;
begin
  for beaver_record in 
    select user_id, energy, last_updated
    from public.beaver_stats
  loop
    -- Calculate hours since last update
    hours_since_update := extract(epoch from (now() - beaver_record.last_updated)) / 3600;
    
    -- Decay 1 energy per hour, minimum 0
    new_energy := greatest(beaver_record.energy - floor(hours_since_update)::integer, 0);
    
    -- Determine mood
    if new_energy >= 70 then
      new_mood := 'happy';
    elsif new_energy >= 30 then
      new_mood := 'neutral';
    else
      new_mood := 'sad';
    end if;
    
    -- Update if changed
    if new_energy != beaver_record.energy then
      update public.beaver_stats
      set energy = new_energy,
          mood = new_mood,
          last_updated = now()
      where user_id = beaver_record.user_id;
    end if;
  end loop;
end;
$$;
