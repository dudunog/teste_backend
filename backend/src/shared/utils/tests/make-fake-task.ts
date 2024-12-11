import { TaskModel } from "@contexts/task/domain/models/task-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";
import { randomUUID } from "crypto";

export function makeFakeTask(complete: true): TaskModel;
export function makeFakeTask(complete: false): CreationModel<TaskModel>;
export function makeFakeTask(): CreationModel<TaskModel>;
export function makeFakeTask(complete = false): TaskModel {
  return {
    ...(complete && {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    listId: "any_list_id",
    title: "any_title",
    description: "any_description",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
