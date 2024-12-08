import { CreateListController } from "@contexts/list/controllers/create-list.controller";
import { CreateListUseCase } from "@contexts/list/usecases/create-list.usecase";
import { Controller } from "@shared/protocols";
import { ListRepository } from "../repositories/list.repository";
import { makeCreateListValidationFactory } from "./create-list-validation.factory";

export const makeCreateListFactory = (): Controller => {
  const listRepository = new ListRepository();

  const createListUseCase = new CreateListUseCase(listRepository);
  const validation = makeCreateListValidationFactory();

  const createListController = new CreateListController(
    createListUseCase,
    validation
  );
  return createListController;
};
