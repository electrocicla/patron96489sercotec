import type { ReportCreatedResponse } from "@/types/api";
import type { ReportCreateInput } from "@/worker/domain/report.entity";
import type { FileRepository, EvidenceStorage } from "@/worker/repositories/file.repository";
import type { ReportRepository } from "@/worker/repositories/report.repository";
import type { TurnstileClient } from "@/worker/infrastructure/turnstile.client";
import { detectPatternFlags } from "@/worker/lib/patternDetection";
import { nowIso } from "@/worker/lib/dates";
import { badRequest } from "@/worker/lib/errors";
import { sha256HexFromString } from "@/worker/lib/hash";
import { createId } from "@/worker/lib/ids";
import { validateReportFormData } from "@/worker/validators/reportForm.validator";

export interface RequestPrivacyMetadata {
  ip: string | null;
  userAgent: string | null;
}

export class ReportSubmissionService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly fileRepository: FileRepository,
    private readonly storage: EvidenceStorage,
    private readonly turnstileClient: TurnstileClient,
    private readonly hashSecret: string
  ) {}

  async submit(
    formData: FormData,
    requestMetadata: RequestPrivacyMetadata
  ): Promise<ReportCreatedResponse> {
    const input = validateReportFormData(formData);
    const turnstileOk = await this.turnstileClient.verify(
      input.turnstileToken,
      requestMetadata.ip
    );

    if (!turnstileOk) {
      throw badRequest("No fue posible validar Turnstile.");
    }

    const reportId = createId("rep");
    const timestamp = nowIso();
    const patternFlags = detectPatternFlags(input);
    const report: ReportCreateInput = {
      id: reportId,
      createdAt: timestamp,
      updatedAt: timestamp,
      program: input.program,
      region: input.region,
      commune: input.commune,
      scoreText: input.scoreText,
      normalizedScore: input.normalizedScore,
      cutoffScoreText: input.cutoffScoreText,
      normalizedCutoffScore: input.normalizedCutoffScore,
      statusText: input.statusText,
      emailMessage: input.emailMessage,
      webMessage: input.webMessage,
      resultUrl: input.resultUrl,
      additionalComments: input.additionalComments,
      hasEmailScreenshot: input.files.some((file) => file.fileType === "email_screenshot"),
      hasWebScreenshot: input.files.some((file) => file.fileType === "web_screenshot"),
      hasOtherFiles: input.files.some((file) => file.fileType === "other_evidence"),
      contactEmail: input.contactEmail,
      contactPhone: input.contactPhone,
      consent: input.consent,
      ...patternFlags,
      ipHash: await this.optionalHash(requestMetadata.ip),
      userAgentHash: await this.optionalHash(requestMetadata.userAgent)
    };

    await this.reportRepository.create(report);

    for (const file of input.files) {
      const fileId = createId("file");
      const stored = await this.storage.put(reportId, fileId, file);
      await this.fileRepository.create({
        id: fileId,
        reportId,
        createdAt: timestamp,
        fileType: file.fileType,
        originalName: file.file.name,
        r2Key: stored.key,
        mimeType: file.file.type,
        sizeBytes: file.file.size,
        sha256: stored.sha256
      });
    }

    return {
      reportId,
      message: "Reporte recibido. Sera revisado antes de publicar datos agregados."
    };
  }

  private async optionalHash(value: string | null) {
    if (!value) {
      return null;
    }

    return sha256HexFromString(`${this.hashSecret}:${value}`);
  }
}
