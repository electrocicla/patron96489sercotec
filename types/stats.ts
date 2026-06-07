import type { PublicReportRow } from "./reports";

export interface CountByLabel {
  label: string;
  count: number;
}

export interface PublicStats {
  totalReports: number;
  score96489Reports: number;
  verifiedReports: number;
  pendingReports: number;
  emailScreenshotReports: number;
  webScreenshotReports: number;
  byProgram: CountByLabel[];
  byRegion: CountByLabel[];
  byStatus: CountByLabel[];
  publicReports: PublicReportRow[];
}
