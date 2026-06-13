import type {
  EvidenceStorage,
  RetrievedEvidenceFile,
  StoredEvidenceFile
} from "@/worker/repositories/file.repository";
import type { EvidenceFileInput } from "@/worker/validators/file.validator";
import { sha256HexFromArrayBuffer } from "@/worker/lib/hash";

export class R2EvidenceStorage implements EvidenceStorage {
  constructor(private readonly bucket: R2Bucket) {}

  async put(
    reportId: string,
    fileId: string,
    input: EvidenceFileInput
  ): Promise<StoredEvidenceFile> {
    const buffer = await input.file.arrayBuffer();
    const sha256 = await sha256HexFromArrayBuffer(buffer);
    const key = `reports/${reportId}/${fileId}-${input.safeName}`;

    await this.bucket.put(key, buffer, {
      httpMetadata: {
        contentType: input.file.type
      },
      customMetadata: {
        originalName: input.file.name,
        evidenceType: input.fileType
      }
    });

    return { key, sha256 };
  }

  async get(key: string, fileName: string): Promise<RetrievedEvidenceFile | null> {
    const object = await this.bucket.get(key);
    if (!object) {
      return null;
    }

    return {
      body: object.body,
      mimeType: object.httpMetadata?.contentType ?? "application/octet-stream",
      sizeBytes: object.size,
      fileName
    };
  }

  async delete(key: string): Promise<void> {
    await this.bucket.delete(key);
  }
}
