import { ListModel } from "../domain/models/list-model.struct";
import { Result } from "@shared/protocols";
import { FailedToFetchListException } from "./_ports/errors/failed-to-fetch-list.exception";
import { IListRepository } from "./_ports/repositories/list-repository.struct";
import {
  IGetListUseCase,
  IGetListUseCaseRequest,
} from "./_ports/get-list-usecase.struct";

export class GetListUseCase implements IGetListUseCase {
  constructor(private listRepository: IListRepository) {}

  async execute({ id }: IGetListUseCaseRequest): Promise<Result<ListModel>> {
    const list = await this.listRepository.findById(id);

    if (!list) {
      return Result.fail(new FailedToFetchListException());
    }

    return Result.ok(list);
  }
}
