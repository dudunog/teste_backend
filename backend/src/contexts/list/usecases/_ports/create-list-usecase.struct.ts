import { ListModel } from "@contexts/list/domain/models/list-model.struct";
import { UseCase } from "@shared/protocols";

export interface ICreateListUseCaseDTO {
  title: string;
}

export type ICreateListUseCase = UseCase<ICreateListUseCaseDTO, ListModel>;
