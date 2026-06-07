export interface ModerationEvent {
  id: string;
  reportId: string;
  createdAt: string;
  action: string;
  notes: string | null;
}
