import {
  createTaskC,
  deleteTaskC,
  getTasksC,
  updateTaskC,
  markCompletedC,
} from "@/controllers/tasks/task.controller";
import { Router } from "express";
import { requireAccessToken } from "@/middlewares/token.middleware";

export const taskRouter = Router();

// Protect all task routes
taskRouter.use(requireAccessToken);

taskRouter.get("/all", getTasksC);
taskRouter.post("/add", createTaskC);
taskRouter.put("/update/:id", updateTaskC);
taskRouter.patch("/status/:id", markCompletedC);
taskRouter.delete("/delete/:id", deleteTaskC);
