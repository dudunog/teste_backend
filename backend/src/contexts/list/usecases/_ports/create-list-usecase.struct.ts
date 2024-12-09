import { ListModel } from "@contexts/list/domain/models/list-model.struct";
import { UseCase } from "@shared/protocols";

export interface ICreateListUseCaseDTO {
  title: string;
  slug: string;
  emoji: string;
  color: string;
}

export type ICreateListUseCase = UseCase<ICreateListUseCaseDTO, ListModel>;
