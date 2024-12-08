import { ListListsController } from "@contexts/list/controllers/list-lists.controller";
import { ListListsUseCase } from "@contexts/list/usecases/list-lists.usecase";
import { Controller } from "@shared/protocols";
import { ListRepository } from "../repositories/list.repository";
import { makeListListsValidationFactory } from "./list-lists-validation.factory";

export const makeListListsFactory = (): Controller => {
  const listRepository = new ListRepository();

  const listListsUseCase = new ListListsUseCase(listRepository);
  const validation = makeListListsValidationFactory();

  const listListsController = new ListListsController(
    listListsUseCase,
    validation
  );

  return listListsController;
};
