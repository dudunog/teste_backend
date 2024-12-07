import { adaptRoute } from "@main/adapters/express-adapter";
import { RequestHandler, Router } from "express";
import { makeCreateTaskFactory } from "../factories/create-task.factory";

export default (router: Router) => {
  const controller = makeCreateTaskFactory();
  router.post(
    "/task/create",
    adaptRoute(controller) as unknown as RequestHandler
  );
};
