import * as Location from "expo-location";
import { useEffect, useState } from "react";

import type { LatLng } from "@/types/lat-lng";

const LOCATION_TIMEOUT_MS = 8000;

type FoundLocation = {
  location: LatLng | null;
  permissionGranted: boolean;
};

type StartLocation = { status: "loading" } | ({ status: "ready" } & FoundLocation);

export function useStartLocation(): StartLocation {
  const [state, setState] = useState<StartLocation>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    findStartLocation().then((found) => {
      if (!cancelled) setState({ status: "ready", ...found });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

async function findStartLocation(): Promise<FoundLocation> {
  const permission = await Location.requestForegroundPermissionsAsync().catch((error: Error) => {
    console.warn(`Location permission failed: ${error.message}`);
    return null;
  });

  if (!permission?.granted) return { location: null, permissionGranted: false };

  return { location: await getCurrentLocation(), permissionGranted: true };
}

async function getCurrentLocation(): Promise<LatLng | null> {
  try {
    const position =
      (await Location.getLastKnownPositionAsync()) ??
      (await withTimeout(
        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
        LOCATION_TIMEOUT_MS,
      ));

    if (!position) return null;
    return { latitude: position.coords.latitude, longitude: position.coords.longitude };
  } catch (error) {
    console.warn(`Could not get location: ${(error as Error).message}`);
    return null;
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), ms);
  });

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}
