import { DeleteTaskController } from "@contexts/task/controllers/delete-task.controller";
import { DeleteTaskUseCase } from "@contexts/task/usecases/delete-task.usecase";
import { Controller } from "@shared/protocols";
import { TaskRepository } from "@contexts/task/external/repositories/task.repository";

export const makeDeleteTaskFactory = (): Controller => {
  const taskRepository = new TaskRepository();

  const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

  const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);

  return deleteTaskController;
};
