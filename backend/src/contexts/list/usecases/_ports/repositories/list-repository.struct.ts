import { ListModel } from "@contexts/list/domain/models/list-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";

export interface IListRepository {
  create(data: CreationModel<ListModel>): Promise<ListModel>;
  update(data: ListModel): Promise<ListModel>;
  delete(data: ListModel): Promise<void>;
}
