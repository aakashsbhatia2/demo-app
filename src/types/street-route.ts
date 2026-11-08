import type { LatLng } from "@/types/lat-lng";

export type StreetRouteRequest = {
  points: LatLng[];
  isLoop: boolean;
};

export type StreetRoute = {
  path: LatLng[];
  distanceMeters: number;
};
