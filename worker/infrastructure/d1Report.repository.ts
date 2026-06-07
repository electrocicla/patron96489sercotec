import type { AdminReportRow, ModerationStatus, PublicReportRow } from "@/types/reports";
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

const toInt = (value: boolean) => (value ? 1 : 0);
const toBool = (value: number) => value === 1;

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
