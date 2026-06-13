"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Database, Repeat2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { InputField, SelectField, TextareaField } from "@/components/ui/form-field";
import type { ApiResult, ReportCreatedResponse } from "@/types/api";
import type { PublicStatsWithPatterns } from "@/types/patterns";
import {
  PROGRAM_OPTIONS,
  REGION_APPLICATION_TOTALS,
  REGION_OPTIONS,
  STATUS_OPTIONS
} from "@/types/reports";

type SubmitState = "idle" | "submitting" | "success" | "error";
type TurnstileState = "loading" | "ready" | "error";

interface FormErrors {
  program?: string;
  region?: string;
  statusText?: string;
  scoreText?: string;
  consent?: string;
  files?: string;
}

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "error-callback": (errorCode?: string) => boolean;
      "expired-callback": () => void;
      "response-field": false;
      size: "compact" | "flexible";
      theme: "auto";
    }
  ) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
}

interface RepeatedScoreOption {
  score: string;
  count: number | null;
}

interface EvidenceFileFieldProps {
  id: string;
  label: string;
  name: string;
  multiple?: boolean;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAADgCOMftALHtYaaE";
const maxFileSizeBytes = 5 * 1024 * 1024;
const acceptedFileTypes = "image/png,image/jpeg,image/webp,application/pdf";
const initialRepeatedScore = "96.489";
const initialCutoffScore = "98.51";
const turnstileTestSiteKey = "1x00000000000000000000AA";

function apiUrl(path: string): string {
  return `${apiBaseUrl}${path}`;
}

function getTurnstileApi(): TurnstileApi | undefined {
  return (window as Window & { turnstile?: TurnstileApi }).turnstile;
}

function formatScoreForDisplay(value: string): string {
  const normalized = value.trim().replace(",", ".");
  const [integer, decimals] = normalized.split(".");
  return decimals ? `${integer},${decimals}` : integer;
}

function mergeRepeatedScores(patterns: PublicStatsWithPatterns["patterns"]): RepeatedScoreOption[] {
  const options = new Map<string, RepeatedScoreOption>([
    [initialRepeatedScore, { score: initialRepeatedScore, count: null }]
  ]);

  for (const repeatedScore of patterns.repeatedScores) {
    const normalizedScore = repeatedScore.score.trim().replace(",", ".");
    options.set(normalizedScore, { score: normalizedScore, count: repeatedScore.count });
  }

  return [...options.values()].sort((left, right) => {
    if (left.score === initialRepeatedScore) return -1;
    if (right.score === initialRepeatedScore) return 1;
    return (right.count ?? 0) - (left.count ?? 0) || left.score.localeCompare(right.score);
  });
}

function validateForm(form: HTMLFormElement): FormErrors {
  const data = new FormData(form);
  const errors: FormErrors = {};

  if (!data.get("program")) errors.program = "Selecciona el programa.";
  if (!data.get("region")) errors.region = "Selecciona la region.";
  if (!data.get("statusText")) errors.statusText = "Selecciona el estado informado.";
  if (!String(data.get("scoreText") ?? "").trim()) errors.scoreText = "Ingresa el puntaje informado.";
  if (data.get("consent") !== "on") errors.consent = "Debes confirmar que revisaste y anonimizaste la evidencia.";

  const files = ["emailScreenshot", "webScreenshot", "otherEvidence", "files"].flatMap((field) =>
    data.getAll(field).filter((file): file is File => file instanceof File && file.size > 0)
  );
  const oversizedFile = files.find((file) => file.size > maxFileSizeBytes);
  if (oversizedFile) errors.files = `El archivo ${oversizedFile.name} supera 5 MB.`;
  if (files.length > 4) errors.files = "Se permite un maximo de 4 archivos por reporte.";

  return errors;
}

function EvidenceFileField({ id, label, name, multiple = false }: EvidenceFileFieldProps) {
  const [fileNames, setFileNames] = useState<string[]>([]);

  return (
    <div className="min-w-0 space-y-2">
      <span className="block text-sm font-semibold text-civic-ink">{label}</span>
      <input
        accept={acceptedFileTypes}
        className="sr-only"
        id={id}
        multiple={multiple}
        name={name}
        onChange={(event) => setFileNames(Array.from(event.target.files ?? []).map((file) => file.name))}
        type="file"
      />
      <label
        className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-civic-line bg-white px-3 py-2 text-sm font-semibold text-civic-blue hover:bg-civic-panel"
        htmlFor={id}
      >
        <Upload aria-hidden="true" size={16} />
        {multiple ? "Elegir archivos" : "Elegir archivo"}
      </label>
      <p aria-live="polite" className="whitespace-normal break-all text-xs leading-5 text-civic-muted">
        {fileNames.length > 0 ? fileNames.join(", ") : "Ningun archivo seleccionado"}
      </p>
    </div>
  );
}

export function ReportForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileTokenRef = useRef("");
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [turnstileState, setTurnstileState] = useState<TurnstileState>("loading");
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [scoreSelection, setScoreSelection] = useState("");
  const [cutoffSelection, setCutoffSelection] = useState("");
  const [fileFieldsKey, setFileFieldsKey] = useState(0);
  const [repeatedScores, setRepeatedScores] = useState<RepeatedScoreOption[]>([
    { score: initialRepeatedScore, count: null }
  ]);

  const scoreOptions = useMemo(
    () => [
      ...repeatedScores.map(({ score, count }) => ({
        value: formatScoreForDisplay(score),
        label: `${formatScoreForDisplay(score)}${count ? ` (${count.toLocaleString("es-CL")} reportes)` : " (patron inicial)"}`
      })),
      { value: "other", label: "Otro puntaje" }
    ],
    [repeatedScores]
  );
  const regionalApplicationTotal = REGION_APPLICATION_TOTALS[selectedRegion as keyof typeof REGION_APPLICATION_TOTALS];

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepeatedScores() {
      try {
        const response = await fetch(apiUrl("/api/stats"), { cache: "no-store", signal: controller.signal });
        const result = (await response.json()) as ApiResult<PublicStatsWithPatterns>;
        if (response.ok && result.ok) setRepeatedScores(mergeRepeatedScores(result.data.patterns));
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setRepeatedScores([{ score: initialRepeatedScore, count: null }]);
        }
      }
    }

    void loadRepeatedScores();
    const refreshInterval = window.setInterval(() => void loadRepeatedScores(), 60_000);

    return () => {
      window.clearInterval(refreshInterval);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const scriptId = "cloudflare-turnstile-script";

    function renderTurnstile() {
      const api = getTurnstileApi();
      const container = turnstileContainerRef.current;
      if (cancelled || !api || !container || turnstileWidgetIdRef.current) return;

      turnstileWidgetIdRef.current = api.render(container, {
        sitekey: ["localhost", "127.0.0.1"].includes(window.location.hostname) ? turnstileTestSiteKey : turnstileSiteKey,
        callback: (token) => {
          turnstileTokenRef.current = token;
          setTurnstileState("ready");
        },
        "error-callback": () => {
          turnstileTokenRef.current = "";
          setTurnstileState("error");
          return true;
        },
        "expired-callback": () => {
          turnstileTokenRef.current = "";
          setTurnstileState("loading");
        },
        "response-field": false,
        size: window.innerWidth < 400 ? "compact" : "flexible",
        theme: "auto"
      });
    }

    const existingScript = document.getElementById(scriptId);
    if (existingScript instanceof HTMLScriptElement) {
      existingScript.addEventListener("load", renderTurnstile);
      renderTurnstile();
    } else {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", renderTurnstile);
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      document.getElementById(scriptId)?.removeEventListener("load", renderTurnstile);
      const api = getTurnstileApi();
      const widgetId = turnstileWidgetIdRef.current;
      if (api && widgetId) api.remove(widgetId);
      turnstileWidgetIdRef.current = null;
      turnstileTokenRef.current = "";
    };
  }, []);

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
    data.set("turnstileToken", turnstileTokenRef.current);
    data.set("source", "frontend");

    setSubmitState("submitting");
    try {
      const response = await fetch(apiUrl("/api/reports"), { method: "POST", body: data });
      const result = (await response.json()) as ApiResult<ReportCreatedResponse>;
      if (!response.ok || !result.ok) {
        throw new Error(result.ok ? "No fue posible registrar el reporte." : result.error.message);
      }

      setSubmitState("success");
      setMessage(result.data.message || `Reporte recibido con folio ${result.data.reportId}.`);
      formRef.current?.reset();
      setSelectedRegion("");
      setScoreSelection("");
      setCutoffSelection("");
      setFileFieldsKey((current) => current + 1);
      turnstileTokenRef.current = "";
      setTurnstileState("loading");
      const api = getTurnstileApi();
      const widgetId = turnstileWidgetIdRef.current;
      if (api && widgetId) api.reset(widgetId);
    } catch (error) {
      setSubmitState("error");
      setMessage(error instanceof Error ? error.message : "No fue posible registrar el reporte.");
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 sm:p-5">
        <h1 className="text-xl font-bold text-civic-ink sm:text-2xl">Reportar mi caso</h1>
        <p className="mt-2 text-sm leading-5 text-civic-muted sm:leading-6">
          Comparte antecedentes verificables y anonimizados. Evita nombres de evaluadores, datos privados o conclusiones no comprobadas.
        </p>
      </CardHeader>
      <CardBody className="p-3 min-[400px]:p-4 sm:p-5">
        <div className="mb-5 rounded-md border border-civic-amber/40 bg-[#fff8e6] p-3 text-sm leading-5 text-civic-ink sm:p-4 sm:leading-6">
          <div className="flex gap-3">
            <AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0 text-civic-amber" size={20} />
            <p>
              Antes de subir archivos, tapa o recorta RUT, correo, telefono, direccion, folios privados, firmas y datos de terceros.
            </p>
          </div>
        </div>

        <form className="space-y-5 sm:space-y-6" encType="multipart/form-data" onSubmit={handleSubmit} ref={formRef}>
          <input aria-hidden="true" autoComplete="off" className="hidden" name="website" tabIndex={-1} type="text" />

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <SelectField error={errors.program} id="program" label="Programa" name="program" options={PROGRAM_OPTIONS} required />
            <SelectField
              error={errors.region}
              hint={regionalApplicationTotal ? `Total regional de referencia: ${regionalApplicationTotal.toLocaleString("es-CL")} postulaciones.` : undefined}
              id="region"
              label="Region"
              name="region"
              onChange={(event) => setSelectedRegion(event.target.value)}
              options={REGION_OPTIONS}
              required
              value={selectedRegion}
            />
            <InputField id="commune" label="Comuna" name="commune" placeholder="Opcional" />
            <SelectField error={errors.statusText} id="statusText" label="Estado informado" name="statusText" options={STATUS_OPTIONS} required />

            <div>
              <SelectField
                error={scoreSelection === "other" ? undefined : errors.scoreText}
                hint="Se actualiza automaticamente al detectar nuevos puntajes repetidos."
                id="scoreSelection"
                label="Puntaje informado"
                onChange={(event) => setScoreSelection(event.target.value)}
                options={scoreOptions}
                placeholder="Selecciona el puntaje observado"
                required
                value={scoreSelection}
              />
              {scoreSelection && scoreSelection !== "other" ? <input name="scoreText" type="hidden" value={scoreSelection} /> : null}
              {scoreSelection === "other" ? (
                <InputField
                  className="mt-3"
                  error={errors.scoreText}
                  id="scoreText"
                  inputMode="decimal"
                  label="Otro puntaje"
                  name="scoreText"
                  placeholder="Ejemplo: 97,321"
                  required
                />
              ) : null}
            </div>

            <div>
              <SelectField
                id="cutoffSelection"
                label="Puntaje de corte informado"
                onChange={(event) => setCutoffSelection(event.target.value)}
                options={[
                  { value: formatScoreForDisplay(initialCutoffScore), label: "98,51" },
                  { value: "other", label: "Otro puntaje de corte" }
                ]}
                placeholder="No informado"
                value={cutoffSelection}
              />
              {cutoffSelection && cutoffSelection !== "other" ? <input name="cutoffScoreText" type="hidden" value={cutoffSelection} /> : null}
              {cutoffSelection === "other" ? (
                <InputField
                  className="mt-3"
                  id="cutoffScoreText"
                  inputMode="decimal"
                  label="Otro puntaje de corte"
                  name="cutoffScoreText"
                  placeholder="Ejemplo: 99,25"
                />
              ) : null}
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-md border border-civic-line bg-civic-panel p-3 text-xs leading-5 text-civic-muted sm:text-sm">
            {regionalApplicationTotal ? (
              <Database aria-hidden="true" className="mt-0.5 shrink-0 text-civic-teal" size={18} />
            ) : (
              <Repeat2 aria-hidden="true" className="mt-0.5 shrink-0 text-civic-blue" size={18} />
            )}
            <p>
              {regionalApplicationTotal
                ? `Valparaiso registra ${regionalApplicationTotal.toLocaleString("es-CL")} postulaciones como dato regional de referencia. Este total no corresponde a los reportes recibidos por esta plataforma.`
                : "Los puntajes que alcancen el umbral de repeticion apareceran automaticamente como opciones en este formulario."}
            </p>
          </div>

          <TextareaField className="min-h-24 sm:min-h-32" hint="Elimina nombres, correos, telefonos o identificadores privados." id="emailMessage" label="Mensaje recibido por correo" name="emailMessage" placeholder="Texto relevante recibido..." />
          <TextareaField className="min-h-24 sm:min-h-32" hint="Incluye solo texto general visible en el sitio de resultados." id="webMessage" label="Mensaje visible en sitio web" name="webMessage" placeholder="Opcional" />

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <InputField id="contactEmail" label="Correo de contacto privado" name="contactEmail" placeholder="Opcional; no se publica" type="email" />
            <InputField id="contactPhone" label="Telefono de contacto privado" name="contactPhone" placeholder="Opcional; no se publica" />
            <InputField id="resultUrl" label="URL de resultado" name="resultUrl" placeholder="Opcional; no se publica si contiene token" type="url" />
          </div>

          <TextareaField className="min-h-24 sm:min-h-32" hint="No incluyas RUT, correo, telefono, direccion ni folios privados." id="additionalComments" label="Comentarios adicionales" name="additionalComments" placeholder="Opcional" />

          <div className="rounded-md border border-dashed border-civic-line bg-civic-panel p-3 sm:p-5">
            <div className="mb-4 flex items-start gap-3">
              <Upload aria-hidden="true" className="mt-1 shrink-0 text-civic-blue" size={20} />
              <div>
                <p className="text-sm font-semibold text-civic-ink">PNG, JPG, WEBP o PDF hasta 5 MB</p>
                <p className="mt-1 text-xs text-civic-muted sm:text-sm">Hasta 4 archivos anonimizados.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <EvidenceFileField id="emailScreenshot" key={`email-${fileFieldsKey}`} label="Captura de correo" name="emailScreenshot" />
              <EvidenceFileField id="webScreenshot" key={`web-${fileFieldsKey}`} label="Captura web" name="webScreenshot" />
              <EvidenceFileField id="otherEvidence" key={`other-${fileFieldsKey}`} label="Otra evidencia" multiple name="otherEvidence" />
            </div>
            {errors.files ? <p className="mt-3 text-sm font-medium text-civic-red" role="alert">{errors.files}</p> : null}
          </div>

          <div className="rounded-md border border-civic-line p-3 sm:p-4">
            <label className="flex gap-3 text-sm leading-5 text-civic-ink sm:leading-6">
              <input className="mt-1 size-4 shrink-0" name="consent" required type="checkbox" />
              <span>Confirmo que revise y anonimice la evidencia y autorizo su uso agregado o moderado para fines de transparencia civica.</span>
            </label>
            {errors.consent ? <p className="mt-2 text-sm font-medium text-civic-red" role="alert">{errors.consent}</p> : null}
          </div>

          <div className="overflow-hidden rounded-md border border-civic-line bg-white px-0 py-3 sm:p-4">
            <p className="px-3 text-sm font-semibold text-civic-ink sm:px-0">Verificacion Turnstile</p>
            <div className="turnstile-shell mt-3 min-h-16 w-full min-w-0 overflow-hidden" ref={turnstileContainerRef} />
            {turnstileState === "loading" ? <p className="mt-2 px-3 text-xs text-civic-muted sm:px-0">Cargando verificacion segura...</p> : null}
            {turnstileState === "error" ? (
              <p className="mt-2 px-3 text-xs font-medium text-civic-red sm:px-0" role="alert">No fue posible cargar la verificacion. Recarga la pagina o prueba sin bloqueadores.</p>
            ) : null}
          </div>

          {message ? (
            <div className={`rounded-md border p-4 text-sm ${submitState === "success" ? "border-civic-teal bg-[#eefaf7] text-civic-ink" : "border-civic-red bg-[#fff7ed] text-civic-red"}`} role="status">
              <div className="flex gap-2">
                {submitState === "success" ? <CheckCircle2 aria-hidden="true" size={18} /> : null}
                <span>{message}</span>
              </div>
            </div>
          ) : null}

          <Button className="w-full sm:w-auto" disabled={submitState === "submitting"} type="submit">
            {submitState === "submitting" ? "Enviando..." : "Enviar reporte"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
