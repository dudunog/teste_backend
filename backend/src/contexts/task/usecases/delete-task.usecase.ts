import { Result } from "@shared/protocols";
import { TaskModel } from "@contexts/task/domain/models/task-model.struct";
import {
  IDeleteTaskUseCase,
  IDeleteTaskUseCaseDTO,
} from "./_ports/delete-task-usecase.struct";
import { ITaskRepository } from "./_ports/repositories/task-repository.struct";

export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute({ id }: IDeleteTaskUseCaseDTO): Promise<Result<TaskModel>> {
    await this.taskRepository.delete(id);

    return Result.ok();
  }
}
