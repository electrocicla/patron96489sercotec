import type { PublicStats } from "@/types/stats";
import type { ReportRepository } from "@/worker/repositories/report.repository";

export class StatsService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async getPublicStats(): Promise<PublicStats> {
    const [summary, byProgram, byRegion, byStatus, publicReports] = await Promise.all([
      this.reportRepository.getSummaryCounts(),
      this.reportRepository.countByProgram(),
      this.reportRepository.countByRegion(),
      this.reportRepository.countByStatus(),
      this.reportRepository.listPublic()
    ]);

    return {
      ...summary,
      byProgram,
      byRegion,
      byStatus,
      publicReports
    };
  }
}
