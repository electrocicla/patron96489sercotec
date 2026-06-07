import type { EvidenceFileType } from "@/types/reports";
import {
  isAllowedMimeType,
  MAX_FILE_BYTES,
  MAX_FILES_PER_REPORT
} from "@/worker/lib/mime";
import { normalizeWhitespace } from "@/worker/lib/sanitization";

export interface EvidenceFileInput {
  file: File;
  fileType: EvidenceFileType;
  safeName: string;
}

const fileFieldMap: Record<string, EvidenceFileType> = {
  emailScreenshot: "email_screenshot",
  webScreenshot: "web_screenshot",
  otherEvidence: "other_evidence",
  files: "other_evidence"
};

export const safeFileName = (name: string) => {
  const normalized = normalizeWhitespace(name || "evidence").replace(/[^a-zA-Z0-9._-]/g, "-");
  return normalized.length > 0 ? normalized.slice(0, 120) : "evidence";
};

export const collectEvidenceFiles = (formData: FormData) => {
  const files: EvidenceFileInput[] = [];
  const errors: string[] = [];

  for (const [fieldName, value] of formData.entries()) {
    const fileType = fileFieldMap[fieldName];
    if (!fileType || !(value instanceof File) || value.size === 0) {
      continue;
    }

    if (files.length >= MAX_FILES_PER_REPORT) {
      errors.push(`Se permite un maximo de ${MAX_FILES_PER_REPORT} archivos por reporte.`);
      continue;
    }

    if (value.size > MAX_FILE_BYTES) {
      errors.push(`${value.name} supera el maximo de 5 MB.`);
    }

    if (!isAllowedMimeType(value.type)) {
      errors.push(`${value.name} usa un tipo de archivo no permitido.`);
    }

    files.push({
      file: value,
      fileType,
      safeName: safeFileName(value.name)
    });
  }

  return { files, errors };
};
