import { ERROR_MESSAGES } from "@/constants/errors";
import { API_ROUTES } from "@/constants/routes";
import { apiRequest } from "@/services/api-client";
import type {
  CreateGroupRunInput,
  GroupRun,
  GroupRunInvite,
  SharedLocation,
} from "@/types/group-run";

export async function createGroupRun(input: CreateGroupRunInput): Promise<GroupRun> {
  return toGroupRun(await apiRequest(API_ROUTES.groupRuns, { method: "POST", body: input }));
}

export async function getGroupRun(id: string): Promise<GroupRun> {
  return toGroupRun(await apiRequest(API_ROUTES.groupRun(id)));
}

export async function getActiveGroupRun(): Promise<GroupRun | null> {
  const data = await apiRequest(API_ROUTES.activeGroupRun);
  return data === null ? null : toGroupRun(data);
}

export async function listInvites(): Promise<GroupRunInvite[]> {
  const data = await apiRequest(API_ROUTES.groupRunInvites);
  if (!Array.isArray(data) || !data.every(isInvite)) throw new Error(ERROR_MESSAGES.invalidReply);
  return data;
}

export async function joinGroupRun(id: string): Promise<GroupRun> {
  return toGroupRun(await apiRequest(API_ROUTES.groupRunAction(id, "join"), { method: "POST" }));
}

export async function declineGroupRun(id: string): Promise<void> {
  await apiRequest(API_ROUTES.groupRunAction(id, "decline"), { method: "POST" });
}

export async function startGroupRun(id: string): Promise<GroupRun> {
  return toGroupRun(await apiRequest(API_ROUTES.groupRunAction(id, "start"), { method: "POST" }));
}

export async function endGroupRun(id: string): Promise<GroupRun> {
  return toGroupRun(await apiRequest(API_ROUTES.groupRunAction(id, "end"), { method: "POST" }));
}

export async function shareLocation(id: string, location: SharedLocation): Promise<void> {
  await apiRequest(API_ROUTES.groupRunAction(id, "location"), { method: "POST", body: location });
}

export function isGroupRun(value: unknown): value is GroupRun {
  const groupRun = value as GroupRun | null;
  return (
    typeof groupRun?.id === "string" &&
    typeof groupRun.status === "string" &&
    typeof groupRun.hostId === "string" &&
    typeof groupRun.route?.id === "string" &&
    Array.isArray(groupRun.route.path) &&
    Array.isArray(groupRun.members)
  );
}

function toGroupRun(data: unknown): GroupRun {
  if (!isGroupRun(data)) throw new Error(ERROR_MESSAGES.invalidReply);
  return data;
}

function isInvite(value: unknown): value is GroupRunInvite {
  const invite = value as GroupRunInvite | null;
  return (
    typeof invite?.id === "string" &&
    typeof invite.routeName === "string" &&
    typeof invite.distanceMeters === "number" &&
    typeof invite.host?.firstName === "string"
  );
}
