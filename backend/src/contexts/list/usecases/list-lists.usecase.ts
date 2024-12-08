import { Result } from "@shared/protocols";
import { CreationModel } from "@shared/protocols/creation-model";
import { ListModel } from "../domain/models/list-model.struct";
import { IListListsUseCase } from "./_ports/list-lists-usecase.struct";
import { IListRepository } from "./_ports/repositories/list-repository.struct";

export class ListListsUseCase implements IListListsUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  async execute(): Promise<Result<CreationModel<ListModel[]>>> {
    const lists = await this.listRepository.list();

    return Result.ok(lists);
  }
}
