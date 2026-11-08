import { useSyncExternalStore } from "react";

import { runStore } from "@/stores/run-store";

export function useRun() {
  return useSyncExternalStore(runStore.subscribe, runStore.getState);
}
