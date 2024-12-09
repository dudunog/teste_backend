import { TaskEntity } from "../../../task/external/entities/task-entity";

export interface ListModel {
  id: string;
  title: string;
  slug: string;
  emoji: string;
  color: string;
  tasks?: TaskEntity[];
  createdAt?: Date;
  updatedAt?: Date;
}
