"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, FileSearch, RefreshCw, Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import type { ApiResult } from "@/types/api";
import type { PublicReportRow } from "@/types/reports";
import type { CountByLabel, PublicStats } from "@/types/stats";

interface DashboardState {
  status: "loading" | "ready" | "error";
  stats: PublicStats | null;
  reports: PublicReportRow[];
  errorMessage: string;
}

interface RepeatedScore {
  score: string;
  count: number;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

function apiUrl(path: string): string {
  return `${apiBaseUrl}${path}`;
}

const emptyStats: PublicStats = {
  totalReports: 0,
  score96489Reports: 0,
  verifiedReports: 0,
  pendingReports: 0,
  emailScreenshotReports: 0,
  webScreenshotReports: 0,
  byProgram: [],
  byRegion: [],
  byStatus: [],
  publicReports: []
};

async function getJson<TData>(url: string): Promise<TData> {
  const response = await fetch(url, { cache: "no-store" });
  const result = (await response.json()) as ApiResult<TData>;
  if (!response.ok || !result.ok) {
    const message = result.ok ? `Error HTTP ${response.status}` : result.error.message;
    throw new Error(message);
  }
  return result.data;
}

function MetricCard({ label, value, note }: { label: string; value: number; note?: string }) {
  return (
    <Card>
      <CardBody>
        <dt className="text-sm font-medium text-civic-muted">{label}</dt>
        <dd className="mt-2 text-3xl font-bold text-civic-ink">{value.toLocaleString("es-CL")}</dd>
        {note ? <p className="mt-2 text-xs text-civic-muted">{note}</p> : null}
      </CardBody>
    </Card>
  );
}

function CountList({ title, rows }: { title: string; rows: CountByLabel[] }) {
  const max = Math.max(...rows.map((row) => row.count), 1);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-bold text-civic-ink">{title}</h2>
      </CardHeader>
      <CardBody>
        {rows.length === 0 ? (
          <p className="text-sm text-civic-muted">Sin datos publicados aun.</p>
        ) : (
          <ul className="space-y-3">
            {rows.map((row) => (
              <li key={row.label}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-civic-ink">{row.label}</span>
                  <span className="text-civic-muted">{row.count}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-civic-panel">
                  <div className="h-2 rounded-full bg-civic-blue" style={{ width: `${Math.max(8, (row.count / max) * 100)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function repeatedScoresFrom(stats: PublicStats): RepeatedScore[] {
  const source: unknown = stats;
  if (!isRecord(source)) {
    return [];
  }

  const nestedPatterns = isRecord(source.patterns) ? source.patterns : null;
  const repeatedScores = Array.isArray(source.repeatedScores)
    ? source.repeatedScores
    : nestedPatterns && Array.isArray(nestedPatterns.repeatedScores)
      ? nestedPatterns.repeatedScores
      : [];

  return repeatedScores.flatMap((entry) => {
    if (!isRecord(entry)) return [];
    const rawScore = entry.score ?? entry.label ?? entry.value;
    const rawCount = entry.count ?? entry.total;
    if ((typeof rawScore !== "string" && typeof rawScore !== "number") || typeof rawCount !== "number") {
      return [];
    }
    return [{ score: String(rawScore), count: rawCount }];
  });
}

function RepeatedScores({ rows }: { rows: RepeatedScore[] }) {
  if (rows.length === 0) return null;
  const max = Math.max(...rows.map((row) => row.count), 1);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Repeat2 aria-hidden="true" className="text-civic-blue" size={20} />
          <div>
            <h2 className="text-lg font-bold text-civic-ink">Puntajes repetidos</h2>
            <p className="mt-1 text-sm text-civic-muted">Frecuencias observadas en reportes recibidos, con desglose de moderacion en la API.</p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <li className="rounded-md border border-civic-line p-4" key={row.score}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-semibold text-civic-ink">{row.score}</span>
                <span className="text-sm text-civic-muted">{row.count.toLocaleString("es-CL")}</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-civic-panel">
                <div className="h-2 rounded-full bg-civic-teal" style={{ width: `${Math.max(8, (row.count / max) * 100)}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}

function ReportsTable({ reports }: { reports: PublicReportRow[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileSearch aria-hidden="true" className="text-civic-blue" size={20} />
          <h2 className="text-lg font-bold text-civic-ink">Reportes publicos anonimizados</h2>
        </div>
      </CardHeader>
      <CardBody className="overflow-x-auto">
        {reports.length === 0 ? (
          <p className="text-sm text-civic-muted">No hay reportes publicos disponibles.</p>
        ) : (
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-civic-line text-civic-muted">
                <th className="py-3 pr-4 font-semibold">Programa</th>
                <th className="py-3 pr-4 font-semibold">Region</th>
                <th className="py-3 pr-4 font-semibold">Puntaje</th>
                <th className="py-3 pr-4 font-semibold">Estado</th>
                <th className="py-3 pr-4 font-semibold">Evidencia</th>
                <th className="py-3 pr-4 font-semibold">Moderacion</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr className="border-b border-civic-line last:border-0" key={report.id}>
                  <td className="py-3 pr-4 text-civic-ink">{report.program}</td>
                  <td className="py-3 pr-4 text-civic-ink">{report.region}</td>
                  <td className="py-3 pr-4 font-semibold text-civic-blue">{report.normalizedScore}</td>
                  <td className="py-3 pr-4 text-civic-muted">{report.statusText ?? "Sin estado"}</td>
                  <td className="py-3 pr-4 text-civic-muted">{report.evidenceType}</td>
                  <td className="py-3 pr-4 text-civic-muted">{report.moderationStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardBody>
    </Card>
  );
}

export function StatsDashboard() {
  const [state, setState] = useState<DashboardState>({
    status: "loading",
    stats: null,
    reports: [],
    errorMessage: ""
  });

  async function loadData() {
    setState((current) => ({ ...current, status: "loading", errorMessage: "" }));
    try {
      const [stats, reports] = await Promise.all([
        getJson<PublicStats>(apiUrl("/api/stats")),
        getJson<PublicReportRow[]>(apiUrl("/api/public-reports"))
      ]);
      setState({
        status: "ready",
        stats,
        reports: reports.length > 0 ? reports : stats.publicReports,
        errorMessage: ""
      });
    } catch (error) {
      setState({
        status: "error",
        stats: emptyStats,
        reports: [],
        errorMessage: error instanceof Error ? error.message : "No fue posible cargar estadisticas."
      });
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  const stats = state.stats ?? emptyStats;
  const reports = useMemo(() => state.reports, [state.reports]);
  const repeatedScores = useMemo(() => repeatedScoresFrom(stats), [stats]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-civic-teal">Datos publicos</p>
          <h1 className="mt-2 text-3xl font-bold text-civic-ink">Estadisticas de reportes</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-civic-muted">
            Indicadores agregados desde reportes anonimizados. La lectura correcta es exploratoria: los patrones orientan preguntas y revision
            documental, no conclusiones automaticas.
          </p>
        </div>
        <Button disabled={state.status === "loading"} onClick={loadData} tone="secondary" type="button">
          <RefreshCw aria-hidden="true" size={16} />
          {state.status === "loading" ? "Cargando..." : "Actualizar"}
        </Button>
      </div>

      {state.status === "error" ? (
        <div className="rounded-md border border-civic-red bg-[#fff7ed] p-4 text-sm text-civic-red" role="alert">
          {state.errorMessage}
        </div>
      ) : null}

      <dl className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Reportes totales" value={stats.totalReports} />
        <MetricCard label="Reportes con 96,489" note="Coincidencia de puntaje normalizado" value={stats.score96489Reports} />
        <MetricCard label="Verificados" value={stats.verifiedReports} />
        <MetricCard label="Pendientes" value={stats.pendingReports} />
      </dl>

      <Card>
        <CardBody className="grid gap-4 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="text-sm font-semibold text-civic-ink">Referencia informada del proceso</p>
            <p className="mt-1 text-xs leading-5 text-civic-muted">
              Estas cifras son contexto de referencia y no corresponden al total de reportes recibidos por esta plataforma.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            <div className="rounded-md border border-civic-line bg-civic-panel p-3">
              <dt className="text-xs text-civic-muted">Valparaiso</dt>
              <dd className="mt-1 text-lg font-bold text-civic-ink">2.175 postulaciones</dd>
            </div>
            <div className="rounded-md border border-civic-line bg-civic-panel p-3">
              <dt className="text-xs text-civic-muted">Puntaje de corte</dt>
              <dd className="mt-1 text-lg font-bold text-civic-ink">98,51</dd>
            </div>
          </dl>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <CountList rows={stats.byProgram} title="Por programa" />
        <CountList rows={stats.byRegion} title="Por region" />
        <CountList rows={stats.byStatus} title="Por estado" />
      </div>

      <RepeatedScores rows={repeatedScores} />

      <Card>
        <CardBody>
          <div className="flex flex-wrap items-center gap-6 text-sm text-civic-muted">
            <span className="inline-flex items-center gap-2">
              <BarChart3 aria-hidden="true" className="text-civic-blue" size={18} />
              Evidencia email: {stats.emailScreenshotReports.toLocaleString("es-CL")}
            </span>
            <span>Evidencia web: {stats.webScreenshotReports.toLocaleString("es-CL")}</span>
          </div>
        </CardBody>
      </Card>

      <ReportsTable reports={reports} />
    </div>
  );
}
