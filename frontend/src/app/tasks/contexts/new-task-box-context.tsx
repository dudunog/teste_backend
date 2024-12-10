"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type NewTaskBoxContextData = {
  isOpenCreateNewTask: boolean;
  setIsOpenCreateNewTask: (boolean: boolean) => void;
  isOpenCreateNewList: boolean;
  setIsOpenCreateNewList: (boolean: boolean) => void;
};

const NewTaskBoxContext = createContext<NewTaskBoxContextData | undefined>(
  undefined
);

export function NewTaskBoxProvider({ children }: React.PropsWithChildren) {
  const [hydrated, setHydrated] = useState(false);
  const [isOpenCreateNewTask, setIsOpenCreateNewTask] = useState(false);
  const [isOpenCreateNewList, setIsOpenCreateNewList] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const values = useMemo(
    () => ({
      isOpenCreateNewTask,
      setIsOpenCreateNewTask,
      isOpenCreateNewList,
      setIsOpenCreateNewList,
    }),
    [
      isOpenCreateNewTask,
      setIsOpenCreateNewTask,
      isOpenCreateNewList,
      setIsOpenCreateNewList,
    ]
  );

  if (!hydrated) {
    return null;
  }

  return (
    <NewTaskBoxContext.Provider value={values}>
      {children}
    </NewTaskBoxContext.Provider>
  );
}

export const useNewTaskBoxContext = () => {
  const context = useContext(NewTaskBoxContext);

  if (context === undefined) {
    throw new Error(
      "useNewTaskBoxContext must be used within an NewTaskBoxProvider"
    );
  }

  return context;
};
