import { ERROR_MESSAGES } from "@/constants/errors";
import { API_ROUTES } from "@/constants/routes";
import { apiRequest } from "@/services/api-client";
import type { PublicUser } from "@/types/user";

export async function searchUsers(query: string): Promise<PublicUser[]> {
  return toPublicUsers(await apiRequest(`${API_ROUTES.userSearch}?q=${encodeURIComponent(query)}`));
}

export async function listFollowing(): Promise<PublicUser[]> {
  return toPublicUsers(await apiRequest(API_ROUTES.following));
}

export async function listFollowers(): Promise<PublicUser[]> {
  return toPublicUsers(await apiRequest(API_ROUTES.followers));
}

export async function followUser(id: string): Promise<void> {
  await apiRequest(API_ROUTES.follow(id), { method: "POST" });
}

export async function unfollowUser(id: string): Promise<void> {
  await apiRequest(API_ROUTES.follow(id), { method: "DELETE" });
}

function toPublicUsers(data: unknown): PublicUser[] {
  if (!Array.isArray(data) || !data.every(isPublicUser)) {
    throw new Error(ERROR_MESSAGES.invalidReply);
  }
  return data;
}

function isPublicUser(value: unknown): value is PublicUser {
  const user = value as PublicUser | null;
  return (
    typeof user?.id === "string" &&
    typeof user.firstName === "string" &&
    typeof user.lastName === "string" &&
    typeof user.username === "string" &&
    typeof user.isFollowing === "boolean"
  );
}
