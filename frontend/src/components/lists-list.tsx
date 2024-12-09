"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAdminContext } from "@/app/tasks/contexts/admin-context";
import { List } from "@/app/tasks/data/list";
import { cn } from "@/lib/utils";

interface ListsListProps {
  lists: List[];
}

export default function ListsList({ lists }: ListsListProps) {
  const { isSidebarCollapsed } = useAdminContext();
  const { slug } = useParams();

  return (
    <div className="p-3 flex flex-col gap-1">
      {lists.map((list) => (
        <Link key={list.id} href={list.slug}>
          <div
            className={cn(
              "p-2 py-3 flex items-center justify-between gap-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#F6F6F6]",
              list.slug === slug && "bg-[#F6F6F6]",
              isSidebarCollapsed && "justify-center"
            )}
          >
            <div className="flex items-center gap-2">
              <div className="text-2xl">{list.emoji}</div>
              {!isSidebarCollapsed && <p>{list.title}</p>}
            </div>
            {!isSidebarCollapsed && (
              <div
                className={cn(
                  "p-1 rounded-full",
                  list.slug === slug ? "bg-white" : "bg-[#F6F6F6]"
                )}
              >
                <p className="text-sm px-2">{list.tasksCount}</p>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
