import { ERROR_MESSAGES, type ApiErrorCode } from "@/constants/errors";
import { API_URL } from "@/constants/routes";
import { authClient } from "@/services/auth-client";
import { ApiError } from "@/utils/api-error";

const REQUEST_TIMEOUT_MS = 10_000;

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
};

type ErrorReply = {
  error?: string;
  code?: ApiErrorCode;
};

export async function apiRequest(path: string, { method = "GET", body }: RequestOptions = {}) {
  if (!API_URL) throw new ApiError(ERROR_MESSAGES.apiUrlMissing);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: await authClient.getCookie(),
      },
      credentials: "omit",
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
    const data: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      const reply = data as ErrorReply | null;
      throw new ApiError(
        reply?.error ?? ERROR_MESSAGES.requestFailed(response.status),
        reply?.code,
      );
    }
    return data;
  } catch (error) {
    if (controller.signal.aborted) throw new ApiError(ERROR_MESSAGES.requestTimedOut);
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
