export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf"
] as const;

export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const MAX_FILES_PER_REPORT = 4;

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export const isAllowedMimeType = (value: string): value is AllowedMimeType =>
  ALLOWED_MIME_TYPES.some((mimeType) => mimeType === value);
