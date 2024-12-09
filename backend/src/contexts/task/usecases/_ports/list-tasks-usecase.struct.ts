import { TaskModel } from "@contexts/task/domain/models/task-model.struct";
import { UseCase } from "@shared/protocols";
import { CreationModel } from "@shared/protocols/creation-model";

export interface IListTasksUseCaseDTO {
  listId?: string;
}

export type IListTasksUseCase = UseCase<
  IListTasksUseCaseDTO,
  CreationModel<TaskModel[]>
>;
