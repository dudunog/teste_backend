"use client";

import { useCallback, useEffect, useState } from "react";
import { type Task } from "@/app/tasks/data/task";
import TaskComponent from "@/app/tasks/components/task";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import useTasksSearch from "@/app/tasks/hooks/use-tasks-search";
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

  const handleCheckedChange = useCallback(
    (checked: boolean) => {
      if (checked) {
        setTasksState(tasks.filter((task) => task.completed));
      } else {
        setTasksState(tasks);
      }
    },
    [tasks]
  );

  useEffect(() => {
    setTasksState(tasks);
  }, [tasks]);

  return (
    <>
      <div className="mt-6 flex items-center w-72 justify-end space-x-2">
        <Switch onCheckedChange={handleCheckedChange}>Completed</Switch>
        <Label>Finalizadas</Label>
      </div>
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
            <ScrollArea className="mt-2 h-[500px] bg-white rounded-2xl">
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
                      <TaskComponent key={task.id} data={task} />
                    )}
                  </>
                ))}
              </div>
            </ScrollArea>
          </AnimatePresence>
        </SortableContext>
      </DndContext>
    </>
  );
}
