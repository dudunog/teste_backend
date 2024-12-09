import { Result } from "@shared/protocols";
import { CreationModel } from "@shared/protocols/creation-model";
import { TaskModel } from "../domain/models/task-model.struct";
import {
  IListTasksUseCase,
  IListTasksUseCaseDTO,
} from "./_ports/list-tasks-usecase.struct";
import { ITaskRepository } from "./_ports/repositories/task-repository.struct";

export class ListTasksUseCase implements IListTasksUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute({
    listId,
  }: IListTasksUseCaseDTO): Promise<Result<CreationModel<TaskModel[]>>> {
    const tasks = await this.taskRepository.list({
      where: {
        listId,
      },
      order: {
        completed: "DESC",
      },
    });

    return Result.ok(tasks);
  }
}
