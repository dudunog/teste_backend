"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

type AdminContextData = {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

const AdminContext = createContext<AdminContextData | undefined>(undefined);

export function AdminProvider({ children }: React.PropsWithChildren) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStorage(
    "isSidebarCollapsed",
    false
  );

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  }, [isSidebarCollapsed, setIsSidebarCollapsed]);

  const values = useMemo(
    () => ({
      isSidebarCollapsed,
      toggleSidebar,
    }),
    [isSidebarCollapsed, toggleSidebar]
  );

  if (!hydrated) {
    return null;
  }

  return (
    <AdminContext.Provider value={values}>{children}</AdminContext.Provider>
  );
}

export const useAdminContext = () => {
  const context = useContext(AdminContext);

  if (context === undefined) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }

  return context;
};
