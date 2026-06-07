import { Hono } from "hono";
import type { EnvBindings } from "@/types/bindings";
import { ok } from "@/worker/lib/response";

export const healthRoute = new Hono<{ Bindings: EnvBindings }>().get("/", (c) =>
  c.json(
    ok({
      status: "ok",
      service: "evidencia-resultados-api"
    })
  )
);
