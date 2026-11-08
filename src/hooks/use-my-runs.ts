import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { listRuns } from "@/services/runs";
import type { SavedRunSummary } from "@/types/saved-run";

export function useMyRuns() {
  const [runs, setRuns] = useState<SavedRunSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      listRuns()
        .then((loaded) => {
          if (!isActive) return;
          setRuns(loaded);
          setError(null);
        })
        .catch((caught: Error) => {
          if (isActive) setError(caught.message);
        })
        .finally(() => {
          if (isActive) setIsLoading(false);
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  return { runs, isLoading, error };
}
