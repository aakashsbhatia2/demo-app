import { useState } from "react";

import { useStreetRoute } from "@/hooks/use-street-route";
import type { LatLng } from "@/types/lat-lng";
import type { SavedRoute } from "@/types/saved-route";

const MIN_LOOP_POINTS = 3;

export function useRouteBuilder(initialRoute?: SavedRoute) {
  const [waypoints, setWaypoints] = useState<LatLng[]>(initialRoute?.points ?? []);
  const [isLoop, setIsLoop] = useState(initialRoute?.isLoop ?? false);
  const { route, updateRoute } = useStreetRoute(
    initialRoute
      ? { path: initialRoute.path, distanceMeters: initialRoute.distanceMeters }
      : null,
  );

  const path = route?.path ?? (isLoop ? [...waypoints, waypoints[0]] : waypoints);
  const distance = waypoints.length < 2 ? 0 : (route?.distanceMeters ?? null);

  const addPoint = (point: LatLng) => {
    if (isLoop) return;
    const next = [...waypoints, point];
    setWaypoints(next);
    updateRoute(next, false);
  };

  const undo = () => {
    if (isLoop) {
      setIsLoop(false);
      updateRoute(waypoints, false);
      return;
    }
    const next = waypoints.slice(0, -1);
    setWaypoints(next);
    updateRoute(next, false);
  };

  const closeLoop = () => {
    if (waypoints.length < MIN_LOOP_POINTS) return;
    setIsLoop(true);
    updateRoute(waypoints, true);
  };

  const clear = () => {
    setWaypoints([]);
    setIsLoop(false);
    updateRoute([], false);
  };

  return {
    waypoints,
    path,
    distance,
    isLoop,
    canUndo: waypoints.length > 0,
    canCloseLoop: waypoints.length >= MIN_LOOP_POINTS && !isLoop,
    addPoint,
    undo,
    closeLoop,
    clear,
  };
}
