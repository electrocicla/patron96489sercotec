const CONTROL_CHARS = /[\u0000-\u001f\u007f]/g;

export const normalizeWhitespace = (value: string) =>
  value.replace(CONTROL_CHARS, " ").replace(/\s+/g, " ").trim();

export const optionalText = (value: FormDataEntryValue | null, maxLength: number) => {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = normalizeWhitespace(value);
  return normalized.length > 0 ? normalized.slice(0, maxLength) : null;
};

export const requiredText = (
  value: FormDataEntryValue | null,
  field: string,
  maxLength: number
) => {
  const normalized = optionalText(value, maxLength);
  if (!normalized) {
    return { value: null, error: `${field} es obligatorio.` };
  }

  return { value: normalized, error: null };
};

export const safePublicText = (value: string | null, maxLength = 180) =>
  value ? normalizeWhitespace(value).slice(0, maxLength) : null;
