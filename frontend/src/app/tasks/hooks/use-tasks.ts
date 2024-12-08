"use client";

import { api } from "@/data/api";
import { Task } from "@/app/tasks/data/task";
import { useToast } from "@/hooks/use-toast";

type CreateTaskDTO = {
  title: string;
  description: string;
};

export function useTasks() {
  const { toast } = useToast();

  async function createTask(
    taskData: CreateTaskDTO
  ): Promise<Task | undefined> {
    try {
      const response = await api("/task/create", {
        method: "POST",
        body: JSON.stringify(taskData),
      });

      return await response.json();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Erro ao criar tarefa",
        duration: 3000,
      });

      console.error(error);
    }
  }

  return {
    createTask,
  };
}
