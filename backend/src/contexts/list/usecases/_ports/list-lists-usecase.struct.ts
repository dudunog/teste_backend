import { ListModel } from "@contexts/list/domain/models/list-model.struct";
import { UseCase } from "@shared/protocols";
import { CreationModel } from "@shared/protocols/creation-model";

export interface IListListsUseCaseDTO {}

export type IListListsUseCase = UseCase<
  IListListsUseCaseDTO,
  CreationModel<ListModel[]>
>;
