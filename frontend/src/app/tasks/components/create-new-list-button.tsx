"use client";

import { useCallback } from "react";
import { useNewTaskBoxContext } from "@/app/tasks/contexts/new-task-box-context";
import { Plus, X } from "lucide-react";

export default function CreateNewListButton() {
  const { isOpenCreateNewList, setIsOpenCreateNewList } =
    useNewTaskBoxContext();

  const handleClickCreateNewList = useCallback(() => {
    setIsOpenCreateNewList(!isOpenCreateNewList);
  }, [setIsOpenCreateNewList, isOpenCreateNewList]);

  return (
    <>
      <div
        className="px-4 py-3 flex items-center gap-2 bg-[#F6F6F6] rounded-full font-light text-sm cursor-pointer"
        onClick={handleClickCreateNewList}
      >
        {isOpenCreateNewList ? <X size={15} /> : <Plus size={15} />}
        Criar nova lista
      </div>
    </>
  );
}
