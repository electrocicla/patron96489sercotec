import type { ApiFailure, ApiSuccess } from "@/types/api";
import { AppError } from "./errors";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export const ok = <TData>(data: TData): ApiSuccess<TData> => ({
  ok: true,
  data
});

export const fail = (error: unknown): ApiFailure => {
  if (error instanceof AppError) {
    return {
      ok: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details.length > 0 ? error.details : undefined
      }
    };
  }

  return {
    ok: false,
    error: {
      code: "internal_error",
      message: "No fue posible procesar la solicitud."
    }
  };
};

export const statusForError = (error: unknown): ContentfulStatusCode => {
  if (!(error instanceof AppError)) {
    return 500;
  }

  switch (error.status) {
    case 400:
      return 400;
    case 401:
      return 401;
    case 404:
      return 404;
    case 500:
      return 500;
    default:
      return 500;
  }
};
