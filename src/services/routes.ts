import { ERROR_MESSAGES } from "@/constants/errors";
import { API_ROUTES } from "@/constants/routes";
import { apiRequest } from "@/services/api-client";
import type { SavedRoute, SaveRouteInput } from "@/types/saved-route";

export async function saveRoute(input: SaveRouteInput): Promise<SavedRoute> {
  const data = await apiRequest(API_ROUTES.routes, { method: "POST", body: input });
  if (!isSavedRoute(data)) throw new Error(ERROR_MESSAGES.invalidReply);
  return data;
}

export async function updateRoute(id: string, input: SaveRouteInput): Promise<SavedRoute> {
  const data = await apiRequest(API_ROUTES.route(id), { method: "PUT", body: input });
  if (!isSavedRoute(data)) throw new Error(ERROR_MESSAGES.invalidReply);
  return data;
}

export async function getRoute(id: string): Promise<SavedRoute> {
  const data = await apiRequest(API_ROUTES.route(id));
  if (!isSavedRoute(data)) throw new Error(ERROR_MESSAGES.invalidReply);
  return data;
}

export async function deleteRoute(id: string): Promise<void> {
  await apiRequest(API_ROUTES.route(id), { method: "DELETE" });
}

export async function listRoutes(): Promise<SavedRoute[]> {
  const data = await apiRequest(API_ROUTES.routes);
  if (!Array.isArray(data) || !data.every(isSavedRoute)) throw new Error(ERROR_MESSAGES.invalidReply);
  return data;
}

function isSavedRoute(value: unknown): value is SavedRoute {
  const route = value as SavedRoute | null;
  return (
    typeof route?.id === "string" &&
    typeof route.name === "string" &&
    Array.isArray(route.points) &&
    Array.isArray(route.path) &&
    typeof route.distanceMeters === "number" &&
    typeof route.isLoop === "boolean" &&
    typeof route.createdAt === "string"
  );
}
