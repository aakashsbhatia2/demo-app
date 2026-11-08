import {
  Camera,
  LocationPuck,
  MapView,
  setAccessToken,
  StyleURL,
  UserTrackingMode,
} from "@rnmapbox/maps";
import { ActivityIndicator, StyleSheet } from "react-native";

import { Centered } from "@/components/centered";
import { MapLines, MapRunners, MapWaypoints } from "@/components/route-map/map-layers";
import { ERROR_MESSAGES } from "@/constants/errors";
import {
  FOLLOW_ANIMATION_MS,
  MAPBOX_ACCESS_TOKEN,
  RUN_PITCH,
  RUN_ZOOM,
  STREET_ZOOM,
} from "@/constants/map";
import { colors } from "@/constants/theme";
import { useStartLocation } from "@/hooks/use-start-location";
import { toPosition } from "@/utils/geojson";
import type { RouteMapProps } from "./types";

if (MAPBOX_ACCESS_TOKEN) setAccessToken(MAPBOX_ACCESS_TOKEN);

export function RouteMap({
  waypoints,
  path,
  center,
  trail = [],
  runners = [],
  followUser = false,
  onMapPress,
}: RouteMapProps) {
  const start = useStartLocation();

  if (!MAPBOX_ACCESS_TOKEN) {
    return <Centered message={ERROR_MESSAGES.mapboxTokenMissing} />;
  }

  if (!center && start.status === "loading") {
    return (
      <Centered>
        <ActivityIndicator />
      </Centered>
    );
  }

  const initialCenter = center ?? (start.status === "ready" ? start.location : null);
  const showUserLocation = followUser || (start.status === "ready" && start.permissionGranted);

  return (
    <MapView
      style={StyleSheet.absoluteFill}
      styleURL={StyleURL.Outdoors}
      scaleBarEnabled={false}
      onPress={(feature) => {
        if (!onMapPress) return;
        const [longitude, latitude] = feature.geometry.coordinates;
        onMapPress({ latitude, longitude });
      }}
    >
      <Camera
        defaultSettings={
          initialCenter
            ? { centerCoordinate: toPosition(initialCenter), zoomLevel: STREET_ZOOM }
            : undefined
        }
        followUserLocation={followUser}
        followUserMode={UserTrackingMode.FollowWithCourse}
        followZoomLevel={RUN_ZOOM}
        followPitch={RUN_PITCH}
        animationDuration={FOLLOW_ANIMATION_MS}
      />
      {showUserLocation ? <LocationPuck puckBearingEnabled puckBearing="course" /> : null}
      <MapLines id="route" lines={[path]} color={colors.primary} />
      <MapLines id="trail" lines={trail} color={colors.trail} />
      <MapWaypoints points={waypoints} />
      <MapRunners runners={runners} />
    </MapView>
  );
}
