import type { LocationObject } from "expo-location";
import * as TaskManager from "expo-task-manager";

import { MAX_LOCATION_ACCURACY_METERS, RUN_TRACKING_TASK } from "@/constants/run";
import { runStore } from "@/stores/run-store";
import type { TrackPoint } from "@/types/run";

type LocationTaskData = {
  locations: LocationObject[];
};

TaskManager.defineTask<LocationTaskData>(RUN_TRACKING_TASK, async ({ data, error }) => {
  if (error) {
    console.warn(`Run tracking failed: ${error.message}`);
    return;
  }

  const points = (data?.locations ?? [])
    .filter((location) => (location.coords.accuracy ?? Infinity) <= MAX_LOCATION_ACCURACY_METERS)
    .map(toTrackPoint);

  runStore.addPoints(points);
});

function toTrackPoint(location: LocationObject): TrackPoint {
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    timestamp: location.timestamp,
  };
}
