import { UpdateTaskController } from "@contexts/task/controllers/update-task.controller";
import { UpdateTaskUseCase } from "@contexts/task/usecases/update-task.usecase";
import { Controller } from "@shared/protocols";
import { TaskRepository } from "@contexts/task/external/repositories/task.repository";
import { makeUpdateTaskValidationFactory } from "./update-task-validation.factory";

export const makeUpdateTaskFactory = (): Controller => {
  const taskRepository = new TaskRepository();

  const updateTaskseCase = new UpdateTaskUseCase(taskRepository);
  const validation = makeUpdateTaskValidationFactory();

  const updateTaskController = new UpdateTaskController(
    updateTaskseCase,
    validation
  );

  return updateTaskController;
};
