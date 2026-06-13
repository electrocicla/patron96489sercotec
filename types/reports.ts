export const PROGRAM_OPTIONS = [
  "Capital Semilla Emprende",
  "Capital Abeja Emprende",
  "Otro"
] as const;

export const REGION_OPTIONS = [
  "Arica y Parinacota",
  "Tarapaca",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaiso",
  "Metropolitana de Santiago",
  "Libertador General Bernardo OHiggins",
  "Maule",
  "Nuble",
  "Biobio",
  "La Araucania",
  "Los Rios",
  "Los Lagos",
  "Aysen del General Carlos Ibanez del Campo",
  "Magallanes y de la Antartica Chilena"
] as const;

export const REGION_APPLICATION_TOTALS: Partial<Record<(typeof REGION_OPTIONS)[number], number>> = {
  Valparaiso: 2175
};

export const STATUS_OPTIONS = [
  "Postulacion no admisible",
  "No preseleccionada",
  "En evaluacion de admisibilidad",
  "Postulacion enviada y recibida",
  "Otro"
] as const;

export const MODERATION_STATUS_OPTIONS = [
  "pending",
  "verified_pattern",
  "rejected_private_data",
  "duplicate",
  "published"
] as const;

export const FILE_TYPE_OPTIONS = [
  "email_screenshot",
  "web_screenshot",
  "other_evidence"
] as const;

export type Program = (typeof PROGRAM_OPTIONS)[number];
export type Region = (typeof REGION_OPTIONS)[number];
export type ReportStatusText = (typeof STATUS_OPTIONS)[number];
export type ModerationStatus = (typeof MODERATION_STATUS_OPTIONS)[number];
export type EvidenceFileType = (typeof FILE_TYPE_OPTIONS)[number];

export interface PublicReportRow {
  id: string;
  program: string;
  region: string;
  normalizedScore: string;
  statusText: string | null;
  evidenceType: string;
  moderationStatus: ModerationStatus;
}

export interface AdminReportRow extends PublicReportRow {
  createdAt: string;
  commune: string | null;
  cutoffScoreText: string | null;
  hasEmailScreenshot: boolean;
  hasWebScreenshot: boolean;
  hasOtherFiles: boolean;
  patternScore96489: boolean;
  patternSameMessage: boolean;
  patternCapitalAbejaPendingWithScore: boolean;
  fileCount: number;
}

export interface AdminReportDetailReport {
  id: string;
  createdAt: string;
  updatedAt: string;
  program: string;
  region: string;
  commune: string | null;
  scoreText: string;
  normalizedScore: string;
  cutoffScoreText: string | null;
  normalizedCutoffScore: string | null;
  statusText: string | null;
  emailMessage: string | null;
  webMessage: string | null;
  resultUrl: string | null;
  additionalComments: string | null;
  hasEmailScreenshot: boolean;
  hasWebScreenshot: boolean;
  hasOtherFiles: boolean;
  contactEmail: string | null;
  contactPhone: string | null;
  consent: boolean;
  patternScore96489: boolean;
  patternSameMessage: boolean;
  patternCapitalAbejaPendingWithScore: boolean;
  moderationStatus: ModerationStatus;
  moderatorNotes: string | null;
  publicNotes: string | null;
  ipHash: string | null;
  userAgentHash: string | null;
}

export interface AdminEvidenceFile {
  id: string;
  reportId: string;
  createdAt: string;
  fileType: EvidenceFileType;
  originalName: string | null;
  mimeType: string;
  sizeBytes: number;
  sha256: string;
  moderationStatus: ModerationStatus;
  duplicateCount: number;
}

export interface AdminReportDetail {
  report: AdminReportDetailReport;
  files: AdminEvidenceFile[];
}
