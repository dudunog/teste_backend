"use client";

import { useNewTaskBoxContext } from "@/app/tasks/contexts/new-task-box-context";
import { Plus, X } from "lucide-react";

export default function NewTaskFloatingButton() {
  const { isOpenCreateNewTask, setIsOpenCreateNewTask } =
    useNewTaskBoxContext();

  return (
    <div
      className="fixed bottom-8 transform -translate-x-1/2 w-96 p-5 flex items-center gap-2 bg-black text-white rounded-full font-light text-sm cursor-pointer"
      onClick={() => setIsOpenCreateNewTask(!isOpenCreateNewTask)}
    >
      {isOpenCreateNewTask ? <X size={15} /> : <Plus size={15} />}
      Criar nova tarefa
    </div>
  );
}
