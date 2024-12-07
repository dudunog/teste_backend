import { CreateTaskController } from "@contexts/task/controllers/create-task.controller";
import { CreateTaskUseCase } from "@contexts/task/usecases/create-task.usecase";
import { Controller } from "@shared/protocols";
import { TaskRepository } from "../repositories/task.repository";
import { makeCreateTaskValidationFactory } from "./create-task-validation.factory";

export const makeCreateTaskFactory = (): Controller => {
  const taskRepository = new TaskRepository();

  const createTaskUseCase = new CreateTaskUseCase(taskRepository);
  const validation = makeCreateTaskValidationFactory();

  const createTaskController = new CreateTaskController(
    createTaskUseCase,
    validation
  );

  return createTaskController;
};
