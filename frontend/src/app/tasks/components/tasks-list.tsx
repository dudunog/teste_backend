"use client";

import { useCallback, useEffect, useState } from "react";
import { type Task } from "@/app/tasks/data/task";
import TaskComponent from "@/app/tasks/components/task";
import useTasksSearch from "../hooks/use-tasks-search";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion, AnimatePresence } from "motion/react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TasksListProps {
  tasks: Task[];
}

export default function TasksList({ tasks }: TasksListProps) {
  const [tasksState, setTasksState] = useState(tasks);
  const { newTaskId } = useTasksSearch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskIndex = useCallback(
    (id: string) => tasks.findIndex((task) => task.id === id),
    [tasks]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id === over?.id) return;

      const originalIndex = getTaskIndex(String(active.id));
      const newIndex = getTaskIndex(String(over?.id));

      setTasksState((tasks) => arrayMove(tasks, originalIndex, newIndex));
    },
    [getTaskIndex, setTasksState]
  );

  useEffect(() => {
    setTasksState(tasks);
  }, [tasks]);

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext
        items={tasksState}
        strategy={verticalListSortingStrategy}
      >
        <AnimatePresence>
          <ScrollArea className="mt-4 h-[500px] bg-white rounded-2xl">
            <div className="flex flex-col gap-3 px-3 py-3">
              {tasksState.map((task) => (
                <>
                  {task.id === newTaskId ? (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TaskComponent data={task} />
                    </motion.div>
                  ) : (
                    <TaskComponent data={task} />
                  )}
                </>
              ))}
            </div>
          </ScrollArea>
        </AnimatePresence>
      </SortableContext>
    </DndContext>
  );
}
