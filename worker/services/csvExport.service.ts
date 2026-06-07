import type { ReportRepository } from "@/worker/repositories/report.repository";

const csvEscape = (value: string | number | boolean | null) => {
  const text = value === null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
};

export class CsvExportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async exportAdminCsv(): Promise<string> {
    const reports = await this.reportRepository.listAdmin({
      moderationStatus: null,
      score: null,
      program: null,
      region: null,
      pattern: null
    });

    const header = [
      "id",
      "created_at",
      "program",
      "region",
      "commune",
      "score",
      "status",
      "evidence_type",
      "moderation_status",
      "pattern_score_96489",
      "pattern_same_message",
      "pattern_capital_abeja_pending_with_score",
      "file_count"
    ];

    const rows = reports.map((report) =>
      [
        report.id,
        report.createdAt,
        report.program,
        report.region,
        report.commune,
        report.normalizedScore,
        report.statusText,
        report.evidenceType,
        report.moderationStatus,
        report.patternScore96489,
        report.patternSameMessage,
        report.patternCapitalAbejaPendingWithScore,
        report.fileCount
      ]
        .map(csvEscape)
        .join(",")
    );

    return [header.map(csvEscape).join(","), ...rows].join("\n");
  }
}
