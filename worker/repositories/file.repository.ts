import type { ReportFileCreateInput, ReportFileRecord } from "@/worker/domain/reportFile.entity";
import type { EvidenceFileInput } from "@/worker/validators/file.validator";

export interface StoredEvidenceFile {
  key: string;
  sha256: string;
}

export interface RetrievedEvidenceFile {
  body: ReadableStream<Uint8Array>;
  mimeType: string;
  sizeBytes: number;
  fileName: string;
}

export interface EvidenceStorage {
  put(reportId: string, fileId: string, input: EvidenceFileInput): Promise<StoredEvidenceFile>;
  get(key: string, fileName: string): Promise<RetrievedEvidenceFile | null>;
  delete(key: string): Promise<void>;
}

export interface FileRepository {
  create(file: ReportFileCreateInput): Promise<void>;
  deleteByReportId(reportId: string): Promise<void>;
  listByReportId(reportId: string): Promise<ReportFileRecord[]>;
  findById(fileId: string): Promise<ReportFileRecord | null>;
  countBySha256(sha256: string): Promise<number>;
}
