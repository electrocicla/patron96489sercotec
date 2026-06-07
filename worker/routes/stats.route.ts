import { Hono } from "hono";
import type { EnvBindings } from "@/types/bindings";
import { fail, ok, statusForError } from "@/worker/lib/response";
import { createStatsService } from "@/worker/services/serviceFactory";

export const statsRoute = new Hono<{ Bindings: EnvBindings }>().get("/", async (c) => {
  try {
    const stats = await createStatsService(c.env).getPublicStats();
    return c.json(ok(stats));
  } catch (error) {
    return c.json(fail(error), statusForError(error));
  }
});
