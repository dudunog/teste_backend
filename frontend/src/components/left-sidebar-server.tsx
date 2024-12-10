import { List } from "@/app/tasks/data/list";
import { api } from "@/data/api";
import LeftSideBar from "./left-sidebar";

async function getLists(): Promise<List[]> {
  const response = await api("/list/list", {
    next: {
      tags: ["lists"],
    },
  });
  return await response.json();
}

export default async function LeftSideBarServer() {
  const lists = await getLists();
  return <LeftSideBar lists={lists} />;
}
