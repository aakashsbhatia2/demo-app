import type { LatLng } from "@/types/lat-lng";
import type { PlannedRoute } from "@/types/saved-route";

export type GroupRunStatus = "waiting" | "running" | "finished";

export type MemberStatus = "invited" | "joined" | "declined";

export type RunnerProfile = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type GroupRunMember = RunnerProfile & {
  status: MemberStatus;
};

export type GroupRun = {
  id: string;
  status: GroupRunStatus;
  hostId: string;
  startedAt: string | null;
  finishedAt: string | null;
  createdAt: string;
  route: PlannedRoute;
  members: GroupRunMember[];
};

export type GroupRunInvite = {
  id: string;
  status: GroupRunStatus;
  hostId: string;
  createdAt: string;
  routeName: string;
  distanceMeters: number;
  host: RunnerProfile;
};

export type CreateGroupRunInput = {
  routeId: string;
  inviteeIds: string[];
};

export type SharedLocation = LatLng & {
  timestamp: number;
  distanceMeters: number;
};

export type RunnerPosition = SharedLocation & {
  userId: string;
};

export type LiveJoinReply = {
  groupRun?: GroupRun;
  error?: string;
};

export type MapRunner = LatLng & {
  id: string;
  label: string;
  color: string;
};
