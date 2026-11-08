import type { LatLng } from "@/types/lat-lng";

export const METERS_PER_MILE = 1609.344;

const EARTH_RADIUS_METERS = 6_371_000;

const DISTANCE_PLACEHOLDER = "–– mi";

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export function distanceBetween(a: LatLng, b: LatLng): number {
  const dLat = toRadians(b.latitude - a.latitude);
  const dLng = toRadians(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(a.latitude)) *
      Math.cos(toRadians(b.latitude)) *
      Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(h));
}

export function pathDistance(path: LatLng[]): number {
  let total = 0;
  for (let i = 1; i < path.length; i++) {
    total += distanceBetween(path[i - 1], path[i]);
  }
  return total;
}

export function formatDistance(meters: number | null): string {
  if (meters === null) return DISTANCE_PLACEHOLDER;
  return `${(meters / METERS_PER_MILE).toFixed(2)} mi`;
}
