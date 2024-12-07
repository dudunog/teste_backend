import { adaptRoute } from "@main/adapters/express-adapter";
import { RequestHandler, Router } from "express";
import { makeCreateTaskFactory } from "../factories/create-task.factory";
import { makeListTasksFactory } from "../factories/list-tasks.factory";

export default (router: Router) => {
  router.post(
    "/task/create",
    adaptRoute(makeCreateTaskFactory()) as unknown as RequestHandler
  );
  router.get(
    "/tasks",
    adaptRoute(makeListTasksFactory()) as unknown as RequestHandler
  );
};
