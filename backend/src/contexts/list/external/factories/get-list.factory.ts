import { Controller } from "@shared/protocols";
import { GetListUseCase } from "@contexts/list/usecases/get-list.usecase";
import { ListRepository } from "@contexts/list/external/repositories/list.repository";
import { GetListController } from "@contexts/list/controllers/get-list.controller";

export const makeGetListFactory = (): Controller => {
  const listRepository = new ListRepository();
  const getListUseCase = new GetListUseCase(listRepository);
  const getListController = new GetListController(getListUseCase);

  return getListController;
};
