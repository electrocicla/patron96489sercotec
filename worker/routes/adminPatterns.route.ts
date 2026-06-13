import { Hono } from "hono";
import type { EnvBindings } from "@/types/bindings";
import { requireAdminToken } from "@/worker/lib/auth";
import { fail, ok, statusForError } from "@/worker/lib/response";
import { createPatternAnalysisService } from "@/worker/services/serviceFactory";

export const adminPatternsRoute = new Hono<{ Bindings: EnvBindings }>().get(
  "/",
  async (c) => {
    try {
      requireAdminToken(c.req.raw, c.env.ADMIN_TOKEN);
      const analysis = await createPatternAnalysisService(c.env).getAnalysis();
      return c.json(ok(analysis), 200, { "Cache-Control": "private, no-store" });
    } catch (error) {
      return c.json(fail(error), statusForError(error));
    }
  }
);
