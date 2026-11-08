import { clearRunProgress, loadRunProgress, saveRunProgress } from "@/services/run-progress";
import type { RunState, TrackPoint } from "@/types/run";

const INITIAL_STATE: RunState = {
  status: "idle",
  routeId: null,
  groupRunId: null,
  startedAt: null,
  finishedAt: null,
  pausedAt: null,
  pausedDurationMs: 0,
  segments: [],
};

let state: RunState = INITIAL_STATE;
let restoring: Promise<void> | null = null;
let pendingWrite: Promise<void> = Promise.resolve();
const listeners = new Set<() => void>();

function notify(next: RunState) {
  state = next;
  listeners.forEach((listener) => listener());
}

function setState(next: RunState) {
  notify(next);
  persist(next);
}

function persist(next: RunState) {
  pendingWrite = pendingWrite
    .then(() => (next.status === "idle" ? clearRunProgress() : saveRunProgress(next)))
    .catch((error: Error) => console.warn(`Saving run progress failed: ${error.message}`));
}

async function loadSavedRun() {
  try {
    const saved = await loadRunProgress();
    if (saved && state.status === "idle") notify({ ...saved, groupRunId: saved.groupRunId ?? null });
  } catch (error) {
    console.warn(`Loading run progress failed: ${(error as Error).message}`);
  }
}

export const runStore = {
  getState: () => state,

  restore() {
    restoring ??= loadSavedRun();
    return restoring;
  },

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  start(routeId: string, groupRunId: string | null, now: number) {
    setState({
      ...INITIAL_STATE,
      status: "running",
      routeId,
      groupRunId,
      startedAt: now,
      segments: [[]],
    });
  },

  pause(now: number) {
    if (state.status !== "running") return;
    setState({ ...state, status: "paused", pausedAt: now });
  },

  resume(now: number) {
    if (state.status !== "paused" || state.pausedAt === null) return;
    setState({
      ...state,
      status: "running",
      pausedAt: null,
      pausedDurationMs: state.pausedDurationMs + (now - state.pausedAt),
      segments: [...state.segments, []],
    });
  },

  finish(now: number) {
    if (state.status !== "running" && state.status !== "paused") return;
    const pausedDurationMs =
      state.pausedAt === null ? state.pausedDurationMs : state.pausedDurationMs + (now - state.pausedAt);
    setState({ ...state, status: "finished", finishedAt: now, pausedAt: null, pausedDurationMs });
  },

  addPoints(points: TrackPoint[]) {
    if (state.status !== "running" || points.length === 0) return;
    const segments = state.segments.slice(0, -1);
    const current = state.segments.at(-1) ?? [];
    setState({ ...state, segments: [...segments, [...current, ...points]] });
  },

  reset() {
    setState(INITIAL_STATE);
  },
};
