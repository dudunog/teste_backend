"use client";

import { parseAsString, useQueryState } from "nuqs";

export default function useListsSearch() {
  const [newListId, setNewListId] = useQueryState(
    "nLid",
    parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    })
  );

  return {
    newListId,
    setNewListId,
  };
}
