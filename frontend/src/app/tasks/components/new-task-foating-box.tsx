"use client";

import { useNewTaskBoxContext } from "@/app/tasks/contexts/new-task-box-context";
import NewListForm from "./new-list-form";
import NewTaskForm from "./new-task-form";
import { AnimatePresence, motion } from "motion/react";

export default function NewTaskFloatingBox() {
  const { isOpenCreateNewTask, isOpenCreateNewList } = useNewTaskBoxContext();

  return (
    <AnimatePresence>
      {isOpenCreateNewTask && (
        <div className="fixed bottom-24 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bottom-24 left-1/2 transform -translate-x-1/2 w-96 p-2 flex flex-col gap-2 bg-white rounded-2xl font-light text-sm">
              {isOpenCreateNewList ? <NewListForm /> : <NewTaskForm />}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
