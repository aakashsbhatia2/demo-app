export const API_ERROR_CODES = {
  SIGN_IN_REQUIRED: "SIGN_IN_REQUIRED",
  ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
  INVALID_POINTS: "INVALID_POINTS",
  INVALID_POINT: "INVALID_POINT",
  INVALID_LOOP_FLAG: "INVALID_LOOP_FLAG",
  LOOP_TOO_SHORT: "LOOP_TOO_SHORT",
  ROUTE_NAME_REQUIRED: "ROUTE_NAME_REQUIRED",
  ROUTE_NAME_TOO_LONG: "ROUTE_NAME_TOO_LONG",
  NO_WALKING_ROUTE: "NO_WALKING_ROUTE",
  GOOGLE_ROUTES_TIMEOUT: "GOOGLE_ROUTES_TIMEOUT",
  GOOGLE_ROUTES_FAILED: "GOOGLE_ROUTES_FAILED",
  SERVER_MISCONFIGURED: "SERVER_MISCONFIGURED",
  INVALID_JSON: "INVALID_JSON",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  RUN_NOT_FOUND: "RUN_NOT_FOUND",
  INVALID_RUN_TIMES: "INVALID_RUN_TIMES",
  INVALID_TRACK: "INVALID_TRACK",
  TRACK_TOO_LONG: "TRACK_TOO_LONG",
  BODY_TOO_LARGE: "BODY_TOO_LARGE",
} as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];

export const ERROR_MESSAGES = {
  generic: "Something went wrong",
  requestFailed: (status: number) => `Request failed (${status})`,
  requestTimedOut: "Request timed out",
  invalidReply: "Route server sent an invalid reply",
  apiUrlMissing: "EXPO_PUBLIC_API_URL is not set",
  sessionLoadFailed: "Could not load your session",
  signInFailed: "Could not sign in",
  signUpFailed: "Could not create your account",
  signOutFailed: "Could not sign out",
  passwordsDontMatch: "Passwords don't match",
  routesLoadFailed: (reason: string) => `Could not load your routes: ${reason}`,
  routeLoadFailed: (reason: string | null) => `Could not load this route: ${reason}`,
  routeDeleteFailed: "Could not delete this route",
  runStartFailed: "Could not start tracking your run",
  runSaveFailed: "Could not save your run",
  runsLoadFailed: (reason: string) => `Could not load your runs: ${reason}`,
  runLoadFailed: (reason: string | null) => `Could not load this run: ${reason}`,
  locationDenied: "Location access is off. Turn it on in Settings to track runs.",
  backgroundLocationDenied:
    'To track runs with the screen off, open Settings and set location to "Allow all the time".',
  mapsAndroidOnly: "Maps are only available on Android for now.",
  mapsKeyMissing:
    "Map unavailable: add GOOGLE_MAPS_ANDROID_API_KEY to .env.local, then rebuild the app.",
} as const;
