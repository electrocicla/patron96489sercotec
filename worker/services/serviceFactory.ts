import type { EnvBindings } from "@/types/bindings";
import { D1FileRepository } from "@/worker/infrastructure/d1File.repository";
import { D1ModerationRepository } from "@/worker/infrastructure/d1Moderation.repository";
import { D1ReportRepository } from "@/worker/infrastructure/d1Report.repository";
import { R2EvidenceStorage } from "@/worker/infrastructure/r2Evidence.storage";
import { CloudflareTurnstileClient } from "@/worker/infrastructure/turnstile.client";
import { CsvExportService } from "./csvExport.service";
import { FileAccessService } from "./fileAccess.service";
import { ModerationService } from "./moderation.service";
import { PatternAnalysisService } from "./patternAnalysis.service";
import { ReportSubmissionService } from "./reportSubmission.service";
import { RequestDraftService } from "./requestDraft.service";
import { StatsService } from "./stats.service";

const createInfrastructure = (env: EnvBindings) => {
  const reportRepository = new D1ReportRepository(env.DB);
  const fileRepository = new D1FileRepository(env.DB);
  const moderationRepository = new D1ModerationRepository(env.DB);
  const storage = new R2EvidenceStorage(env.EVIDENCE_BUCKET);

  return {
    reportRepository,
    fileRepository,
    moderationRepository,
    storage
  };
};

export const createReportSubmissionService = (env: EnvBindings) => {
  const infrastructure = createInfrastructure(env);
  return new ReportSubmissionService(
    infrastructure.reportRepository,
    infrastructure.fileRepository,
    infrastructure.storage,
    new CloudflareTurnstileClient(env.TURNSTILE_SECRET_KEY),
    env.FILE_SIGNING_SECRET
  );
};

export const createStatsService = (env: EnvBindings) => {
  const { reportRepository } = createInfrastructure(env);
  return new StatsService(reportRepository, new PatternAnalysisService(reportRepository));
};

export const createPatternAnalysisService = (env: EnvBindings) => {
  const { reportRepository } = createInfrastructure(env);
  return new PatternAnalysisService(reportRepository);
};

export const createRequestDraftService = (env: EnvBindings) => {
  const { reportRepository } = createInfrastructure(env);
  const patternAnalysisService = new PatternAnalysisService(reportRepository);
  return new RequestDraftService(reportRepository, patternAnalysisService);
};

export const createModerationService = (env: EnvBindings) => {
  const infrastructure = createInfrastructure(env);
  return new ModerationService(
    infrastructure.reportRepository,
    infrastructure.fileRepository,
    infrastructure.moderationRepository
  );
};

export const createFileAccessService = (env: EnvBindings) => {
  const { fileRepository, storage } = createInfrastructure(env);
  return new FileAccessService(fileRepository, storage);
};

export const createCsvExportService = (env: EnvBindings) => {
  const { reportRepository } = createInfrastructure(env);
  return new CsvExportService(reportRepository);
};
