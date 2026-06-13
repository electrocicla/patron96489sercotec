import type { AdminReportRow, ModerationStatus, PublicReportRow } from "@/types/reports";
import type {
  KnownPhrasePattern,
  PatternExportRow,
  RepeatedScorePattern,
  RepeatedStatusPattern
} from "@/types/patterns";
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
  delete(reportId: string): Promise<void>;
  findById(id: string): Promise<ReportRecord | null>;
  listAdmin(filters: AdminReportFilters): Promise<AdminReportRow[]>;
  listPublic(): Promise<PublicReportRow[]>;
  getSummaryCounts(): Promise<ReportSummaryCounts>;
  countByProgram(): Promise<CountByLabel[]>;
  countByRegion(): Promise<CountByLabel[]>;
  countByStatus(): Promise<CountByLabel[]>;
  getRepeatedScorePatterns(minimumOccurrences: number): Promise<RepeatedScorePattern[]>;
  getRepeatedStatusPatterns(minimumOccurrences: number): Promise<RepeatedStatusPattern[]>;
  getKnownPhrasePatterns(minimumOccurrences: number): Promise<KnownPhrasePattern[]>;
  listPatternExportRows(): Promise<PatternExportRow[]>;
  countRecentByIpHash(ipHash: string, sinceIso: string): Promise<number>;
  updateModeration(
    reportId: string,
    status: ModerationStatus,
    notes: string | null,
    publicNotes: string | null,
    updatedAt: string
  ): Promise<void>;
}
