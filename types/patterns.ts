import type { ModerationStatus } from "./reports";
import type { PublicStats } from "./stats";

export interface PatternCounts {
  count: number;
  verifiedCount: number;
  pendingCount: number;
}

export interface PatternBreakdownItem extends PatternCounts {
  label: string;
}

export interface PatternBreakdown {
  byProgram: PatternBreakdownItem[];
  byRegion: PatternBreakdownItem[];
  byStatus: PatternBreakdownItem[];
}

export interface RepeatedScorePattern extends PatternCounts, PatternBreakdown {
  score: string;
}

export interface RepeatedStatusPattern extends PatternCounts {
  status: string;
  byProgram: PatternBreakdownItem[];
  byRegion: PatternBreakdownItem[];
}

export type KnownPhrasePatternKey =
  | "no_preseleccionada"
  | "evaluacion_admisibilidad"
  | "postulacion_enviada_recibida"
  | "corte_98_51";

export interface KnownPhrasePattern extends PatternCounts, PatternBreakdown {
  key: KnownPhrasePatternKey;
  label: string;
}

export interface PatternAnalysis {
  generatedAt: string;
  minimumOccurrences: number;
  repeatedScores: RepeatedScorePattern[];
  repeatedStatuses: RepeatedStatusPattern[];
  knownPhrasePatterns: KnownPhrasePattern[];
  methodology: string[];
}

export interface PublicRepeatedScorePattern extends PatternCounts {
  score: string;
}

export interface PublicPatternSummary {
  minimumOccurrences: number;
  repeatedScoreGroups: number;
  reportsInRepeatedScoreGroups: number;
  repeatedStatusGroups: number;
  knownPhraseGroups: number;
  repeatedScores: PublicRepeatedScorePattern[];
}

export interface PublicStatsWithPatterns extends PublicStats {
  patterns: PublicPatternSummary;
}

export interface RequestDraft {
  generatedAt: string;
  subject: string;
  body: string;
  methodology: string[];
  basedOn: {
    totalReports: number;
    verifiedReports: number;
    pendingReports: number;
    repeatedScoreGroups: number;
    repeatedStatusGroups: number;
    knownPhraseGroups: number;
  };
}

export interface PatternExportRow {
  id: string;
  createdAt: string;
  program: string;
  region: string;
  commune: string | null;
  normalizedScore: string;
  scoreOccurrenceCount: number;
  isRepeatedScore: boolean;
  statusText: string | null;
  evidenceType: string;
  moderationStatus: ModerationStatus;
  moderationBucket: "verified" | "pending" | "other";
  patternScore96489: boolean;
  patternSameMessage: boolean;
  patternCapitalAbejaPendingWithScore: boolean;
  phraseNoPreseleccionada: boolean;
  phraseEvaluacionAdmisibilidad: boolean;
  phrasePostulacionEnviadaRecibida: boolean;
  phraseCorte9851: boolean;
  fileCount: number;
}
