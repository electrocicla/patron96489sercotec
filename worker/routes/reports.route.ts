import { Hono } from "hono";
import type { EnvBindings } from "@/types/bindings";
import { fail, ok, statusForError } from "@/worker/lib/response";
import { createReportSubmissionService } from "@/worker/services/serviceFactory";

const clientIpFrom = (request: Request) =>
  request.headers.get("CF-Connecting-IP") ??
  request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
  null;

export const reportsRoute = new Hono<{ Bindings: EnvBindings }>().post("/", async (c) => {
  try {
    const formData = await c.req.formData();
    const service = createReportSubmissionService(c.env);
    const result = await service.submit(formData, {
      ip: clientIpFrom(c.req.raw),
      userAgent: c.req.header("User-Agent") ?? null
    });

    return c.json(ok(result), 201);
  } catch (error) {
    return c.json(fail(error), statusForError(error));
  }
});
