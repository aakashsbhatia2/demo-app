import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { listRoutes } from "@/services/routes";
import type { SavedRoute } from "@/types/saved-route";

export function useMyRoutes() {
  const [routes, setRoutes] = useState<SavedRoute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      listRoutes()
        .then((loaded) => {
          if (!isActive) return;
          setRoutes(loaded);
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

  return { routes, isLoading, error };
}
