import { TaskModel } from "@contexts/task/domain/models/task-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";
import { ITaskListParams, ITaskRepository } from "../task-repository.struct";
import { randomUUID } from "crypto";

export class TaskRepositoryInMemory implements ITaskRepository {
  private tasks: TaskModel[] = [];

  create(data: CreationModel<TaskModel>): Promise<TaskModel> {
    const newTask = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks.push(newTask);

    return new Promise((resolve) => {
      resolve(newTask);
    });
  }

  list(params?: ITaskListParams): Promise<TaskModel[]> {
    const tasks = this.tasks.filter((task) => {
      return Object.keys(params).every((c) => task[c] === params[c]);
    });

    return new Promise((resolve) => {
      resolve(tasks);
    });
  }

  update(data: TaskModel): Promise<TaskModel> {
    const taskToUpdateIndex = this.tasks.findIndex(
      (task) => task.id === data.id
    );
    const taskToUpdate = this.tasks[taskToUpdateIndex];

    const updatedTask = { ...taskToUpdate, ...data };

    this.tasks[taskToUpdateIndex] = updatedTask;

    return new Promise((resolve) => {
      resolve(updatedTask);
    });
  }

  delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return new Promise((resolve) => resolve());
  }
}
