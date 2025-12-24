# Setup Instructions

This guide will help you get the Beaver Habits app running from scratch.

## Step 1: Database Setup

After connecting your Supabase integration in v0, run the SQL scripts in order:

### 1. Create Schema (001_create_schema.sql)
This creates all the necessary tables:
- profiles (user information)
- habits (user habits)
- habit_logs (completion tracking)
- friends (friend connections)
- beaver_stats (pet state)

All tables include Row Level Security (RLS) policies for data protection.

### 2. Create Triggers (002_create_triggers.sql)
This sets up automatic functions:
- Auto-create profile on user signup
- Auto-create beaver with 50 energy on signup
- Auto-update beaver energy/mood when habits are completed

### 3. Optional: Energy Decay (003_energy_decay.sql)
This adds a function to decay beaver energy over time (1 point per hour).
Note: You'll need to call this function periodically (e.g., via a cron job).

## Step 2: Test the App

1. **Sign Up**: Create a test account
2. **Verify Email**: Check your email inbox (or Supabase dashboard for dev)
3. **Log In**: Access your dashboard
4. **Create a Habit**: Add your first habit
5. **Complete It**: Mark it complete and watch the confetti!
6. **Check Your Beaver**: See the energy increase

## Step 3: Add Friends

1. Go to Profile page
2. Copy your User ID
3. Share it with a friend
4. Have them add you via the Friends page
5. Accept the request
6. View each other's beavers!

## Troubleshooting

### Email Verification Issues
- In development, check the Supabase dashboard for confirmation links
- Set `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` for local development

### RLS Errors
- Make sure scripts ran successfully
- Check that email is verified (unverified users can't write to RLS tables)
- Verify the user is authenticated

### Beaver Not Updating
- Check that trigger `on_habit_completed` was created
- Verify habit_logs table has the new entry
- Refresh the page to see updated energy

### Friend System Not Working
- Ensure both users have verified their emails
- Check that User IDs are copied correctly (they're long UUIDs)
- Verify RLS policies allow friends to view each other's beaver_stats

## Development Tips

### Testing Without Email Verification
During development, you can disable email verification in Supabase:
1. Go to Authentication > Settings in Supabase dashboard
2. Disable "Confirm email" option
3. Users can immediately access the app after signup

### Viewing Database Data
Use the Supabase dashboard Table Editor to:
- View all tables
- Check RLS policies
- Manually edit data for testing
- Monitor real-time changes

### Resetting the Database
If you need to start fresh:
1. Delete all data from tables (in reverse order of dependencies)
2. Or drop and recreate tables
3. Re-run all SQL scripts

## Next Steps

- Customize the color scheme in `app/globals.css`
- Adjust game balance (energy gains, mood thresholds)
- Add your own features
- Deploy to Vercel for production use
