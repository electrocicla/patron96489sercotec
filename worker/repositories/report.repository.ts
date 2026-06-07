import type { AdminReportRow, ModerationStatus, PublicReportRow } from "@/types/reports";
import type { CountByLabel } from "@/types/stats";
import type { ReportCreateInput, ReportRecord } from "@/worker/domain/report.entity";
import type { AdminReportFilters } from "@/worker/validators/admin.validator";

export interface ReportSummaryCounts {
  totalReports: number;
  score96489Reports: number;
  verifiedReports: number;
  pendingReports: number;
  emailScreenshotReports: number;
  webScreenshotReports: number;
}

export interface ReportRepository {
  create(report: ReportCreateInput): Promise<void>;
  findById(id: string): Promise<ReportRecord | null>;
  listAdmin(filters: AdminReportFilters): Promise<AdminReportRow[]>;
  listPublic(): Promise<PublicReportRow[]>;
  getSummaryCounts(): Promise<ReportSummaryCounts>;
  countByProgram(): Promise<CountByLabel[]>;
  countByRegion(): Promise<CountByLabel[]>;
  countByStatus(): Promise<CountByLabel[]>;
  updateModeration(
    reportId: string,
    status: ModerationStatus,
    notes: string | null,
    publicNotes: string | null,
    updatedAt: string
  ): Promise<void>;
}
