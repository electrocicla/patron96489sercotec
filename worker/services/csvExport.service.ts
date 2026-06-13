import type { ReportRepository } from "@/worker/repositories/report.repository";

const csvEscape = (value: string | number | boolean | null) => {
  const text = value === null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
};

export class CsvExportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async exportAdminCsv(): Promise<string> {
    const reports = await this.reportRepository.listPatternExportRows();

    const header = [
      "id",
      "created_at",
      "program",
      "region",
      "commune",
      "score",
      "score_occurrence_count",
      "is_repeated_score",
      "status",
      "evidence_type",
      "moderation_status",
      "moderation_bucket",
      "pattern_score_96489",
      "pattern_same_message",
      "pattern_capital_abeja_pending_with_score",
      "phrase_no_preseleccionada",
      "phrase_evaluacion_admisibilidad",
      "phrase_postulacion_enviada_recibida",
      "phrase_corte_98_51",
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
        report.scoreOccurrenceCount,
        report.isRepeatedScore,
        report.statusText,
        report.evidenceType,
        report.moderationStatus,
        report.moderationBucket,
        report.patternScore96489,
        report.patternSameMessage,
        report.patternCapitalAbejaPendingWithScore,
        report.phraseNoPreseleccionada,
        report.phraseEvaluacionAdmisibilidad,
        report.phrasePostulacionEnviadaRecibida,
        report.phraseCorte9851,
        report.fileCount
      ]
        .map(csvEscape)
        .join(",")
    );

    return [header.map(csvEscape).join(","), ...rows].join("\n");
  }
}
