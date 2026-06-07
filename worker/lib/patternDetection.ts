import type { PatternFlags } from "@/worker/domain/patternFlags";
import { emptyPatternFlags } from "@/worker/domain/patternFlags";
import { isKnownRepeatedScore, normalizeScore } from "./score";

export interface PatternDetectionInput {
  program: string;
  normalizedScore: string | null;
  statusText: string | null;
  emailMessage: string | null;
  webMessage: string | null;
  cutoffScoreText: string | null;
  normalizedCutoffScore: string | null;
  additionalComments: string | null;
}

interface PatternRule {
  apply(input: PatternDetectionInput, aggregateText: string): Partial<PatternFlags>;
}

const normalizeText = (value: string | null | undefined) =>
  (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const knownSameMessageFragments = [
  "no logro ser preseleccionada",
  "en evaluacion de admisibilidad",
  "postulacion enviada y recibida"
];

const rules: PatternRule[] = [
  {
    apply: (input) => ({
      patternScore96489: isKnownRepeatedScore(input.normalizedScore)
    })
  },
  {
    apply: (input, aggregateText) => {
      const cutoffInText =
        input.normalizedCutoffScore === "98.51" ||
        normalizeScore(aggregateText) === "98.51" ||
        aggregateText.includes("98,51") ||
        aggregateText.includes("98.51");

      return {
        patternSameMessage:
          cutoffInText ||
          knownSameMessageFragments.some((fragment) => aggregateText.includes(fragment))
      };
    }
  },
  {
    apply: (input, aggregateText) => ({
      patternCapitalAbejaPendingWithScore:
        normalizeText(input.program).includes("capital abeja") &&
        isKnownRepeatedScore(input.normalizedScore) &&
        (aggregateText.includes("en evaluacion de admisibilidad") ||
          aggregateText.includes("postulacion enviada y recibida"))
    })
  }
];

export const detectPatternFlags = (input: PatternDetectionInput): PatternFlags => {
  const aggregateText = normalizeText(
    [
      input.statusText,
      input.emailMessage,
      input.webMessage,
      input.cutoffScoreText,
      input.additionalComments
    ]
      .filter(Boolean)
      .join(" ")
  );

  return rules.reduce<PatternFlags>((flags, rule) => {
    const next = rule.apply(input, aggregateText);
    return {
      patternScore96489: flags.patternScore96489 || next.patternScore96489 === true,
      patternSameMessage: flags.patternSameMessage || next.patternSameMessage === true,
      patternCapitalAbejaPendingWithScore:
        flags.patternCapitalAbejaPendingWithScore ||
        next.patternCapitalAbejaPendingWithScore === true
    };
  }, emptyPatternFlags());
};
