import { ListTasksController } from "@contexts/task/controllers/list-tasks.controller";
import { ListTasksUseCase } from "@contexts/task/usecases/list-tasks.usecase";
import { Controller } from "@shared/protocols";
import { TaskRepository } from "@contexts/task/external/repositories/task.repository";
import { makeListTasksValidationFactory } from "./list-tasks-validation.factory";
import { GetListBySlugUseCase } from "@contexts/list/usecases/get-list-by-slug.usecase";
import { ListRepository } from "@contexts/list/external/repositories/list.repository";

export const makeListTasksFactory = (): Controller => {
  const taskRepository = new TaskRepository();
  const listRepository = new ListRepository();

  const listTasksUseCase = new ListTasksUseCase(taskRepository);
  const getListBySlugUseCase = new GetListBySlugUseCase(listRepository);
  const validation = makeListTasksValidationFactory();

  const listTasksController = new ListTasksController(
    listTasksUseCase,
    getListBySlugUseCase,
    validation
  );

  return listTasksController;
};
