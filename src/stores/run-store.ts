import type { RunState, TrackPoint } from "@/types/run";

const INITIAL_STATE: RunState = {
  status: "idle",
  routeId: null,
  startedAt: null,
  finishedAt: null,
  pausedAt: null,
  pausedDurationMs: 0,
  segments: [],
};

let state: RunState = INITIAL_STATE;
const listeners = new Set<() => void>();

function setState(next: RunState) {
  state = next;
  listeners.forEach((listener) => listener());
}

export const runStore = {
  getState: () => state,

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  start(routeId: string, now: number) {
    setState({ ...INITIAL_STATE, status: "running", routeId, startedAt: now, segments: [[]] });
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
