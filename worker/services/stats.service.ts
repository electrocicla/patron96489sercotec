import type { PublicStatsWithPatterns } from "@/types/patterns";
import type { ReportRepository } from "@/worker/repositories/report.repository";
import type { PatternAnalysisService } from "./patternAnalysis.service";

export class StatsService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly patternAnalysisService: PatternAnalysisService
  ) {}

  async getPublicStats(): Promise<PublicStatsWithPatterns> {
    const [summary, byProgram, byRegion, byStatus, publicReports, patterns] = await Promise.all([
      this.reportRepository.getSummaryCounts(),
      this.reportRepository.countByProgram(),
      this.reportRepository.countByRegion(),
      this.reportRepository.countByStatus(),
      this.reportRepository.listPublic(),
      this.patternAnalysisService.getPublicSummary()
    ]);

    return {
      ...summary,
      byProgram,
      byRegion,
      byStatus,
      publicReports,
      patterns
    };
  }
}
