import { Result } from "@shared/protocols";
import {
  IListListsUseCase,
  IListListsUseCaseResponseDTO,
} from "./_ports/list-lists-usecase.struct";
import { IListRepository } from "./_ports/repositories/list-repository.struct";

export class ListListsUseCase implements IListListsUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  async execute(): Promise<Result<IListListsUseCaseResponseDTO[]>> {
    const lists = await this.listRepository.list();

    const response = lists.map((list) => ({
      ...list,
      tasksCount: list.tasks.length,
    }));

    return Result.ok(response);
  }
}
