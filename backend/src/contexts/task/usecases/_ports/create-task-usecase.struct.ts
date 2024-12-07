import { TaskModel } from "@contexts/task/domain/models/task-model.struct";
import { UseCase } from "@shared/protocols";

export interface ICreateTaskUseCaseDTO {
  title: string;
  description?: string;
}

export type ICreateTaskUseCase = UseCase<ICreateTaskUseCaseDTO, TaskModel>;
