import { Task } from "@/app/tasks/data/task";
import { api } from "@/data/api";
import TasksList from "@/app/tasks/components/tasks-list";
import NewTaskFloatingButton from "@/app/tasks/components/new-task-floating-button";

async function getTasks(): Promise<Task[]> {
  const response = await api("/task/list");
  return await response.json();
}

export default async function Tasks() {
  const tasks = await getTasks();

  return (
    <>
      <h1 className="mt-10 text-3xl">Minhas tarefas</h1>

      <TasksList tasks={tasks} />

      <NewTaskFloatingButton />
    </>
  );
}
