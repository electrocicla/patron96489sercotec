import type { PatternAnalysis, RequestDraft } from "@/types/patterns";
import type { ReportRepository } from "@/worker/repositories/report.repository";
import type { PatternAnalysisService } from "./patternAnalysis.service";

const listOrFallback = (items: string[], fallback: string) =>
  items.length > 0 ? items.join("\n") : fallback;

export class RequestDraftService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly patternAnalysisService: PatternAnalysisService
  ) {}

  async generate(): Promise<RequestDraft> {
    const [summary, analysis] = await Promise.all([
      this.reportRepository.getSummaryCounts(),
      this.patternAnalysisService.getAnalysis()
    ]);
    const generatedAt = new Date().toISOString();
    const subject =
      "Solicitud formal de explicaciones, revision y transparencia sobre resultados reportados";
    const body = this.buildBody(summary, analysis, generatedAt);

    return {
      generatedAt,
      subject,
      body,
      methodology: analysis.methodology,
      basedOn: {
        totalReports: summary.totalReports,
        verifiedReports: summary.verifiedReports,
        pendingReports: summary.pendingReports,
        repeatedScoreGroups: analysis.repeatedScores.length,
        repeatedStatusGroups: analysis.repeatedStatuses.length,
        knownPhraseGroups: analysis.knownPhrasePatterns.length
      }
    };
  }

  private buildBody(
    summary: Awaited<ReturnType<ReportRepository["getSummaryCounts"]>>,
    analysis: PatternAnalysis,
    generatedAt: string
  ) {
    const scoreLines = analysis.repeatedScores.map(
      (pattern) =>
        `- Puntaje ${pattern.score}: ${pattern.count} reportes (${pattern.verifiedCount} verificados, ${pattern.pendingCount} pendientes).`
    );
    const statusLines = analysis.repeatedStatuses.map(
      (pattern) =>
        `- Estado \"${pattern.status}\": ${pattern.count} reportes (${pattern.verifiedCount} verificados, ${pattern.pendingCount} pendientes).`
    );
    const phraseLines = analysis.knownPhrasePatterns.map(
      (pattern) =>
        `- Senal \"${pattern.label}\": ${pattern.count} coincidencias agregadas.`
    );

    return `A quien corresponda:

Junto con saludar, solicito formalmente informacion, explicaciones y revision respecto de patrones observados en resultados reportados por personas postulantes.

Al ${generatedAt}, el registro agregado contiene ${summary.totalReports} reportes, de los cuales ${summary.verifiedReports} figuran como verificados o publicados y ${summary.pendingReports} permanecen pendientes de moderacion.

Puntajes repetidos detectados:
${listOrFallback(scoreLines, "- No se detectaron puntajes con al menos dos reportes.")}

Estados repetidos detectados:
${listOrFallback(statusLines, "- No se detectaron estados con al menos dos reportes.")}

Frases o senales conocidas repetidas:
${listOrFallback(phraseLines, "- No se detectaron senales conocidas con al menos dos reportes.")}

Metodologia utilizada:
${analysis.methodology.map((item) => `- ${item}`).join("\n")}

Estos antecedentes son descriptivos y no permiten afirmar fraude ni otra irregularidad como un hecho. Por ello, solicito:

1. Explicar los criterios, formulas, etapas y controles aplicados al calculo y comunicacion de puntajes y estados.
2. Revisar los casos asociados a valores y mensajes repetidos, informando si corresponden a resultados esperados del proceso.
3. Informar los mecanismos disponibles para rectificacion, reconsideracion o revision de cada postulacion.
4. Publicar o entregar antecedentes metodologicos suficientes para permitir trazabilidad y control ciudadano, resguardando los datos personales.
5. Indicar plazos, unidad responsable y canal formal para responder esta solicitud.

Canales oficiales de referencia:
- Atencion y OIRS: https://www.sercotec.cl/contacto/
- Participacion y acceso a informacion: https://sitios.sercotec.cl/participacion-ciudadana/acceso-a-la-informacion-relevante/
- Portal de Transparencia: https://www.portaltransparencia.cl/
- Portal de postulantes: https://portal.sercotec.cl/

Solicito que la respuesta distinga hechos verificados, explicaciones tecnicas y medidas de revision adoptadas.

Atentamente,
[Nombre]
[Datos de contacto]
[Organizacion, si corresponde]`;
  }
}
