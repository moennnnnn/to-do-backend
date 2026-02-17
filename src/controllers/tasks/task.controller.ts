import { Request, Response, NextFunction } from "express";
import {
  createTaskS,
  findTasksS,
  updateTaskS,
  deleteTaskS,
} from "@/services/tasks/task.service";

export const createTaskC = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const task = await createTaskS({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};
