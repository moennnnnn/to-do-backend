import { TaskDocumentType } from "@/types/tasks/tasks.type";
import { model, Model, Schema } from "mongoose";

const TaskSchema = new Schema<TaskDocumentType>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },

    status: {
      type: String,
      enum: ["IN_PROGRESS", "COMPLETED"],
      default: "IN_PROGRESS",
      required: true,
    },

    dueDate: { type: Date, required: true },
    dueTime: { type: String, required: true },
    completedAt: { type: Date, default: null },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
      required: true,
    },
  },
  { timestamps: true },
);

const Task: Model<TaskDocumentType> = model<
  TaskDocumentType,
  Model<TaskDocumentType>
>("tasks", TaskSchema);

export default Task;
