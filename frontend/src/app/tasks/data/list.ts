import { Task } from "@/app/tasks/data/task";

export interface List {
  id: string;
  title: string;
  slug: string;
  tasks: Task[];
  tasksCount: number;
}
