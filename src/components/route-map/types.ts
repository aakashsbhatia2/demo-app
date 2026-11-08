import type { MapRunner } from "@/types/group-run";
import type { LatLng } from "@/types/lat-lng";

export type RouteMapProps = {
  waypoints: LatLng[];
  path: LatLng[];
  center?: LatLng;
  trail?: LatLng[][];
  runners?: MapRunner[];
  followUser?: boolean;
  onMapPress?: (point: LatLng) => void;
};
