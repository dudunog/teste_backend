"use client";

import { useAdminContext } from "@/app/tasks/contexts/admin-context";
import ListsList from "@/components/lists-list";
import { List } from "@/app/tasks/data/list";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LeftSideBarProps {
  lists: List[];
}

export default function LeftSideBar({ lists }: LeftSideBarProps) {
  const { isSidebarCollapsed, toggleSidebar } = useAdminContext();

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ width: "100px" }}
        animate={{ width: isSidebarCollapsed ? "100px" : "320px" }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={cn(
            "fixed top-0 left-0 h-full bg-white hidden md:block",
            isSidebarCollapsed ? "w-[100px]" : "w-[320px]"
          )}
        >
          <div className="mt-9 flex h-full max-h-screen flex-col gap-2">
            <div className="flex items-center px-4">
              <h1 className="font-semibold text-lg">Listas</h1>
            </div>
            <div className="flex-1">
              <ScrollArea className="h-screen">
                <ListsList lists={lists} />
              </ScrollArea>
            </div>
          </div>

          <button
            onClick={toggleSidebar}
            className="absolute top-[50px] right-[-14px] transform -translate-y-1/2 bg-muted text-muted-foreground rounded-full px-0.5 py-0.5 shadow-lg"
          >
            {isSidebarCollapsed ? (
              <ChevronRight size={22} />
            ) : (
              <ChevronLeft size={22} />
            )}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
