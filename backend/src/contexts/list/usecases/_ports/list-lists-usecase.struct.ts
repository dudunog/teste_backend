import { ListModel } from "@contexts/list/domain/models/list-model.struct";
import { UseCase } from "@shared/protocols";

export interface IListListsUseCaseDTO {}

export interface IListListsUseCaseResponseDTO extends ListModel {
  tasksCount: number;
}

export type IListListsUseCase = UseCase<
  IListListsUseCaseDTO,
  IListListsUseCaseResponseDTO[]
>;
