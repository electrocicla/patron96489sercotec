import {
  MODERATION_STATUS_OPTIONS,
  STATUS_OPTIONS,
  type ModerationStatus,
  type ReportStatusText
} from "@/types/reports";

export { MODERATION_STATUS_OPTIONS, STATUS_OPTIONS };
export type { ModerationStatus, ReportStatusText };

export const isReportStatusText = (value: string): value is ReportStatusText =>
  STATUS_OPTIONS.some((status) => status === value);

export const isModerationStatus = (value: string): value is ModerationStatus =>
  MODERATION_STATUS_OPTIONS.some((status) => status === value);
