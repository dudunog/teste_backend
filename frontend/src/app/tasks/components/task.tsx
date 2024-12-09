"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { type Task } from "@/app/tasks/data/task";
import { Checkbox } from "@/components/ui/checkbox";
import { useTasks } from "@/app/tasks/hooks/use-tasks";
import { CheckedState } from "@radix-ui/react-checkbox";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

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

  const handleCheckedChange = useCallback(
    (checked: CheckedState) => {
      const newState = checked ? true : false;

      updateTask({
        ...data,
        completed: newState,
      });

      router.refresh();
    },
    [data, updateTask, router]
  );

  return (
    <div
      key={data.id}
      ref={setNodeRef}
      className="bg-[#F5F5F5] flex items-center gap-3 p-3 rounded-xl w-[450px]"
      style={style}
      {...attributes}
      {...listeners}
    >
      <Checkbox
        checked={data.completed}
        onCheckedChange={(checked) => handleCheckedChange(checked)}
        onPointerDown={(e) => e.stopPropagation()}
        className=" h-5 w-5"
      />
      {data.completed ? <del>{data.title}</del> : <p>{data.title}</p>}
    </div>
  );
}
