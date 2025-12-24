# Installation Guide - Dam Tracker Web App

## Quick Start

### Option 1: Use the shadcn CLI (Recommended)

The fastest way to get started is using the shadcn CLI:

```bash
npx shadcn@latest init dam-tracker
```

Follow the prompts to set up the project, then the code will be automatically installed.

### Option 2: Download and Install Manually

1. **Download the project**
   - Click the three dots (⋯) in the top right of the v0 interface
   - Select "Download ZIP"
   - Extract the ZIP file to your desired location

2. **Install dependencies**
   ```bash
   cd dam-tracker
   npm install
   ```

3. **Set up environment variables**
   
   Your Supabase environment variables are already configured in the Vercel project. If running locally, create a `.env.local` file:
   
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
   ```

4. **Run the database scripts**
   
   The SQL scripts in the `/scripts` folder need to be executed in order:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste each script (001, 002, 003) and run them in order
   
   Or you can run them directly from v0 if you're still in the chat.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## Deployment

### Deploy to Vercel (Recommended)

1. Click the "Publish" button in the top right of the v0 interface
2. Your environment variables will be automatically configured
3. Your app will be live in seconds!

### Manual Deployment

```bash
npm run build
npm start
```

## Troubleshooting

- **Supabase connection issues**: Verify your environment variables are set correctly
- **Database errors**: Make sure all SQL scripts have been executed in order
- **Auth redirect issues**: Check that `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` matches your local URL

## Support

If you need help, visit https://vercel.com/help
