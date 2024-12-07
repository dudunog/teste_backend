import { adaptRoute } from "@main/adapters/express-adapter";
import { RequestHandler, Router } from "express";
import { makeCreateTaskFactory } from "@contexts/task/external/factories/create-task.factory";
import { makeUpdateTaskFactory } from "@contexts/task/external/factories/update-task.factory";
import { makeDeleteTaskFactory } from "@contexts/task/external/factories/delete-task.factory";
import { makeListTasksFactory } from "@contexts/task/external/factories/list-tasks.factory";

export default (router: Router) => {
  router.post(
    "/task/create",
    adaptRoute(makeCreateTaskFactory()) as unknown as RequestHandler
  );
  router.put(
    "/task/:id/",
    adaptRoute(makeUpdateTaskFactory()) as unknown as RequestHandler
  );
  router.delete(
    "/task/:id",
    adaptRoute(makeDeleteTaskFactory()) as unknown as RequestHandler
  );
  router.get(
    "/tasks",
    adaptRoute(makeListTasksFactory()) as unknown as RequestHandler
  );
};
