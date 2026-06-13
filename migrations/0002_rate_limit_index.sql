CREATE INDEX IF NOT EXISTS idx_reports_ip_hash_created_at
ON reports(ip_hash, created_at);
