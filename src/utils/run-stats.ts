import { CURRENT_PACE_WINDOW_MS } from "@/constants/run";
import type { RunState } from "@/types/run";
import { METERS_PER_MILE, pathDistance } from "@/utils/distance";

const PACE_PLACEHOLDER = "––:––";

export function runElapsedMs(run: RunState, now: number): number {
  if (run.startedAt === null) return 0;
  const end = run.finishedAt ?? now;
  const currentPause = run.pausedAt === null ? 0 : now - run.pausedAt;
  return Math.max(0, end - run.startedAt - run.pausedDurationMs - currentPause);
}

export function runDistanceMeters(run: RunState): number {
  return run.segments.reduce((total, segment) => total + pathDistance(segment), 0);
}

export function currentPaceSecondsPerMile(run: RunState): number | null {
  const segment = run.segments.at(-1) ?? [];
  const last = segment.at(-1);
  if (!last) return null;

  const recent = segment.filter((point) => last.timestamp - point.timestamp <= CURRENT_PACE_WINDOW_MS);
  const seconds = (last.timestamp - recent[0].timestamp) / 1000;
  return paceSecondsPerMile(pathDistance(recent), seconds);
}

export function paceSecondsPerMile(meters: number, seconds: number): number | null {
  if (meters <= 0 || seconds <= 0) return null;
  return seconds / (meters / METERS_PER_MILE);
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(hours > 0 ? 2 : 1, "0");
  const ss = String(seconds).padStart(2, "0");
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function formatPace(secondsPerMile: number | null): string {
  if (secondsPerMile === null || !Number.isFinite(secondsPerMile)) return `${PACE_PLACEHOLDER} /mi`;
  const minutes = Math.floor(secondsPerMile / 60);
  const seconds = Math.round(secondsPerMile % 60);
  const [mm, ss] = seconds === 60 ? [minutes + 1, 0] : [minutes, seconds];
  return `${mm}:${String(ss).padStart(2, "0")} /mi`;
}
