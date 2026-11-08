import { Centered } from "@/components/centered";
import { ERROR_MESSAGES } from "@/constants/errors";
import type { RouteMapProps } from "./types";

export function RouteMap(_props: RouteMapProps) {
  return <Centered message={ERROR_MESSAGES.mapsNativeOnly} />;
}
