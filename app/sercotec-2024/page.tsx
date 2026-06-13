import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Download, FileText, SearchCheck } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Auditoría Sercotec 2024"
};

type Summary = {
  year: number;
  uploaded_files_in_year: number;
  rows: number;
  usable_named_rows: number;
  programs: number;
  direct_fund_rows: number;
  known_amount_rows: number;
  known_amount_duplicate_groups: number;
  known_amount_duplicate_groups_three_or_more: number;
  direct_fund_duplicate_groups: number;
  direct_fund_duplicate_groups_three_or_more: number;
  same_program_duplicate_groups: number;
  exact_duplicate_rows: number;
  duplicate_name_rows: number;
  empty_name_rows: number;
  missing_numero_acto_rows: number;
  identity_split_no_aplica_rows: number;
  year_mismatch_rows: number;
  male_first_name_flags_in_women_programs: number;
  known_amount_exposure_clp_sum_across_duplicate_groups: number;
  highest_known_amount_exposure_clp: number;
  anomaly_rows: number;
  critical_anomaly_rows: number;
  high_anomaly_rows: number;
};

type ProgramRow = {
  program: string;
  rows: number;
  usable_named_rows: number;
  unique_names: number;
  exact_duplicate_rows: number;
  duplicate_name_rows: number;
  empty_name_rows: number;
  missing_numero_acto_rows: number;
  male_first_name_flags: number;
  is_direct_fund: boolean;
  known_amount: boolean;
  amount_max_label: string;
  funding_type: string;
};

type DuplicateRow = {
  rank: number;
  display_name: string;
  apparent_type: string;
  program_count: number;
  record_count: number;
  programs: string;
  known_amount_total_label: string;
  first_fecha_otorgamiento: string;
  last_fecha_otorgamiento: string;
};

type AnomalyRow = {
  severity: string;
  category: string;
  program: string;
  metric: string;
  value: number;
  evidence: string;
};

type DuplicateDetailRow = {
  name_raw: string;
  apparent_type: string;
  program_canonical: string;
  fecha_otorgamiento: string;
  fecha_acto: string;
  numero_acto: string;
  amount_max_label: string;
  funding_type: string;
  source_file: string;
};

const summary: Summary = {
  "year": 2024,
  "uploaded_files_in_year": 15,
  "rows": 61756,
  "usable_named_rows": 52353,
  "programs": 13,
  "direct_fund_rows": 6419,
  "known_amount_rows": 4481,
  "known_amount_duplicate_groups": 16,
  "known_amount_duplicate_groups_three_or_more": 0,
  "direct_fund_duplicate_groups": 32,
  "direct_fund_duplicate_groups_three_or_more": 0,
  "same_program_duplicate_groups": 102,
  "exact_duplicate_rows": 21454,
  "duplicate_name_rows": 21466,
  "empty_name_rows": 9403,
  "missing_numero_acto_rows": 117,
  "identity_split_no_aplica_rows": 52106,
  "year_mismatch_rows": 5,
  "male_first_name_flags_in_women_programs": 0,
  "known_amount_exposure_clp_sum_across_duplicate_groups": 95200000,
  "highest_known_amount_exposure_clp": 6200000,
  "anomaly_rows": 15,
  "critical_anomaly_rows": 1,
  "high_anomaly_rows": 13
};
const topPrograms: ProgramRow[] = [
  {
    "year": "2024",
    "program": "Servicios Virtuales",
    "raw_programs": "Servicios Virtuales",
    "source_files": "TransparenciaActiva (25).csv",
    "rows": 45217,
    "usable_named_rows": 45217,
    "unique_names": 23857,
    "exact_duplicate_rows": 21360,
    "duplicate_name_rows": 21360,
    "empty_name_rows": 0,
    "missing_numero_acto_rows": 0,
    "identity_split_no_aplica_rows": 45217,
    "year_mismatch_fecha_otorgamiento_rows": 0,
    "year_mismatch_fecha_acto_rows": 0,
    "male_first_name_flags": 9226,
    "is_direct_fund": false,
    "known_amount": false,
    "amount_max_clp": "",
    "amount_max_label": "Sin monto parametrizado",
    "funding_type": "servicio virtual sin monto directo"
  },
  {
    "year": "2024",
    "program": "Centros de Desarrollo de Negocios",
    "raw_programs": "Centros de Desarrollo de Negocios",
    "source_files": "TransparenciaActiva (28).csv | TransparenciaActiva (29).csv",
    "rows": 9400,
    "usable_named_rows": 0,
    "unique_names": 0,
    "exact_duplicate_rows": 93,
    "duplicate_name_rows": 0,
    "empty_name_rows": 9400,
    "missing_numero_acto_rows": 117,
    "identity_split_no_aplica_rows": 0,
    "year_mismatch_fecha_otorgamiento_rows": 0,
    "year_mismatch_fecha_acto_rows": 0,
    "male_first_name_flags": 0,
    "is_direct_fund": false,
    "known_amount": false,
    "amount_max_clp": "",
    "amount_max_label": "Sin monto parametrizado",
    "funding_type": "operación/servicio de centros sin beneficiario monetario directo"
  },
  {
    "year": "2024",
    "program": "Emergencia",
    "raw_programs": "Emergencia",
    "source_files": "TransparenciaActiva (24).csv",
    "rows": 1690,
    "usable_named_rows": 1689,
    "unique_names": 1686,
    "exact_duplicate_rows": 1,
    "duplicate_name_rows": 3,
    "empty_name_rows": 1,
    "missing_numero_acto_rows": 0,
    "identity_split_no_aplica_rows": 1690,
    "year_mismatch_fecha_otorgamiento_rows": 0,
    "year_mismatch_fecha_acto_rows": 0,
    "male_first_name_flags": 608,
    "is_direct_fund": true,
    "known_amount": false,
    "amount_max_clp": "",
    "amount_max_label": "Sin monto parametrizado",
    "funding_type": "subsidio/emergencia con monto no parametrizado"
  },
  {
    "year": "2024",
    "program": "Crece",
    "raw_programs": "Crece",
    "source_files": "TransparenciaActiva (19).csv",
    "rows": 1309,
    "usable_named_rows": 1309,
    "unique_names": 1309,
    "exact_duplicate_rows": 0,
    "duplicate_name_rows": 0,
    "empty_name_rows": 0,
    "missing_numero_acto_rows": 0,
    "identity_split_no_aplica_rows": 1309,
    "year_mismatch_fecha_otorgamiento_rows": 0,
    "year_mismatch_fecha_acto_rows": 0,
    "male_first_name_flags": 105,
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max_clp": 5000000,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo"
  },
  {
    "year": "2024",
    "program": "Capital Abeja Emprende",
    "raw_programs": "Abeja Emprende",
    "source_files": "TransparenciaActiva (23).csv",
    "rows": 1171,
    "usable_named_rows": 1171,
    "unique_names": 1073,
    "exact_duplicate_rows": 0,
    "duplicate_name_rows": 98,
    "empty_name_rows": 0,
    "missing_numero_acto_rows": 0,
    "identity_split_no_aplica_rows": 1171,
    "year_mismatch_fecha_otorgamiento_rows": 0,
    "year_mismatch_fecha_acto_rows": 0,
    "male_first_name_flags": 0,
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max_clp": 3500000,
    "amount_max_label": "$3.500.000",
    "funding_type": "subsidio directo"
  },
  {
    "year": "2024",
    "program": "Capital Semilla Emprende",
    "raw_programs": "Capital Semilla",
    "source_files": "TransparenciaActiva (22).csv",
    "rows": 1025,
    "usable_named_rows": 1025,
    "unique_names": 1025,
    "exact_duplicate_rows": 0,
    "duplicate_name_rows": 0,
    "empty_name_rows": 0,
    "missing_numero_acto_rows": 0,
    "identity_split_no_aplica_rows": 1025,
    "year_mismatch_fecha_otorgamiento_rows": 0,
    "year_mismatch_fecha_acto_rows": 0,
    "male_first_name_flags": 307,
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max_clp": 3500000,
    "amount_max_label": "$3.500.000",
    "funding_type": "subsidio directo"
  },
  {
    "year": "2024",
    "program": "Ruta Digital Kit Digital",
    "raw_programs": "Ruta Digital",
    "source_files": "TransparenciaActiva (20).csv",
    "rows": 570,
    "usable_named_rows": 570,
    "unique_names": 570,
    "exact_duplicate_rows": 0,
    "duplicate_name_rows": 0,
    "empty_name_rows": 0,
    "missing_numero_acto_rows": 0,
    "identity_split_no_aplica_rows": 570,
    "year_mismatch_fecha_otorgamiento_rows": 0,
    "year_mismatch_fecha_acto_rows": 0,
    "male_first_name_flags": 49,
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max_clp": 1200000,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo"
  },
  {
    "year": "2024",
    "program": "Digitaliza tu Almacén",
    "raw_programs": "Digitaliza tu Almacén",
    "source_files": "TransparenciaActiva (18).csv",
    "rows": 406,
    "usable_named_rows": 406,
    "unique_names": 406,
    "exact_duplicate_rows": 0,
    "duplicate_name_rows": 0,
    "empty_name_rows": 0,
    "missing_numero_acto_rows": 0,
    "identity_split_no_aplica_rows": 406,
    "year_mismatch_fecha_otorgamiento_rows": 0,
    "year_mismatch_fecha_acto_rows": 0,
    "male_first_name_flags": 47,
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max_clp": 3000000,
    "amount_max_label": "$3.000.000",
    "funding_type": "subsidio directo"
  },
  {
    "year": "2024",
    "program": "Promoción y Canales de Comercialización",
    "raw_programs": "Promoción y Canales de Comercialización",
    "source_files": "TransparenciaActiva (21).csv",
    "rows": 380,
    "usable_named_rows": 379,
    "unique_names": 375,
    "exact_duplicate_rows": 0,
    "duplicate_name_rows": 4,
    "empty_name_rows": 1,
    "missing_numero_acto_rows": 0,
    "identity_split_no_aplica_rows": 380,
    "year_mismatch_fecha_otorgamiento_rows": 0,
    "year_mismatch_fecha_acto_rows": 0,
    "male_first_name_flags": 11,
    "is_direct_fund": false,
    "known_amount": false,
    "amount_max_clp": "",
    "amount_max_label": "Sin monto parametrizado",
    "funding_type": "cofinanciamiento/servicio sin monto individual directo"
  },
  {
    "year": "2024",
    "program": "Redes de Oportunidades de Negocios",
    "raw_programs": "Redes de Oportunidades de Negocios",
    "source_files": "TransparenciaActiva (27).csv",
    "rows": 338,
    "usable_named_rows": 338,
    "unique_names": 338,
    "exact_duplicate_rows": 0,
    "duplicate_name_rows": 0,
    "empty_name_rows": 0,
    "missing_numero_acto_rows": 0,
    "identity_split_no_aplica_rows": 338,
    "year_mismatch_fecha_otorgamiento_rows": 0,
    "year_mismatch_fecha_acto_rows": 0,
    "male_first_name_flags": 31,
    "is_direct_fund": false,
    "known_amount": false,
    "amount_max_clp": "",
    "amount_max_label": "Sin monto parametrizado",
    "funding_type": "servicio/redes sin monto directo"
  },
  {
    "year": "2024",
    "program": "Programa Desarrollo de Ferias Libres",
    "raw_programs": "Desarrollo de Ferias Libres",
    "source_files": "TransparenciaActiva (31).csv",
    "rows": 127,
    "usable_named_rows": 127,
    "unique_names": 127,
    "exact_duplicate_rows": 0,
    "duplicate_name_rows": 0,
    "empty_name_rows": 0,
    "missing_numero_acto_rows": 0,
    "identity_split_no_aplica_rows": 0,
    "year_mismatch_fecha_otorgamiento_rows": 0,
    "year_mismatch_fecha_acto_rows": 0,
    "male_first_name_flags": 0,
    "is_direct_fund": true,
    "known_amount": false,
    "amount_max_clp": "",
    "amount_max_label": "Sin monto parametrizado",
    "funding_type": "fondo directo con monto variable/no parametrizado"
  },
  {
    "year": "2024",
    "program": "Fortalecimiento Gremial",
    "raw_programs": "Fortalecimiento Gremial",
    "source_files": "TransparenciaActiva (30).csv",
    "rows": 85,
    "usable_named_rows": 85,
    "unique_names": 85,
    "exact_duplicate_rows": 0,
    "duplicate_name_rows": 0,
    "empty_name_rows": 0,
    "missing_numero_acto_rows": 0,
    "identity_split_no_aplica_rows": 0,
    "year_mismatch_fecha_otorgamiento_rows": 0,
    "year_mismatch_fecha_acto_rows": 0,
    "male_first_name_flags": 0,
    "is_direct_fund": true,
    "known_amount": false,
    "amount_max_clp": "",
    "amount_max_label": "Sin monto parametrizado",
    "funding_type": "fondo gremial con monto variable/no parametrizado"
  },
  {
    "year": "2024",
    "program": "Fortalecimiento y Creación de Cooperativas",
    "raw_programs": "Fortalecimiento y Creación de Empresas Sociales y Cooperativas | Fortalecimiento y Creación de Empresas sociales y cooperativas",
    "source_files": "TransparenciaActiva (17).csv | TransparenciaActiva (32).csv",
    "rows": 38,
    "usable_named_rows": 37,
    "unique_names": 36,
    "exact_duplicate_rows": 0,
    "duplicate_name_rows": 1,
    "empty_name_rows": 1,
    "missing_numero_acto_rows": 0,
    "identity_split_no_aplica_rows": 0,
    "year_mismatch_fecha_otorgamiento_rows": 0,
    "year_mismatch_fecha_acto_rows": 5,
    "male_first_name_flags": 4,
    "is_direct_fund": true,
    "known_amount": false,
    "amount_max_clp": "",
    "amount_max_label": "Sin monto parametrizado",
    "funding_type": "fondo cooperativo con monto variable/no parametrizado"
  }
];
const threeOrMoreDuplicates: DuplicateRow[] = [];
const topDuplicates: DuplicateRow[] = [
  {
    "rank": 1,
    "display_name": "ASSEMBLAGE SPA",
    "name_norm": "ASSEMBLAGE SPA",
    "apparent_type": "empresa/organizacion",
    "program_count": 2,
    "record_count": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "known_amount_total_clp": 6200000,
    "known_amount_total_label": "$6.200.000",
    "first_fecha_otorgamiento": "12-08-2024",
    "last_fecha_otorgamiento": "16-10-2024"
  },
  {
    "rank": 2,
    "display_name": "CERÁMICAS MAGDA SPA",
    "name_norm": "CERAMICAS MAGDA SPA",
    "apparent_type": "empresa/organizacion",
    "program_count": 2,
    "record_count": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "known_amount_total_clp": 6200000,
    "known_amount_total_label": "$6.200.000",
    "first_fecha_otorgamiento": "10-10-2024",
    "last_fecha_otorgamiento": "13-09-2024"
  },
  {
    "rank": 3,
    "display_name": "CRECER DE COLORES SPA",
    "name_norm": "CRECER DE COLORES SPA",
    "apparent_type": "empresa/organizacion",
    "program_count": 2,
    "record_count": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "known_amount_total_clp": 6200000,
    "known_amount_total_label": "$6.200.000",
    "first_fecha_otorgamiento": "12-08-2024",
    "last_fecha_otorgamiento": "19-10-2024"
  },
  {
    "rank": 4,
    "display_name": "DALFIT SPA",
    "name_norm": "DALFIT SPA",
    "apparent_type": "empresa/organizacion",
    "program_count": 2,
    "record_count": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "known_amount_total_clp": 6200000,
    "known_amount_total_label": "$6.200.000",
    "first_fecha_otorgamiento": "10-10-2024",
    "last_fecha_otorgamiento": "13-09-2024"
  },
  {
    "rank": 5,
    "display_name": "ECÓLEO SPA",
    "name_norm": "ECOLEO SPA",
    "apparent_type": "empresa/organizacion",
    "program_count": 2,
    "record_count": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "known_amount_total_clp": 6200000,
    "known_amount_total_label": "$6.200.000",
    "first_fecha_otorgamiento": "03-09-2024",
    "last_fecha_otorgamiento": "12-10-2024"
  },
  {
    "rank": 6,
    "display_name": "ELABORACIÓN Y VENTA DE PRODUCTOS NATURALES MARA PEÑA EGAÑA E.I.R.L",
    "name_norm": "ELABORACION Y VENTA DE PRODUCTOS NATURALES MARA PENA EGANA EIRL",
    "apparent_type": "empresa/organizacion",
    "program_count": 2,
    "record_count": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "known_amount_total_clp": 6200000,
    "known_amount_total_label": "$6.200.000",
    "first_fecha_otorgamiento": "10-10-2024",
    "last_fecha_otorgamiento": "14-08-2024"
  },
  {
    "rank": 7,
    "display_name": "INGENIERÍA Y ASESORÍAS INGRID PEREIRA FIGUEROA E.I.R.L.",
    "name_norm": "INGENIERIA Y ASESORIAS INGRID PEREIRA FIGUEROA EIRL",
    "apparent_type": "empresa/organizacion",
    "program_count": 2,
    "record_count": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "known_amount_total_clp": 6200000,
    "known_amount_total_label": "$6.200.000",
    "first_fecha_otorgamiento": "07-08-2024",
    "last_fecha_otorgamiento": "25-09-2024"
  },
  {
    "rank": 8,
    "display_name": "MARTINELLY SPA",
    "name_norm": "MARTINELLY SPA",
    "apparent_type": "empresa/organizacion",
    "program_count": 2,
    "record_count": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "known_amount_total_clp": 6200000,
    "known_amount_total_label": "$6.200.000",
    "first_fecha_otorgamiento": "22-08-2024",
    "last_fecha_otorgamiento": "23-08-2024"
  },
  {
    "rank": 9,
    "display_name": "MIRTA ELIZAABETH MUÑOZ VALDES",
    "name_norm": "MIRTA ELIZAABETH MUNOZ VALDES",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "program_count": 2,
    "record_count": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "known_amount_total_clp": 6200000,
    "known_amount_total_label": "$6.200.000",
    "first_fecha_otorgamiento": "13-11-2024",
    "last_fecha_otorgamiento": "23-09-2024"
  },
  {
    "rank": 10,
    "display_name": "NOMA DECORACION SPA",
    "name_norm": "NOMA DECORACION SPA",
    "apparent_type": "empresa/organizacion",
    "program_count": 2,
    "record_count": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "known_amount_total_clp": 6200000,
    "known_amount_total_label": "$6.200.000",
    "first_fecha_otorgamiento": "22-08-2024",
    "last_fecha_otorgamiento": "30-08-2024"
  },
  {
    "rank": 11,
    "display_name": "PATRICIO ÁLVARO ALEJANDRO ACUÑA SOLIVELLES",
    "name_norm": "PATRICIO ALVARO ALEJANDRO ACUNA SOLIVELLES",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "program_count": 2,
    "record_count": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "known_amount_total_clp": 6200000,
    "known_amount_total_label": "$6.200.000",
    "first_fecha_otorgamiento": "22-08-2024",
    "last_fecha_otorgamiento": "30-08-2024"
  },
  {
    "rank": 12,
    "display_name": "PROSALUD ATENCIÓN NUTRICIONAL SPA",
    "name_norm": "PROSALUD ATENCION NUTRICIONAL SPA",
    "apparent_type": "empresa/organizacion",
    "program_count": 2,
    "record_count": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "known_amount_total_clp": 6200000,
    "known_amount_total_label": "$6.200.000",
    "first_fecha_otorgamiento": "10-10-2024",
    "last_fecha_otorgamiento": "13-09-2024"
  },
  {
    "rank": 13,
    "display_name": "SERVICIOS DE DISEÑO Y DECORACIÓN DE INTERIORES MARIA JOSE CHACON HENRIQUEZ EIRL",
    "name_norm": "SERVICIOS DE DISENO Y DECORACION DE INTERIORES MARIA JOSE CHACON HENRIQUEZ EIRL",
    "apparent_type": "empresa/organizacion",
    "program_count": 2,
    "record_count": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "known_amount_total_clp": 6200000,
    "known_amount_total_label": "$6.200.000",
    "first_fecha_otorgamiento": "12-08-2024",
    "last_fecha_otorgamiento": "16-10-2024"
  },
  {
    "rank": 14,
    "display_name": "VICTORIA OLIVIA HEISE RIVERA",
    "name_norm": "VICTORIA OLIVIA HEISE RIVERA",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "program_count": 2,
    "record_count": 2,
    "programs": "Crece | Ruta Digital Kit Digital",
    "known_amount_total_clp": 6200000,
    "known_amount_total_label": "$6.200.000",
    "first_fecha_otorgamiento": "07-08-2024",
    "last_fecha_otorgamiento": "25-09-2024"
  },
  {
    "rank": 15,
    "display_name": "NELSON JAIME FIGUEROA VELOZO",
    "name_norm": "NELSON JAIME FIGUEROA VELOZO",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "program_count": 2,
    "record_count": 2,
    "programs": "Digitaliza tu Almacén | Ruta Digital Kit Digital",
    "known_amount_total_clp": 4200000,
    "known_amount_total_label": "$4.200.000",
    "first_fecha_otorgamiento": "03-04-2024",
    "last_fecha_otorgamiento": "25-09-2024"
  },
  {
    "rank": 16,
    "display_name": "ROSA JEANNETTE FIGUEROA VELOZO",
    "name_norm": "ROSA JEANNETTE FIGUEROA VELOZO",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "program_count": 2,
    "record_count": 2,
    "programs": "Digitaliza tu Almacén | Ruta Digital Kit Digital",
    "known_amount_total_clp": 4200000,
    "known_amount_total_label": "$4.200.000",
    "first_fecha_otorgamiento": "03-04-2024",
    "last_fecha_otorgamiento": "25-09-2024"
  }
];
const duplicateDetails: DuplicateDetailRow[] = [
  {
    "file_index": 19,
    "source_file": "TransparenciaActiva (19).csv",
    "sha256": "1857cf6c9b0678a928348db7a3360e236e602a284a61b48584b07bc519f129ac",
    "source_row": 482,
    "year": "2024",
    "month": "agosto",
    "program_raw": "Crece",
    "program_canonical": "Crece",
    "fecha_otorgamiento": "12-08-2024",
    "fecha_acto": "12-08-2024",
    "numero_acto": "51-2024",
    "name_raw": "ASSEMBLAGE SPA",
    "name_norm": "ASSEMBLAGE SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Comité de evaluación Regional",
    "denominacion_acto": "acto",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 5000000.0,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 5000000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 450,
    "year": "2024",
    "month": "octubre",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "16-10-2024",
    "fecha_acto": "16-10-2024",
    "numero_acto": "59-2024",
    "name_raw": "ASSEMBLAGE SPA",
    "name_norm": "ASSEMBLAGE SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 402,
    "year": "2024",
    "month": "octubre",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "10-10-2024",
    "fecha_acto": "10-10-2024",
    "numero_acto": "37-2024",
    "name_raw": "CERÁMICAS MAGDA SPA",
    "name_norm": "CERAMICAS MAGDA SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 19,
    "source_file": "TransparenciaActiva (19).csv",
    "sha256": "1857cf6c9b0678a928348db7a3360e236e602a284a61b48584b07bc519f129ac",
    "source_row": 1165,
    "year": "2024",
    "month": "septiembre",
    "program_raw": "Crece",
    "program_canonical": "Crece",
    "fecha_otorgamiento": "13-09-2024",
    "fecha_acto": "13-09-2024",
    "numero_acto": "39-2024",
    "name_raw": "CERÁMICAS MAGDA SPA",
    "name_norm": "CERAMICAS MAGDA SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Comité de evaluación Regional",
    "denominacion_acto": "acto",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 5000000.0,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 5000000
  },
  {
    "file_index": 19,
    "source_file": "TransparenciaActiva (19).csv",
    "sha256": "1857cf6c9b0678a928348db7a3360e236e602a284a61b48584b07bc519f129ac",
    "source_row": 420,
    "year": "2024",
    "month": "agosto",
    "program_raw": "Crece",
    "program_canonical": "Crece",
    "fecha_otorgamiento": "12-08-2024",
    "fecha_acto": "12-08-2024",
    "numero_acto": "51-2024",
    "name_raw": "CRECER DE COLORES SPA",
    "name_norm": "CRECER DE COLORES SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Comité de evaluación Regional",
    "denominacion_acto": "acto",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 5000000.0,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 5000000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 490,
    "year": "2024",
    "month": "octubre",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "19-10-2024",
    "fecha_acto": "19-10-2024",
    "numero_acto": "59-2024",
    "name_raw": "CRECER DE COLORES SPA",
    "name_norm": "CRECER DE COLORES SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 419,
    "year": "2024",
    "month": "octubre",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "10-10-2024",
    "fecha_acto": "10-10-2024",
    "numero_acto": "37-2024",
    "name_raw": "DALFIT SPA",
    "name_norm": "DALFIT SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 19,
    "source_file": "TransparenciaActiva (19).csv",
    "sha256": "1857cf6c9b0678a928348db7a3360e236e602a284a61b48584b07bc519f129ac",
    "source_row": 1193,
    "year": "2024",
    "month": "septiembre",
    "program_raw": "Crece",
    "program_canonical": "Crece",
    "fecha_otorgamiento": "13-09-2024",
    "fecha_acto": "13-09-2024",
    "numero_acto": "39-2024",
    "name_raw": "DALFIT SPA",
    "name_norm": "DALFIT SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Comité de evaluación Regional",
    "denominacion_acto": "acto",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 5000000.0,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 5000000
  },
  {
    "file_index": 19,
    "source_file": "TransparenciaActiva (19).csv",
    "sha256": "1857cf6c9b0678a928348db7a3360e236e602a284a61b48584b07bc519f129ac",
    "source_row": 991,
    "year": "2024",
    "month": "septiembre",
    "program_raw": "Crece",
    "program_canonical": "Crece",
    "fecha_otorgamiento": "03-09-2024",
    "fecha_acto": "03-09-2024",
    "numero_acto": "026-2024",
    "name_raw": "ECÓLEO SPA",
    "name_norm": "ECOLEO SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Comité de evaluación Regional",
    "denominacion_acto": "acto",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 5000000.0,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 5000000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 277,
    "year": "2024",
    "month": "octubre",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "12-10-2024",
    "fecha_acto": "12-10-2024",
    "numero_acto": "022-2024",
    "name_raw": "ECÓLEO SPA",
    "name_norm": "ECOLEO SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 535,
    "year": "2024",
    "month": "octubre",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "10-10-2024",
    "fecha_acto": "10-10-2024",
    "numero_acto": "040-2024",
    "name_raw": "ELABORACIÓN Y VENTA DE PRODUCTOS NATURALES MARA PEÑA EGAÑA EIRL",
    "name_norm": "ELABORACION Y VENTA DE PRODUCTOS NATURALES MARA PENA EGANA EIRL",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 19,
    "source_file": "TransparenciaActiva (19).csv",
    "sha256": "1857cf6c9b0678a928348db7a3360e236e602a284a61b48584b07bc519f129ac",
    "source_row": 550,
    "year": "2024",
    "month": "agosto",
    "program_raw": "Crece",
    "program_canonical": "Crece",
    "fecha_otorgamiento": "14-08-2024",
    "fecha_acto": "14-08-2024",
    "numero_acto": "027-2024",
    "name_raw": "ELABORACIÓN Y VENTA DE PRODUCTOS NATURALES MARA PEÑA EGAÑA E.I.R.L",
    "name_norm": "ELABORACION Y VENTA DE PRODUCTOS NATURALES MARA PENA EGANA EIRL",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Comité de evaluación Regional",
    "denominacion_acto": "acto",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 5000000.0,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 5000000
  },
  {
    "file_index": 19,
    "source_file": "TransparenciaActiva (19).csv",
    "sha256": "1857cf6c9b0678a928348db7a3360e236e602a284a61b48584b07bc519f129ac",
    "source_row": 199,
    "year": "2024",
    "month": "agosto",
    "program_raw": "Crece",
    "program_canonical": "Crece",
    "fecha_otorgamiento": "07-08-2024",
    "fecha_acto": "07-08-2024",
    "numero_acto": "25-2024",
    "name_raw": "INGENIERÍA Y ASESORÍAS INGRID PEREIRA FIGUEROA E.I.R.L.",
    "name_norm": "INGENIERIA Y ASESORIAS INGRID PEREIRA FIGUEROA EIRL",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Comité de evaluación Regional",
    "denominacion_acto": "acto",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 5000000.0,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 5000000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 199,
    "year": "2024",
    "month": "septiembre",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "25-09-2024",
    "fecha_acto": "25-09-2024",
    "numero_acto": "26-2024",
    "name_raw": "INGENIERÍA Y ASESORÍAS INGRID PEREIRA FIGUEROA E.I.R.L.",
    "name_norm": "INGENIERIA Y ASESORIAS INGRID PEREIRA FIGUEROA EIRL",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 19,
    "source_file": "TransparenciaActiva (19).csv",
    "sha256": "1857cf6c9b0678a928348db7a3360e236e602a284a61b48584b07bc519f129ac",
    "source_row": 623,
    "year": "2024",
    "month": "agosto",
    "program_raw": "Crece",
    "program_canonical": "Crece",
    "fecha_otorgamiento": "22-08-2024",
    "fecha_acto": "22-08-2024",
    "numero_acto": "27-2024",
    "name_raw": "MARTINELLY SPA",
    "name_norm": "MARTINELLY SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Comité de evaluación Regional",
    "denominacion_acto": "acto",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 5000000.0,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 5000000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 30,
    "year": "2024",
    "month": "agosto",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "23-08-2024",
    "fecha_acto": "23-08-2024",
    "numero_acto": "25-2024",
    "name_raw": "MARTINELLY SPA",
    "name_norm": "MARTINELLY SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 359,
    "year": "2024",
    "month": "noviembre",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "13-11-2024",
    "fecha_acto": "13-11-2024",
    "numero_acto": "023-2024",
    "name_raw": "MIRTA ELIZAABETH MUÑOZ VALDES",
    "name_norm": "MIRTA ELIZAABETH MUNOZ VALDES",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 19,
    "source_file": "TransparenciaActiva (19).csv",
    "sha256": "1857cf6c9b0678a928348db7a3360e236e602a284a61b48584b07bc519f129ac",
    "source_row": 1278,
    "year": "2024",
    "month": "septiembre",
    "program_raw": "Crece",
    "program_canonical": "Crece",
    "fecha_otorgamiento": "23-09-2024",
    "fecha_acto": "23-09-2024",
    "numero_acto": "027-2024",
    "name_raw": "MIRTA ELIZAABETH MUÑOZ VALDES",
    "name_norm": "MIRTA ELIZAABETH MUNOZ VALDES",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "tipo_acto": "Comité de evaluación Regional",
    "denominacion_acto": "acto",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 5000000.0,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 5000000
  },
  {
    "file_index": 18,
    "source_file": "TransparenciaActiva (18).csv",
    "sha256": "1a406c5553b44188125a944e5b978e94c8fe45da46ffe2d6301711d4d6737913",
    "source_row": 31,
    "year": "2024",
    "month": "abril",
    "program_raw": "Digitaliza tu Almacén",
    "program_canonical": "Digitaliza tu Almacén",
    "fecha_otorgamiento": "03-04-2024",
    "fecha_acto": "03-04-2024",
    "numero_acto": "45474",
    "name_raw": "NELSON JAIME FIGUEROA VELOZO",
    "name_norm": "NELSON JAIME FIGUEROA VELOZO",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "tipo_acto": "acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 3000000.0,
    "amount_max_label": "$3.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": true,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 3000000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 216,
    "year": "2024",
    "month": "septiembre",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "25-09-2024",
    "fecha_acto": "25-09-2024",
    "numero_acto": "26-2024",
    "name_raw": "NELSON JAIME FIGUEROA VELOZO",
    "name_norm": "NELSON JAIME FIGUEROA VELOZO",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": true,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 19,
    "source_file": "TransparenciaActiva (19).csv",
    "sha256": "1857cf6c9b0678a928348db7a3360e236e602a284a61b48584b07bc519f129ac",
    "source_row": 836,
    "year": "2024",
    "month": "agosto",
    "program_raw": "Crece",
    "program_canonical": "Crece",
    "fecha_otorgamiento": "22-08-2024",
    "fecha_acto": "22-08-2024",
    "numero_acto": "35-220824",
    "name_raw": "NOMA DECORACION SPA",
    "name_norm": "NOMA DECORACION SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Comité de evaluación Regional",
    "denominacion_acto": "acto",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 5000000.0,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 5000000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 114,
    "year": "2024",
    "month": "agosto",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "30-08-2024",
    "fecha_acto": "30-08-2024",
    "numero_acto": "29-290724",
    "name_raw": "NOMA DECORACION SPA",
    "name_norm": "NOMA DECORACION SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 19,
    "source_file": "TransparenciaActiva (19).csv",
    "sha256": "1857cf6c9b0678a928348db7a3360e236e602a284a61b48584b07bc519f129ac",
    "source_row": 756,
    "year": "2024",
    "month": "agosto",
    "program_raw": "Crece",
    "program_canonical": "Crece",
    "fecha_otorgamiento": "22-08-2024",
    "fecha_acto": "22-08-2024",
    "numero_acto": "35-220824",
    "name_raw": "PATRICIO ÁLVARO ALEJANDRO ACUÑA SOLIVELLES",
    "name_norm": "PATRICIO ALVARO ALEJANDRO ACUNA SOLIVELLES",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "tipo_acto": "Comité de evaluación Regional",
    "denominacion_acto": "acto",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 5000000.0,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": true,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 5000000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 95,
    "year": "2024",
    "month": "agosto",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "30-08-2024",
    "fecha_acto": "30-08-2024",
    "numero_acto": "29-290724",
    "name_raw": "PATRICIO ÁLVARO ALEJANDRO ACUÑA SOLIVELLES",
    "name_norm": "PATRICIO ALVARO ALEJANDRO ACUNA SOLIVELLES",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": true,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 414,
    "year": "2024",
    "month": "octubre",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "10-10-2024",
    "fecha_acto": "10-10-2024",
    "numero_acto": "37-2024",
    "name_raw": "PROSALUD ATENCIÓN NUTRICIONAL SPA",
    "name_norm": "PROSALUD ATENCION NUTRICIONAL SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 19,
    "source_file": "TransparenciaActiva (19).csv",
    "sha256": "1857cf6c9b0678a928348db7a3360e236e602a284a61b48584b07bc519f129ac",
    "source_row": 1186,
    "year": "2024",
    "month": "septiembre",
    "program_raw": "Crece",
    "program_canonical": "Crece",
    "fecha_otorgamiento": "13-09-2024",
    "fecha_acto": "13-09-2024",
    "numero_acto": "39-2024",
    "name_raw": "PROSALUD ATENCIÓN NUTRICIONAL SPA",
    "name_norm": "PROSALUD ATENCION NUTRICIONAL SPA",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Comité de evaluación Regional",
    "denominacion_acto": "acto",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 5000000.0,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 5000000
  },
  {
    "file_index": 18,
    "source_file": "TransparenciaActiva (18).csv",
    "sha256": "1a406c5553b44188125a944e5b978e94c8fe45da46ffe2d6301711d4d6737913",
    "source_row": 27,
    "year": "2024",
    "month": "abril",
    "program_raw": "Digitaliza tu Almacén",
    "program_canonical": "Digitaliza tu Almacén",
    "fecha_otorgamiento": "03-04-2024",
    "fecha_acto": "03-04-2024",
    "numero_acto": "45474",
    "name_raw": "ROSA JEANNETTE FIGUEROA VELOZO",
    "name_norm": "ROSA JEANNETTE FIGUEROA VELOZO",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "tipo_acto": "acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 3000000.0,
    "amount_max_label": "$3.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 3000000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 226,
    "year": "2024",
    "month": "septiembre",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "25-09-2024",
    "fecha_acto": "25-09-2024",
    "numero_acto": "26-2024",
    "name_raw": "ROSA JEANNETTE FIGUEROA VELOZO",
    "name_norm": "ROSA JEANNETTE FIGUEROA VELOZO",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 19,
    "source_file": "TransparenciaActiva (19).csv",
    "sha256": "1857cf6c9b0678a928348db7a3360e236e602a284a61b48584b07bc519f129ac",
    "source_row": 348,
    "year": "2024",
    "month": "agosto",
    "program_raw": "Crece",
    "program_canonical": "Crece",
    "fecha_otorgamiento": "12-08-2024",
    "fecha_acto": "12-08-2024",
    "numero_acto": "51-2024",
    "name_raw": "SERVICIOS DE DISEÑO Y DECORACIÓN DE INTERIORES MARIA JOSE CHACON HENRIQUEZ EIRL",
    "name_norm": "SERVICIOS DE DISENO Y DECORACION DE INTERIORES MARIA JOSE CHACON HENRIQUEZ EIRL",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Comité de evaluación Regional",
    "denominacion_acto": "acto",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 5000000.0,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 5000000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 488,
    "year": "2024",
    "month": "octubre",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "16-10-2024",
    "fecha_acto": "16-10-2024",
    "numero_acto": "59-2024",
    "name_raw": "SERVICIOS DE DISEÑO Y DECORACIÓN DE INTERIORES MARIA JOSE CHACON HENRIQUEZ EIRL",
    "name_norm": "SERVICIOS DE DISENO Y DECORACION DE INTERIORES MARIA JOSE CHACON HENRIQUEZ EIRL",
    "apparent_type": "empresa/organizacion",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  },
  {
    "file_index": 19,
    "source_file": "TransparenciaActiva (19).csv",
    "sha256": "1857cf6c9b0678a928348db7a3360e236e602a284a61b48584b07bc519f129ac",
    "source_row": 238,
    "year": "2024",
    "month": "agosto",
    "program_raw": "Crece",
    "program_canonical": "Crece",
    "fecha_otorgamiento": "07-08-2024",
    "fecha_acto": "07-08-2024",
    "numero_acto": "25-2024",
    "name_raw": "VICTORIA OLIVIA HEISE RIVERA",
    "name_norm": "VICTORIA OLIVIA HEISE RIVERA",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "tipo_acto": "Comité de evaluación Regional",
    "denominacion_acto": "acto",
    "nombres": "No aplica",
    "primer_apellido": "No aplica",
    "segundo_apellido": "No aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 5000000.0,
    "amount_max_label": "$5.000.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 5000000
  },
  {
    "file_index": 20,
    "source_file": "TransparenciaActiva (20).csv",
    "sha256": "fd168fa1385ee9553fa1b764035f4dd2fcc4581f23815c2475b47247c55b9cae",
    "source_row": 230,
    "year": "2024",
    "month": "septiembre",
    "program_raw": "Ruta Digital",
    "program_canonical": "Ruta Digital Kit Digital",
    "fecha_otorgamiento": "25-09-2024",
    "fecha_acto": "25-09-2024",
    "numero_acto": "26-2024",
    "name_raw": "VICTORIA OLIVIA HEISE RIVERA",
    "name_norm": "VICTORIA OLIVIA HEISE RIVERA",
    "apparent_type": "persona natural o razon social sin forma societaria visible",
    "tipo_acto": "Acto",
    "denominacion_acto": "Comité de evaluación regional",
    "nombres": "no aplica",
    "primer_apellido": "no aplica",
    "segundo_apellido": "no aplica",
    "is_direct_fund": true,
    "known_amount": true,
    "amount_max": 1200000.0,
    "amount_max_label": "$1.200.000",
    "funding_type": "subsidio directo",
    "male_first_flag": false,
    "fecha_ot_year": "2024",
    "fecha_act_year": "2024",
    "year_mismatch_ot": false,
    "year_mismatch_act": false,
    "identity_split_no_aplica": true,
    "amount_max_clp": 1200000
  }
];
const anomalies: AnomalyRow[] = [
  {
    "severity": "alta",
    "category": "filas duplicadas exactas",
    "program": "Servicios Virtuales",
    "source": "program-summary",
    "metric": "exact_duplicate_rows",
    "value": 21360,
    "evidence": "21360 filas excedentes duplicadas exactas dentro del programa."
  },
  {
    "severity": "alta",
    "category": "razón social repetida dentro del programa",
    "program": "Servicios Virtuales",
    "source": "program-summary",
    "metric": "duplicate_name_rows",
    "value": 21360,
    "evidence": "21360 repeticiones de razón social dentro del mismo programa."
  },
  {
    "severity": "alta",
    "category": "razón social repetida dentro del programa",
    "program": "Capital Abeja Emprende",
    "source": "program-summary",
    "metric": "duplicate_name_rows",
    "value": 98,
    "evidence": "98 repeticiones de razón social dentro del mismo programa."
  },
  {
    "severity": "alta",
    "category": "filas duplicadas exactas",
    "program": "Centros de Desarrollo de Negocios",
    "source": "program-summary",
    "metric": "exact_duplicate_rows",
    "value": 93,
    "evidence": "93 filas excedentes duplicadas exactas dentro del programa."
  },
  {
    "severity": "alta",
    "category": "año inconsistente con fecha",
    "program": "Fortalecimiento y Creación de Cooperativas",
    "source": "program-summary",
    "metric": "year_mismatch",
    "value": 5,
    "evidence": "Año 2024 con fechas de otorgamiento/acto en otro año."
  },
  {
    "severity": "alta",
    "category": "razón social repetida dentro del programa",
    "program": "Promoción y Canales de Comercialización",
    "source": "program-summary",
    "metric": "duplicate_name_rows",
    "value": 4,
    "evidence": "4 repeticiones de razón social dentro del mismo programa."
  },
  {
    "severity": "alta",
    "category": "razón social repetida dentro del programa",
    "program": "Emergencia",
    "source": "program-summary",
    "metric": "duplicate_name_rows",
    "value": 3,
    "evidence": "3 repeticiones de razón social dentro del mismo programa."
  },
  {
    "severity": "alta",
    "category": "archivo duplicado exacto",
    "program": "Ruta Digital",
    "source": "file-duplicate-groups",
    "metric": "file_count",
    "value": 2,
    "evidence": "Archivos duplicados exactos: TransparenciaActiva (20).csv | TransparenciaActiva (26).csv"
  },
  {
    "severity": "alta",
    "category": "registros sin razón social",
    "program": "Emergencia",
    "source": "program-summary",
    "metric": "empty_name_rows",
    "value": 1,
    "evidence": "1 filas sin razón social publicada sobre 1690 registros."
  },
  {
    "severity": "alta",
    "category": "filas duplicadas exactas",
    "program": "Emergencia",
    "source": "program-summary",
    "metric": "exact_duplicate_rows",
    "value": 1,
    "evidence": "1 filas excedentes duplicadas exactas dentro del programa."
  },
  {
    "severity": "alta",
    "category": "registros sin razón social",
    "program": "Fortalecimiento y Creación de Cooperativas",
    "source": "program-summary",
    "metric": "empty_name_rows",
    "value": 1,
    "evidence": "1 filas sin razón social publicada sobre 38 registros."
  },
  {
    "severity": "alta",
    "category": "razón social repetida dentro del programa",
    "program": "Fortalecimiento y Creación de Cooperativas",
    "source": "program-summary",
    "metric": "duplicate_name_rows",
    "value": 1,
    "evidence": "1 repeticiones de razón social dentro del mismo programa."
  },
  {
    "severity": "alta",
    "category": "registros sin razón social",
    "program": "Promoción y Canales de Comercialización",
    "source": "program-summary",
    "metric": "empty_name_rows",
    "value": 1,
    "evidence": "1 filas sin razón social publicada sobre 380 registros."
  },
  {
    "severity": "critica",
    "category": "registros sin razón social",
    "program": "Centros de Desarrollo de Negocios",
    "source": "program-summary",
    "metric": "empty_name_rows",
    "value": 9400,
    "evidence": "9400 filas sin razón social publicada sobre 9400 registros."
  },
  {
    "severity": "media",
    "category": "número de acto ausente",
    "program": "Centros de Desarrollo de Negocios",
    "source": "program-summary",
    "metric": "missing_numero_acto_rows",
    "value": 117,
    "evidence": "117 filas no publican Numero de acto."
  }
];

function formatClp(value: number) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-civic-line bg-white p-4 shadow-sm">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-civic-muted">{label}</dt>
      <dd className="mt-2 text-2xl font-bold text-civic-ink">{value}</dd>
    </div>
  );
}

function DataLink({ href, children }: { href: string; children: string }) {
  return (
    <Link className="inline-flex items-center gap-2 rounded-md border border-civic-line bg-white px-3 py-2 text-sm font-semibold text-civic-blue hover:bg-civic-panel" href={href}>
      <Download aria-hidden="true" size={16} />
      {children}
    </Link>
  );
}

function DetailTable({ rows }: { rows: DuplicateDetailRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1200px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-civic-line text-civic-muted">
            <th className="py-3 pr-4 font-semibold">Razón social / persona</th>
            <th className="py-3 pr-4 font-semibold">Programa</th>
            <th className="py-3 pr-4 font-semibold">Monto máximo</th>
            <th className="py-3 pr-4 font-semibold">Fecha otorgamiento</th>
            <th className="py-3 pr-4 font-semibold">Fecha acto</th>
            <th className="py-3 pr-4 font-semibold">Número acto</th>
            <th className="py-3 pr-4 font-semibold">CSV</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr className="border-b border-civic-line last:border-0" key={`${row.name_raw}-${row.program_canonical}-${index}`}>
              <td className="py-3 pr-4 text-civic-ink">
                <span className="font-semibold">{row.name_raw}</span>
                <span className="mt-1 block text-xs text-civic-muted">{row.apparent_type}</span>
              </td>
              <td className="py-3 pr-4 text-civic-muted">{row.program_canonical}</td>
              <td className="py-3 pr-4 font-semibold text-civic-blue">{row.amount_max_label}</td>
              <td className="py-3 pr-4 text-civic-muted">{row.fecha_otorgamiento}</td>
              <td className="py-3 pr-4 text-civic-muted">{row.fecha_acto}</td>
              <td className="py-3 pr-4 text-civic-muted">{row.numero_acto || "sin número"}</td>
              <td className="py-3 pr-4 text-civic-muted">{row.source_file}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DuplicateTable({ rows }: { rows: DuplicateRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-civic-line text-civic-muted">
            <th className="py-3 pr-4 font-semibold">#</th>
            <th className="py-3 pr-4 font-semibold">Razón social / persona</th>
            <th className="py-3 pr-4 font-semibold">Programas</th>
            <th className="py-3 pr-4 font-semibold">Cantidad</th>
            <th className="py-3 pr-4 font-semibold">Monto acumulado</th>
            <th className="py-3 pr-4 font-semibold">Fechas</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="border-b border-civic-line last:border-0" key={`${row.rank}-${row.display_name}`}>
              <td className="py-3 pr-4 font-semibold text-civic-muted">{row.rank}</td>
              <td className="py-3 pr-4 text-civic-ink">
                <span className="font-semibold">{row.display_name}</span>
                <span className="mt-1 block text-xs text-civic-muted">{row.apparent_type}</span>
              </td>
              <td className="py-3 pr-4 text-civic-muted">{row.programs}</td>
              <td className="py-3 pr-4 font-semibold text-civic-ink">{row.program_count}</td>
              <td className="py-3 pr-4 font-semibold text-civic-blue">{row.known_amount_total_label}</td>
              <td className="py-3 pr-4 text-civic-muted">{row.first_fecha_otorgamiento} / {row.last_fecha_otorgamiento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SercotecYearPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-civic-teal">Auditoría pública por año</p>
        <h1 className="mt-3 text-3xl font-bold text-civic-ink sm:text-4xl">Resultados Sercotec 2024</h1>
        <p className="mt-4 text-sm leading-6 text-civic-muted">
          Revisión independiente de los CSV de Transparencia Activa 2024 entregados para fondos, servicios y programas Sercotec. El cruce monetario principal usa sólo programas con monto máximo parametrizado; los fondos con monto variable quedan en análisis separado.
        </p>
      </div>

      <dl className="grid gap-4 md:grid-cols-4">
        <Metric label="Archivos únicos" value={summary.uploaded_files_in_year} />
        <Metric label="Registros" value={summary.rows.toLocaleString("es-CL")} />
        <Metric label="Programas" value={summary.programs} />
        <Metric label="Anomalías" value={summary.anomaly_rows} />
      </dl>
      <dl className="mt-4 grid gap-4 md:grid-cols-4">
        <Metric label="Duplicados monto" value={summary.known_amount_duplicate_groups} />
        <Metric label="Triplicados monto" value={summary.known_amount_duplicate_groups_three_or_more} />
        <Metric label="Mayor exposición" value={formatClp(summary.highest_known_amount_exposure_clp)} />
        <Metric label="Actos ausentes" value={summary.missing_numero_acto_rows.toLocaleString("es-CL")} />
      </dl>

      <Card className="mt-8 border-civic-red">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle aria-hidden="true" className="text-civic-red" size={20} />
            <h2 className="text-xl font-bold text-civic-ink">Hallazgos principales 2024</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-3 text-sm leading-6 text-civic-muted">
            <p>{summary.known_amount_duplicate_groups} razones sociales/personas aparecen en dos o más programas con monto máximo conocido. {summary.known_amount_duplicate_groups_three_or_more} aparecen en tres o más programas con monto parametrizado.</p>
            <p>{summary.exact_duplicate_rows} filas son duplicados exactos dentro de sus programas y {summary.duplicate_name_rows} filas repiten razón social dentro del mismo programa.</p>
            <p>{summary.empty_name_rows} registros no publican razón social y {summary.identity_split_no_aplica_rows.toLocaleString("es-CL")} filas mantienen los campos Nombres, Primer apellido y Segundo apellido como “no aplica”.</p>
            <p>La suma de topes conocidos en grupos repetidos alcanza {formatClp(summary.known_amount_exposure_clp_sum_across_duplicate_groups)}.</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <DataLink href="/data/sercotec2024/analysis/program-summary.csv">Resumen por programa</DataLink>
            <DataLink href="/data/sercotec2024/analysis/anomaly-matrix.csv">Matriz de anomalías</DataLink>
            <DataLink href="/data/sercotec2024/duplicates/known-amount-cross-program-duplicates.csv">Duplicados con monto</DataLink>
            <DataLink href="/data/sercotec2024/duplicates/known-amount-duplicate-detail-rows.csv">Detalle por adjudicación</DataLink>
            <DataLink href="/data/sercotec2024/manifest.json">Manifiesto JSON</DataLink>
          </div>
        </CardBody>
      </Card>

      {threeOrMoreDuplicates.length > 0 ? (
        <Card className="mt-10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <SearchCheck aria-hidden="true" className="text-civic-red" size={20} />
              <h2 className="text-xl font-bold text-civic-ink">Casos en tres o más programas con monto conocido</h2>
            </div>
          </CardHeader>
          <CardBody>
            <DuplicateTable rows={threeOrMoreDuplicates} />
          </CardBody>
        </Card>
      ) : null}

      <Card className="mt-10">
        <CardHeader>
          <h2 className="text-xl font-bold text-civic-ink">Principales repetidos en fondos con monto conocido</h2>
        </CardHeader>
        <CardBody>
          <DuplicateTable rows={topDuplicates} />
        </CardBody>
      </Card>

      {duplicateDetails.length > 0 ? (
        <Card className="mt-10">
          <CardHeader>
            <h2 className="text-xl font-bold text-civic-ink">Detalle público por adjudicación repetida</h2>
          </CardHeader>
          <CardBody>
            <DetailTable rows={duplicateDetails} />
          </CardBody>
        </Card>
      ) : null}

      <Card className="mt-10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText aria-hidden="true" className="text-civic-blue" size={20} />
            <h2 className="text-xl font-bold text-civic-ink">Programas analizados</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topPrograms.map((program) => (
              <div className="rounded-md border border-civic-line bg-white p-4" key={program.program}>
                <h3 className="font-bold text-civic-ink">{program.program}</h3>
                <p className="mt-1 text-xs leading-5 text-civic-muted">{program.funding_type}</p>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <Metric label="Registros" value={program.rows.toLocaleString("es-CL")} />
                  <Metric label="Únicos" value={program.unique_names.toLocaleString("es-CL")} />
                  <Metric label="Tope" value={program.amount_max_label} />
                  <Metric label="Duplicados" value={program.exact_duplicate_rows + program.duplicate_name_rows} />
                </dl>
                {program.empty_name_rows > 0 ? <p className="mt-3 text-xs font-semibold text-civic-red">{program.empty_name_rows.toLocaleString("es-CL")} filas sin razón social.</p> : null}
                {program.missing_numero_acto_rows > 0 ? <p className="mt-2 text-xs font-semibold text-civic-red">{program.missing_numero_acto_rows.toLocaleString("es-CL")} filas sin número de acto.</p> : null}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="mt-10">
        <CardHeader>
          <h2 className="text-xl font-bold text-civic-ink">Anomalías documentales y de datos</h2>
        </CardHeader>
        <CardBody>
          <div className="grid gap-3">
            {anomalies.map((anomaly, index) => (
              <div className="rounded-md border border-civic-line bg-white p-4" key={`${anomaly.category}-${index}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-civic-panel px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-civic-muted">{anomaly.severity}</span>
                  <span className="text-sm font-bold text-civic-ink">{anomaly.category}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-civic-muted">{anomaly.program}: {anomaly.evidence}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="mt-10">
        <CardHeader>
          <h2 className="text-xl font-bold text-civic-ink">Descargas públicas 2024</h2>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap gap-3">
            <DataLink href="/data/sercotec2024/originals/original-files-index.csv">Índice de CSV originales</DataLink>
            <DataLink href="/data/sercotec2024/analysis/file-summary.csv">Resumen de archivos</DataLink>
            <DataLink href="/data/sercotec2024/analysis/normalized-row-index.csv">Índice normalizado</DataLink>
            <DataLink href="/data/sercotec2024/duplicates/direct-fund-cross-program-duplicates.csv">Duplicados en fondos directos</DataLink>
            <DataLink href="/data/sercotec2024/duplicates/same-program-duplicates.csv">Duplicados mismo programa</DataLink>
            <DataLink href="/data/sercotec2024/flags/uploaded-file-duplicate-groups.csv">Archivos repetidos</DataLink>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
