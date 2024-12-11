import { AppDataSource } from "@main/config/database/data-source";
import {
  ITaskListParams,
  ITaskRepository,
} from "@contexts/task/usecases/_ports/repositories/task-repository.struct";
import { CreationModel } from "@shared/protocols/creation-model";
import { TaskModel } from "../../domain/models/task-model.struct";
import { TaskEntity } from "../entities/task-entity";

export class TaskRepository implements ITaskRepository {
  constructor(
    private taskCollection = AppDataSource.getRepository(TaskEntity)
  ) {}

  async create(data: CreationModel<TaskModel>): Promise<TaskModel> {
    const insertedTask = this.taskCollection.create(data);
    return await this.taskCollection.save(insertedTask);
  }

  async list({ listId }: ITaskListParams): Promise<TaskModel[]> {
    return this.taskCollection.find({
      where: {
        listId,
      },
      order: {
        completed: "DESC",
      },
    });
  }

  async update(data: TaskModel): Promise<TaskModel> {
    return await this.taskCollection.save({
      ...data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.taskCollection.delete(id);
  }
}
