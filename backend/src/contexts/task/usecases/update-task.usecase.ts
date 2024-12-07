import { Result } from "@shared/protocols";
import { TaskModel } from "../domain/models/task-model.struct";
import {
  IUpdateTaskUseCase,
  IUpdateTaskUseCaseDTO,
} from "./_ports/update-task-usecase.struct";
import { ITaskRepository } from "./_ports/repositories/task-repository.struct";

export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute({
    id,
    title,
    description,
    completed,
  }: IUpdateTaskUseCaseDTO): Promise<Result<TaskModel>> {
    const task = await this.taskRepository.update({
      id,
      title,
      description,
      completed,
    });

    return Result.ok(task);
  }
}
