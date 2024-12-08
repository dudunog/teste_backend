import { TaskModel } from "@contexts/task/domain/models/task-model.struct";
import { UseCase } from "@shared/protocols";

export interface IUpdateTaskUseCaseDTO {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  listId?: string;
}

export type IUpdateTaskUseCase = UseCase<IUpdateTaskUseCaseDTO, TaskModel>;
