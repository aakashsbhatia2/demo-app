export const SCREENS = {
  drawer: "(drawer)",
  myRoutes: "index",
  myRuns: "runs",
  invites: "invites",
  profile: "profile",
  createRoute: "create-route",
  routeDetail: "routes/[id]/index",
  editRoute: "routes/[id]/edit",
  runRoute: "routes/[id]/run",
  newGroupRun: "routes/[id]/group-run",
  groupRun: "group-runs/[id]",
  runDetail: "runs/[id]",
  search: "search",
  followers: "followers",
  following: "following",
  signIn: "sign-in",
  signUp: "sign-up",
} as const;

export const HREFS = {
  createRoute: "/create-route",
  myRuns: "/runs",
  invites: "/invites",
  profile: "/profile",
  search: "/search",
  followers: "/followers",
  following: "/following",
  signIn: "/sign-in",
  signUp: "/sign-up",
  routeDetail: (id: string) => ({ pathname: "/routes/[id]", params: { id } }) as const,
  editRoute: (id: string) => ({ pathname: "/routes/[id]/edit", params: { id } }) as const,
  runRoute: (id: string) => ({ pathname: "/routes/[id]/run", params: { id } }) as const,
  runDetail: (id: string) => ({ pathname: "/runs/[id]", params: { id } }) as const,
  newGroupRun: (id: string) => ({ pathname: "/routes/[id]/group-run", params: { id } }) as const,
  groupRun: (id: string) => ({ pathname: "/group-runs/[id]", params: { id } }) as const,
} as const;

export const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const API_ROUTES = {
  routes: "/api/routes",
  route: (id: string) => `/api/routes/${encodeURIComponent(id)}`,
  runs: "/api/runs",
  run: (id: string) => `/api/runs/${encodeURIComponent(id)}`,
  streetRoute: "/api/street-route",
  userSearch: "/api/users/search",
  following: "/api/users/me/following",
  followers: "/api/users/me/followers",
  follow: (id: string) => `/api/users/${encodeURIComponent(id)}/follow`,
  groupRuns: "/api/group-runs",
  groupRunInvites: "/api/group-runs/invites",
  activeGroupRun: "/api/group-runs/active",
  groupRun: (id: string) => `/api/group-runs/${encodeURIComponent(id)}`,
  groupRunAction: (id: string, action: GroupRunAction) =>
    `/api/group-runs/${encodeURIComponent(id)}/${action}`,
} as const;

export type GroupRunAction = "join" | "decline" | "start" | "end" | "location";
