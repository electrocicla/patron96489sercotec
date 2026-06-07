import { Hono } from "hono";
import type { EnvBindings } from "@/types/bindings";
import { requireAdminToken } from "@/worker/lib/auth";
import { fail, statusForError } from "@/worker/lib/response";
import { createCsvExportService } from "@/worker/services/serviceFactory";

export const adminExportRoute = new Hono<{ Bindings: EnvBindings }>().get("/", async (c) => {
  try {
    requireAdminToken(c.req.raw, c.env.ADMIN_TOKEN);
    const csv = await createCsvExportService(c.env).exportAdminCsv();

    return c.text(csv, 200, {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="evidencia-resultados.csv"',
      "Cache-Control": "private, no-store"
    });
  } catch (error) {
    return c.json(fail(error), statusForError(error));
  }
});
