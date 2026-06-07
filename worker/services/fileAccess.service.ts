import type { RetrievedEvidenceFile } from "@/worker/repositories/file.repository";
import type { EvidenceStorage, FileRepository } from "@/worker/repositories/file.repository";
import { notFound } from "@/worker/lib/errors";

export class FileAccessService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly storage: EvidenceStorage
  ) {}

  async getEvidenceFile(fileId: string): Promise<RetrievedEvidenceFile> {
    const file = await this.fileRepository.findById(fileId);
    if (!file) {
      throw notFound("Archivo no encontrado.");
    }

    const result = await this.storage.get(file.r2Key, file.originalName ?? `${file.id}.bin`);
    if (!result) {
      throw notFound("Archivo no disponible en almacenamiento.");
    }

    return result;
  }
}
