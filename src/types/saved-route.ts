import type { LatLng } from "@/types/lat-lng";

export type SaveRouteInput = {
  name: string;
  points: LatLng[];
  isLoop: boolean;
};

export type SavedRoute = {
  id: string;
  name: string;
  points: LatLng[];
  path: LatLng[];
  distanceMeters: number;
  isLoop: boolean;
  createdAt: string;
  updatedAt: string;
};
