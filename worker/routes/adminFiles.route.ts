import { Hono } from "hono";
import type { EnvBindings } from "@/types/bindings";
import { requireAdminToken } from "@/worker/lib/auth";
import { fail, statusForError } from "@/worker/lib/response";
import { createFileAccessService } from "@/worker/services/serviceFactory";

const contentDispositionFor = (fileName: string) =>
  `inline; filename="${fileName.replace(/"/g, "")}"`;

export const adminFilesRoute = new Hono<{ Bindings: EnvBindings }>().get(
  "/:fileId",
  async (c) => {
    try {
      requireAdminToken(c.req.raw, c.env.ADMIN_TOKEN);
      const file = await createFileAccessService(c.env).getEvidenceFile(c.req.param("fileId"));

      return c.body(file.body, 200, {
        "Content-Type": file.mimeType,
        "Content-Length": String(file.sizeBytes),
        "Content-Disposition": contentDispositionFor(file.fileName),
        "Cache-Control": "private, no-store"
      });
    } catch (error) {
      return c.json(fail(error), statusForError(error));
    }
  }
);
