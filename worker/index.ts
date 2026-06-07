import { Hono } from "hono";
import { cors } from "hono/cors";
import type { EnvBindings } from "@/types/bindings";
import { adminExportRoute } from "./routes/adminExport.route";
import { adminFilesRoute } from "./routes/adminFiles.route";
import { adminReportsRoute } from "./routes/adminReports.route";
import { healthRoute } from "./routes/health.route";
import { publicReportsRoute } from "./routes/publicReports.route";
import { reportsRoute } from "./routes/reports.route";
import { statsRoute } from "./routes/stats.route";

const app = new Hono<{ Bindings: EnvBindings }>();

app.use(
  "/api/*",
  cors({
    origin: "*",
    allowHeaders: ["Authorization", "Content-Type"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    maxAge: 86400
  })
);

app.route("/api/health", healthRoute);
app.route("/api/reports", reportsRoute);
app.route("/api/stats", statsRoute);
app.route("/api/public-reports", publicReportsRoute);
app.route("/api/admin/reports", adminReportsRoute);
app.route("/api/admin/files", adminFilesRoute);
app.route("/api/admin/export.csv", adminExportRoute);

app.notFound((c) =>
  c.json(
    {
      ok: false,
      error: {
        code: "not_found",
        message: "Ruta no encontrada."
      }
    },
    404
  )
);

export default app;
