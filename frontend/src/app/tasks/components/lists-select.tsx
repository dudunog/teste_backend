"use client";

import { List } from "@/app/tasks/data/list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ListsSelectProps {
  lists: List[];
  selectedList: List | undefined;
  onClickList: (list: List | null) => void;
}

export default function ListsSelect({
  lists,
  selectedList,
  onClickList,
}: ListsSelectProps) {
  return (
    <>
      <ScrollArea className="h-[275px]">
        <div className="flex flex-col px-1 gap-1">
          {lists.map((list) => (
            <div
              key={list.id}
              onClick={() => onClickList(list)}
              className={cn(
                "p-2 py-3 flex items-center justify-between gap-2 rounded-lg cursor-pointer transition-colors duration-300",
                selectedList?.id === list.id && "bg-[#F6F6F6]"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="text-2xl">{list.emoji}</div>
                <p>{list.title}</p>
              </div>
              <div
                className={cn(
                  "p-1 rounded-full",
                  selectedList?.id === list.id ? "bg-white" : "bg-[#F6F6F6]"
                )}
              >
                <p className="text-sm px-2">{list.tasksCount}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div
        onClick={() => onClickList(null)}
        className={cn(
          " mx-1 p-2 py-3 flex items-center justify-between gap-2 rounded-lg cursor-pointer",
          !selectedList && "bg-[#F6F6F6]"
        )}
      >
        <div className="flex items-center gap-2">
          <div className="border w-5 h-5 rounded-md border-slate-400"></div>
          <p>Sem lista</p>
        </div>
        <div
          className={cn(
            "p-1 rounded-full",
            !selectedList ? "bg-white" : "bg-[#F6F6F6]"
          )}
        >
          <p className="text-sm px-2">10</p>
        </div>
      </div>
    </>
  );
}
