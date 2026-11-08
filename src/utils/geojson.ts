import type { MapRunner } from "@/types/group-run";
import type { LatLng } from "@/types/lat-lng";

export type Position = [number, number];

export const toPosition = ({ latitude, longitude }: LatLng): Position => [longitude, latitude];

export function toLineCollection(lines: LatLng[][]): GeoJSON.FeatureCollection<GeoJSON.LineString> {
  return {
    type: "FeatureCollection",
    features: lines
      .filter((line) => line.length >= 2)
      .map((line) => ({
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: line.map(toPosition) },
      })),
  };
}

export function toPointCollection(points: LatLng[]): GeoJSON.FeatureCollection<GeoJSON.Point> {
  return {
    type: "FeatureCollection",
    features: points.map((point, index) => ({
      type: "Feature",
      properties: { isStart: index === 0 },
      geometry: { type: "Point", coordinates: toPosition(point) },
    })),
  };
}

export function toRunnerCollection(runners: MapRunner[]): GeoJSON.FeatureCollection<GeoJSON.Point> {
  return {
    type: "FeatureCollection",
    features: runners.map((runner) => ({
      type: "Feature",
      id: runner.id,
      properties: { label: runner.label, color: runner.color },
      geometry: { type: "Point", coordinates: toPosition(runner) },
    })),
  };
}
