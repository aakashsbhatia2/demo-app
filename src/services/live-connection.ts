import { io, type Socket } from "socket.io-client";

import { ERROR_MESSAGES } from "@/constants/errors";
import { API_URL } from "@/constants/routes";
import { authClient } from "@/services/auth-client";
import { ApiError } from "@/utils/api-error";

export function openLiveConnection(): Socket {
  if (!API_URL) throw new ApiError(ERROR_MESSAGES.apiUrlMissing);

  return io(API_URL, {
    transports: ["websocket"],
    auth: (send) => {
      authClient
        .getCookie()
        .then((cookie) => send({ cookie }))
        .catch(() => send({}));
    },
  });
}
