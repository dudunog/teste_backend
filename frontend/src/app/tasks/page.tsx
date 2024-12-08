import { Task } from "./data/task";
import { api } from "@/data/api";
import TasksList from "./components/tasks-list";

async function getTasks(): Promise<Task[]> {
  const response = await api("/task/list");
  return await response.json();
}

export default async function Tasks() {
  const tasks = await getTasks();

  return (
    <>
      <h1 className="text-3xl">Tarefas</h1>

      <TasksList tasks={tasks} />
    </>
  );
}
