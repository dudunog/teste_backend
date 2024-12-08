export interface TaskModel {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  listId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
