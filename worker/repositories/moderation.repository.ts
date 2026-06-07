import type { ModerationEvent } from "@/worker/domain/moderation.entity";

export interface ModerationRepository {
  createEvent(event: ModerationEvent): Promise<void>;
}
