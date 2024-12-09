"use client";

import { cn } from "@/lib/utils";
import { useAdminContext } from "@/app/tasks/contexts/admin-context";
import AppHeader from "@/components/app-header";

type AdminLayoutClientProps = {
  children: React.ReactNode;
};

export default function LayoutClient({ children }: AdminLayoutClientProps) {
  const { isSidebarCollapsed } = useAdminContext();

  return (
    <div
      className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        isSidebarCollapsed ? "md:ml-[100px]" : "md:ml-[320px]"
      )}
    >
      <AppHeader />

      {children}
    </div>
  );
}
