import { ListModel } from "@contexts/list/domain/models/list-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";

export interface IListRepository {
  create(data: CreationModel<ListModel>): Promise<ListModel>;
  findById(id: string): Promise<ListModel>;
  findBySlug(slug: string): Promise<ListModel>;
  list(): Promise<ListModel[]>;
  update(data: ListModel): Promise<ListModel>;
  delete(data: ListModel): Promise<void>;
}
