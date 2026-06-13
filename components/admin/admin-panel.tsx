"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Clipboard,
  Download,
  Eye,
  FileDown,
  Filter,
  KeyRound,
  RefreshCw,
  Save,
  Search,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { InputField, SelectField, TextareaField } from "@/components/ui/form-field";
import type { ApiResult } from "@/types/api";
import type { PatternAnalysis, RequestDraft } from "@/types/patterns";
import {
  MODERATION_STATUS_OPTIONS,
  PROGRAM_OPTIONS,
  REGION_OPTIONS,
  type AdminEvidenceFile,
  type AdminReportDetail,
  type AdminReportRow,
  type ModerationStatus
} from "@/types/reports";

interface AdminFilters {
  moderationStatus: string;
  program: string;
  region: string;
  score96489Only: boolean;
  pattern: string;
  search: string;
}

interface ModerationDraft {
  status: ModerationStatus;
  moderatorNotes: string;
  publicNotes: string;
}

interface AdminState {
  reports: AdminReportRow[];
  selectedDetail: AdminReportDetail | null;
  patterns: PatternAnalysis | null;
  requestDraft: RequestDraft | null;
  loading: boolean;
  detailLoading: boolean;
  analysisLoading: boolean;
  saving: boolean;
  errorMessage: string;
  actionMessage: string;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const tokenStorageKey = "evidencia_resultados_admin_token";
const patternOptions = ["score_96489", "same_message", "abeja_pending"] as const;

const patternLabels: Record<(typeof patternOptions)[number], string> = {
  score_96489: "Puntaje 96,489",
  same_message: "Mensaje repetido",
  abeja_pending: "Capital Abeja pendiente con puntaje"
};

function apiUrl(path: string): string {
  return `${apiBaseUrl}${path}`;
}

function buildQuery(filters: AdminFilters): string {
  const params = new URLSearchParams();
  if (filters.moderationStatus) params.set("moderationStatus", filters.moderationStatus);
  if (filters.program) params.set("program", filters.program);
  if (filters.region) params.set("region", filters.region);
  if (filters.score96489Only) params.set("score", "96.489");
  if (filters.pattern) params.set("pattern", filters.pattern);
  const query = params.toString();
  return query ? `?${query}` : "";
}

async function readApi<TData>(url: string, token: string, init?: RequestInit): Promise<TData> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });
  const result = (await response.json()) as ApiResult<TData>;
  if (!response.ok || !result.ok) {
    const message = result.ok ? `Error HTTP ${response.status}` : result.error.message;
    throw new Error(message);
  }
  return result.data;
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

function statusBadge(status: ModerationStatus) {
  const color =
    status === "published" || status === "verified_pattern"
      ? "border-civic-teal bg-[#eefaf7] text-civic-teal"
      : status === "rejected_private_data"
        ? "border-civic-red bg-[#fff7ed] text-civic-red"
        : "border-civic-line bg-civic-panel text-civic-muted";
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${color}`}>{status}</span>;
}

function formatBytes(sizeBytes: number): string {
  if (sizeBytes < 1024) return `${sizeBytes} B`;
  if (sizeBytes < 1024 * 1024) return `${(sizeBytes / 1024).toFixed(1)} KB`;
  return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("es-CL");
}

function displayValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "Sin dato";
  if (typeof value === "boolean") return value ? "Si" : "No";
  if (typeof value === "string" || typeof value === "number") return String(value);
  return JSON.stringify(value, null, 2);
}

function draftText(draft: RequestDraft): string {
  const methodology = draft.methodology.length > 0 ? `\n\nMetodologia de respaldo:\n${draft.methodology.map((item) => `- ${item}`).join("\n")}` : "";
  return `Asunto: ${draft.subject}\n\n${draft.body}${methodology}`;
}

function draftFilename(): string {
  return "borrador-solicitud-informacion.txt";
}

function DetailValue({ label, value, mono = false }: { label: string; value: unknown; mono?: boolean }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-civic-muted">{label}</dt>
      <dd className={`mt-1 break-words whitespace-pre-wrap text-sm leading-6 text-civic-ink ${mono ? "font-mono text-xs" : ""}`}>
        {displayValue(value)}
      </dd>
    </div>
  );
}

function PatternAnalysisPanel({ analysis }: { analysis: PatternAnalysis }) {
  const groups = [
    {
      title: "Puntajes repetidos",
      rows: analysis.repeatedScores.map((item) => ({
        key: item.score,
        label: `Puntaje ${item.score}`,
        count: item.count,
        verified: item.verifiedCount,
        pending: item.pendingCount
      }))
    },
    {
      title: "Estados repetidos",
      rows: analysis.repeatedStatuses.map((item) => ({
        key: item.status,
        label: item.status,
        count: item.count,
        verified: item.verifiedCount,
        pending: item.pendingCount
      }))
    },
    {
      title: "Frases conocidas",
      rows: analysis.knownPhrasePatterns.map((item) => ({
        key: item.key,
        label: item.label,
        count: item.count,
        verified: item.verifiedCount,
        pending: item.pendingCount
      }))
    }
  ];

  return (
    <div className="space-y-6">
      <dl className="grid gap-4 border-b border-civic-line pb-5 sm:grid-cols-2">
        <DetailValue label="Generado" value={formatDate(analysis.generatedAt)} />
        <DetailValue label="Minimo de coincidencias" value={analysis.minimumOccurrences} />
      </dl>
      {groups.map((group) => (
        <section key={group.title}>
          <h3 className="text-sm font-bold text-civic-ink">{group.title}</h3>
          {group.rows.length === 0 ? (
            <p className="mt-2 text-sm text-civic-muted">Sin grupos que alcancen el minimo configurado.</p>
          ) : (
            <ul className="mt-3 divide-y divide-civic-line border-y border-civic-line">
              {group.rows.map((row) => (
                <li className="grid gap-2 py-3 text-sm sm:grid-cols-[1fr_auto] sm:items-center" key={row.key}>
                  <span className="font-medium text-civic-ink">{row.label}</span>
                  <span className="text-civic-muted">
                    {row.count} reportes · {row.verified} verificados · {row.pending} pendientes
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
      <section>
        <h3 className="text-sm font-bold text-civic-ink">Criterios de lectura</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-civic-muted">
          {analysis.methodology.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </div>
  );
}

function EvidenceList({ files, onOpen }: { files: AdminEvidenceFile[]; onOpen: (fileId: string) => void }) {
  if (files.length === 0) return <p className="text-sm text-civic-muted">Este reporte no tiene archivos adjuntos.</p>;

  return (
    <ul className="space-y-3">
      {files.map((file) => (
        <li className="rounded-md border border-civic-line p-4" key={file.id}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <dl className="grid min-w-0 flex-1 gap-x-5 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <DetailValue label="Nombre" value={file.originalName ?? file.id} />
              <DetailValue label="Tipo" value={file.fileType} />
              <DetailValue label="MIME" value={file.mimeType} />
              <DetailValue label="Tamano" value={formatBytes(file.sizeBytes)} />
              <DetailValue label="Estado" value={file.moderationStatus} />
              <DetailValue label="Duplicados" value={Math.max(0, file.duplicateCount - 1)} />
              <DetailValue label="Creado" value={formatDate(file.createdAt)} />
              <DetailValue label="ID reporte" mono value={file.reportId} />
              <DetailValue label="ID archivo" mono value={file.id} />
              <DetailValue label="SHA-256" mono value={file.sha256} />
            </dl>
            <Button onClick={() => onOpen(file.id)} tone="secondary" type="button">
              <Eye aria-hidden="true" size={16} />
              Abrir
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

const initialState: AdminState = {
  reports: [],
  selectedDetail: null,
  patterns: null,
  requestDraft: null,
  loading: false,
  detailLoading: false,
  analysisLoading: false,
  saving: false,
  errorMessage: "",
  actionMessage: ""
};

export function AdminPanel() {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [filters, setFilters] = useState<AdminFilters>({
    moderationStatus: "",
    program: "",
    region: "",
    score96489Only: false,
    pattern: "",
    search: ""
  });
  const [moderation, setModeration] = useState<ModerationDraft>({
    status: "pending",
    moderatorNotes: "",
    publicNotes: ""
  });
  const [state, setState] = useState<AdminState>(initialState);

  useEffect(() => {
    const storedToken = window.sessionStorage.getItem(tokenStorageKey);
    if (storedToken) {
      setToken(storedToken);
      setTokenInput(storedToken);
    }
  }, []);

  const loadReports = useCallback(async () => {
    if (!token) return;
    setState((current) => ({ ...current, loading: true, errorMessage: "", actionMessage: "" }));
    try {
      const reports = await readApi<AdminReportRow[]>(apiUrl(`/api/admin/reports${buildQuery(filters)}`), token);
      setState((current) => ({ ...current, reports, loading: false, actionMessage: `${reports.length} reportes cargados.` }));
    } catch (error) {
      setState((current) => ({ ...current, loading: false, errorMessage: errorMessage(error, "No fue posible cargar reportes.") }));
    }
  }, [filters, token]);

  const loadAnalysis = useCallback(async () => {
    if (!token) return;
    setState((current) => ({ ...current, analysisLoading: true, errorMessage: "" }));
    try {
      const [patterns, requestDraft] = await Promise.all([
        readApi<PatternAnalysis>(apiUrl("/api/admin/patterns"), token),
        readApi<RequestDraft>(apiUrl("/api/admin/request-draft"), token)
      ]);
      setState((current) => ({ ...current, patterns, requestDraft, analysisLoading: false }));
    } catch (error) {
      setState((current) => ({
        ...current,
        analysisLoading: false,
        errorMessage: errorMessage(error, "No fue posible cargar el analisis de patrones.")
      }));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      void loadReports();
      void loadAnalysis();
    }
  }, [loadAnalysis, loadReports, token]);

  const visibleReports = useMemo(() => {
    const term = filters.search.trim().toLocaleLowerCase("es-CL");
    if (!term) return state.reports;
    return state.reports.filter((report) =>
      [report.id, report.program, report.region, report.commune, report.normalizedScore, report.statusText]
        .filter((value): value is string => typeof value === "string")
        .some((value) => value.toLocaleLowerCase("es-CL").includes(term))
    );
  }, [filters.search, state.reports]);

  function saveToken() {
    const trimmedToken = tokenInput.trim();
    setToken(trimmedToken);
    if (trimmedToken) {
      window.sessionStorage.setItem(tokenStorageKey, trimmedToken);
      setState((current) => ({ ...current, actionMessage: "Token guardado para esta sesion.", errorMessage: "" }));
    } else {
      window.sessionStorage.removeItem(tokenStorageKey);
      setState({ ...initialState, actionMessage: "Token eliminado de esta sesion." });
    }
  }

  async function loadDetail(reportId: string) {
    if (!token) return;
    setState((current) => ({ ...current, detailLoading: true, errorMessage: "", actionMessage: "" }));
    try {
      const detail = await readApi<AdminReportDetail>(apiUrl(`/api/admin/reports/${encodeURIComponent(reportId)}`), token);
      setModeration({
        status: detail.report.moderationStatus,
        moderatorNotes: detail.report.moderatorNotes ?? "",
        publicNotes: detail.report.publicNotes ?? ""
      });
      setState((current) => ({ ...current, selectedDetail: detail, detailLoading: false }));
    } catch (error) {
      setState((current) => ({ ...current, detailLoading: false, errorMessage: errorMessage(error, "No fue posible cargar el detalle.") }));
    }
  }

  async function saveModeration() {
    const detail = state.selectedDetail;
    if (!token || !detail) return;
    const body = new FormData();
    body.set("status", moderation.status);
    body.set("notes", moderation.moderatorNotes);
    body.set("publicNotes", moderation.publicNotes);

    setState((current) => ({ ...current, saving: true, actionMessage: "", errorMessage: "" }));
    try {
      const updated = await readApi<AdminReportDetail>(
        apiUrl(`/api/admin/reports/${encodeURIComponent(detail.report.id)}/moderate`),
        token,
        { method: "POST", body }
      );
      setState((current) => ({
        ...current,
        saving: false,
        selectedDetail: updated,
        reports: current.reports.map((report) =>
          report.id === updated.report.id ? { ...report, moderationStatus: updated.report.moderationStatus } : report
        ),
        actionMessage: "Moderacion y notas guardadas."
      }));
    } catch (error) {
      setState((current) => ({ ...current, saving: false, errorMessage: errorMessage(error, "No fue posible guardar la moderacion.") }));
    }
  }

  async function downloadExport() {
    if (!token) return;
    try {
      const response = await fetch(apiUrl(`/api/admin/export.csv${buildQuery(filters)}`), {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store"
      });
      if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
      downloadBlob(await response.blob(), "evidencia-resultados-export.csv");
      setState((current) => ({ ...current, actionMessage: "Exportacion CSV descargada.", errorMessage: "" }));
    } catch (error) {
      setState((current) => ({ ...current, errorMessage: errorMessage(error, "No fue posible descargar la exportacion.") }));
    }
  }

  async function openEvidenceFile(fileId: string) {
    if (!token) return;
    try {
      const response = await fetch(apiUrl(`/api/admin/files/${encodeURIComponent(fileId)}`), {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store"
      });
      if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
      const url = URL.createObjectURL(await response.blob());
      window.open(url, "_blank", "noopener,noreferrer");
      window.setTimeout(() => URL.revokeObjectURL(url), 30000);
    } catch (error) {
      setState((current) => ({ ...current, errorMessage: errorMessage(error, "No fue posible abrir la evidencia.") }));
    }
  }

  async function copyRequestDraft() {
    if (!state.requestDraft) return;
    try {
      await navigator.clipboard.writeText(draftText(state.requestDraft));
      setState((current) => ({ ...current, actionMessage: "Borrador copiado al portapapeles.", errorMessage: "" }));
    } catch (error) {
      setState((current) => ({ ...current, errorMessage: errorMessage(error, "No fue posible copiar el borrador.") }));
    }
  }

  function downloadRequestDraft() {
    if (!state.requestDraft) return;
    downloadBlob(new Blob([draftText(state.requestDraft)], { type: "text/plain;charset=utf-8" }), draftFilename());
    setState((current) => ({ ...current, actionMessage: "Borrador descargado.", errorMessage: "" }));
  }

  const report = state.selectedDetail?.report;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-civic-teal">Acceso restringido</p>
        <h1 className="mt-2 text-3xl font-bold text-civic-ink">Administracion de reportes y patrones</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-civic-muted">
          Revisa antecedentes privados, modera publicaciones y prepara solicitudes formales. Los indicadores describen reportes recibidos y patrones
          observados; no establecen por si solos fraude ni resultados falsos.
        </p>
      </div>

      <Card>
        <CardHeader><div className="flex items-center gap-2"><KeyRound className="text-civic-blue" size={20} /><h2 className="text-lg font-bold text-civic-ink">Token admin</h2></div></CardHeader>
        <CardBody>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <InputField id="adminToken" label="Token" onChange={(event) => setTokenInput(event.target.value)} placeholder="Pega el token de administracion" type="password" value={tokenInput} />
            <Button onClick={saveToken} type="button">Guardar token</Button>
          </div>
          <p className="mt-3 text-xs text-civic-muted">Se conserva solo en sessionStorage y se elimina al cerrar la sesion del navegador.</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><div className="flex items-center gap-2"><Filter className="text-civic-blue" size={20} /><h2 className="text-lg font-bold text-civic-ink">Consulta de reportes</h2></div></CardHeader>
        <CardBody>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SelectField id="filterModeration" label="Moderacion" onChange={(event) => setFilters((current) => ({ ...current, moderationStatus: event.target.value }))} options={MODERATION_STATUS_OPTIONS} placeholder="Todos" value={filters.moderationStatus} />
            <SelectField id="filterProgram" label="Programa" onChange={(event) => setFilters((current) => ({ ...current, program: event.target.value }))} options={PROGRAM_OPTIONS} placeholder="Todos" value={filters.program} />
            <SelectField id="filterRegion" label="Region" onChange={(event) => setFilters((current) => ({ ...current, region: event.target.value }))} options={REGION_OPTIONS} placeholder="Todas" value={filters.region} />
            <div className="space-y-2"><label className="block text-sm font-semibold text-civic-ink" htmlFor="filterPattern">Patron</label><select className="w-full rounded-md border border-civic-line bg-white px-3 py-2.5 text-sm text-civic-ink outline-none transition focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20" id="filterPattern" onChange={(event) => setFilters((current) => ({ ...current, pattern: event.target.value }))} value={filters.pattern}><option value="">Todos</option>{patternOptions.map((option) => <option key={option} value={option}>{patternLabels[option]}</option>)}</select></div>
            <InputField id="filterSearch" label="Buscar en resultados" onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} placeholder="ID, programa, region, comuna..." type="search" value={filters.search} />
            <div className="flex items-end"><label className="flex min-h-11 w-full items-center gap-3 rounded-md border border-civic-line bg-white px-3 py-2 text-sm text-civic-ink"><input checked={filters.score96489Only} className="size-4" onChange={(event) => setFilters((current) => ({ ...current, score96489Only: event.target.checked }))} type="checkbox" />Solo puntaje 96,489</label></div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button disabled={!token || state.loading} onClick={() => void loadReports()} tone="secondary" type="button"><RefreshCw size={16} />{state.loading ? "Cargando..." : "Aplicar filtros"}</Button>
            <Button disabled={!token} onClick={() => void downloadExport()} tone="secondary" type="button"><Download size={16} />Exportar CSV</Button>
          </div>
        </CardBody>
      </Card>

      {state.errorMessage ? <div className="rounded-md border border-civic-red bg-[#fff7ed] p-4 text-sm text-civic-red" role="alert">{state.errorMessage}</div> : null}
      {state.actionMessage ? <div className="rounded-md border border-civic-teal bg-[#eefaf7] p-4 text-sm text-civic-ink" role="status">{state.actionMessage}</div> : null}

      <Card>
        <CardHeader><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-2"><Search className="text-civic-blue" size={20} /><h2 className="text-lg font-bold text-civic-ink">Reportes privados</h2></div><span className="text-sm text-civic-muted">{visibleReports.length} visibles</span></div></CardHeader>
        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse text-left text-sm">
            <thead><tr className="border-b border-civic-line text-civic-muted"><th className="py-3 pr-4 font-semibold">Fecha</th><th className="py-3 pr-4 font-semibold">ID</th><th className="py-3 pr-4 font-semibold">Programa / region</th><th className="py-3 pr-4 font-semibold">Puntaje / corte</th><th className="py-3 pr-4 font-semibold">Patrones</th><th className="py-3 pr-4 font-semibold">Archivos</th><th className="py-3 pr-4 font-semibold">Moderacion</th><th className="py-3 font-semibold">Accion</th></tr></thead>
            <tbody>
              {visibleReports.length === 0 ? <tr><td className="py-8 text-center text-civic-muted" colSpan={8}>{token ? "Sin reportes para estos filtros." : "Ingresa el token admin para consultar reportes."}</td></tr> : visibleReports.map((item) => (
                <tr className={`border-b border-civic-line align-top last:border-0 ${report?.id === item.id ? "bg-civic-panel" : ""}`} key={item.id}>
                  <td className="py-3 pr-4 text-xs text-civic-muted">{formatDate(item.createdAt)}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-civic-muted">{item.id}</td>
                  <td className="py-3 pr-4"><span className="block font-medium text-civic-ink">{item.program}</span><span className="mt-1 block text-civic-muted">{item.region}{item.commune ? ` / ${item.commune}` : ""}</span></td>
                  <td className="py-3 pr-4"><span className="block font-semibold text-civic-blue">{item.normalizedScore}</span><span className="mt-1 block text-civic-muted">Corte: {item.cutoffScoreText ?? "Sin dato"}</span></td>
                  <td className="py-3 pr-4 text-xs text-civic-muted">{[item.patternScore96489 ? "96,489" : "", item.patternSameMessage ? "Mensaje repetido" : "", item.patternCapitalAbejaPendingWithScore ? "Abeja pendiente" : ""].filter(Boolean).join("; ") || "Sin marca"}</td>
                  <td className="py-3 pr-4 text-civic-muted">{item.fileCount}</td>
                  <td className="py-3 pr-4">{statusBadge(item.moderationStatus)}</td>
                  <td className="py-3"><Button disabled={state.detailLoading} onClick={() => void loadDetail(item.id)} tone="quiet" type="button"><Eye size={16} />Detalle</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {report && state.selectedDetail ? (
        <Card>
          <CardHeader><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-civic-muted">Expediente privado</p><h2 className="mt-1 text-lg font-bold text-civic-ink">Detalle completo</h2><p className="mt-1 font-mono text-xs text-civic-muted">{report.id}</p></div>{statusBadge(report.moderationStatus)}</div></CardHeader>
          <CardBody className="space-y-7">
            <section><h3 className="mb-4 text-sm font-bold text-civic-ink">Identificacion y resultado</h3><dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><DetailValue label="Creado" value={formatDate(report.createdAt)} /><DetailValue label="Actualizado" value={formatDate(report.updatedAt)} /><DetailValue label="Programa" value={report.program} /><DetailValue label="Region" value={report.region} /><DetailValue label="Comuna" value={report.commune} /><DetailValue label="Puntaje informado" value={report.scoreText} /><DetailValue label="Puntaje normalizado" value={report.normalizedScore} /><DetailValue label="Corte informado" value={report.cutoffScoreText} /><DetailValue label="Corte normalizado" value={report.normalizedCutoffScore} /><DetailValue label="Estado informado" value={report.statusText} /><DetailValue label="Consentimiento" value={report.consent} /><DetailValue label="URL privada" value={report.resultUrl} /></dl></section>
            <section><h3 className="mb-4 text-sm font-bold text-civic-ink">Mensajes y contacto privado</h3><dl className="grid gap-4 md:grid-cols-2"><DetailValue label="Mensaje correo" value={report.emailMessage} /><DetailValue label="Mensaje web" value={report.webMessage} /><DetailValue label="Comentarios adicionales" value={report.additionalComments} /><div className="grid gap-4 sm:grid-cols-2"><DetailValue label="Email de contacto" value={report.contactEmail} /><DetailValue label="Telefono de contacto" value={report.contactPhone} /></div></dl></section>
            <section><h3 className="mb-4 text-sm font-bold text-civic-ink">Marcas de evidencia y patrones</h3><dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><DetailValue label="Captura email" value={report.hasEmailScreenshot} /><DetailValue label="Captura web" value={report.hasWebScreenshot} /><DetailValue label="Otros archivos" value={report.hasOtherFiles} /><DetailValue label="Puntaje 96,489" value={report.patternScore96489} /><DetailValue label="Mensaje repetido" value={report.patternSameMessage} /><DetailValue label="Abeja pendiente con puntaje" value={report.patternCapitalAbejaPendingWithScore} /></dl></section>
            <section><h3 className="mb-4 text-sm font-bold text-civic-ink">Metadatos tecnicos privados</h3><dl className="grid gap-4 md:grid-cols-2"><DetailValue label="Hash IP" mono value={report.ipHash} /><DetailValue label="Hash user-agent" mono value={report.userAgentHash} /></dl></section>
            <section><h3 className="mb-3 text-sm font-bold text-civic-ink">Archivos privados autenticados</h3><EvidenceList files={state.selectedDetail.files} onOpen={(fileId) => void openEvidenceFile(fileId)} /></section>
            <section className="border-t border-civic-line pt-6"><div className="mb-4 flex items-center gap-2"><ShieldCheck className="text-civic-blue" size={20} /><h3 className="text-sm font-bold text-civic-ink">Moderacion y notas</h3></div><div className="grid gap-4 lg:grid-cols-3"><SelectField id="detailModeration" label="Estado de moderacion" onChange={(event) => setModeration((current) => ({ ...current, status: event.target.value as ModerationStatus }))} options={MODERATION_STATUS_OPTIONS} value={moderation.status} /><TextareaField id="moderatorNotes" label="Notas del moderador" maxLength={1200} onChange={(event) => setModeration((current) => ({ ...current, moderatorNotes: event.target.value }))} value={moderation.moderatorNotes} /><TextareaField id="publicNotes" label="Notas publicas" maxLength={500} onChange={(event) => setModeration((current) => ({ ...current, publicNotes: event.target.value }))} value={moderation.publicNotes} /></div><div className="mt-4 flex justify-end"><Button disabled={state.saving} onClick={() => void saveModeration()} type="button"><Save size={16} />{state.saving ? "Guardando..." : "Guardar moderacion"}</Button></div></section>
          </CardBody>
        </Card>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-civic-muted">Analisis agregado</p><h2 className="mt-1 text-lg font-bold text-civic-ink">Patrones reportados</h2></div><Button disabled={!token || state.analysisLoading} onClick={() => void loadAnalysis()} tone="quiet" type="button"><RefreshCw size={16} /><span className="sr-only">Actualizar analisis</span></Button></div></CardHeader>
          <CardBody>{state.patterns ? <PatternAnalysisPanel analysis={state.patterns} /> : <p className="text-sm leading-6 text-civic-muted">{token ? "Cargando el analisis disponible..." : "Ingresa el token para consultar patrones agregados."}</p>}</CardBody>
        </Card>
        <Card>
          <CardHeader><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-civic-muted">Acceso a informacion</p><h2 className="mt-1 text-lg font-bold text-civic-ink">Borrador formal</h2></div></CardHeader>
          <CardBody>
            {state.requestDraft ? <><pre className="max-h-[34rem] overflow-auto whitespace-pre-wrap rounded-md border border-civic-line bg-civic-panel p-4 font-sans text-sm leading-6 text-civic-ink">{draftText(state.requestDraft)}</pre><div className="mt-4 flex flex-wrap gap-3"><Button onClick={() => void copyRequestDraft()} tone="secondary" type="button"><Clipboard size={16} />Copiar</Button><Button onClick={downloadRequestDraft} tone="secondary" type="button"><FileDown size={16} />Descargar</Button></div></> : <p className="text-sm leading-6 text-civic-muted">{token ? "Cargando el borrador formal..." : "Ingresa el token para generar el borrador."}</p>}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
