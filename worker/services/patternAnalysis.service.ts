import type {
  PatternAnalysis,
  PublicPatternSummary
} from "@/types/patterns";
import type { ReportRepository } from "@/worker/repositories/report.repository";

const MINIMUM_OCCURRENCES = 2;

const METHODOLOGY = [
  "Los puntajes se comparan usando el valor normalizado almacenado para cada reporte.",
  "Un patron repetido requiere al menos 2 reportes con el mismo valor o senal.",
  "Verificados incluye los estados de moderacion verified_pattern y published; pendientes incluye pending.",
  "Las frases se detectan solo mediante categorias conocidas y no se exponen mensajes, comentarios ni datos de contacto.",
  "Los resultados son agregados descriptivos de reportes recibidos y no prueban por si solos fraude ni una irregularidad administrativa."
];

export class PatternAnalysisService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async getAnalysis(): Promise<PatternAnalysis> {
    const [repeatedScores, repeatedStatuses, knownPhrasePatterns] = await Promise.all([
      this.reportRepository.getRepeatedScorePatterns(MINIMUM_OCCURRENCES),
      this.reportRepository.getRepeatedStatusPatterns(MINIMUM_OCCURRENCES),
      this.reportRepository.getKnownPhrasePatterns(MINIMUM_OCCURRENCES)
    ]);

    return {
      generatedAt: new Date().toISOString(),
      minimumOccurrences: MINIMUM_OCCURRENCES,
      repeatedScores,
      repeatedStatuses,
      knownPhrasePatterns,
      methodology: [...METHODOLOGY]
    };
  }

  async getPublicSummary(): Promise<PublicPatternSummary> {
    const analysis = await this.getAnalysis();

    return {
      minimumOccurrences: analysis.minimumOccurrences,
      repeatedScoreGroups: analysis.repeatedScores.length,
      reportsInRepeatedScoreGroups: analysis.repeatedScores.reduce(
        (total, pattern) => total + pattern.count,
        0
      ),
      repeatedStatusGroups: analysis.repeatedStatuses.length,
      knownPhraseGroups: analysis.knownPhrasePatterns.length,
      repeatedScores: analysis.repeatedScores.map((pattern) => ({
        score: pattern.score,
        count: pattern.count,
        verifiedCount: pattern.verifiedCount,
        pendingCount: pattern.pendingCount
      }))
    };
  }
}
