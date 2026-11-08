# Running companion

An Expo app for planning running routes. Tap the map to build a route, close it into a loop, and see the distance.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add your Google Maps key for Android. Copy `.env.example` to `.env.local` and fill in `GOOGLE_MAPS_ANDROID_API_KEY`. Git ignores `.env.local`, so the key stays off GitHub.

3. Build and run the app. This uses a development build, not Expo Go:

   ```bash
   npm run android   # or: npm run ios (needs Xcode)
   ```

After the first build, `npx expo start` is enough. Rebuild when you add a library with native code or change `app.json` / `app.config.ts`:

```bash
npx expo prebuild --clean
npm run android
```

## Project layout

- `src/app/` – screens (each file is a route)
- `src/components/` – reusable UI, such as the route map
- `src/hooks/` – reusable logic, such as finding the user's location
- `src/utils/` – plain helpers, such as distance maths
- `app.config.ts` – adds secrets from `.env.local` to the settings in `app.json`

## Checks

```bash
npm run typecheck
npm run lint
```
