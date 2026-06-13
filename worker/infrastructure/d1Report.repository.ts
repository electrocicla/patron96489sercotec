import type { AdminReportRow, ModerationStatus, PublicReportRow } from "@/types/reports";
import type {
  KnownPhrasePattern,
  KnownPhrasePatternKey,
  PatternBreakdownItem,
  PatternExportRow,
  RepeatedScorePattern,
  RepeatedStatusPattern
} from "@/types/patterns";
import type { CountByLabel } from "@/types/stats";
import type { ReportCreateInput, ReportRecord } from "@/worker/domain/report.entity";
import type {
  ReportRepository,
  ReportSummaryCounts
} from "@/worker/repositories/report.repository";
import type { AdminReportFilters } from "@/worker/validators/admin.validator";

type D1Value = string | number | null;

interface ReportDbRow {
  id: string;
  created_at: string;
  updated_at: string;
  program: string;
  region: string;
  commune: string | null;
  score_text: string;
  normalized_score: string;
  cutoff_score_text: string | null;
  normalized_cutoff_score: string | null;
  status_text: string | null;
  email_message: string | null;
  web_message: string | null;
  result_url: string | null;
  additional_comments: string | null;
  has_email_screenshot: number;
  has_web_screenshot: number;
  has_other_files: number;
  contact_email: string | null;
  contact_phone: string | null;
  consent: number;
  pattern_score_96489: number;
  pattern_same_message: number;
  pattern_capital_abeja_pending_with_score: number;
  moderation_status: ModerationStatus;
  moderator_notes: string | null;
  public_notes: string | null;
  ip_hash: string | null;
  user_agent_hash: string | null;
}

interface AdminReportDbRow extends ReportDbRow {
  file_count: number;
}

interface SummaryDbRow {
  total_reports: number;
  score_96489_reports: number;
  verified_reports: number;
  pending_reports: number;
  email_screenshot_reports: number;
  web_screenshot_reports: number;
}

interface CountDbRow {
  label: string | null;
  count: number;
}

interface PatternAggregateDbRow {
  pattern_key: string;
  label: string | null;
  count: number;
  verified_count: number;
  pending_count: number;
}

interface PatternExportDbRow {
  id: string;
  created_at: string;
  program: string;
  region: string;
  commune: string | null;
  normalized_score: string;
  score_occurrence_count: number;
  status_text: string | null;
  has_email_screenshot: number;
  has_web_screenshot: number;
  has_other_files: number;
  moderation_status: ModerationStatus;
  pattern_score_96489: number;
  pattern_same_message: number;
  pattern_capital_abeja_pending_with_score: number;
  phrase_no_preseleccionada: number;
  phrase_evaluacion_admisibilidad: number;
  phrase_postulacion_enviada_recibida: number;
  phrase_corte_9851: number;
  file_count: number;
}

interface RecentCountDbRow {
  count: number;
}

type PatternDimension = "program" | "region" | "status_text";

const KNOWN_PHRASE_LABELS: Record<KnownPhrasePatternKey, string> = {
  no_preseleccionada: "No logro ser preseleccionada / no preseleccionada",
  evaluacion_admisibilidad: "En evaluacion de admisibilidad",
  postulacion_enviada_recibida: "Postulacion enviada y recibida",
  corte_98_51: "Puntaje de corte 98.51"
};

const AGGREGATE_TEXT_SQL = `lower(
  coalesce(status_text, '') || ' ' ||
  coalesce(email_message, '') || ' ' ||
  coalesce(web_message, '') || ' ' ||
  coalesce(additional_comments, '')
)`;

const KNOWN_SIGNALS_SQL = `
  SELECT 'no_preseleccionada' AS pattern_key, program, region, status_text, moderation_status
  FROM reports
  WHERE ${AGGREGATE_TEXT_SQL} LIKE '%no logro ser preseleccionada%'
     OR lower(coalesce(status_text, '')) = 'no preseleccionada'
  UNION ALL
  SELECT 'evaluacion_admisibilidad', program, region, status_text, moderation_status
  FROM reports
  WHERE ${AGGREGATE_TEXT_SQL} LIKE '%en evaluacion de admisibilidad%'
     OR ${AGGREGATE_TEXT_SQL} LIKE '%en evaluación de admisibilidad%'
  UNION ALL
  SELECT 'postulacion_enviada_recibida', program, region, status_text, moderation_status
  FROM reports
  WHERE ${AGGREGATE_TEXT_SQL} LIKE '%postulacion enviada y recibida%'
     OR ${AGGREGATE_TEXT_SQL} LIKE '%postulación enviada y recibida%'
  UNION ALL
  SELECT 'corte_98_51', program, region, status_text, moderation_status
  FROM reports
  WHERE normalized_cutoff_score = '98.51'
`;

const toInt = (value: boolean) => (value ? 1 : 0);
const toBool = (value: number) => value === 1;

const toBreakdownItem = (row: PatternAggregateDbRow): PatternBreakdownItem => ({
  label: row.label ?? "Sin dato",
  count: row.count,
  verifiedCount: row.verified_count,
  pendingCount: row.pending_count
});

const groupBreakdowns = (rows: PatternAggregateDbRow[]) => {
  const grouped = new Map<string, PatternBreakdownItem[]>();

  for (const row of rows) {
    const items = grouped.get(row.pattern_key) ?? [];
    items.push(toBreakdownItem(row));
    grouped.set(row.pattern_key, items);
  }

  return grouped;
};

const sumBreakdown = (items: PatternBreakdownItem[]) =>
  items.reduce(
    (total, item) => ({
      count: total.count + item.count,
      verifiedCount: total.verifiedCount + item.verifiedCount,
      pendingCount: total.pendingCount + item.pendingCount
    }),
    { count: 0, verifiedCount: 0, pendingCount: 0 }
  );

const mapReport = (row: ReportDbRow): ReportRecord => ({
  id: row.id,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  program: row.program,
  region: row.region,
  commune: row.commune,
  scoreText: row.score_text,
  normalizedScore: row.normalized_score,
  cutoffScoreText: row.cutoff_score_text,
  normalizedCutoffScore: row.normalized_cutoff_score,
  statusText: row.status_text,
  emailMessage: row.email_message,
  webMessage: row.web_message,
  resultUrl: row.result_url,
  additionalComments: row.additional_comments,
  hasEmailScreenshot: toBool(row.has_email_screenshot),
  hasWebScreenshot: toBool(row.has_web_screenshot),
  hasOtherFiles: toBool(row.has_other_files),
  contactEmail: row.contact_email,
  contactPhone: row.contact_phone,
  consent: toBool(row.consent),
  patternScore96489: toBool(row.pattern_score_96489),
  patternSameMessage: toBool(row.pattern_same_message),
  patternCapitalAbejaPendingWithScore: toBool(
    row.pattern_capital_abeja_pending_with_score
  ),
  moderationStatus: row.moderation_status,
  moderatorNotes: row.moderator_notes,
  publicNotes: row.public_notes,
  ipHash: row.ip_hash,
  userAgentHash: row.user_agent_hash
});

const evidenceTypeFor = (row: ReportDbRow) => {
  const types = [
    row.has_email_screenshot === 1 ? "captura_email" : null,
    row.has_web_screenshot === 1 ? "captura_web" : null,
    row.has_other_files === 1 ? "otro_archivo" : null
  ].filter(Boolean);

  return types.length > 0 ? types.join(", ") : "sin_archivo";
};

const evidenceTypeForExport = (row: PatternExportDbRow) => {
  const types = [
    row.has_email_screenshot === 1 ? "captura_email" : null,
    row.has_web_screenshot === 1 ? "captura_web" : null,
    row.has_other_files === 1 ? "otro_archivo" : null
  ].filter((value): value is string => value !== null);

  return types.length > 0 ? types.join(", ") : "sin_archivo";
};

const moderationBucketFor = (
  status: ModerationStatus
): PatternExportRow["moderationBucket"] => {
  if (status === "verified_pattern" || status === "published") {
    return "verified";
  }

  return status === "pending" ? "pending" : "other";
};

const mapPublicRow = (row: ReportDbRow): PublicReportRow => ({
  id: row.id,
  program: row.program,
  region: row.region,
  normalizedScore: row.normalized_score,
  statusText: row.status_text,
  evidenceType: evidenceTypeFor(row),
  moderationStatus: row.moderation_status
});

const mapAdminRow = (row: AdminReportDbRow): AdminReportRow => ({
  ...mapPublicRow(row),
  createdAt: row.created_at,
  commune: row.commune,
  cutoffScoreText: row.cutoff_score_text,
  hasEmailScreenshot: toBool(row.has_email_screenshot),
  hasWebScreenshot: toBool(row.has_web_screenshot),
  hasOtherFiles: toBool(row.has_other_files),
  patternScore96489: toBool(row.pattern_score_96489),
  patternSameMessage: toBool(row.pattern_same_message),
  patternCapitalAbejaPendingWithScore: toBool(
    row.pattern_capital_abeja_pending_with_score
  ),
  fileCount: row.file_count
});

export class D1ReportRepository implements ReportRepository {
  constructor(private readonly db: D1Database) {}

  async create(report: ReportCreateInput): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO reports (
          id, created_at, updated_at, program, region, commune, score_text,
          normalized_score, cutoff_score_text, normalized_cutoff_score,
          status_text, email_message, web_message, result_url, additional_comments,
          has_email_screenshot, has_web_screenshot, has_other_files,
          contact_email, contact_phone, consent, pattern_score_96489,
          pattern_same_message, pattern_capital_abeja_pending_with_score,
          moderation_status, moderator_notes, public_notes, ip_hash, user_agent_hash
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        report.id,
        report.createdAt,
        report.updatedAt,
        report.program,
        report.region,
        report.commune,
        report.scoreText,
        report.normalizedScore,
        report.cutoffScoreText,
        report.normalizedCutoffScore,
        report.statusText,
        report.emailMessage,
        report.webMessage,
        report.resultUrl,
        report.additionalComments,
        toInt(report.hasEmailScreenshot),
        toInt(report.hasWebScreenshot),
        toInt(report.hasOtherFiles),
        report.contactEmail,
        report.contactPhone,
        toInt(report.consent),
        toInt(report.patternScore96489),
        toInt(report.patternSameMessage),
        toInt(report.patternCapitalAbejaPendingWithScore),
        report.moderationStatus ?? "pending",
        report.moderatorNotes ?? null,
        report.publicNotes ?? null,
        report.ipHash,
        report.userAgentHash
      )
      .run();
  }

  async delete(reportId: string): Promise<void> {
    await this.db.prepare("DELETE FROM reports WHERE id = ?").bind(reportId).run();
  }

  async findById(id: string): Promise<ReportRecord | null> {
    const row = await this.db.prepare("SELECT * FROM reports WHERE id = ?").bind(id).first<ReportDbRow>();
    return row ? mapReport(row) : null;
  }

  async listAdmin(filters: AdminReportFilters): Promise<AdminReportRow[]> {
    const conditions: string[] = [];
    const values: D1Value[] = [];

    if (filters.moderationStatus) {
      conditions.push("r.moderation_status = ?");
      values.push(filters.moderationStatus);
    }

    if (filters.score) {
      conditions.push("r.normalized_score = ?");
      values.push(filters.score);
    }

    if (filters.program) {
      conditions.push("r.program = ?");
      values.push(filters.program);
    }

    if (filters.region) {
      conditions.push("r.region = ?");
      values.push(filters.region);
    }

    const patternCondition = this.patternCondition(filters.pattern);
    if (patternCondition) {
      conditions.push(patternCondition);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const result = await this.db
      .prepare(
        `SELECT r.*, COUNT(f.id) AS file_count
         FROM reports r
         LEFT JOIN report_files f ON f.report_id = r.id
         ${whereClause}
         GROUP BY r.id
         ORDER BY r.created_at DESC
         LIMIT 200`
      )
      .bind(...values)
      .all<AdminReportDbRow>();

    return result.results.map(mapAdminRow);
  }

  async listPublic(): Promise<PublicReportRow[]> {
    const result = await this.db
      .prepare(
        `SELECT *
         FROM reports
         WHERE moderation_status IN ('verified_pattern', 'published')
         ORDER BY created_at DESC
         LIMIT 200`
      )
      .all<ReportDbRow>();

    return result.results.map(mapPublicRow);
  }

  async getSummaryCounts(): Promise<ReportSummaryCounts> {
    const row = await this.db
      .prepare(
        `SELECT
          COUNT(*) AS total_reports,
          SUM(CASE WHEN normalized_score = '96.489' THEN 1 ELSE 0 END) AS score_96489_reports,
          SUM(CASE WHEN moderation_status IN ('verified_pattern', 'published') THEN 1 ELSE 0 END) AS verified_reports,
          SUM(CASE WHEN moderation_status = 'pending' THEN 1 ELSE 0 END) AS pending_reports,
          SUM(has_email_screenshot) AS email_screenshot_reports,
          SUM(has_web_screenshot) AS web_screenshot_reports
        FROM reports`
      )
      .first<SummaryDbRow>();

    return {
      totalReports: row?.total_reports ?? 0,
      score96489Reports: row?.score_96489_reports ?? 0,
      verifiedReports: row?.verified_reports ?? 0,
      pendingReports: row?.pending_reports ?? 0,
      emailScreenshotReports: row?.email_screenshot_reports ?? 0,
      webScreenshotReports: row?.web_screenshot_reports ?? 0
    };
  }

  async countByProgram(): Promise<CountByLabel[]> {
    return this.countBy("program");
  }

  async countByRegion(): Promise<CountByLabel[]> {
    return this.countBy("region");
  }

  async countByStatus(): Promise<CountByLabel[]> {
    return this.countBy("status_text");
  }

  async getRepeatedScorePatterns(
    minimumOccurrences: number
  ): Promise<RepeatedScorePattern[]> {
    const [programRows, regionRows, statusRows] = await Promise.all([
      this.getRepeatedBreakdown("normalized_score", "program", minimumOccurrences),
      this.getRepeatedBreakdown("normalized_score", "region", minimumOccurrences),
      this.getRepeatedBreakdown("normalized_score", "status_text", minimumOccurrences)
    ]);
    const byProgram = groupBreakdowns(programRows);
    const byRegion = groupBreakdowns(regionRows);
    const byStatus = groupBreakdowns(statusRows);

    return [...byProgram.entries()].map(([score, programBreakdown]) => ({
      score,
      ...sumBreakdown(programBreakdown),
      byProgram: programBreakdown,
      byRegion: byRegion.get(score) ?? [],
      byStatus: byStatus.get(score) ?? []
    }));
  }

  async getRepeatedStatusPatterns(
    minimumOccurrences: number
  ): Promise<RepeatedStatusPattern[]> {
    const [programRows, regionRows] = await Promise.all([
      this.getRepeatedBreakdown("status_text", "program", minimumOccurrences),
      this.getRepeatedBreakdown("status_text", "region", minimumOccurrences)
    ]);
    const byProgram = groupBreakdowns(programRows);
    const byRegion = groupBreakdowns(regionRows);

    return [...byProgram.entries()].map(([status, programBreakdown]) => ({
      status,
      ...sumBreakdown(programBreakdown),
      byProgram: programBreakdown,
      byRegion: byRegion.get(status) ?? []
    }));
  }

  async getKnownPhrasePatterns(
    minimumOccurrences: number
  ): Promise<KnownPhrasePattern[]> {
    const [programRows, regionRows, statusRows] = await Promise.all([
      this.getKnownSignalBreakdown("program", minimumOccurrences),
      this.getKnownSignalBreakdown("region", minimumOccurrences),
      this.getKnownSignalBreakdown("status_text", minimumOccurrences)
    ]);
    const byProgram = groupBreakdowns(programRows);
    const byRegion = groupBreakdowns(regionRows);
    const byStatus = groupBreakdowns(statusRows);

    return [...byProgram.entries()].flatMap(([key, programBreakdown]) => {
      if (!(key in KNOWN_PHRASE_LABELS)) {
        return [];
      }

      const typedKey = key as KnownPhrasePatternKey;
      return [{
        key: typedKey,
        label: KNOWN_PHRASE_LABELS[typedKey],
        ...sumBreakdown(programBreakdown),
        byProgram: programBreakdown,
        byRegion: byRegion.get(key) ?? [],
        byStatus: byStatus.get(key) ?? []
      }];
    });
  }

  async listPatternExportRows(): Promise<PatternExportRow[]> {
    const result = await this.db
      .prepare(
        `WITH score_counts AS (
          SELECT normalized_score, COUNT(*) AS occurrence_count
          FROM reports
          WHERE trim(normalized_score) <> ''
          GROUP BY normalized_score
        ), file_counts AS (
          SELECT report_id, COUNT(*) AS file_count
          FROM report_files
          GROUP BY report_id
        )
        SELECT
          r.id, r.created_at, r.program, r.region, r.commune, r.normalized_score,
          sc.occurrence_count AS score_occurrence_count, r.status_text,
          r.has_email_screenshot, r.has_web_screenshot, r.has_other_files,
          r.moderation_status, r.pattern_score_96489, r.pattern_same_message,
          r.pattern_capital_abeja_pending_with_score,
          CASE WHEN ${AGGREGATE_TEXT_SQL} LIKE '%no logro ser preseleccionada%'
                 OR lower(coalesce(r.status_text, '')) = 'no preseleccionada'
            THEN 1 ELSE 0 END AS phrase_no_preseleccionada,
          CASE WHEN ${AGGREGATE_TEXT_SQL} LIKE '%en evaluacion de admisibilidad%'
                 OR ${AGGREGATE_TEXT_SQL} LIKE '%en evaluación de admisibilidad%'
            THEN 1 ELSE 0 END AS phrase_evaluacion_admisibilidad,
          CASE WHEN ${AGGREGATE_TEXT_SQL} LIKE '%postulacion enviada y recibida%'
                 OR ${AGGREGATE_TEXT_SQL} LIKE '%postulación enviada y recibida%'
            THEN 1 ELSE 0 END AS phrase_postulacion_enviada_recibida,
          CASE WHEN r.normalized_cutoff_score = '98.51'
            THEN 1 ELSE 0 END AS phrase_corte_9851,
          coalesce(fc.file_count, 0) AS file_count
        FROM reports r
        JOIN score_counts sc ON sc.normalized_score = r.normalized_score
        LEFT JOIN file_counts fc ON fc.report_id = r.id
        ORDER BY r.created_at DESC`
      )
      .all<PatternExportDbRow>();

    return result.results.map((row) => ({
      id: row.id,
      createdAt: row.created_at,
      program: row.program,
      region: row.region,
      commune: row.commune,
      normalizedScore: row.normalized_score,
      scoreOccurrenceCount: row.score_occurrence_count,
      isRepeatedScore: row.score_occurrence_count >= 2,
      statusText: row.status_text,
      evidenceType: evidenceTypeForExport(row),
      moderationStatus: row.moderation_status,
      moderationBucket: moderationBucketFor(row.moderation_status),
      patternScore96489: toBool(row.pattern_score_96489),
      patternSameMessage: toBool(row.pattern_same_message),
      patternCapitalAbejaPendingWithScore: toBool(
        row.pattern_capital_abeja_pending_with_score
      ),
      phraseNoPreseleccionada: toBool(row.phrase_no_preseleccionada),
      phraseEvaluacionAdmisibilidad: toBool(row.phrase_evaluacion_admisibilidad),
      phrasePostulacionEnviadaRecibida: toBool(
        row.phrase_postulacion_enviada_recibida
      ),
      phraseCorte9851: toBool(row.phrase_corte_9851),
      fileCount: row.file_count
    }));
  }

  async countRecentByIpHash(ipHash: string, sinceIso: string): Promise<number> {
    const row = await this.db
      .prepare(
        `SELECT COUNT(*) AS count
         FROM reports
         WHERE ip_hash = ? AND created_at >= ?`
      )
      .bind(ipHash, sinceIso)
      .first<RecentCountDbRow>();

    return row?.count ?? 0;
  }

  async updateModeration(
    reportId: string,
    status: ModerationStatus,
    notes: string | null,
    publicNotes: string | null,
    updatedAt: string
  ): Promise<void> {
    await this.db
      .prepare(
        `UPDATE reports
         SET moderation_status = ?, moderator_notes = ?, public_notes = ?, updated_at = ?
         WHERE id = ?`
      )
      .bind(status, notes, publicNotes, updatedAt, reportId)
      .run();
  }

  private patternCondition(pattern: string | null) {
    switch (pattern) {
      case "score_96489":
        return "r.pattern_score_96489 = 1";
      case "same_message":
        return "r.pattern_same_message = 1";
      case "abeja_pending":
        return "r.pattern_capital_abeja_pending_with_score = 1";
      default:
        return null;
    }
  }

  private async getRepeatedBreakdown(
    patternColumn: "normalized_score" | "status_text",
    dimension: PatternDimension,
    minimumOccurrences: number
  ): Promise<PatternAggregateDbRow[]> {
    const result = await this.db
      .prepare(
        `WITH repeated_patterns AS (
          SELECT ${patternColumn} AS pattern_key
          FROM reports
          WHERE ${patternColumn} IS NOT NULL AND trim(${patternColumn}) <> ''
          GROUP BY ${patternColumn}
          HAVING COUNT(*) >= ?
        )
        SELECT
          r.${patternColumn} AS pattern_key,
          coalesce(r.${dimension}, 'Sin dato') AS label,
          COUNT(*) AS count,
          SUM(CASE WHEN r.moderation_status IN ('verified_pattern', 'published') THEN 1 ELSE 0 END) AS verified_count,
          SUM(CASE WHEN r.moderation_status = 'pending' THEN 1 ELSE 0 END) AS pending_count
        FROM reports r
        JOIN repeated_patterns p ON p.pattern_key = r.${patternColumn}
        GROUP BY r.${patternColumn}, r.${dimension}
        ORDER BY r.${patternColumn} ASC, count DESC, label ASC`
      )
      .bind(minimumOccurrences)
      .all<PatternAggregateDbRow>();

    return result.results;
  }

  private async getKnownSignalBreakdown(
    dimension: PatternDimension,
    minimumOccurrences: number
  ): Promise<PatternAggregateDbRow[]> {
    const result = await this.db
      .prepare(
        `WITH signals AS (${KNOWN_SIGNALS_SQL}),
        repeated_signals AS (
          SELECT pattern_key
          FROM signals
          GROUP BY pattern_key
          HAVING COUNT(*) >= ?
        )
        SELECT
          s.pattern_key,
          coalesce(s.${dimension}, 'Sin dato') AS label,
          COUNT(*) AS count,
          SUM(CASE WHEN s.moderation_status IN ('verified_pattern', 'published') THEN 1 ELSE 0 END) AS verified_count,
          SUM(CASE WHEN s.moderation_status = 'pending' THEN 1 ELSE 0 END) AS pending_count
        FROM signals s
        JOIN repeated_signals repeated ON repeated.pattern_key = s.pattern_key
        GROUP BY s.pattern_key, s.${dimension}
        ORDER BY s.pattern_key ASC, count DESC, label ASC`
      )
      .bind(minimumOccurrences)
      .all<PatternAggregateDbRow>();

    return result.results;
  }

  private async countBy(column: "program" | "region" | "status_text"): Promise<CountByLabel[]> {
    const result = await this.db
      .prepare(
        `SELECT COALESCE(${column}, 'Sin dato') AS label, COUNT(*) AS count
         FROM reports
         GROUP BY ${column}
         ORDER BY count DESC, label ASC
         LIMIT 50`
      )
      .all<CountDbRow>();

    return result.results.map((row) => ({
      label: row.label ?? "Sin dato",
      count: row.count
    }));
  }
}
