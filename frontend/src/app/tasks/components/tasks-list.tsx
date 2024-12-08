"use client";

import { useCallback, useState } from "react";
import { type Task } from "@/app/tasks/data/task";
import TaskComponent from "@/app/tasks/components/task";
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

interface TasksListProps {
  tasks: Task[];
}

export default function TasksList({ tasks }: TasksListProps) {
  const [tasksState, setTasksState] = useState(tasks);
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
        <div className="mt-4 flex flex-col bg-white p-2 px-4 gap-3 rounded-2xl">
          {tasksState.map((task) => (
            <TaskComponent key={task.id} data={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
