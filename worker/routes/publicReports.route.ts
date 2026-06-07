import { Hono } from "hono";
import type { EnvBindings } from "@/types/bindings";
import { D1ReportRepository } from "@/worker/infrastructure/d1Report.repository";
import { fail, ok, statusForError } from "@/worker/lib/response";

export const publicReportsRoute = new Hono<{ Bindings: EnvBindings }>().get("/", async (c) => {
  try {
    const reports = await new D1ReportRepository(c.env.DB).listPublic();
    return c.json(ok(reports));
  } catch (error) {
    return c.json(fail(error), statusForError(error));
  }
});
