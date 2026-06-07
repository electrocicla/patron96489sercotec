"use client";

import Script from "next/script";
import { useMemo, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { InputField, SelectField, TextareaField } from "@/components/ui/form-field";
import type { ApiResult, ReportCreatedResponse } from "@/types/api";
import { PROGRAM_OPTIONS, REGION_OPTIONS, STATUS_OPTIONS } from "@/types/reports";

type SubmitState = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  program?: string;
  region?: string;
  statusText?: string;
  scoreText?: string;
  consent?: string;
  files?: string;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAADgCOMftALHtYaaE";
const maxFileSizeBytes = 5 * 1024 * 1024;
const acceptedFileTypes = "image/png,image/jpeg,image/webp,application/pdf";

function apiUrl(path: string): string {
  return `${apiBaseUrl}${path}`;
}

function getTurnstileToken(form: HTMLFormElement): string {
  const field = form.elements.namedItem("cf-turnstile-response");
  return field instanceof HTMLInputElement ? field.value : "";
}

function validateForm(form: HTMLFormElement): FormErrors {
  const data = new FormData(form);
  const errors: FormErrors = {};

  if (!data.get("program")) {
    errors.program = "Selecciona el programa.";
  }

  if (!data.get("region")) {
    errors.region = "Selecciona la region.";
  }

  if (!data.get("statusText")) {
    errors.statusText = "Selecciona el estado informado.";
  }

  const score = String(data.get("scoreText") ?? "").trim();
  if (!score) {
    errors.scoreText = "Ingresa el puntaje informado.";
  }

  if (data.get("consent") !== "on") {
    errors.consent = "Debes confirmar que revisaste y anonimizaste la evidencia.";
  }

  const files = ["emailScreenshot", "webScreenshot", "otherEvidence", "files"].flatMap((field) =>
    data.getAll(field).filter((file): file is File => file instanceof File && file.size > 0)
  );
  const oversizedFile = files.find((file) => file.size > maxFileSizeBytes);
  if (oversizedFile) {
    errors.files = `El archivo ${oversizedFile.name} supera 5 MB.`;
  }

  if (files.length > 4) {
    errors.files = "Se permite un maximo de 4 archivos por reporte.";
  }

  return errors;
}

export function ReportForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<string>("");

  const scoreHint = useMemo(
    () => "Usa el formato informado por la plataforma o correo. Ejemplo: 96,489.",
    []
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    setMessage("");

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("error");
      setMessage("Revisa los campos marcados antes de enviar.");
      return;
    }

    const data = new FormData(form);
    data.set("turnstileToken", getTurnstileToken(form));
    data.set("source", "frontend");

    setSubmitState("submitting");
    try {
      const response = await fetch(apiUrl("/api/reports"), {
        method: "POST",
        body: data
      });
      const result = (await response.json()) as ApiResult<ReportCreatedResponse>;

      if (!response.ok || !result.ok) {
        const fallback = result.ok ? "No fue posible registrar el reporte." : result.error.message;
        throw new Error(fallback);
      }

      setSubmitState("success");
      setMessage(result.data.message || `Reporte recibido con folio ${result.data.reportId}.`);
      formRef.current?.reset();
    } catch (error) {
      setSubmitState("error");
      setMessage(error instanceof Error ? error.message : "No fue posible registrar el reporte.");
    }
  }

  return (
    <Card>
      <Script async defer src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <CardHeader>
        <h1 className="text-2xl font-bold text-civic-ink">Reportar mi caso</h1>
        <p className="mt-2 text-sm leading-6 text-civic-muted">
          Comparte antecedentes verificables y anonimizados. Evita nombres de evaluadores, datos privados o conclusiones no comprobadas.
        </p>
      </CardHeader>
      <CardBody>
        <div className="mb-6 rounded-md border border-civic-amber/40 bg-[#fff8e6] p-4 text-sm leading-6 text-civic-ink">
          <div className="flex gap-3">
            <AlertTriangle aria-hidden="true" className="mt-0.5 text-civic-amber" size={20} />
            <p>
              Antes de subir archivos, tapa o recorta RUT, correo, telefono, direccion, folios privados, firmas y datos de terceros. La evidencia con
              informacion personal visible puede ser rechazada.
            </p>
          </div>
        </div>

        <form className="space-y-6" encType="multipart/form-data" onSubmit={handleSubmit} ref={formRef}>
          <input aria-hidden="true" autoComplete="off" className="hidden" name="website" tabIndex={-1} type="text" />

          <div className="grid gap-5 md:grid-cols-2">
            <SelectField error={errors.program} id="program" label="Programa" name="program" options={PROGRAM_OPTIONS} required />
            <SelectField error={errors.region} id="region" label="Region" name="region" options={REGION_OPTIONS} required />
            <InputField id="commune" label="Comuna" name="commune" placeholder="Opcional" />
            <SelectField error={errors.statusText} id="statusText" label="Estado informado" name="statusText" options={STATUS_OPTIONS} required />
            <InputField
              error={errors.scoreText}
              hint={scoreHint}
              id="scoreText"
              inputMode="decimal"
              label="Puntaje informado"
              name="scoreText"
              required
            />
            <InputField id="cutoffScoreText" inputMode="decimal" label="Puntaje de corte informado" name="cutoffScoreText" placeholder="Opcional" />
          </div>

          <TextareaField
            hint="Copia solo el texto relevante. Elimina nombres, correos, telefonos o identificadores privados."
            id="emailMessage"
            label="Mensaje recibido por correo"
            name="emailMessage"
            placeholder="Ejemplo: estado, fecha aproximada y texto generico recibido..."
          />

          <TextareaField
            hint="Incluye solo texto general visible en el sitio de resultados."
            id="webMessage"
            label="Mensaje visible en sitio web"
            name="webMessage"
            placeholder="Opcional"
          />

          <div className="grid gap-5 md:grid-cols-2">
            <InputField id="contactEmail" label="Correo de contacto privado" name="contactEmail" placeholder="Opcional; no se publica" type="email" />
            <InputField id="contactPhone" label="Telefono de contacto privado" name="contactPhone" placeholder="Opcional; no se publica" />
            <InputField id="resultUrl" label="URL de resultado" name="resultUrl" placeholder="Opcional; no se publica si contiene token" type="url" />
          </div>

          <TextareaField
            hint="No incluyas RUT, correo, telefono, direccion ni folios privados."
            id="additionalComments"
            label="Comentarios adicionales"
            name="additionalComments"
            placeholder="Opcional"
          />

          <div className="rounded-md border border-dashed border-civic-line bg-civic-panel p-5">
            <div className="mb-4 flex items-start gap-3">
              <Upload aria-hidden="true" className="mt-1 text-civic-blue" size={20} />
              <div>
                <p className="text-sm font-semibold text-civic-ink">PNG, JPG, WEBP o PDF hasta 5 MB por archivo</p>
                <p className="mt-1 text-sm text-civic-muted">Puedes subir hasta 4 archivos anonimizados.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <InputField accept={acceptedFileTypes} id="emailScreenshot" label="Captura de correo" name="emailScreenshot" type="file" />
              <InputField accept={acceptedFileTypes} id="webScreenshot" label="Captura web" name="webScreenshot" type="file" />
              <InputField accept={acceptedFileTypes} id="otherEvidence" label="Otra evidencia" multiple name="otherEvidence" type="file" />
            </div>
            {errors.files ? (
              <p className="text-sm font-medium text-civic-red" role="alert">
                {errors.files}
              </p>
            ) : null}
          </div>

          <div className="rounded-md border border-civic-line p-4">
            <label className="flex gap-3 text-sm leading-6 text-civic-ink">
              <input className="mt-1 size-4" name="consent" required type="checkbox" />
              <span>
                Confirmo que revise y anonimice la evidencia, que el reporte describe antecedentes verificables y que autorizo su uso agregado o
                moderado para fines de transparencia civica.
              </span>
            </label>
            {errors.consent ? (
              <p className="mt-2 text-sm font-medium text-civic-red" role="alert">
                {errors.consent}
              </p>
            ) : null}
          </div>

          <div className="rounded-md border border-civic-line bg-white p-4">
            <p className="text-sm font-semibold text-civic-ink">Verificacion Turnstile</p>
            <div className="cf-turnstile mt-3 min-h-16 rounded-md bg-civic-panel p-4 text-sm text-civic-muted" data-sitekey={turnstileSiteKey}>
              Proteccion anti-abuso. Si Turnstile esta configurado, el token se enviara junto al formulario.
            </div>
          </div>

          {message ? (
            <div
              className={`rounded-md border p-4 text-sm ${
                submitState === "success" ? "border-civic-teal bg-[#eefaf7] text-civic-ink" : "border-civic-red bg-[#fff7ed] text-civic-red"
              }`}
              role="status"
            >
              <div className="flex gap-2">
                {submitState === "success" ? <CheckCircle2 aria-hidden="true" size={18} /> : null}
                <span>{message}</span>
              </div>
            </div>
          ) : null}

          <Button disabled={submitState === "submitting"} type="submit">
            {submitState === "submitting" ? "Enviando..." : "Enviar reporte"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
