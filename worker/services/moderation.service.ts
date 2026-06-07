import type { AdminReportRow } from "@/types/reports";
import type { ReportFileRecord } from "@/worker/domain/reportFile.entity";
import type { ReportRecord } from "@/worker/domain/report.entity";
import type { FileRepository } from "@/worker/repositories/file.repository";
import type { ModerationRepository } from "@/worker/repositories/moderation.repository";
import type { ReportRepository } from "@/worker/repositories/report.repository";
import type {
  AdminReportFilters,
  ModerationInput
} from "@/worker/validators/admin.validator";
import { nowIso } from "@/worker/lib/dates";
import { notFound } from "@/worker/lib/errors";
import { createId } from "@/worker/lib/ids";

export interface AdminReportFile extends ReportFileRecord {
  duplicateCount: number;
}

export interface AdminReportDetail {
  report: ReportRecord;
  files: AdminReportFile[];
}

export class ModerationService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly fileRepository: FileRepository,
    private readonly moderationRepository: ModerationRepository
  ) {}

  async listReports(filters: AdminReportFilters): Promise<AdminReportRow[]> {
    return this.reportRepository.listAdmin(filters);
  }

  async getReportDetail(reportId: string): Promise<AdminReportDetail> {
    const report = await this.reportRepository.findById(reportId);
    if (!report) {
      throw notFound("Reporte no encontrado.");
    }

    const files = await this.fileRepository.listByReportId(reportId);
    const filesWithDuplicates = await Promise.all(
      files.map(async (file) => ({
        ...file,
        duplicateCount: await this.fileRepository.countBySha256(file.sha256)
      }))
    );

    return { report, files: filesWithDuplicates };
  }

  async moderate(reportId: string, input: ModerationInput): Promise<AdminReportDetail> {
    const timestamp = nowIso();
    await this.reportRepository.updateModeration(
      reportId,
      input.status,
      input.notes,
      input.publicNotes,
      timestamp
    );
    await this.moderationRepository.createEvent({
      id: createId("mod"),
      reportId,
      createdAt: timestamp,
      action: input.status,
      notes: input.notes
    });

    return this.getReportDetail(reportId);
  }
}
