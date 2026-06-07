import { Hono } from "hono";
import type { EnvBindings } from "@/types/bindings";
import { requireAdminToken } from "@/worker/lib/auth";
import { fail, ok, statusForError } from "@/worker/lib/response";
import { createModerationService } from "@/worker/services/serviceFactory";
import {
  validateAdminFilters,
  validateModerationInput
} from "@/worker/validators/admin.validator";

export const adminReportsRoute = new Hono<{ Bindings: EnvBindings }>()
  .get("/", async (c) => {
    try {
      requireAdminToken(c.req.raw, c.env.ADMIN_TOKEN);
      const filters = validateAdminFilters(new URL(c.req.url).searchParams);
      const reports = await createModerationService(c.env).listReports(filters);
      return c.json(ok(reports));
    } catch (error) {
      return c.json(fail(error), statusForError(error));
    }
  })
  .get("/:id", async (c) => {
    try {
      requireAdminToken(c.req.raw, c.env.ADMIN_TOKEN);
      const detail = await createModerationService(c.env).getReportDetail(c.req.param("id"));
      return c.json(ok(detail));
    } catch (error) {
      return c.json(fail(error), statusForError(error));
    }
  })
  .post("/:id/moderate", async (c) => {
    try {
      requireAdminToken(c.req.raw, c.env.ADMIN_TOKEN);
      const input = await validateModerationInput(c.req.raw);
      const detail = await createModerationService(c.env).moderate(c.req.param("id"), input);
      return c.json(ok(detail));
    } catch (error) {
      return c.json(fail(error), statusForError(error));
    }
  });
