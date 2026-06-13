import { Hono } from "hono";
import type { EnvBindings } from "@/types/bindings";
import { requireAdminToken } from "@/worker/lib/auth";
import { fail, ok, statusForError } from "@/worker/lib/response";
import { createRequestDraftService } from "@/worker/services/serviceFactory";

export const adminRequestDraftRoute = new Hono<{ Bindings: EnvBindings }>().get(
  "/",
  async (c) => {
    try {
      requireAdminToken(c.req.raw, c.env.ADMIN_TOKEN);
      const draft = await createRequestDraftService(c.env).generate();
      return c.json(ok(draft), 200, { "Cache-Control": "private, no-store" });
    } catch (error) {
      return c.json(fail(error), statusForError(error));
    }
  }
);
