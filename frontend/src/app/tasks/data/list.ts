import { Task } from "@/app/tasks/data/task";

export interface List {
  id: string;
  title: string;
  slug: string;
  emoji: string;
  color: string;
  tasks: Task[];
  tasksCount: number;
}
