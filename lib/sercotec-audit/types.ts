export type AuditYear = "2023" | "2024";

export type EmptyAmount = "";
export type MaybeKnownAmount = number | EmptyAmount;

export type Summary = {
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

export type ProgramRow = {
  year: AuditYear;
  program: string;
  raw_programs: string;
  source_files: string;
  rows: number;
  usable_named_rows: number;
  unique_names: number;
  exact_duplicate_rows: number;
  duplicate_name_rows: number;
  empty_name_rows: number;
  missing_numero_acto_rows: number;
  identity_split_no_aplica_rows: number;
  year_mismatch_fecha_otorgamiento_rows: number;
  year_mismatch_fecha_acto_rows: number;
  male_first_name_flags: number;
  is_direct_fund: boolean;
  known_amount: boolean;
  amount_max_clp: MaybeKnownAmount;
  amount_max_label: string;
  funding_type: string;
};

export type DuplicateRow = {
  rank: number;
  display_name: string;
  name_norm: string;
  apparent_type: string;
  program_count: number;
  record_count: number;
  programs: string;
  known_amount_total_clp: number;
  known_amount_total_label: string;
  first_fecha_otorgamiento: string;
  last_fecha_otorgamiento: string;
};

export type AnomalyRow = {
  severity: string;
  category: string;
  program: string;
  source: string;
  metric: string;
  value: number;
  evidence: string;
};

export type DuplicateDetailRow = {
  file_index: number;
  source_file: string;
  sha256: string;
  source_row: number;
  year: AuditYear;
  month: string;
  program_raw: string;
  program_canonical: string;
  fecha_otorgamiento: string;
  fecha_acto: string;
  numero_acto: string;
  name_raw: string;
  name_norm: string;
  apparent_type: string;
  tipo_acto: string;
  denominacion_acto: string;
  nombres: string;
  primer_apellido: string;
  segundo_apellido: string;
  is_direct_fund: boolean;
  known_amount: boolean;
  amount_max: number;
  amount_max_label: string;
  funding_type: string;
  male_first_flag: boolean;
  fecha_ot_year: string;
  fecha_act_year: string;
  year_mismatch_ot: boolean;
  year_mismatch_act: boolean;
  identity_split_no_aplica: boolean;
  amount_max_clp: number;
};
