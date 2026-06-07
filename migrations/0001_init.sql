CREATE TABLE reports (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,

  program TEXT NOT NULL,
  region TEXT NOT NULL,
  commune TEXT,
  score_text TEXT NOT NULL,
  normalized_score TEXT NOT NULL,
  cutoff_score_text TEXT,
  normalized_cutoff_score TEXT,

  status_text TEXT,
  email_message TEXT,
  web_message TEXT,
  result_url TEXT,
  additional_comments TEXT,

  has_email_screenshot INTEGER NOT NULL DEFAULT 0,
  has_web_screenshot INTEGER NOT NULL DEFAULT 0,
  has_other_files INTEGER NOT NULL DEFAULT 0,

  contact_email TEXT,
  contact_phone TEXT,
  consent INTEGER NOT NULL DEFAULT 0,

  pattern_score_96489 INTEGER NOT NULL DEFAULT 0,
  pattern_same_message INTEGER NOT NULL DEFAULT 0,
  pattern_capital_abeja_pending_with_score INTEGER NOT NULL DEFAULT 0,

  moderation_status TEXT NOT NULL DEFAULT 'pending',
  moderator_notes TEXT,
  public_notes TEXT,

  ip_hash TEXT,
  user_agent_hash TEXT
);

CREATE TABLE report_files (
  id TEXT PRIMARY KEY,
  report_id TEXT NOT NULL,
  created_at TEXT NOT NULL,

  file_type TEXT NOT NULL,
  original_name TEXT,
  r2_key TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  sha256 TEXT NOT NULL,

  moderation_status TEXT NOT NULL DEFAULT 'pending',

  FOREIGN KEY (report_id) REFERENCES reports(id)
);

CREATE TABLE moderation_events (
  id TEXT PRIMARY KEY,
  report_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  action TEXT NOT NULL,
  notes TEXT,
  FOREIGN KEY (report_id) REFERENCES reports(id)
);

CREATE INDEX idx_reports_created_at ON reports(created_at);
CREATE INDEX idx_reports_program_region ON reports(program, region);
CREATE INDEX idx_reports_score ON reports(normalized_score);
CREATE INDEX idx_reports_moderation ON reports(moderation_status);
CREATE INDEX idx_reports_pattern_96489 ON reports(pattern_score_96489);
CREATE INDEX idx_files_report_id ON report_files(report_id);
CREATE INDEX idx_files_sha256 ON report_files(sha256);
