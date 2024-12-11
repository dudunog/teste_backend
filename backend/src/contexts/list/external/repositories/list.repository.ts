import { AppDataSource } from "@main/config/database/data-source";
import { IListRepository } from "@contexts/list/usecases/_ports/repositories/list-repository.struct";
import { CreationModel } from "@shared/protocols/creation-model";
import { ListModel } from "../../domain/models/list-model.struct";
import { ListEntity } from "../entities/list-entity";

export class ListRepository implements IListRepository {
  constructor(
    private listCollection = AppDataSource.getRepository(ListEntity)
  ) {}

  async create(data: CreationModel<ListModel>): Promise<ListModel> {
    const insertedTask = this.listCollection.create(data);
    return await this.listCollection.save(insertedTask);
  }

  async findById(id: string): Promise<ListModel> {
    return await this.listCollection.findOne({
      where: {
        id,
      },
    });
  }

  async findBySlug(slug: string): Promise<ListModel> {
    return await this.listCollection.findOne({
      where: {
        slug,
      },
    });
  }

  async list(): Promise<ListModel[]> {
    return this.listCollection.find({
      relations: {
        tasks: true,
      },
    });
  }

  async update(data: ListModel): Promise<ListModel> {
    return await this.listCollection.save({
      ...data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.listCollection.delete(id);
  }
}
