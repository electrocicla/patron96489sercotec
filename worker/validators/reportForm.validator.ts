import type { EvidenceFileInput } from "./file.validator";
import { collectEvidenceFiles } from "./file.validator";
import { isProgram } from "@/worker/domain/program";
import { isRegion } from "@/worker/domain/region";
import { isReportStatusText } from "@/worker/domain/reportStatus";
import { badRequest } from "@/worker/lib/errors";
import { normalizeScore } from "@/worker/lib/score";
import { optionalText, requiredText } from "@/worker/lib/sanitization";

export interface ReportFormInput {
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
  contactEmail: string | null;
  contactPhone: string | null;
  additionalComments: string | null;
  consent: boolean;
  turnstileToken: string;
  files: EvidenceFileInput[];
}

const consentValues = new Set(["true", "on", "1", "yes"]);

export const validateReportFormData = (formData: FormData): ReportFormInput => {
  const errors: string[] = [];

  const honeypot = optionalText(formData.get("website"), 120);
  if (honeypot) {
    errors.push("El reporte no pudo ser aceptado.");
  }

  const program = requiredText(formData.get("program"), "Programa", 80);
  const region = requiredText(formData.get("region"), "Region", 80);
  const scoreText = requiredText(formData.get("scoreText"), "Puntaje recibido", 80);
  const turnstileToken = requiredText(
    formData.get("cf-turnstile-response") ?? formData.get("turnstileToken"),
    "Turnstile",
    2048
  );

  if (program.error) errors.push(program.error);
  if (region.error) errors.push(region.error);
  if (scoreText.error) errors.push(scoreText.error);
  if (turnstileToken.error) errors.push(turnstileToken.error);

  if (program.value && !isProgram(program.value)) {
    errors.push("Programa no valido.");
  }

  if (region.value && !isRegion(region.value)) {
    errors.push("Region no valida.");
  }

  const statusText = optionalText(formData.get("statusText"), 120);
  if (statusText && !isReportStatusText(statusText)) {
    errors.push("Estado mostrado no valido.");
  }

  const consentValue = optionalText(formData.get("consent"), 20);
  const consent = consentValue ? consentValues.has(consentValue) : false;
  if (!consent) {
    errors.push("Debes aceptar el consentimiento informado para enviar el reporte.");
  }

  const normalizedScore = normalizeScore(scoreText.value);
  if (!normalizedScore) {
    errors.push("El puntaje debe incluir un numero decimal, por ejemplo 96,489.");
  }

  const cutoffScoreText = optionalText(formData.get("cutoffScoreText"), 80);
  const normalizedCutoffScore = normalizeScore(cutoffScoreText);
  const { files, errors: fileErrors } = collectEvidenceFiles(formData);
  errors.push(...fileErrors);

  if (errors.length > 0 || !program.value || !region.value || !scoreText.value || !turnstileToken.value) {
    throw badRequest("El formulario contiene errores.", errors);
  }

  return {
    program: program.value,
    region: region.value,
    commune: optionalText(formData.get("commune"), 80),
    scoreText: scoreText.value,
    normalizedScore: normalizedScore ?? scoreText.value,
    cutoffScoreText,
    normalizedCutoffScore,
    statusText,
    emailMessage: optionalText(formData.get("emailMessage"), 2400),
    webMessage: optionalText(formData.get("webMessage"), 2400),
    resultUrl: optionalText(formData.get("resultUrl"), 500),
    contactEmail: optionalText(formData.get("contactEmail"), 180),
    contactPhone: optionalText(formData.get("contactPhone"), 80),
    additionalComments: optionalText(formData.get("additionalComments"), 1400),
    consent,
    turnstileToken: turnstileToken.value,
    files
  };
};
