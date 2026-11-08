import { useRef, useState } from "react";

import { fetchStreetRoute } from "@/services/directions";
import type { LatLng } from "@/types/lat-lng";
import type { StreetRoute } from "@/types/street-route";

export function useStreetRoute(initialRoute: StreetRoute | null = null) {
  const [route, setRoute] = useState<StreetRoute | null>(initialRoute);
  const latestRequest = useRef(0);

  const updateRoute = (points: LatLng[], isLoop: boolean) => {
    const requestId = ++latestRequest.current;

    if (points.length < 2) {
      setRoute(null);
      return;
    }

    fetchStreetRoute({ points, isLoop })
      .then((result) => {
        if (requestId === latestRequest.current) setRoute(result);
      })
      .catch((error: Error) => {
        if (requestId !== latestRequest.current) return;
        setRoute(null);
        console.warn(`Street route failed: ${error.message}`);
      });
  };

  return { route, updateRoute };
}
