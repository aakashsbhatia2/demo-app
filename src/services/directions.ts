import { ERROR_MESSAGES } from "@/constants/errors";
import { API_ROUTES } from "@/constants/routes";
import { apiRequest } from "@/services/api-client";
import { isLatLng } from "@/types/lat-lng";
import type { StreetRoute, StreetRouteRequest } from "@/types/street-route";

export async function fetchStreetRoute(request: StreetRouteRequest): Promise<StreetRoute> {
  const data = await apiRequest(API_ROUTES.streetRoute, { method: "POST", body: request });
  if (!isStreetRoute(data)) throw new Error(ERROR_MESSAGES.invalidReply);
  return data;
}

function isStreetRoute(value: unknown): value is StreetRoute {
  const route = value as StreetRoute | null;
  return (
    typeof route?.distanceMeters === "number" &&
    Array.isArray(route.path) &&
    route.path.every(isLatLng)
  );
}
