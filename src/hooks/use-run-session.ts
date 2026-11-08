import { usePreventRemove, useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import { ERROR_MESSAGES } from "@/constants/errors";
import { useNow } from "@/hooks/use-now";
import { useRun } from "@/hooks/use-run";
import {
  discardRun,
  finishRun,
  hasTrackingPermission,
  pauseRun,
  requestTrackingPermission,
  resumeRun,
  startRun,
} from "@/services/run-tracking";
import { saveRun } from "@/services/runs";
import type { SavedRoute } from "@/types/saved-route";
import {
  currentPaceSecondsPerMile,
  lastTrackPoint,
  paceSecondsPerMile,
  runDistanceMeters,
  runElapsedMs,
} from "@/utils/run-stats";

export type PermissionStep = "hidden" | "explain" | "location-denied" | "background-denied";

export function useRunSession(route: SavedRoute) {
  const router = useRouter();
  const run = useRun();
  const isThisRoute = run.routeId === route.id;
  const status = isThisRoute ? run.status : "idle";
  const isFinished = status === "finished";
  const hasUnsavedRun = status === "running" || status === "paused" || isFinished;
  const now = useNow(status === "running");

  const [permissionStep, setPermissionStep] = useState<PermissionStep>("hidden");
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);

  const elapsedMs = isThisRoute ? runElapsedMs(run, now) : 0;
  const distanceMeters = isThisRoute ? runDistanceMeters(run) : 0;

  const disablePrevention = usePreventRemove(hasUnsavedRun && !isLeaving, ({ repeat }) => {
    Alert.alert(
      isFinished ? "Leave without saving?" : "End this run?",
      isFinished
        ? "Your run hasn't been saved."
        : "Finish your run to see your stats, or discard it.",
      [
        { text: isFinished ? "Stay" : "Keep running", style: "cancel" },
        {
          text: "Discard run",
          style: "destructive",
          onPress: async () => {
            setIsLeaving(true);
            repeat();
            await discardRun();
          },
        },
      ],
    );
  });

  const leave = async () => {
    setIsLeaving(true);
    disablePrevention();
    await discardRun();
    router.back();
  };

  const perform = (action: () => Promise<void>, failure: string) => async () => {
    setIsBusy(true);
    setError(null);
    try {
      await action();
    } catch {
      setError(failure);
    } finally {
      setIsBusy(false);
    }
  };

  const begin = perform(async () => {
    if (await hasTrackingPermission()) {
      await startRun(route.id);
    } else {
      setPermissionStep("explain");
    }
  }, ERROR_MESSAGES.runStartFailed);

  const requestPermission = perform(async () => {
    const result = await requestTrackingPermission();
    if (result !== "granted") {
      setPermissionStep(result);
      return;
    }
    setPermissionStep("hidden");
    await startRun(route.id);
  }, ERROR_MESSAGES.runStartFailed);

  const save = perform(async () => {
    if (run.startedAt === null || run.finishedAt === null) return;
    await saveRun({
      routeId: route.id,
      startedAt: run.startedAt,
      finishedAt: run.finishedAt,
      durationMs: elapsedMs,
      track: run.segments,
    });
    await leave();
  }, ERROR_MESSAGES.runSaveFailed);

  const discard = () => {
    Alert.alert("Discard this run?", "It won't be saved.", [
      { text: "Cancel", style: "cancel" },
      { text: "Discard", style: "destructive", onPress: leave },
    ]);
  };

  return {
    status,
    isBusy,
    error,
    permissionStep,
    closePermission: () => setPermissionStep("hidden"),
    trail: isThisRoute ? run.segments : [],
    currentLocation: isThisRoute ? lastTrackPoint(run) : null,
    stats: {
      distanceMeters,
      routeMeters: route.distanceMeters,
      remainingMeters: Math.max(0, route.distanceMeters - distanceMeters),
      elapsedMs,
      averagePace: paceSecondsPerMile(distanceMeters, elapsedMs / 1000),
      currentPace: isThisRoute ? currentPaceSecondsPerMile(run) : null,
    },
    begin,
    requestPermission,
    pause: perform(pauseRun, ERROR_MESSAGES.generic),
    resume: perform(resumeRun, ERROR_MESSAGES.runStartFailed),
    finish: perform(finishRun, ERROR_MESSAGES.generic),
    save,
    discard,
  };
}
