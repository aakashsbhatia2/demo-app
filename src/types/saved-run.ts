import type { TrackPoint } from "@/types/run";

export type SaveRunInput = {
  routeId: string;
  startedAt: number;
  finishedAt: number;
  durationMs: number;
  track: TrackPoint[][];
};

export type SavedRunSummary = {
  id: string;
  routeId: string | null;
  routeName: string | null;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  distanceMeters: number;
  createdAt: string;
};

export type SavedRun = SavedRunSummary & {
  track: TrackPoint[][];
};
