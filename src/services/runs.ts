import { ERROR_MESSAGES } from "@/constants/errors";
import { API_ROUTES } from "@/constants/routes";
import { apiRequest } from "@/services/api-client";
import { isLatLng } from "@/types/lat-lng";
import type { SaveRunInput, SavedRun, SavedRunSummary } from "@/types/saved-run";

export async function saveRun(input: SaveRunInput): Promise<SavedRunSummary> {
  const data = await apiRequest(API_ROUTES.runs, { method: "POST", body: input });
  if (!isSavedRunSummary(data)) throw new Error(ERROR_MESSAGES.invalidReply);
  return data;
}

export async function listRuns(): Promise<SavedRunSummary[]> {
  const data = await apiRequest(API_ROUTES.runs);
  if (!Array.isArray(data) || !data.every(isSavedRunSummary)) {
    throw new Error(ERROR_MESSAGES.invalidReply);
  }
  return data;
}

export async function getRun(id: string): Promise<SavedRun> {
  const data = await apiRequest(API_ROUTES.run(id));
  if (!isSavedRun(data)) throw new Error(ERROR_MESSAGES.invalidReply);
  return data;
}

function isSavedRunSummary(value: unknown): value is SavedRunSummary {
  const run = value as SavedRunSummary | null;
  return (
    typeof run?.id === "string" &&
    typeof run.startedAt === "string" &&
    typeof run.finishedAt === "string" &&
    typeof run.durationMs === "number" &&
    typeof run.distanceMeters === "number"
  );
}

function isSavedRun(value: unknown): value is SavedRun {
  const run = value as SavedRun | null;
  return (
    isSavedRunSummary(run) &&
    Array.isArray(run.track) &&
    run.track.every((segment) => Array.isArray(segment) && segment.every(isLatLng))
  );
}
