import type { EvidenceFileType, ModerationStatus } from "@/types/reports";

export interface ReportFileRecord {
  id: string;
  reportId: string;
  createdAt: string;
  fileType: EvidenceFileType;
  originalName: string | null;
  r2Key: string;
  mimeType: string;
  sizeBytes: number;
  sha256: string;
  moderationStatus: ModerationStatus;
}

export interface ReportFileCreateInput
  extends Omit<ReportFileRecord, "moderationStatus"> {
  moderationStatus?: ModerationStatus;
}
