"use client";

import { Button } from "@/components/ui/button";
import { useAdminContext } from "@/app/tasks/contexts/admin-contexts";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import ListsList from "./lists-list";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export default function AppHeader() {
  const { isSidebarCollapsed } = useAdminContext();

  return (
    <header
      className={cn(isSidebarCollapsed ? "md:left-[100px]" : "md:left-[320px]")}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu1</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-3">
          <div className="mt-4">
            <ListsList
              lists={[
                {
                  id: "1",
                  title: "Home",
                  slug: "home",
                  tasksCount: 8,
                  tasks: [],
                },
                {
                  id: "2",
                  title: "Completed",
                  slug: "completed",
                  tasksCount: 16,
                  tasks: [],
                },
                {
                  id: "3",
                  title: "Personal",
                  slug: "personal",
                  tasksCount: 4,
                  tasks: [],
                },
                {
                  id: "4",
                  title: "Work",
                  slug: "work",
                  tasksCount: 6,
                  tasks: [],
                },
                {
                  id: "5",
                  title: "Diet",
                  slug: "diet",
                  tasksCount: 3,
                  tasks: [],
                },
                {
                  id: "6",
                  title: "List of Book",
                  slug: "list-of-book",
                  tasksCount: 8,
                  tasks: [],
                },
                {
                  id: "7",
                  title: "Road trip list",
                  slug: "road trip list",
                  tasksCount: 6,
                  tasks: [],
                },
              ]}
            />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
