import Constants from "expo-constants";
import { GoogleMaps } from "expo-maps";
import { useEffect, useRef } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { Centered } from "@/components/centered";
import type { RouteMapProps } from "./types";
import { ERROR_MESSAGES } from "@/constants/errors";
import { FOLLOW_ANIMATION_MS, ROUTE_WIDTH, STREET_ZOOM } from "@/constants/map";
import { colors } from "@/constants/theme";
import { useStartLocation } from "@/hooks/use-start-location";
import type { LatLng } from "@/types/lat-lng";

const hasGoogleMapsKey = Constants.expoConfig?.extra?.hasGoogleMapsKey === true;

export function RouteMap({
  waypoints,
  path,
  center,
  trail = [],
  followLocation = null,
  onMapPress,
}: RouteMapProps) {
  const start = useStartLocation();
  const mapRef = useRef<GoogleMaps.MapView>(null);

  useEffect(() => {
    if (!followLocation) return;
    mapRef.current
      ?.setCameraPosition({ coordinates: followLocation, duration: FOLLOW_ANIMATION_MS })
      .catch(() => {});
  }, [followLocation]);

  if (!hasGoogleMapsKey) {
    return <Centered message={ERROR_MESSAGES.mapsKeyMissing} />;
  }

  if (!center && start.status === "loading") {
    return (
      <Centered>
        <ActivityIndicator />
      </Centered>
    );
  }

  const cameraCenter = center ?? (start.status === "ready" ? start.location : null);
  const showMyLocation = start.status === "ready" && start.permissionGranted;

  return (
    <GoogleMaps.View
      ref={mapRef}
      style={StyleSheet.absoluteFill}
      cameraPosition={cameraCenter ? { coordinates: cameraCenter, zoom: STREET_ZOOM } : undefined}
      polylines={[
        ...toPolylines("route", [path], colors.primary),
        ...toPolylines("trail", trail, colors.trail),
      ]}
      markers={waypoints.map((point, index) => ({
        id: `waypoint-${index}`,
        coordinates: point,
        title: index === 0 ? "Start" : `Point ${index + 1}`,
      }))}
      properties={{ isMyLocationEnabled: showMyLocation || followLocation !== null }}
      uiSettings={{ myLocationButtonEnabled: showMyLocation }}
      onMapClick={({ coordinates: { latitude, longitude } }) => {
        if (onMapPress && latitude != null && longitude != null) {
          onMapPress({ latitude, longitude });
        }
      }}
    />
  );
}

function toPolylines(id: string, lines: LatLng[][], color: string) {
  return lines
    .filter((line) => line.length >= 2)
    .map((line, index) => ({ id: `${id}-${index}`, coordinates: line, color, width: ROUTE_WIDTH }));
}
