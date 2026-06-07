import type { ModerationEvent } from "@/worker/domain/moderation.entity";
import type { ModerationRepository } from "@/worker/repositories/moderation.repository";

export class D1ModerationRepository implements ModerationRepository {
  constructor(private readonly db: D1Database) {}

  async createEvent(event: ModerationEvent): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO moderation_events (id, report_id, created_at, action, notes)
         VALUES (?, ?, ?, ?, ?)`
      )
      .bind(event.id, event.reportId, event.createdAt, event.action, event.notes)
      .run();
  }
}
