import Link from "next/link";
import type { AuditPageData, ProgramRow, Severity } from "./types";

const numberFormatter = new Intl.NumberFormat("es-CL");
const clpFormatter = new Intl.NumberFormat("es-CL", {
  currency: "CLP",
  maximumFractionDigits: 0,
  style: "currency"
});

const severityClassName: Record<Severity, string> = {
  crítica: "border-red-300 bg-red-50 text-red-900",
  alta: "border-orange-300 bg-orange-50 text-orange-900",
  media: "border-amber-300 bg-amber-50 text-amber-900"
};

function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

function formatCurrency(value: number): string {
  return clpFormatter.format(value);
}

function formatAmountLabel(row: ProgramRow): string {
  return row.amountMaxClp === null ? row.amountMaxLabel : formatCurrency(row.amountMaxClp);
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
      {detail ? <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p> : null}
    </article>
  );
}

function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${severityClassName[severity]}`}>
      {severity}
    </span>
  );
}

function ProgramsTable({ programs }: { programs: readonly ProgramRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Programa</th>
              <th className="px-4 py-3 text-right">Filas</th>
              <th className="px-4 py-3 text-right">Nombres útiles</th>
              <th className="px-4 py-3 text-right">Duplicados nombre</th>
              <th className="px-4 py-3 text-right">Año inconsistente</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Monto máx.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {programs.map((row) => {
              const yearMismatchRows = row.yearMismatchFechaOtorgamientoRows + row.yearMismatchFechaActoRows;

              return (
                <tr key={`${row.year}-${row.program}`} className="align-top">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-950">{row.program}</p>
                    <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">{row.sourceFiles}</p>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">{formatNumber(row.rows)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">{formatNumber(row.usableNamedRows)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">{formatNumber(row.duplicateNameRows)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">{formatNumber(yearMismatchRows)}</td>
                  <td className="px-4 py-3 text-slate-700">{row.fundingType}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{formatAmountLabel(row)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AuditYearPage({ data }: { data: AuditPageData }) {
  const { summary } = data;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-950">
      <section className="bg-[radial-gradient(circle_at_top_left,#1d4ed8,transparent_36rem),linear-gradient(135deg,#020617,#0f172a_55%,#111827)] px-6 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <Link className="text-sm font-medium text-blue-100 hover:text-white" href="/">
            ← Volver al inicio
          </Link>
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-200">Auditoría de resultados Sercotec</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{data.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-200">{data.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Filas analizadas" value={formatNumber(summary.rows)} detail={`${formatNumber(summary.uploadedFilesInYear)} archivos publicados para ${summary.year}.`} />
          <MetricCard label="Filas con nombre útil" value={formatNumber(summary.usableNamedRows)} detail={`${formatNumber(summary.emptyNameRows)} filas sin nombre publicable o utilizable.`} />
          <MetricCard label="Exposición duplicada estimada" value={formatCurrency(summary.knownAmountExposureClpSumAcrossDuplicateGroups)} detail={`Mayor exposición individual: ${formatCurrency(summary.highestKnownAmountExposureClp)}.`} />
          <MetricCard label="Anomalías priorizadas" value={formatNumber(summary.anomalyRows)} detail={`${formatNumber(summary.criticalAnomalyRows)} críticas y ${formatNumber(summary.highAnomalyRows)} altas.`} />
        </div>

        <div className="mx-auto mt-8 grid max-w-7xl gap-5 md:grid-cols-3">
          <MetricCard label="Grupos duplicados con monto conocido" value={formatNumber(summary.knownAmountDuplicateGroups)} />
          <MetricCard label="Grupos duplicados en fondos directos" value={formatNumber(summary.directFundDuplicateGroups)} />
          <MetricCard label="Inconsistencias de año" value={formatNumber(summary.yearMismatchRows)} />
        </div>
      </section>

      <section className="bg-white px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Programas y señales de calidad de datos</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Tabla normalizada con nombres de programa, archivos fuente, filas útiles, duplicidades, desfases de año y tipo de financiamiento. Los montos no parametrizados se mantienen como nulos para evitar inferencias falsas.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <ProgramsTable programs={data.programs} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Anomalías principales</h2>
            <div className="mt-5 space-y-4">
              {data.anomalies.map((row) => (
                <article key={`${row.program}-${row.metric}-${row.value}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <SeverityBadge severity={row.severity} />
                    <p className="font-semibold text-slate-950">{row.category}</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    <span className="font-medium">{row.program}</span>: {row.evidence}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Fuente: {row.source}. Métrica: {row.metric}. Valor: {formatNumber(row.value)}.
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Mayores exposiciones duplicadas</h2>
            <div className="mt-5 space-y-4">
              {data.duplicateExposures.map((row) => (
                <article key={`${row.rank}-${row.normalizedName}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">#{row.rank} · {row.apparentType}</p>
                  <h3 className="mt-2 text-base font-semibold text-slate-950">{row.displayName}</h3>
                  <p className="mt-2 text-sm text-slate-700">{row.programs}</p>
                  <p className="mt-3 text-lg font-semibold text-slate-950">{formatCurrency(row.knownAmountTotalClp)}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatNumber(row.recordCount)} registros en {formatNumber(row.programCount)} programas. Rango: {row.firstFechaOtorgamiento} / {row.lastFechaOtorgamiento}.
                  </p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white px-6 py-10">
        <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-950">Archivos de datos conservados</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            La página consume datos normalizados en código TypeScript estricto y mantiene acceso directo a los CSV publicados en el repositorio para revisión manual.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {data.downloads.map((download) => (
              <Link key={download.href} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:border-slate-500" href={download.href}>
                {download.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
