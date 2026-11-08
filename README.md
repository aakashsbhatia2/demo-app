# Running companion

An Expo app for planning running routes. Tap the map to build a route, close it into a loop, and see the distance.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in your server address (`EXPO_PUBLIC_API_URL`) and Mapbox public token (`EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN`). Git ignores `.env.local`.

3. Build and run the app. This uses a development build, not Expo Go:

   ```bash
   npm run android   # or: npm run ios (needs Xcode)
   ```

After the first build, `npx expo start` is enough. Rebuild when you add a library with native code or change `app.json`:

```bash
npx expo prebuild --clean
npm run android
```

## Project layout

- `src/app/` – screens (each file is a route)
- `src/components/` – reusable UI, such as the route map
- `src/hooks/` – reusable logic, such as finding the user's location
- `src/utils/` – plain helpers, such as distance maths

## Checks

```bash
npm run typecheck
npm run lint
```
