
export type Priority = "low" | "medium" | "high";
export type Status = "open" | "in_progress" | "closed";
export type Tag =
  | "auth"
  | "urgent"
  | "billing"
  | "payment"
  | "feature"
  | "ui"
  | "bug"
  | "frontend";
export type Ticket = {
  id: string;
  subject: string;
  status: Status;
  priority: Priority;
  assignee?: string;
  description?: string;
  tags?: Tag[];
  createdAt?: string;
  updatedAt?: string;
};
