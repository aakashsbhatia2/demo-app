export const LIVE_EVENTS = {
  joinGroupRun: "group-run:join",
  leaveGroupRun: "group-run:leave",
  membersChanged: "group-run:members",
  started: "group-run:started",
  ended: "group-run:ended",
  runnerMoved: "runner:moved",
} as const;

export const MAX_GROUP_RUN_INVITES = 10;

export const LOCATION_SHARE_INTERVAL_MS = 3000;

export const STALE_RUNNER_MS = 30_000;

export const RUNNER_COLORS = ["#2563EB", "#16A34A", "#9333EA", "#DB2777", "#0891B2", "#CA8A04"];

export const GROUP_RUN_MESSAGES = {
  pickHint: (max: number) => `Pick up to ${max} people you follow.`,
  noFollowing: "You're not following anyone yet. Follow people to invite them.",
  noInvites: "No group run invites right now.",
  waitingForHost: "Waiting for the host to start",
  readyToStart: "Start when everyone's here",
  invited: "You're invited to this group run",
  ended: "This group run has ended",
  invitedBy: (name: string) => `From ${name}`,
};

export const MEMBER_STATUS_LABELS = {
  invited: "Invited",
  joined: "Joined",
  declined: "Declined",
} as const;
