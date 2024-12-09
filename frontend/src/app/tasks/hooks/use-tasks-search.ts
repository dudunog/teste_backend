import { parseAsString, useQueryState } from "nuqs";

export default function useTasksSearch() {
  const [newTaskId, setNewTaskId] = useQueryState(
    "nTid",
    parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    })
  );

  return {
    newTaskId,
    setNewTaskId,
  };
}
