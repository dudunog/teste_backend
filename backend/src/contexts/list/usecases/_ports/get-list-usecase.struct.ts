import { ListModel } from "@contexts/list/domain/models/list-model.struct";
import { UseCase } from "@shared/protocols/usecase";

export interface IGetListUseCaseRequest {
  id: string;
}

export type IGetListUseCase = UseCase<IGetListUseCaseRequest, ListModel>;
