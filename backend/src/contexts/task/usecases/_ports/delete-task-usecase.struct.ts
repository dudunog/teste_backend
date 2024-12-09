import { TaskModel } from "@contexts/task/domain/models/task-model.struct";
import { UseCase } from "@shared/protocols";

export interface IDeleteTaskUseCaseDTO {
  id: string;
}

export type IDeleteTaskUseCase = UseCase<IDeleteTaskUseCaseDTO, TaskModel>;
