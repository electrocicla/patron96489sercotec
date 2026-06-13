import type {
  ReportFileCreateInput,
  ReportFileRecord
} from "@/worker/domain/reportFile.entity";
import type { FileRepository } from "@/worker/repositories/file.repository";

interface FileDbRow {
  id: string;
  report_id: string;
  created_at: string;
  file_type: ReportFileRecord["fileType"];
  original_name: string | null;
  r2_key: string;
  mime_type: string;
  size_bytes: number;
  sha256: string;
  moderation_status: ReportFileRecord["moderationStatus"];
}

interface CountRow {
  count: number;
}

const mapFile = (row: FileDbRow): ReportFileRecord => ({
  id: row.id,
  reportId: row.report_id,
  createdAt: row.created_at,
  fileType: row.file_type,
  originalName: row.original_name,
  r2Key: row.r2_key,
  mimeType: row.mime_type,
  sizeBytes: row.size_bytes,
  sha256: row.sha256,
  moderationStatus: row.moderation_status
});

export class D1FileRepository implements FileRepository {
  constructor(private readonly db: D1Database) {}

  async create(file: ReportFileCreateInput): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO report_files (
          id, report_id, created_at, file_type, original_name, r2_key,
          mime_type, size_bytes, sha256, moderation_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        file.id,
        file.reportId,
        file.createdAt,
        file.fileType,
        file.originalName,
        file.r2Key,
        file.mimeType,
        file.sizeBytes,
        file.sha256,
        file.moderationStatus ?? "pending"
      )
      .run();
  }

  async deleteByReportId(reportId: string): Promise<void> {
    await this.db
      .prepare("DELETE FROM report_files WHERE report_id = ?")
      .bind(reportId)
      .run();
  }

  async listByReportId(reportId: string): Promise<ReportFileRecord[]> {
    const result = await this.db
      .prepare("SELECT * FROM report_files WHERE report_id = ? ORDER BY created_at DESC")
      .bind(reportId)
      .all<FileDbRow>();

    return result.results.map(mapFile);
  }

  async findById(fileId: string): Promise<ReportFileRecord | null> {
    const row = await this.db
      .prepare("SELECT * FROM report_files WHERE id = ?")
      .bind(fileId)
      .first<FileDbRow>();

    return row ? mapFile(row) : null;
  }

  async countBySha256(sha256: string): Promise<number> {
    const row = await this.db
      .prepare("SELECT COUNT(*) AS count FROM report_files WHERE sha256 = ?")
      .bind(sha256)
      .first<CountRow>();

    return row?.count ?? 0;
  }
}
