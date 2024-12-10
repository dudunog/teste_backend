"use client";

import { type List } from "@/app/tasks/data/list";
import ListComponent from "./list";
import useListsSearch from "@/app/tasks/hooks/use-lists-search";
import { motion } from "motion/react";

interface ListsListProps {
  lists: List[];
}

export default function ListsList({ lists }: ListsListProps) {
  const { newListId } = useListsSearch();

  return (
    <div className="p-3 flex flex-col gap-1">
      {lists.map((list) => (
        <div key={list.id}>
          {list.id === newListId ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ListComponent data={list} />
            </motion.div>
          ) : (
            <ListComponent data={list} />
          )}
        </div>
      ))}
    </div>
  );
}
