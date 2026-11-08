import AsyncStorage from "@react-native-async-storage/async-storage";

import { RUN_PROGRESS_STORAGE_KEY } from "@/constants/run";
import type { RunState } from "@/types/run";

const RUN_STATUSES = ["running", "paused", "finished"];

export async function loadRunProgress(): Promise<RunState | null> {
  const saved = await AsyncStorage.getItem(RUN_PROGRESS_STORAGE_KEY);
  if (!saved) return null;
  const state: unknown = JSON.parse(saved);
  return isRunState(state) ? state : null;
}

export async function saveRunProgress(state: RunState) {
  await AsyncStorage.setItem(RUN_PROGRESS_STORAGE_KEY, JSON.stringify(state));
}

export async function clearRunProgress() {
  await AsyncStorage.removeItem(RUN_PROGRESS_STORAGE_KEY);
}

function isRunState(value: unknown): value is RunState {
  const state = value as RunState | null;
  return (
    RUN_STATUSES.includes(state?.status ?? "") &&
    typeof state?.routeId === "string" &&
    typeof state.startedAt === "number" &&
    Array.isArray(state.segments)
  );
}
