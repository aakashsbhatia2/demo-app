import type { LatLng } from "@/types/lat-lng";

export type RunStatus = "idle" | "running" | "paused" | "finished";

export type TrackPoint = LatLng & {
  timestamp: number;
};

export type RunState = {
  status: RunStatus;
  routeId: string | null;
  groupRunId: string | null;
  startedAt: number | null;
  finishedAt: number | null;
  pausedAt: number | null;
  pausedDurationMs: number;
  segments: TrackPoint[][];
};
