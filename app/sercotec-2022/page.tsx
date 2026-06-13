import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardBody, CardHeader } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Auditoría Sercotec 2022"
};

const summary = {
  source: "Info-Trimestral-PPto_24_al_30_sept-2022.xlsx",
  year: 2022,
  cutoff: "30 de septiembre de 2022",
  sheets: 19,
  programSheets: 18,
  totalNamedRecords: 5529,
  directFundRecords: 3801,
  directFundAmountSum: 13475638619,
  operatorBudgetAmountSum: 98848688265,
  anomaliesCount: 20,
  criticalAnomaliesCount: 9,
  highAnomaliesCount: 9,
  directDuplicateGroups: 35,
  directDuplicateGroupsThreeOrMore: 0,
  sameProgramDuplicateGroups: 1,
  blankNumberedRowsTotal: 8450,
  officialSourceUrl: "https://www.sercotec.cl/wp-content/uploads/2022/10/Info-Trimestral-PPto_24_al_30_sept-2022.xlsx"
};

const directPrograms = [
  { sheet: "Crece", service: "Crece", records_with_name: 789, amount_sum: 3945000000, amount_min: 5000000, amount_max: 5000000, blank_numbered_rows: 877, budget_line: "24.01.131" },
  { sheet: "CAEmprende", service: "Capital Abeja Emprende", records_with_name: 613, amount_sum: 2133946709, amount_min: 3000000, amount_max: 3500000, blank_numbered_rows: 0, budget_line: "24.01.132" },
  { sheet: "CSEmprende", service: "Capital Semilla Emprende", records_with_name: 596, amount_sum: 2067185047, amount_min: 3000000, amount_max: 3500000, blank_numbered_rows: 216, budget_line: "24.01.132" },
  { sheet: "Ferias", service: "Programa de Desarrollo de Ferias Libres", records_with_name: 151, amount_sum: 1945925375, amount_min: 3001424, amount_max: 30000000, blank_numbered_rows: 0, budget_line: "24.01.133" },
  { sheet: "Formación L3 Ruta Digital", service: "Formación Empresarial L3 - Ruta Digital", records_with_name: 1065, amount_sum: 1263723160, amount_min: 1000000, amount_max: 1200000, blank_numbered_rows: 418, budget_line: "24.01.131" },
  { sheet: "Almacenes", service: "Almacenes de Chile: Digitaliza Tú Almacén", records_with_name: 448, amount_sum: 1052800000, amount_min: 2350000, amount_max: 2350000, blank_numbered_rows: 199, budget_line: "24.01.131" },
  { sheet: "GremiosRegionales", service: "Gremios regionales 2022", records_with_name: 126, amount_sum: 840558328, amount_min: 1311300, amount_max: 12314010, blank_numbered_rows: 0, budget_line: "2401133" },
  { sheet: "GremiosNacionales", service: "Gremios Nacionales", records_with_name: 13, amount_sum: 226500000, amount_min: 14500000, amount_max: 20000000, blank_numbered_rows: 0, budget_line: "8.01.2021" },
] as const;

const anomalies = [
  { id: 1, sheet: "Crece", severity: "alta", type: "filas preenumeradas vacías", detail: "877 filas tienen N° pero no publican beneficiario ni monto." },
  { id: 2, sheet: "Reactívate", severity: "crítica", type: "pestaña sin beneficiarios útiles", detail: "La pestaña contiene 647 filas preenumeradas con N° pero sin beneficiario, región ni monto." },
  { id: 3, sheet: "MejoraNegocios", severity: "crítica", type: "pestaña sin beneficiarios útiles", detail: "La pestaña contiene 623 filas preenumeradas con N° pero sin beneficiario, región ni monto." },
  { id: 4, sheet: "FormaciónL2", severity: "crítica", type: "pestaña sin beneficiarios útiles", detail: "La pestaña contiene 3510 filas preenumeradas con N° pero sin beneficiario, región ni monto." },
  { id: 5, sheet: "Formación L3 Ruta Digital", severity: "alta", type: "filas preenumeradas vacías", detail: "418 filas tienen N° pero no publican beneficiario ni monto." },
  { id: 6, sheet: "PromociónComercialización", severity: "alta", type: "monto prorrateado sin transferencia directa", detail: "El encabezado señala que no hay transferencia directa y que el monto se divide por cantidad de beneficiarios; varias filas no tienen monto individual." },
  { id: 7, sheet: "PromociónComercialización", severity: "media", type: "monto informado sin transferencia directa", detail: "La pestaña acumula $54,242,980 pese a declararse como sin transferencia directa o prorrateada." },
  { id: 8, sheet: "Redes", severity: "crítica", type: "pestaña sin beneficiarios útiles", detail: "La pestaña contiene 923 filas preenumeradas con N° pero sin beneficiario, región ni monto." },
  { id: 9, sheet: "Almacenes", severity: "alta", type: "filas preenumeradas vacías", detail: "199 filas tienen N° pero no publican beneficiario ni monto." },
  { id: 10, sheet: "AsesoríasVirtual", severity: "alta", type: "filas preenumeradas vacías", detail: "195 filas tienen N° pero no publican beneficiario ni monto." },
  { id: 11, sheet: "CapacitaciónVirtual", severity: "alta", type: "filas preenumeradas vacías", detail: "195 filas tienen N° pero no publican beneficiario ni monto." },
  { id: 12, sheet: "CapacitaciónVirtual", severity: "crítica", type: "nombre de servicio inconsistente", detail: "La pestaña CapacitaciónVirtual declara el mismo Nombre Servicio o Programa que AsesoríasVirtual: Servicios virtuales - Asesoría Virtual." },
  { id: 13, sheet: "CSEmprende", severity: "alta", type: "filas preenumeradas vacías", detail: "216 filas tienen N° pero no publican beneficiario ni monto." },
  { id: 14, sheet: "JUNTOS", severity: "crítica", type: "pestaña sin beneficiarios útiles", detail: "La pestaña contiene 587 filas preenumeradas con N° pero sin beneficiario, región ni monto." },
  { id: 15, sheet: "GremiosRegionales", severity: "media", type: "N° repetido", detail: "1 repeticiones excedentes de N° en la nómina." },
  { id: 16, sheet: "GremiosNacionales", severity: "crítica", type: "código presupuestario anómalo", detail: "La línea presupuestaria se publica como 8.01.2021, incompatible con el patrón 24.01.xxx usado en el resto del archivo." },
  { id: 17, sheet: "Barrios", severity: "crítica", type: "pestaña sin beneficiarios útiles", detail: "La pestaña contiene 60 filas preenumeradas con N° pero sin beneficiario, región ni monto." },
  { id: 18, sheet: "Barrios", severity: "alta", type: "monto prorrateado sin transferencia directa", detail: "El encabezado señala que no hay transferencia directa y que el monto se divide por cantidad de beneficiarios." },
  { id: 19, sheet: "Centros", severity: "alta", type: "fecha errónea", detail: "Se detecta una fecha textual con año 20120 en la pestaña Centros." },
  { id: 20, sheet: "AsesoríasVirtual + CapacitaciónVirtual", severity: "crítica", type: "pestañas duplicadas", detail: "Las pestañas AsesoríasVirtual y CapacitaciónVirtual son idénticas fila por fila, incluida metadata, beneficiarios y fechas." },
] as const;

const directDuplicateGroups = [
  { name: "ADMINISTRACION DE PROPIEDADES ELIZABETH PINILLA EIRL", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 203 $5,000,000; Formación L3 Ruta Digital row 218 $1,200,000" },
  { name: "ANDRES EMILIO ESQUIVEL PEÑA", entity_type: "persona natural", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 623 $5,000,000; Formación L3 Ruta Digital row 471 $1,200,000" },
  { name: "CAFETERIA Y PASTELERIA TACRISNI LIMITADA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 136 $5,000,000; Formación L3 Ruta Digital row 161 $1,200,000" },
  { name: "CERVECERIA LIZARRAGA SPA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 715 $5,000,000; Formación L3 Ruta Digital row 321 $1,200,000" },
  { name: "COMERCIAL SANDY VILCHES EIRL", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 14 $5,000,000; Formación L3 Ruta Digital row 102 $1,200,000" },
  { name: "COMERCIALIZADORA FUENTES Y ESPINACE LIMITADA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 408 $5,000,000; Formación L3 Ruta Digital row 83 $1,200,000" },
  { name: "COMERCIALIZADORA GUSTOSO GOURMET DANIEL JORGE VALENZUELA BASSI E.I.R.L", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 679 $5,000,000; Formación L3 Ruta Digital row 308 $1,200,000" },
  { name: "COMERCIALIZADORA VILLALOBOS SPA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 516 $5,000,000; Formación L3 Ruta Digital row 280 $1,200,000" },
  { name: "DANTE HIDALGO ROJAS", entity_type: "persona natural", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 96 $5,000,000; Formación L3 Ruta Digital row 29 $1,200,000" },
  { name: "ELIZABETH FABIOLA ARRIAGADA MERINO", entity_type: "persona natural", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 571 $5,000,000; Formación L3 Ruta Digital row 650 $1,200,000" },
  { name: "GUTLIC SPA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 51 $5,000,000; Formación L3 Ruta Digital row 125 $1,200,000" },
  { name: "IMPORTACIÓN, EXPORTACIÓN, COMERCIALIZACIÓN, CAPACITACIÓN Y DISTRIBUCIÓN DE PRODUCTOS Y RECURSOS PARA LA EDUCACIÓN. VICTORIA KIRIMA GUERRA HURTADO EIRL.", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 48 $5,000,000; Formación L3 Ruta Digital row 123 $1,200,000" },
  { name: "INGENIERÍA Y SERVICIOS PARA LA CONSTRUCCIÓN GEHOLAB LIMITADA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 310 $5,000,000; Formación L3 Ruta Digital row 404 $1,200,000" },
  { name: "INVERSIONES ARIMBORGO SPA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 792 $5,000,000; Formación L3 Ruta Digital row 371 $1,200,000" },
  { name: "INVERSIONES MIGUEL ANGEL PODESTA MALDONADO EIRL", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 69 $5,000,000; Formación L3 Ruta Digital row 12 $1,200,000" },
  { name: "INVERSIONES MONROY Y MAXEINER SPA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 345 $5,000,000; Formación L3 Ruta Digital row 433 $1,200,000" },
  { name: "JAIME RAMIREZ VARGAS", entity_type: "persona natural", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 166 $5,000,000; Formación L3 Ruta Digital row 185 $1,200,000" },
  { name: "LAS DELICIAS SPA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 370 $5,000,000; Formación L3 Ruta Digital row 436 $1,200,000" },
  { name: "LEISY LY JEREZ", entity_type: "persona natural", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 189 $5,000,000; Formación L3 Ruta Digital row 205 $1,200,000" },
  { name: "MA, MARKETING Y PUBLICIDAD DEL NORTE SPA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 18 $5,000,000; Formación L3 Ruta Digital row 106 $1,200,000" },
  { name: "OLGA ANGELICA CACERES MIRANDA", entity_type: "persona natural", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 581 $5,000,000; Formación L3 Ruta Digital row 450 $1,200,000" },
  { name: "ROSA HUENCHULEO EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 405 $5,000,000; Formación L3 Ruta Digital row 82 $1,200,000" },
  { name: "SERVICIOS AGRICOLAS AMITIS SPA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 241 $5,000,000; Formación L3 Ruta Digital row 865 $1,200,000" },
  { name: "SERVICIOS DE COMIDA CATALINA PAULA REYES GUTIERREZ EIRL", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 744 $5,000,000; Formación L3 Ruta Digital row 351 $1,200,000" },
  { name: "SHOPIGLOBOS SPA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 137 $5,000,000; Formación L3 Ruta Digital row 162 $1,200,000" },
  { name: "SOCIEDAD ANIDA SPA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 506 $5,000,000; Formación L3 Ruta Digital row 278 $1,200,000" },
  { name: "UNA LINDA FIESTA SPA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 775 $5,000,000; Formación L3 Ruta Digital row 362 $1,200,000" },
  { name: "VENTA DE ROPA Y ACCESORIOS", entity_type: "persona natural", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 56 $5,000,000; Formación L3 Ruta Digital row 127 $1,200,000" },
  { name: "WANUNCHASQA SPA", entity_type: "empresa/organización", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6200000, rows: "Crece row 60 $5,000,000; Formación L3 Ruta Digital row 128 $1,200,000" },
  { name: "FREDY ISAAC ESPINOZA JENO", entity_type: "persona natural", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6000000, rows: "Crece row 287 $5,000,000; Formación L3 Ruta Digital row 569 $1,000,000" },
  { name: "KAREN ALEJANDRA AGUILERA CARTES", entity_type: "persona natural", program_count: 2, record_count: 2, programs: "Crece + Formación L3 Ruta Digital", amount_total: 6000000, rows: "Crece row 265 $5,000,000; Formación L3 Ruta Digital row 534 $1,000,000" },
  { name: "CLAUDIA MACARENA GATICA RODRIGUEZ", entity_type: "persona natural", program_count: 2, record_count: 2, programs: "Almacenes + Formación L3 Ruta Digital", amount_total: 3550000, rows: "Formación L3 Ruta Digital row 622 $1,200,000; Almacenes row 22 $2,350,000" },
  { name: "ECOEMPORIO BAMBOO", entity_type: "persona natural", program_count: 2, record_count: 2, programs: "Almacenes + Formación L3 Ruta Digital", amount_total: 3550000, rows: "Formación L3 Ruta Digital row 265 $1,200,000; Almacenes row 394 $2,350,000" },
  { name: "LUIS MARCELO MONTECINOS PINTO", entity_type: "persona natural", program_count: 2, record_count: 2, programs: "Almacenes + Formación L3 Ruta Digital", amount_total: 3550000, rows: "Formación L3 Ruta Digital row 403 $1,200,000; Almacenes row 39 $2,350,000" },
  { name: "LUISA BERNARDA ORTEGA RIQUELME", entity_type: "persona natural", program_count: 2, record_count: 2, programs: "Almacenes + Formación L3 Ruta Digital", amount_total: 3550000, rows: "Formación L3 Ruta Digital row 600 $1,200,000; Almacenes row 9 $2,350,000" },
] as const;

const sameProgramDuplicates = [
  { sheet: "Ferias", name: "Agrupación campesina,ambiental,social y cultural de Purranque", entity_type: "empresa/organización", record_count: 2, amount_total: 17830632, rows: "145; 148", amounts: "10616030; 7214602" },
] as const;

const suspiciousTextIssues = [
  { sheet: "Informe Trimestral Pptos", cell: "1:6", pattern: "nómima", value: "Enlace a nómima de beneficiarios" },
  { sheet: "Informe Trimestral Pptos", cell: "3:9", pattern: "Conocimimiento", value: "Tecnologías del Conocimimiento S.A " },
  { sheet: "Informe Trimestral Pptos", cell: "5:5", pattern: "Promociónb", value: "Promociónb y canales de comercialización" },
  { sheet: "MejoraNegocios", cell: "3:3", pattern: "1Beneficiarios", value: "1Beneficiarios/as al 30 de septiembre del 2022" },
  { sheet: "PromociónComercialización", cell: "4:3", pattern: "provedor", value: "Monto asignado\n(No hay transferencia directa por lo que se asigna un monto individual dividiendo el monto asignado al provedor por la cantidad de beneficiarios)" },
  { sheet: "JUNTOS", cell: "3:3", pattern: "septiembredel", value: "Beneficiarios/as al 30 de septiembredel 2022" },
  { sheet: "GremiosNacionales", cell: "5:2", pattern: "Fedracion", value: "Fedracion nacional de panaderos de chile" },
  { sheet: "GremiosNacionales", cell: "5:3", pattern: "Fedracion", value: "Fedracion nacional de panaderos de chile" },
  { sheet: "GremiosNacionales", cell: "11:2", pattern: "_x0002_", value: "Confederación Nacional de Federaciones de Cooperativas y Asociaciones Silvoagropecuarias_x0002_Campocoop" },
  { sheet: "GremiosNacionales", cell: "11:3", pattern: "_x0002_", value: "Confederación Nacional de Federaciones de Cooperativas y Asociaciones Silvoagropecuarias_x0002_Campocoop" },
  { sheet: "Barrios", cell: "4:3", pattern: "provedor", value: "Monto asignado\n(No hay transferencia directa por lo que se asigna un monto individual dividiendo el monto asignado al provedor por la cantidad de beneficiarios)" },
  { sheet: "Centros", cell: "10:7", pattern: "20120", value: "09-12-2015 / 02-12-20120" },
] as const;

const downloads = [
  { label: "XLSX original", href: "/data/sercotec2022/originals/Info-Trimestral-PPto_24_al_30_sept-2022.xlsx" },
  { label: "Resumen por pestaña", href: "/data/sercotec2022/analysis/sheet-summary.csv" },
  { label: "Resumen fondos directos", href: "/data/sercotec2022/analysis/direct-program-summary.csv" },
  { label: "Matriz de anomalías", href: "/data/sercotec2022/analysis/anomaly-matrix.csv" },
  { label: "Registros fondos directos", href: "/data/sercotec2022/analysis/direct-fund-records.csv" },
  { label: "Duplicados entre fondos directos", href: "/data/sercotec2022/duplicates/direct-fund-duplicates.csv" },
  { label: "Detalle de duplicados entre fondos", href: "/data/sercotec2022/duplicates/direct-fund-duplicate-detail-rows.csv" },
  { label: "Duplicados dentro del mismo fondo", href: "/data/sercotec2022/duplicates/direct-fund-same-program-duplicates.csv" },
  { label: "Problemas textuales detectados", href: "/data/sercotec2022/flags/suspicious-text-issues.csv" },
  { label: "JSON resumen", href: "/data/sercotec2022/analysis/direct-funded-summary.json" }
] as const;

function formatClp(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-CL").format(value);
}

function SeverityBadge({ severity }: { severity: string }) {
  const normalized = severity.toLowerCase();
  const className =
    normalized === "crítica"
      ? "border-red-200 bg-red-50 text-red-700"
      : normalized === "alta"
        ? "border-orange-200 bg-orange-50 text-orange-700"
        : "border-yellow-200 bg-yellow-50 text-yellow-700";

  return <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${className}`}>{severity}</span>;
}

export default function Sercotec2022Page() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-civic-teal">Transparencia Activa 2022</p>
        <h1 className="mt-2 text-3xl font-bold text-civic-ink">Auditoría de información trimestral Sercotec 2022</h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-civic-muted">
          Análisis independiente del archivo público de información trimestral al 30 de septiembre de 2022. 
          La sección separa fondos con monto directo, montos indirectos o prorrateados, servicios sin transferencia y presupuestos de operadores.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link className="text-civic-blue underline" href="/data/sercotec2022/originals/Info-Trimestral-PPto_24_al_30_sept-2022.xlsx">
            Descargar XLSX original
          </Link>
          <a className="text-civic-blue underline" href={summary.officialSourceUrl}>
            Ver fuente oficial Sercotec
          </a>
        </div>
      </div>

      <dl className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody>
            <dt className="text-sm font-medium text-civic-muted">Pestañas revisadas</dt>
            <dd className="mt-2 text-3xl font-bold text-civic-ink">{formatNumber(summary.sheets)}</dd>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <dt className="text-sm font-medium text-civic-muted">Registros con nombre</dt>
            <dd className="mt-2 text-3xl font-bold text-civic-ink">{formatNumber(summary.totalNamedRecords)}</dd>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <dt className="text-sm font-medium text-civic-muted">Monto directo publicado</dt>
            <dd className="mt-2 text-3xl font-bold text-civic-ink">{formatClp(summary.directFundAmountSum)}</dd>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <dt className="text-sm font-medium text-civic-muted">Anomalías documentales</dt>
            <dd className="mt-2 text-3xl font-bold text-civic-ink">{formatNumber(summary.anomaliesCount)}</dd>
          </CardBody>
        </Card>
      </dl>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold text-civic-ink">Duplicados entre fondos directos</h2>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold text-civic-ink">{formatNumber(summary.directDuplicateGroups)}</p>
            <p className="mt-2 text-sm leading-6 text-civic-muted">
              Razones sociales o personas naturales repetidas en dos o más programas con monto directo publicado.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold text-civic-ink">Tres o más fondos directos</h2>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold text-civic-ink">{formatNumber(summary.directDuplicateGroupsThreeOrMore)}</p>
            <p className="mt-2 text-sm leading-6 text-civic-muted">
              No se detectaron coincidencias nominales en tres o más fondos directos dentro de este archivo.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold text-civic-ink">Filas numeradas vacías</h2>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold text-civic-ink">{formatNumber(summary.blankNumberedRowsTotal)}</p>
            <p className="mt-2 text-sm leading-6 text-civic-muted">
              Filas con N° publicado pero sin beneficiario, región ni monto.
            </p>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-bold text-civic-ink">Fondos directos publicados</h2>
        </CardHeader>
        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-civic-line text-civic-muted">
                <th className="py-3 pr-4 font-semibold">Programa</th>
                <th className="py-3 pr-4 font-semibold">Registros</th>
                <th className="py-3 pr-4 font-semibold">Monto publicado</th>
                <th className="py-3 pr-4 font-semibold">Filas vacías</th>
              </tr>
            </thead>
            <tbody>
              {directPrograms.map((program) => (
                <tr className="border-b border-civic-line last:border-0" key={program.sheet}>
                  <td className="py-3 pr-4 text-civic-ink">
                    <span className="block font-semibold">{program.service}</span>
                    <span className="text-xs text-civic-muted">{program.sheet} · {program.budget_line}</span>
                  </td>
                  <td className="py-3 pr-4 text-civic-ink">{formatNumber(program.records_with_name)}</td>
                  <td className="py-3 pr-4 font-semibold text-civic-blue">{formatClp(program.amount_sum)}</td>
                  <td className="py-3 pr-4 text-civic-muted">{formatNumber(program.blank_numbered_rows)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-bold text-civic-ink">Empresas y personas repetidas en fondos directos</h2>
        </CardHeader>
        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-civic-line text-civic-muted">
                <th className="py-3 pr-4 font-semibold">Nombre publicado</th>
                <th className="py-3 pr-4 font-semibold">Tipo</th>
                <th className="py-3 pr-4 font-semibold">Programas</th>
                <th className="py-3 pr-4 font-semibold">Monto acumulado</th>
              </tr>
            </thead>
            <tbody>
              {directDuplicateGroups.map((item) => (
                <tr className="border-b border-civic-line last:border-0" key={`${item.name}-${item.programs}`}>
                  <td className="py-3 pr-4 font-medium text-civic-ink">{item.name}</td>
                  <td className="py-3 pr-4 text-civic-muted">{item.entity_type}</td>
                  <td className="py-3 pr-4 text-civic-muted">{item.programs}</td>
                  <td className="py-3 pr-4 font-semibold text-civic-blue">{formatClp(item.amount_total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-bold text-civic-ink">Duplicados dentro del mismo fondo</h2>
        </CardHeader>
        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-civic-line text-civic-muted">
                <th className="py-3 pr-4 font-semibold">Fondo</th>
                <th className="py-3 pr-4 font-semibold">Nombre publicado</th>
                <th className="py-3 pr-4 font-semibold">Registros</th>
                <th className="py-3 pr-4 font-semibold">Monto acumulado</th>
              </tr>
            </thead>
            <tbody>
              {sameProgramDuplicates.map((item) => (
                <tr className="border-b border-civic-line last:border-0" key={`${item.sheet}-${item.name}`}>
                  <td className="py-3 pr-4 text-civic-ink">{item.sheet}</td>
                  <td className="py-3 pr-4 font-medium text-civic-ink">{item.name}</td>
                  <td className="py-3 pr-4 text-civic-muted">{item.record_count}</td>
                  <td className="py-3 pr-4 font-semibold text-civic-blue">{formatClp(item.amount_total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-bold text-civic-ink">Matriz de anomalías 2022</h2>
        </CardHeader>
        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-civic-line text-civic-muted">
                <th className="py-3 pr-4 font-semibold">Severidad</th>
                <th className="py-3 pr-4 font-semibold">Pestaña</th>
                <th className="py-3 pr-4 font-semibold">Tipo</th>
                <th className="py-3 pr-4 font-semibold">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {anomalies.map((item) => (
                <tr className="border-b border-civic-line last:border-0" key={item.id}>
                  <td className="py-3 pr-4"><SeverityBadge severity={item.severity} /></td>
                  <td className="py-3 pr-4 font-medium text-civic-ink">{item.sheet}</td>
                  <td className="py-3 pr-4 text-civic-ink">{item.type}</td>
                  <td className="py-3 pr-4 text-civic-muted">{item.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-bold text-civic-ink">Problemas textuales y de control de calidad</h2>
        </CardHeader>
        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-civic-line text-civic-muted">
                <th className="py-3 pr-4 font-semibold">Pestaña</th>
                <th className="py-3 pr-4 font-semibold">Celda</th>
                <th className="py-3 pr-4 font-semibold">Patrón</th>
                <th className="py-3 pr-4 font-semibold">Valor publicado</th>
              </tr>
            </thead>
            <tbody>
              {suspiciousTextIssues.map((issue) => (
                <tr className="border-b border-civic-line last:border-0" key={`${issue.sheet}-${issue.cell}-${issue.pattern}`}>
                  <td className="py-3 pr-4 font-medium text-civic-ink">{issue.sheet}</td>
                  <td className="py-3 pr-4 text-civic-muted">{issue.cell}</td>
                  <td className="py-3 pr-4 text-civic-ink">{issue.pattern}</td>
                  <td className="py-3 pr-4 text-civic-muted">{issue.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-bold text-civic-ink">Descargas públicas 2022</h2>
        </CardHeader>
        <CardBody>
          <div className="grid gap-3 md:grid-cols-2">
            {downloads.map((download) => (
              <Link className="rounded-md border border-civic-line px-4 py-3 text-sm font-medium text-civic-blue hover:bg-civic-panel" href={download.href} key={download.href}>
                {download.label}
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
