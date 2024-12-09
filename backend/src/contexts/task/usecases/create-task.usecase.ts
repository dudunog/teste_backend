import { Result } from "@shared/protocols";
import { TaskModel } from "../domain/models/task-model.struct";
import {
  ICreateTaskUseCase,
  ICreateTaskUseCaseDTO,
} from "./_ports/create-task-usecase.struct";
import { ITaskRepository } from "./_ports/repositories/task-repository.struct";

export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute({
    title,
    description,
    listId,
  }: ICreateTaskUseCaseDTO): Promise<Result<TaskModel>> {
    const task = await this.taskRepository.create({
      title,
      description,
      listId,
    });
    return Result.ok(task);
  }
}
