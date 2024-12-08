import { FindManyOptions } from "typeorm";
import { TaskModel } from "../../../domain/models/task-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";
import { TaskEntity } from "@contexts/task/external/entities/task-entity";

export interface ITaskRepository {
  create(data: CreationModel<TaskModel>): Promise<TaskModel>;
  list(options?: FindManyOptions<TaskEntity>): Promise<TaskModel[]>;
  update(data: TaskModel): Promise<TaskModel>;
  delete(id: string): Promise<void>;
}
