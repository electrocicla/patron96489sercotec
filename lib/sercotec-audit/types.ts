export type AuditYear = 2023 | 2024;

export type Severity = "crítica" | "alta" | "media";

export type AmountMaxClp = number | null;

export type AuditSummary = {
  year: AuditYear;
  uploadedFilesInYear: number;
  rows: number;
  usableNamedRows: number;
  programs: number;
  directFundRows: number;
  knownAmountRows: number;
  knownAmountDuplicateGroups: number;
  directFundDuplicateGroups: number;
  sameProgramDuplicateGroups: number;
  exactDuplicateRows: number;
  duplicateNameRows: number;
  emptyNameRows: number;
  missingNumeroActoRows: number;
  identitySplitNoAplicaRows: number;
  yearMismatchRows: number;
  knownAmountExposureClpSumAcrossDuplicateGroups: number;
  highestKnownAmountExposureClp: number;
  anomalyRows: number;
  criticalAnomalyRows: number;
  highAnomalyRows: number;
};

export type ProgramRow = {
  year: AuditYear;
  program: string;
  rawPrograms: string;
  sourceFiles: string;
  rows: number;
  usableNamedRows: number;
  uniqueNames: number;
  exactDuplicateRows: number;
  duplicateNameRows: number;
  emptyNameRows: number;
  missingNumeroActoRows: number;
  identitySplitNoAplicaRows: number;
  yearMismatchFechaOtorgamientoRows: number;
  yearMismatchFechaActoRows: number;
  maleFirstNameFlags: number;
  isDirectFund: boolean;
  knownAmount: boolean;
  amountMaxClp: AmountMaxClp;
  amountMaxLabel: string;
  fundingType: string;
};

export type AnomalyRow = {
  severity: Severity;
  category: string;
  program: string;
  source: "program-summary" | "file-duplicate-groups" | "known-amount-duplicate-detail-rows" | "manual-review";
  metric: string;
  value: number;
  evidence: string;
};

export type DuplicateExposureRow = {
  rank: number;
  displayName: string;
  normalizedName: string;
  apparentType: string;
  programCount: number;
  recordCount: number;
  programs: string;
  knownAmountTotalClp: number;
  firstFechaOtorgamiento: string;
  lastFechaOtorgamiento: string;
};

export type DataDownload = {
  label: string;
  href: string;
};

export type AuditPageData = {
  year: AuditYear;
  title: string;
  subtitle: string;
  summary: AuditSummary;
  programs: readonly ProgramRow[];
  anomalies: readonly AnomalyRow[];
  duplicateExposures: readonly DuplicateExposureRow[];
  downloads: readonly DataDownload[];
};
