"use client";

import { Button } from "@/components/ui/button";
import { useAdminContext } from "@/app/tasks/contexts/admin-context";
import { useListsContext } from "@/app/tasks/contexts/lists-context";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import ListsList from "./lists-list";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export default function AppHeader() {
  const { isSidebarCollapsed } = useAdminContext();
  const { lists } = useListsContext();

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
          <div className="mt-10">
            <ScrollArea className="h-screen">
              <ListsList lists={lists} />
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
