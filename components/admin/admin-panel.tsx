"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, Eye, Filter, KeyRound, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { InputField, SelectField } from "@/components/ui/form-field";
import type { ApiResult } from "@/types/api";
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
}

interface AdminState {
  reports: AdminReportRow[];
  selectedDetail: AdminReportDetail | null;
  loading: boolean;
  errorMessage: string;
  actionMessage: string;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const tokenStorageKey = "evidencia_resultados_admin_token";

function apiUrl(path: string): string {
  return `${apiBaseUrl}${path}`;
}

function buildQuery(filters: AdminFilters): string {
  const params = new URLSearchParams();
  if (filters.moderationStatus) {
    params.set("moderationStatus", filters.moderationStatus);
  }
  if (filters.program) {
    params.set("program", filters.program);
  }
  if (filters.region) {
    params.set("region", filters.region);
  }
  if (filters.score96489Only) {
    params.set("score", "96.489");
  }
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

function statusBadge(status: ModerationStatus) {
  const color =
    status === "published" || status === "verified_pattern"
      ? "border-civic-teal bg-[#eefaf7] text-civic-teal"
      : status === "rejected_private_data"
        ? "border-civic-red bg-[#fff7ed] text-civic-red"
        : "border-civic-line bg-civic-panel text-civic-muted";
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
}

function formatBytes(sizeBytes: number) {
  if (sizeBytes < 1024) {
    return `${sizeBytes} B`;
  }
  if (sizeBytes < 1024 * 1024) {
    return `${(sizeBytes / 1024).toFixed(1)} KB`;
  }
  return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
}

function DetailValue({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-civic-muted">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap text-sm leading-6 text-civic-ink">{value || "Sin dato"}</dd>
    </div>
  );
}

function EvidenceList({
  files,
  onOpen
}: {
  files: AdminEvidenceFile[];
  onOpen: (fileId: string) => void;
}) {
  if (files.length === 0) {
    return <p className="text-sm text-civic-muted">Este reporte no tiene archivos adjuntos.</p>;
  }

  return (
    <ul className="space-y-3">
      {files.map((file) => (
        <li className="rounded-md border border-civic-line p-3" key={file.id}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-civic-ink">
                {file.originalName ?? file.id} · {formatBytes(file.sizeBytes)}
              </p>
              <p className="mt-1 text-xs text-civic-muted">
                {file.fileType} · {file.mimeType} · duplicados: {Math.max(0, file.duplicateCount - 1)}
              </p>
            </div>
            <Button onClick={() => onOpen(file.id)} tone="secondary" type="button">
              <Eye aria-hidden="true" size={16} />
              Abrir archivo
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function AdminPanel() {
  const [token, setToken] = useState<string>("");
  const [tokenInput, setTokenInput] = useState<string>("");
  const [filters, setFilters] = useState<AdminFilters>({
    moderationStatus: "",
    program: "",
    region: "",
    score96489Only: false
  });
  const [state, setState] = useState<AdminState>({
    reports: [],
    selectedDetail: null,
    loading: false,
    errorMessage: "",
    actionMessage: ""
  });

  useEffect(() => {
    const storedToken = window.sessionStorage.getItem(tokenStorageKey);
    if (storedToken) {
      setToken(storedToken);
      setTokenInput(storedToken);
    }
  }, []);

  const loadReports = useCallback(async () => {
    if (!token) {
      setState((current) => ({ ...current, errorMessage: "Ingresa un token admin para cargar reportes." }));
      return;
    }

    setState((current) => ({ ...current, loading: true, errorMessage: "", actionMessage: "" }));
    try {
      const reports = await readApi<AdminReportRow[]>(apiUrl(`/api/admin/reports${buildQuery(filters)}`), token);
      setState((current) => ({
        ...current,
        reports,
        loading: false,
        actionMessage: `${reports.length} reportes cargados.`
      }));
    } catch (error) {
      setState((current) => ({
        ...current,
        loading: false,
        errorMessage: error instanceof Error ? error.message : "No fue posible cargar reportes."
      }));
    }
  }, [filters, token]);

  useEffect(() => {
    if (token) {
      void loadReports();
    }
  }, [loadReports, token]);

  const visibleReports = useMemo(() => state.reports, [state.reports]);

  function saveToken() {
    const trimmedToken = tokenInput.trim();
    setToken(trimmedToken);
    if (trimmedToken) {
      window.sessionStorage.setItem(tokenStorageKey, trimmedToken);
      setState((current) => ({ ...current, actionMessage: "Token guardado en sessionStorage.", errorMessage: "" }));
    } else {
      window.sessionStorage.removeItem(tokenStorageKey);
      setState((current) => ({
        ...current,
        selectedDetail: null,
        actionMessage: "Token eliminado.",
        errorMessage: ""
      }));
    }
  }

  async function loadDetail(reportId: string) {
    if (!token) {
      setState((current) => ({ ...current, errorMessage: "Token admin requerido." }));
      return;
    }

    setState((current) => ({ ...current, errorMessage: "", actionMessage: "" }));
    try {
      const detail = await readApi<AdminReportDetail>(
        apiUrl(`/api/admin/reports/${encodeURIComponent(reportId)}`),
        token
      );
      setState((current) => ({ ...current, selectedDetail: detail }));
    } catch (error) {
      setState((current) => ({
        ...current,
        errorMessage: error instanceof Error ? error.message : "No fue posible cargar el detalle."
      }));
    }
  }

  async function moderateReport(reportId: string, moderationStatus: ModerationStatus) {
    if (!token) {
      setState((current) => ({ ...current, errorMessage: "Token admin requerido." }));
      return;
    }

    const body = new FormData();
    body.set("status", moderationStatus);

    setState((current) => ({ ...current, actionMessage: "", errorMessage: "" }));
    try {
      const detail = await readApi<AdminReportDetail>(
        apiUrl(`/api/admin/reports/${encodeURIComponent(reportId)}/moderate`),
        token,
        {
          method: "POST",
          body
        }
      );
      setState((current) => ({
        ...current,
        selectedDetail: detail,
        reports: current.reports.map((report) =>
          report.id === reportId ? { ...report, moderationStatus: detail.report.moderationStatus } : report
        ),
        actionMessage: `Reporte ${reportId} actualizado a ${moderationStatus}.`
      }));
    } catch (error) {
      setState((current) => ({
        ...current,
        errorMessage: error instanceof Error ? error.message : "No fue posible moderar el reporte."
      }));
    }
  }

  async function downloadExport() {
    if (!token) {
      setState((current) => ({ ...current, errorMessage: "Token admin requerido." }));
      return;
    }

    try {
      const response = await fetch(apiUrl(`/api/admin/export.csv${buildQuery(filters)}`), {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: "no-store"
      });
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "evidencia-resultados-export.csv";
      anchor.click();
      URL.revokeObjectURL(url);
      setState((current) => ({ ...current, actionMessage: "Exportacion descargada.", errorMessage: "" }));
    } catch (error) {
      setState((current) => ({
        ...current,
        errorMessage: error instanceof Error ? error.message : "No fue posible descargar la exportacion."
      }));
    }
  }

  async function openEvidenceFile(fileId: string) {
    if (!token) {
      setState((current) => ({ ...current, errorMessage: "Token admin requerido." }));
      return;
    }

    try {
      const response = await fetch(apiUrl(`/api/admin/files/${encodeURIComponent(fileId)}`), {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: "no-store"
      });
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      window.setTimeout(() => URL.revokeObjectURL(url), 30000);
    } catch (error) {
      setState((current) => ({
        ...current,
        errorMessage: error instanceof Error ? error.message : "No fue posible abrir la evidencia."
      }));
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-civic-teal">Acceso restringido</p>
        <h1 className="mt-2 text-3xl font-bold text-civic-ink">Panel de moderacion</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-civic-muted">
          Gestiona reportes, revisa evidencia autenticada, filtra patrones y exporta datos para auditoria. No publiques archivos con datos privados
          visibles.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <KeyRound aria-hidden="true" className="text-civic-blue" size={20} />
            <h2 className="text-lg font-bold text-civic-ink">Token admin</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <InputField
              id="adminToken"
              label="Token"
              name="adminToken"
              onChange={(event) => setTokenInput(event.target.value)}
              placeholder="Pega el token de administracion"
              type="password"
              value={tokenInput}
            />
            <Button onClick={saveToken} type="button">
              Guardar token
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter aria-hidden="true" className="text-civic-blue" size={20} />
            <h2 className="text-lg font-bold text-civic-ink">Filtros</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid gap-4 lg:grid-cols-4">
            <SelectField
              id="filterModeration"
              label="Moderacion"
              onChange={(event) => setFilters((current) => ({ ...current, moderationStatus: event.target.value }))}
              options={MODERATION_STATUS_OPTIONS}
              placeholder="Todos"
              value={filters.moderationStatus}
            />
            <SelectField
              id="filterProgram"
              label="Programa"
              onChange={(event) => setFilters((current) => ({ ...current, program: event.target.value }))}
              options={PROGRAM_OPTIONS}
              placeholder="Todos"
              value={filters.program}
            />
            <SelectField
              id="filterRegion"
              label="Region"
              onChange={(event) => setFilters((current) => ({ ...current, region: event.target.value }))}
              options={REGION_OPTIONS}
              placeholder="Todas"
              value={filters.region}
            />
            <div className="flex items-end">
              <label className="flex min-h-11 items-center gap-3 rounded-md border border-civic-line bg-white px-3 py-2 text-sm text-civic-ink">
                <input
                  checked={filters.score96489Only}
                  className="size-4"
                  onChange={(event) => setFilters((current) => ({ ...current, score96489Only: event.target.checked }))}
                  type="checkbox"
                />
                Solo 96,489
              </label>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button disabled={state.loading} onClick={loadReports} tone="secondary" type="button">
              <RefreshCw aria-hidden="true" size={16} />
              {state.loading ? "Cargando..." : "Aplicar filtros"}
            </Button>
            <Button onClick={downloadExport} tone="secondary" type="button">
              <Download aria-hidden="true" size={16} />
              Exportar
            </Button>
          </div>
        </CardBody>
      </Card>

      {state.errorMessage ? (
        <div className="rounded-md border border-civic-red bg-[#fff7ed] p-4 text-sm text-civic-red" role="alert">
          {state.errorMessage}
        </div>
      ) : null}
      {state.actionMessage ? (
        <div className="rounded-md border border-civic-teal bg-[#eefaf7] p-4 text-sm text-civic-ink" role="status">
          {state.actionMessage}
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck aria-hidden="true" className="text-civic-blue" size={20} />
            <h2 className="text-lg font-bold text-civic-ink">Reportes</h2>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-civic-line text-civic-muted">
                <th className="py-3 pr-4 font-semibold">ID</th>
                <th className="py-3 pr-4 font-semibold">Programa</th>
                <th className="py-3 pr-4 font-semibold">Region</th>
                <th className="py-3 pr-4 font-semibold">Puntaje</th>
                <th className="py-3 pr-4 font-semibold">Corte</th>
                <th className="py-3 pr-4 font-semibold">Patrones</th>
                <th className="py-3 pr-4 font-semibold">Archivos</th>
                <th className="py-3 pr-4 font-semibold">Moderacion</th>
                <th className="py-3 pr-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visibleReports.length === 0 ? (
                <tr>
                  <td className="py-6 text-civic-muted" colSpan={9}>
                    Sin reportes cargados.
                  </td>
                </tr>
              ) : (
                visibleReports.map((report) => (
                  <tr className="border-b border-civic-line align-top last:border-0" key={report.id}>
                    <td className="py-3 pr-4 font-mono text-xs text-civic-muted">{report.id}</td>
                    <td className="py-3 pr-4 text-civic-ink">{report.program}</td>
                    <td className="py-3 pr-4 text-civic-ink">{report.region}</td>
                    <td className="py-3 pr-4 font-semibold text-civic-blue">{report.normalizedScore}</td>
                    <td className="py-3 pr-4 text-civic-muted">{report.cutoffScoreText ?? "Sin dato"}</td>
                    <td className="py-3 pr-4 text-civic-muted">
                      <div className="flex flex-col gap-1">
                        {report.patternScore96489 ? <span>96,489</span> : null}
                        {report.patternSameMessage ? <span>Mensaje repetido</span> : null}
                        {report.patternCapitalAbejaPendingWithScore ? <span>Abeja pendiente con puntaje</span> : null}
                        {!report.patternScore96489 &&
                        !report.patternSameMessage &&
                        !report.patternCapitalAbejaPendingWithScore ? (
                          <span>Sin marca</span>
                        ) : null}
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-civic-muted">{report.fileCount}</td>
                    <td className="py-3 pr-4">{statusBadge(report.moderationStatus)}</td>
                    <td className="py-3 pr-4">
                      <div className="flex flex-wrap gap-2">
                        <Button onClick={() => void loadDetail(report.id)} tone="quiet" type="button">
                          <Eye aria-hidden="true" size={16} />
                          Detalle
                        </Button>
                        <select
                          aria-label={`Moderar reporte ${report.id}`}
                          className="rounded-md border border-civic-line bg-white px-2 py-2 text-sm"
                          onChange={(event) => void moderateReport(report.id, event.target.value as ModerationStatus)}
                          value={report.moderationStatus}
                        >
                          {MODERATION_STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {state.selectedDetail ? (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold text-civic-ink">Detalle del reporte</h2>
            <p className="mt-1 font-mono text-xs text-civic-muted">{state.selectedDetail.report.id}</p>
          </CardHeader>
          <CardBody>
            <dl className="grid gap-4 md:grid-cols-2">
              <DetailValue label="Mensaje correo" value={state.selectedDetail.report.emailMessage} />
              <DetailValue label="Mensaje web" value={state.selectedDetail.report.webMessage} />
              <DetailValue label="Comentarios" value={state.selectedDetail.report.additionalComments} />
              <DetailValue label="URL privada" value={state.selectedDetail.report.resultUrl} />
              <DetailValue label="Contacto email" value={state.selectedDetail.report.contactEmail} />
              <DetailValue label="Contacto telefono" value={state.selectedDetail.report.contactPhone} />
            </dl>
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-bold text-civic-ink">Archivos privados</h3>
              <EvidenceList files={state.selectedDetail.files} onOpen={(fileId) => void openEvidenceFile(fileId)} />
            </div>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
