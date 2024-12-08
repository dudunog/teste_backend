import { adaptRoute } from "@main/adapters/express-adapter";
import { RequestHandler, Router } from "express";
import { makeCreateListFactory } from "@contexts/list/external/factories/create-list.factory";
import { makeListListsFactory } from "@contexts/list/external/factories/list-lists.factory";

export default (router: Router) => {
  router.post(
    "/list/create",
    adaptRoute(makeCreateListFactory()) as unknown as RequestHandler
  );
  router.get(
    "/lists",
    adaptRoute(makeListListsFactory()) as unknown as RequestHandler
  );
};
