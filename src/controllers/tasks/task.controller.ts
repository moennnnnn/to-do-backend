import { Request, Response, NextFunction } from "express";
import {
  createTaskS,
  findTasksS,
  updateTaskS,
  deleteTaskS,
} from "@/services/tasks/task.service";
import { AuthedRequest } from "@/middlewares/token.middleware";

export const createTaskC = async (req: AuthedRequest, res: Response) => {
  const { _id, title, description, dueDate, dueTime, createdAt, completedAt } =
    req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = await createTaskS({
    _id,
    title: String(title).trim(),
    description: description?.trim(),
    dueDate,
    dueTime,
    status: "IN_PROGRESS",
    createdAt,
    completedAt,
    userId: req.account!._id,
  });

  res.status(201).json({
    message: "Task created successfully",
    data: newTask,
  });
};

export const getTasksC = async (req: AuthedRequest, res: Response) => {
  const tasks = await findTasksS({
    userId: req.account!._id,
  });

  res.status(200).json({
    data: tasks,
  });
};

export const updateTaskC = async (
  req: AuthedRequest & { params: { id: string } },
  res: Response,
) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Task ID is required" });
  }

  const updated = await updateTaskS(
    { _id: id, userId: req.account!._id },
    req.body,
  );

  if (!updated) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({
    message: "Task updated sucessfully",
    data: updated,
  });
};

export const markCompletedC = async (
  req: AuthedRequest & { params: { id: string } },
  res: Response,
) => {
  const { id } = req.params;

  const updated = await updateTaskS(
    { _id: id, userId: req.account!._id },
    {
      status: "COMPLETED",
      completedAt: new Date(),
    },
  );

  if (!updated) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({
    message: "Task marked as completed",
    data: updated,
  });
};

export const deleteTaskC = async (
  req: AuthedRequest & { params: { id: string } },
  res: Response,
) => {
  const { id } = req.params;

  const deleted = await deleteTaskS({
    _id: id,
    userId: req.account!._id,
  });

  if (!deleted) {
    return res.status(404).json({ message: "Task not fount" });
  }

  res.status(200).json({
    message: "Task deleted successfully",
  });
};
