export class AppError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: string[];

  constructor(status: number, code: string, message: string, details: string[] = []) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const badRequest = (message: string, details: string[] = []) =>
  new AppError(400, "bad_request", message, details);

export const unauthorized = (message = "No autorizado") =>
  new AppError(401, "unauthorized", message);

export const notFound = (message = "Recurso no encontrado") =>
  new AppError(404, "not_found", message);

export const internalError = (message = "Error interno") =>
  new AppError(500, "internal_error", message);
