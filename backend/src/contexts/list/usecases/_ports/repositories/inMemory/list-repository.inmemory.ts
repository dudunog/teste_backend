import { ListModel } from "@contexts/list/domain/models/list-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";
import { IListRepository } from "../list-repository.struct";
import { randomUUID } from "crypto";

export class ListRepositoryInMemory implements IListRepository {
  private lists: ListModel[] = [];

  create(data: CreationModel<ListModel>): Promise<ListModel> {
    const newList = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.lists.push(newList);

    return new Promise((resolve) => {
      resolve(newList);
    });
  }

  findById(id: string): Promise<ListModel> {
    const list = this.lists.find((list) => list.id === id);

    if (!list) {
      return new Promise((resolve) => {
        resolve(null);
      });
    }

    return new Promise((resolve) => resolve(list));
  }

  findBySlug(slug: string): Promise<ListModel> {
    const list = this.lists.find((list) => list.slug === slug);

    if (!list) {
      return new Promise((resolve) => {
        resolve(null);
      });
    }

    return new Promise((resolve) => resolve(list));
  }

  list(): Promise<ListModel[]> {
    return new Promise((resolve) => {
      resolve(this.lists);
    });
  }

  update(data: ListModel): Promise<ListModel> {
    const listToUpdateIndex = this.lists.findIndex(
      (list) => list.id === data.id
    );
    const listToUpdate = this.lists[listToUpdateIndex];

    const updatedList = { ...listToUpdate, ...data };

    this.lists[listToUpdateIndex] = updatedList;

    return new Promise((resolve) => {
      resolve(updatedList);
    });
  }

  delete(id: string): Promise<void> {
    this.lists = this.lists.filter((list) => list.id !== id);
    return new Promise((resolve) => resolve());
  }
}
