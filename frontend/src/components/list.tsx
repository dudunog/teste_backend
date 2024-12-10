"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAdminContext } from "@/app/tasks/contexts/admin-context";
import { type List } from "@/app/tasks/data/list";
import { cn } from "@/lib/utils";

interface ListProps {
  data: List;
}

export default function List({ data }: ListProps) {
  const { isSidebarCollapsed } = useAdminContext();
  const { slug } = useParams();

  return (
    <Link key={data.id} href={data.slug}>
      <div
        className={cn(
          "p-2 py-3 flex items-center justify-between gap-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#F6F6F6]",
          data.slug === slug && "bg-[#F6F6F6]",
          isSidebarCollapsed && "justify-center"
        )}
      >
        <div className="flex items-center gap-2">
          <div className="text-2xl">{data.emoji}</div>
          {!isSidebarCollapsed && <p>{data.title}</p>}
        </div>
        {!isSidebarCollapsed && (
          <div
            className={cn(
              "p-1 rounded-full",
              data.slug === slug ? "bg-white" : "bg-[#F6F6F6]"
            )}
          >
            <p className="text-sm px-2">{data.tasksCount}</p>
          </div>
        )}
      </div>
    </Link>
  );
}
