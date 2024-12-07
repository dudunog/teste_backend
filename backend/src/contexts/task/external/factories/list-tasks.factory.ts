import { ListTasksController } from "@contexts/task/controllers/list-tasks.controller";
import { ListTasksUseCase } from "@contexts/task/usecases/list-tasks.usecase";
import { Controller } from "@shared/protocols";
import { TaskRepository } from "@contexts/task/external/repositories/task.repository";
import { makeListTasksValidationFactory } from "./list-tasks-validation.factory";

export const makeListTasksFactory = (): Controller => {
  const taskRepository = new TaskRepository();

  const listTasksUseCase = new ListTasksUseCase(taskRepository);
  const validation = makeListTasksValidationFactory();

  const listTasksController = new ListTasksController(
    listTasksUseCase,
    validation
  );

  return listTasksController;
};
