import Task from "@/models/tasks/task.model";
import {
  TaskDocumentType,
  TaskFilterType,
  TaskType,
} from "@/types/tasks/tasks.type";

export const findTaskS = async (
  filter: TaskFilterType,
): Promise<TaskDocumentType | null> => {
  const task = await Task.findOne(filter).exec();
  return task;
};

export const findTasksS = async (
  filter: TaskFilterType,
): Promise<TaskDocumentType[]> => {
  const tasks = await Task.find(filter).sort({ createdAt: -1 }).exec();
  return tasks;
};

export const createTaskS = async (
  data: TaskType,
): Promise<TaskDocumentType> => {
  const task = await Task.create(data);
  return task;
};

export const updateTaskS = async (
  filter: TaskFilterType,
  data: Partial<TaskType>,
): Promise<TaskDocumentType | null> => {
  const task = await Task.findOneAndUpdate(filter, data, {
    new: true,
  }).exec();
  return task;
};

export const deleteTaskS = async (
  filter: TaskFilterType,
): Promise<TaskDocumentType | null> => {
  const task = await Task.findOneAndDelete(filter).exec();
  return task;
};
