"use client";

import { api } from "@/data/api";
import { List } from "@/app/tasks/data/list";
import { useToast } from "@/hooks/use-toast";

export type CreateListDTO = {
  title: string;
  slug: string;
  emoji: string;
  color: string;
};

type UpdateListDTO = List;

export function useLists() {
  const { toast } = useToast();

  async function createList(
    listData: CreateListDTO
  ): Promise<List | undefined> {
    try {
      const response = await api("/list/create", {
        method: "POST",
        body: JSON.stringify(listData),
      });

      return await response.json();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Erro ao criar lista",
        duration: 3000,
      });

      console.error(error);
    }
  }

  async function updateList(
    listData: UpdateListDTO
  ): Promise<List | undefined> {
    try {
      const response = await api(`/list/${listData.id}/update`, {
        method: "PUT",
        body: JSON.stringify(listData),
      });

      return await response.json();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Erro ao atualizar lista",
        duration: 3000,
      });

      console.error(error);
    }
  }

  return {
    createList,
    updateList,
  };
}
