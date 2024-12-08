"use client";

import { useState } from "react";
import { type Task } from "@/app/tasks/data/task";
import { Checkbox } from "@/components/ui/checkbox";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
  data: Task;
}

export default function Task({ data }: TaskProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { setNodeRef, attributes, listeners, transition, transform } =
    useSortable({ id: data.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
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
        checked={isChecked}
        onCheckedChange={(checked) => setIsChecked(checked ? true : false)}
        onPointerDown={(e) => e.stopPropagation()}
      />
      <p>{data.title}</p>
    </div>
  );
}
