import type { Href } from "expo-router";

import { HREFS } from "@/constants/routes";
import { getActiveGroupRun } from "@/services/group-runs";
import { resumeSavedRun } from "@/services/run-tracking";
import { runStore } from "@/stores/run-store";

let resumeTarget: Href | null = null;

export async function findRunToResume() {
  await resumeSavedRun();
  const { status, routeId, groupRunId } = runStore.getState();

  if (status !== "idle" && groupRunId) {
    resumeTarget = HREFS.groupRun(groupRunId);
    return;
  }
  if (status !== "idle" && routeId) {
    resumeTarget = HREFS.runRoute(routeId);
    return;
  }

  const activeGroupRun = await getActiveGroupRun().catch(() => null);
  resumeTarget = activeGroupRun ? HREFS.groupRun(activeGroupRun.id) : null;
}

export function takeResumeTarget() {
  const target = resumeTarget;
  resumeTarget = null;
  return target;
}
