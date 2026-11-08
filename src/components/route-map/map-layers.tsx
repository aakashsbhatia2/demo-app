import { CircleLayer, LineLayer, ShapeSource, SymbolLayer } from "@rnmapbox/maps";

import {
  ROUTE_WIDTH,
  RUNNER_BORDER_WIDTH,
  RUNNER_LABEL_SIZE,
  RUNNER_RADIUS,
  WAYPOINT_BORDER_WIDTH,
  WAYPOINT_RADIUS,
} from "@/constants/map";
import { colors } from "@/constants/theme";
import type { MapRunner } from "@/types/group-run";
import type { LatLng } from "@/types/lat-lng";
import { toLineCollection, toPointCollection, toRunnerCollection } from "@/utils/geojson";

type LinesProps = {
  id: string;
  lines: LatLng[][];
  color: string;
};

export function MapLines({ id, lines, color }: LinesProps) {
  return (
    <ShapeSource id={`${id}-source`} shape={toLineCollection(lines)}>
      <LineLayer
        id={`${id}-line`}
        style={{ lineColor: color, lineWidth: ROUTE_WIDTH, lineCap: "round", lineJoin: "round" }}
      />
    </ShapeSource>
  );
}

type WaypointsProps = {
  points: LatLng[];
};

export function MapWaypoints({ points }: WaypointsProps) {
  return (
    <ShapeSource id="waypoints-source" shape={toPointCollection(points)}>
      <CircleLayer
        id="waypoints-circles"
        style={{
          circleRadius: WAYPOINT_RADIUS,
          circleColor: ["case", ["get", "isStart"], colors.text, colors.primary],
          circleStrokeColor: colors.white,
          circleStrokeWidth: WAYPOINT_BORDER_WIDTH,
        }}
      />
    </ShapeSource>
  );
}

type RunnersProps = {
  runners: MapRunner[];
};

export function MapRunners({ runners }: RunnersProps) {
  return (
    <ShapeSource id="runners-source" shape={toRunnerCollection(runners)}>
      <CircleLayer
        id="runners-circles"
        style={{
          circleRadius: RUNNER_RADIUS,
          circleColor: ["get", "color"],
          circleStrokeColor: colors.white,
          circleStrokeWidth: RUNNER_BORDER_WIDTH,
        }}
      />
      <SymbolLayer
        id="runners-labels"
        style={{
          textField: ["get", "label"],
          textSize: RUNNER_LABEL_SIZE,
          textColor: colors.white,
          textAllowOverlap: true,
          textIgnorePlacement: true,
        }}
      />
    </ShapeSource>
  );
}
