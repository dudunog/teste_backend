import { Task } from "@/app/tasks/data/task";
import { api } from "@/data/api";
import TasksList from "@/app/tasks/components/tasks-list";
import NewTaskFloatingButton from "@/app/tasks/components/new-task-floating-button";

async function getTasks(slug: string): Promise<Task[]> {
  const response = await api(`/task/list/${slug}`);
  return await response.json();
}

interface TasksProps {
  params: { slug: string };
}

export default async function Tasks({ params }: TasksProps) {
  const slug = (await params).slug;
  const tasks = await getTasks(slug);

  return (
    <>
      <h1 className="mt-10 text-3xl">Minhas tarefas</h1>

      <TasksList tasks={tasks} />

      <NewTaskFloatingButton />
    </>
  );
}
