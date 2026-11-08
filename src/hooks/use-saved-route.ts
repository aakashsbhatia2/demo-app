import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { getRoute } from "@/services/routes";
import type { SavedRoute } from "@/types/saved-route";

export function useSavedRoute(id: string) {
  const [route, setRoute] = useState<SavedRoute | null>(null);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      getRoute(id)
        .then((loaded) => {
          if (!isActive) return;
          setRoute(loaded);
          setError(null);
        })
        .catch((caught: Error) => {
          if (isActive) setError(caught.message);
        });

      return () => {
        isActive = false;
      };
    }, [id]),
  );

  return { route, error, isLoading: route === null && error === null };
}
