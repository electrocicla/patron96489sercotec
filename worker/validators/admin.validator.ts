import type { ModerationStatus } from "@/types/reports";
import { isModerationStatus } from "@/worker/domain/reportStatus";
import { badRequest } from "@/worker/lib/errors";
import { optionalText } from "@/worker/lib/sanitization";

export interface AdminReportFilters {
  moderationStatus: ModerationStatus | null;
  score: string | null;
  program: string | null;
  region: string | null;
  pattern: string | null;
}

export interface ModerationInput {
  status: ModerationStatus;
  notes: string | null;
  publicNotes: string | null;
}

export const validateAdminFilters = (searchParams: URLSearchParams): AdminReportFilters => {
  const moderationStatus = searchParams.get("moderationStatus");
  let parsedModerationStatus: ModerationStatus | null = null;

  if (moderationStatus) {
    if (!isModerationStatus(moderationStatus)) {
      throw badRequest("Filtro de moderacion no valido.");
    }
    parsedModerationStatus = moderationStatus;
  }

  return {
    moderationStatus: parsedModerationStatus,
    score: searchParams.get("score"),
    program: searchParams.get("program"),
    region: searchParams.get("region"),
    pattern: searchParams.get("pattern")
  };
};

export const validateModerationInput = async (request: Request): Promise<ModerationInput> => {
  const body = await request.formData();
  const status = optionalText(body.get("status"), 60);

  if (!status || !isModerationStatus(status)) {
    throw badRequest("Estado de moderacion no valido.");
  }

  return {
    status,
    notes: optionalText(body.get("notes"), 1200),
    publicNotes: optionalText(body.get("publicNotes"), 500)
  };
};
