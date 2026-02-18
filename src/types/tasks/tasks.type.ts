import { Document, Types } from "mongoose";

export type TaskStatus = "IN_PROGRESS" | "COMPLETED";

export type TaskType = {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: Date;
  dueTime: string;
  createdAt: Date;
  completedAt?: Date | null;
  userId: Types.ObjectId;
};

export type TaskFilterType = Partial<TaskType>;

export type TaskDocumentType = TaskType & Document;
