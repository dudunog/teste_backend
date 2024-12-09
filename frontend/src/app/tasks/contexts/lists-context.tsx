"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { List } from "@/app/tasks/data/list";
import { api } from "@/data/api";

type ListsContextData = {
  lists: List[];
};

const ListsContext = createContext<ListsContextData | undefined>(undefined);

export function ListsProvider({ children }: React.PropsWithChildren) {
  const [hydrated, setHydrated] = useState(false);
  const [lists, setLists] = useState([]);

  const fetchLists = useCallback(async () => {
    const response = await api("/list/list");
    setLists(await response.json());
  }, [setLists]);

  const values = useMemo(
    () => ({
      lists,
    }),
    [lists]
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  if (!hydrated) {
    return null;
  }

  return (
    <ListsContext.Provider value={values}>{children}</ListsContext.Provider>
  );
}

export const useListsContext = () => {
  const context = useContext(ListsContext);

  if (context === undefined) {
    throw new Error("useListsContext must be used within an ListsProvider");
  }

  return context;
};
