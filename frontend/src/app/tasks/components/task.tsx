"use client";

import { useCallback, useState } from "react";
import { type Task } from "@/app/tasks/data/task";
import { Checkbox } from "@/components/ui/checkbox";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useTasks } from "../hooks/use-tasks";
import { useRouter } from "next/navigation";

interface TaskProps {
  data: Task;
}

export default function Task({ data }: TaskProps) {
  const { setNodeRef, attributes, listeners, transition, transform } =
    useSortable({ id: data.id });
  const { updateTask } = useTasks();
  const router = useRouter();

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleCheckedChange = useCallback((checked: CheckedState) => {
    const newState = checked ? true : false;

    updateTask({
      ...data,
      completed: newState,
    });

    router.refresh();
  }, []);

  return (
    <div
      key={data.id}
      ref={setNodeRef}
      className="bg-[#F5F5F5] flex items-center gap-3 p-3 rounded-xl w-72"
      style={style}
      {...attributes}
      {...listeners}
    >
      <Checkbox
        checked={data.completed}
        onCheckedChange={(checked) => handleCheckedChange(checked)}
        onPointerDown={(e) => e.stopPropagation()}
      />
      <p>{data.completed ? <del>{data.title}</del> : <p>{data.title}</p>}</p>
    </div>
  );
}
