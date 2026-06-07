import type { ModerationStatus } from "@/types/reports";
import type { PatternFlags } from "./patternFlags";

export interface ReportRecord extends PatternFlags {
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
  moderationStatus: ModerationStatus;
  moderatorNotes: string | null;
  publicNotes: string | null;
  ipHash: string | null;
  userAgentHash: string | null;
}

export interface ReportCreateInput
  extends Omit<
    ReportRecord,
    "createdAt" | "updatedAt" | "moderationStatus" | "moderatorNotes" | "publicNotes"
  > {
  createdAt: string;
  updatedAt: string;
  moderationStatus?: ModerationStatus;
  moderatorNotes?: string | null;
  publicNotes?: string | null;
}
