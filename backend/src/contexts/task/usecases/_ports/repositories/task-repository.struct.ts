import { TaskModel } from "../../../domain/models/task-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";

export interface ITaskRepository {
  create(data: CreationModel<TaskModel>): Promise<TaskModel>;
  list(): Promise<TaskModel[]>;
  update(data: TaskModel): Promise<TaskModel>;
  delete(id: string): Promise<void>;
}
