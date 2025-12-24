# Dam Tracker Mobile App - Installation Guide

## Prerequisites

- Node.js 18+ installed
- iOS Simulator (Mac only) or Android Emulator
- Expo Go app on your physical device (optional)

## Installation Steps

### 1. Install Dependencies

```bash
cd mobile
npm install
```

**Note:** This app uses Expo SDK 54. Make sure you have the latest version of Expo Go installed on your device (version 54.0.0 or higher).

### 2. Set Up Environment Variables

Create a `.env` file in the `mobile` directory:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings or they're already configured in your Vercel project.

### 3. Start the Development Server

```bash
npm start
```

This will start the Expo development server and show you a QR code.

### 4. Run the App

You have several options:

#### Option A: Physical Device (Easiest)
1. Install the Expo Go app from the App Store (iOS) or Google Play (Android)
2. **Make sure you have Expo Go version 54.0.0 or later installed**
3. Scan the QR code shown in your terminal
4. The app will load on your device

#### Option B: iOS Simulator (Mac only)
Press `i` in the terminal after starting the dev server

#### Option C: Android Emulator
Press `a` in the terminal after starting the dev server

## Dev Mode

The app includes a guest mode that works without Supabase authentication. This is perfect for testing:

1. Launch the app
2. Tap "Continue as Guest (Dev Mode)"
3. All data is stored locally using AsyncStorage

## Features Working in Dev Mode

- Create and complete habits
- Track beaver energy
- Add friends (mock data)
- View calendar history
- All UI features and animations

## Production Setup

To use the app with real Supabase authentication:

1. Make sure your Supabase database has the required tables (use the SQL scripts from the web app)
2. Set up your environment variables with valid Supabase credentials
3. Sign up for an account in the app
4. Your data will be synced to Supabase

## Building for Production

### iOS
```bash
npx expo build:ios
```

### Android
```bash
npx expo build:android
```

Or use EAS Build for a more modern approach:
```bash
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

## Troubleshooting

### SDK Version Mismatch Error
If you see an error like "The installed version of Expo Go is for SDK 54.0.0, but the project uses SDK 51":
- Update Expo Go on your device to the latest version (54.0.0+)
- Or run `npm install` again to ensure all dependencies are up to date
- Clear the Metro bundler cache: `npx expo start -c`

### QR Code Not Scanning
- Make sure your phone and computer are on the same WiFi network
- Try using the "Tunnel" connection method: `npm start --tunnel`

### App Not Loading
- Clear the Expo cache: `npx expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Supabase Connection Issues
- Verify your environment variables are set correctly
- Check that your Supabase project is active
- Try using guest mode first to verify the app works

## Support

For issues, visit https://vercel.com/help
