import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_ANDROID_API_KEY;

  if (!googleMapsApiKey) {
    console.warn(
      "GOOGLE_MAPS_ANDROID_API_KEY is not set. The map will not load on Android. See .env.example.",
    );
  }

  return {
    ...config,
    name: config.name ?? "demo-app",
    slug: config.slug ?? "demo-app",
    android: {
      ...config.android,
      config: {
        ...config.android?.config,
        googleMaps: { apiKey: googleMapsApiKey },
      },
    },
    extra: {
      ...config.extra,
      hasGoogleMapsKey: Boolean(googleMapsApiKey),
    },
  };
};
