import { TaskEntity } from "../../../task/external/entities/task-entity";

export interface ListModel {
  id: string;
  title: string;
  tasks?: TaskEntity[];
  createdAt?: Date;
  updatedAt?: Date;
}
