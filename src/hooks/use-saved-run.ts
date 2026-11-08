import { useEffect, useState } from "react";

import { getRoute } from "@/services/routes";
import { getRun } from "@/services/runs";
import type { SavedRoute } from "@/types/saved-route";
import type { SavedRun } from "@/types/saved-run";

type LoadedRun = {
  run: SavedRun;
  route: SavedRoute | null;
};

export function useSavedRun(id: string) {
  const [loaded, setLoaded] = useState<LoadedRun | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    loadRun(id)
      .then((result) => {
        if (isActive) setLoaded(result);
      })
      .catch((caught: Error) => {
        if (isActive) setError(caught.message);
      });

    return () => {
      isActive = false;
    };
  }, [id]);

  return {
    run: loaded?.run ?? null,
    route: loaded?.route ?? null,
    error,
    isLoading: loaded === null && error === null,
  };
}

async function loadRun(id: string): Promise<LoadedRun> {
  const run = await getRun(id);
  const route = run.routeId ? await getRoute(run.routeId).catch(() => null) : null;
  return { run, route };
}
