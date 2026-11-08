export type LatLng = {
  latitude: number;
  longitude: number;
};

export function isLatLng(value: unknown): value is LatLng {
  const point = value as LatLng | null;
  return (
    typeof point?.latitude === "number" &&
    typeof point?.longitude === "number" &&
    Math.abs(point.latitude) <= 90 &&
    Math.abs(point.longitude) <= 180
  );
}
