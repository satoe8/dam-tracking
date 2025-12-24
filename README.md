# Beaver Habits - Multiplayer Habit Tracking Game

A gamified habit tracking application where users build better habits while taking care of their virtual beaver buddy. The beaver's energy and mood reflect your consistency, creating a fun and motivating way to stay on track.

## Features

### Core Functionality
- **Habit Management**: Create, track, and complete daily or weekly habits
- **Pet Beaver System**: Your beaver gains energy (+10 per habit) and changes mood based on your progress
- **Energy States**: 
  - 0-29: Sad beaver
  - 30-69: Neutral beaver
  - 70-100: Happy beaver
- **Confetti Celebrations**: Visual rewards when completing habits

### Multiplayer Features
- **Friend System**: Add friends using their User ID
- **Friend Requests**: Send and accept/reject friend requests
- **Friend Beavers**: View your friends' beaver energy and mood
- **Profile Sharing**: Share your User ID to connect with friends

### Progress Tracking
- **Calendar View**: Visual monthly calendar showing habit completion
- **Color-coded Days**: 
  - White: No habits completed
  - Orange: 1 habit completed
  - Amber: 2 habits completed
  - Green: 3+ habits completed
- **Recent Activity**: Timeline of recent habit completions

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth (email/password)
- **Styling**: Tailwind CSS v4 with custom amber/orange theme
- **UI Components**: shadcn/ui
- **Animations**: Custom CSS animations + canvas-confetti

## Database Schema

### Tables
1. **profiles**: User display names and metadata
2. **habits**: User-created habits with frequency (daily/weekly)
3. **habit_logs**: Completion records for each habit
4. **friends**: Friend connections with pending/accepted status
5. **beaver_stats**: Real-time beaver energy and mood per user

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Friends can view each other's beaver stats (but not habits)
- Automatic profile and beaver creation on signup

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account and project

### Installation

1. Clone the repository
2. Install dependencies (handled automatically in v0)
3. Set up Supabase integration from the v0 UI
4. Run the SQL scripts to set up the database:
   - `scripts/001_create_schema.sql` - Creates tables and RLS policies
   - `scripts/002_create_triggers.sql` - Auto-creates profiles and updates beaver stats
   - `scripts/003_energy_decay.sql` - Optional: Energy decay function

### Environment Variables

All required environment variables are automatically set when you connect the Supabase integration:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- And more...

## Usage

### For Users

1. **Sign Up**: Create an account with email and display name
2. **Verify Email**: Check your email and click the verification link
3. **Add Habits**: Create your first habit (daily or weekly)
4. **Complete Habits**: Mark habits as complete to boost your beaver's energy
5. **Connect Friends**: Share your User ID from the Profile page
6. **Track Progress**: View your calendar to see completion patterns

### For Developers

#### Project Structure
```
app/
  ├── auth/          # Authentication pages (login, sign-up)
  ├── app/           # Protected app pages
  │   ├── page.tsx   # Main dashboard
  │   ├── friends/   # Friends list and requests
  │   ├── calendar/  # Calendar view
  │   └── profile/   # User profile
  └── page.tsx       # Landing page

components/
  ├── beaver-display.tsx      # Animated beaver with energy display
  ├── habit-list.tsx          # List of user habits
  ├── habit-card.tsx          # Individual habit card
  ├── add-habit-dialog.tsx    # Dialog for creating habits
  ├── friends-list.tsx        # Display friend beavers
  ├── friend-requests.tsx     # Accept/reject requests
  ├── add-friend-dialog.tsx   # Send friend requests
  ├── calendar-view.tsx       # Monthly calendar
  └── copy-button.tsx         # Copy user ID button

lib/
  └── supabase/
      ├── client.ts  # Client-side Supabase client
      ├── server.ts  # Server-side Supabase client
      └── proxy.ts   # Session management middleware

scripts/
  └── *.sql          # Database setup scripts
```

#### Key Patterns

**Server Components** (default):
```tsx
import { createClient } from "@/lib/supabase/server"

const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
```

**Client Components**:
```tsx
"use client"
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()
```

**Protected Routes**:
Routes under `/app/*` are automatically protected by the proxy middleware.

## Game Mechanics

### Energy System
- Starting energy: 50
- Energy gain: +10 per habit completion
- Maximum energy: 100
- Energy decay: 1 point per hour (optional, via script)

### Mood Calculation
- Energy 70-100: Happy (green)
- Energy 30-69: Neutral (amber)
- Energy 0-29: Sad (red)

### Social Features
- Friend requests use User ID (UUID)
- Friends can see each other's beaver stats
- Friends cannot see each other's specific habits (privacy)

## Customization

### Theming
The app uses a warm amber/orange/yellow color palette. To customize:
- Edit `app/globals.css` for color tokens
- Update gradient classes in components
- Modify the beaver emoji (currently 🦫)

### Game Balance
To adjust difficulty:
- Change energy gain per habit in `scripts/002_create_triggers.sql`
- Modify mood thresholds in the trigger function
- Adjust energy decay rate in `scripts/003_energy_decay.sql`

## Roadmap

Potential future features:
- Streak tracking
- Daily/weekly challenges
- Beaver customization (different animals, accessories)
- Habit categories and tags
- Statistics and insights
- Push notifications
- Mobile app

## Contributing

This is a v0-generated project. Feel free to fork and customize for your needs!

## License

MIT

## Support

For issues or questions, open a support ticket at vercel.com/help
