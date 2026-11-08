import { useEffect, useState } from "react";

import { getRun } from "@/services/runs";
import type { SavedRun } from "@/types/saved-run";

export function useSavedRun(id: string) {
  const [run, setRun] = useState<SavedRun | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    getRun(id)
      .then((loaded) => {
        if (isActive) setRun(loaded);
      })
      .catch((caught: Error) => {
        if (isActive) setError(caught.message);
      });

    return () => {
      isActive = false;
    };
  }, [id]);

  return {
    run,
    route: run?.route ?? null,
    error,
    isLoading: run === null && error === null,
  };
}
