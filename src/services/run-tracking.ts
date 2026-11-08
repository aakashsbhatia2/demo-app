import * as Location from "expo-location";

import {
  LOCATION_DISTANCE_INTERVAL_METERS,
  LOCATION_UPDATE_INTERVAL_MS,
  RUN_NOTIFICATION,
  RUN_TRACKING_TASK,
} from "@/constants/run";
import { runStore } from "@/stores/run-store";

export type TrackingPermission = "granted" | "location-denied" | "background-denied";

export async function hasTrackingPermission(): Promise<boolean> {
  const background = await Location.getBackgroundPermissionsAsync();
  return background.granted;
}

export async function requestTrackingPermission(): Promise<TrackingPermission> {
  const foreground = await Location.requestForegroundPermissionsAsync();
  if (!foreground.granted) return "location-denied";

  const background = await Location.requestBackgroundPermissionsAsync();
  if (!background.granted) return "background-denied";

  return "granted";
}

export async function startRun(routeId: string) {
  runStore.start(routeId, Date.now());
  try {
    await startLocationUpdates();
  } catch (error) {
    runStore.reset();
    throw error;
  }
}

export async function pauseRun() {
  runStore.pause(Date.now());
  await stopLocationUpdates();
}

export async function resumeRun() {
  runStore.resume(Date.now());
  await startLocationUpdates();
}

export async function finishRun() {
  runStore.finish(Date.now());
  await stopLocationUpdates();
}

export async function discardRun() {
  await stopLocationUpdates();
  runStore.reset();
}

async function startLocationUpdates() {
  if (await Location.hasStartedLocationUpdatesAsync(RUN_TRACKING_TASK)) return;

  await Location.startLocationUpdatesAsync(RUN_TRACKING_TASK, {
    accuracy: Location.Accuracy.BestForNavigation,
    timeInterval: LOCATION_UPDATE_INTERVAL_MS,
    distanceInterval: LOCATION_DISTANCE_INTERVAL_METERS,
    activityType: Location.ActivityType.Fitness,
    pausesUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: RUN_NOTIFICATION.title,
      notificationBody: RUN_NOTIFICATION.body,
      notificationColor: RUN_NOTIFICATION.color,
      killServiceOnDestroy: true,
    },
  });
}

async function stopLocationUpdates() {
  if (await Location.hasStartedLocationUpdatesAsync(RUN_TRACKING_TASK)) {
    await Location.stopLocationUpdatesAsync(RUN_TRACKING_TASK);
  }
}
