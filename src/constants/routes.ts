export const SCREENS = {
  drawer: "(drawer)",
  myRoutes: "index",
  myRuns: "runs",
  profile: "profile",
  createRoute: "create-route",
  routeDetail: "routes/[id]/index",
  editRoute: "routes/[id]/edit",
  runRoute: "routes/[id]/run",
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
} as const;
