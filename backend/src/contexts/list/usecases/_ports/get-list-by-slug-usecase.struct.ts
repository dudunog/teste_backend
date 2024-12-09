import { ListModel } from "@contexts/list/domain/models/list-model.struct";
import { UseCase } from "@shared/protocols/usecase";

export interface IGetListBySlugUseCaseRequest {
  slug: string;
}

export type IGetListBySlugUseCase = UseCase<
  IGetListBySlugUseCaseRequest,
  ListModel
>;
