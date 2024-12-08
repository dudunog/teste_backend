import { adaptRoute } from "@main/adapters/express-adapter";
import { RequestHandler, Router } from "express";
import { makeCreateListFactory } from "@contexts/list/external/factories/create-list.factory";

export default (router: Router) => {
  const controller = makeCreateListFactory();
  router.post(
    "/list/create",
    adaptRoute(controller) as unknown as RequestHandler
  );
};
