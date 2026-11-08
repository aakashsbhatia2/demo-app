import type { ApiErrorCode } from "@/constants/errors";

export class ApiError extends Error {
  readonly code?: ApiErrorCode;

  constructor(message: string, code?: ApiErrorCode) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}
