/// <reference types="@cloudflare/workers-types" />

export interface EnvBindings {
  DB: D1Database;
  EVIDENCE_BUCKET: R2Bucket;
  TURNSTILE_SECRET_KEY: string;
  ADMIN_TOKEN: string;
  FILE_SIGNING_SECRET: string;
  PUBLIC_SITE_NAME: string;
  PUBLIC_CANONICAL_URL: string;
}
