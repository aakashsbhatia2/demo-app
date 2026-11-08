import { LOCATION_SHARE_INTERVAL_MS } from "@/constants/group-runs";
import { shareLocation } from "@/services/group-runs";
import { runStore } from "@/stores/run-store";
import { runDistanceMeters } from "@/utils/run-stats";

let lastSharedAt = 0;

export async function shareGroupRunLocation(now = Date.now()) {
  const run = runStore.getState();
  if (run.status !== "running" || run.groupRunId === null) return;
  if (now - lastSharedAt < LOCATION_SHARE_INTERVAL_MS) return;

  const latest = run.segments.at(-1)?.at(-1);
  if (!latest) return;

  lastSharedAt = now;
  try {
    await shareLocation(run.groupRunId, {
      latitude: latest.latitude,
      longitude: latest.longitude,
      timestamp: latest.timestamp,
      distanceMeters: Math.round(runDistanceMeters(run)),
    });
  } catch (error) {
    console.warn(`Sharing location failed: ${(error as Error).message}`);
  }
}
