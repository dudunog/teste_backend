import { ListModel } from "../domain/models/list-model.struct";
import { Result } from "@shared/protocols";
import { FailedToFetchListException } from "./_ports/errors/failed-to-fetch-list.exception";
import { IListRepository } from "./_ports/repositories/list-repository.struct";
import {
  IGetListBySlugUseCase,
  IGetListBySlugUseCaseRequest,
} from "./_ports/get-list-by-slug-usecase.struct";

export class GetListBySlugUseCase implements IGetListBySlugUseCase {
  constructor(private listRepository: IListRepository) {}

  async execute({
    slug,
  }: IGetListBySlugUseCaseRequest): Promise<Result<ListModel>> {
    const list = await this.listRepository.findBySlug(slug);

    if (!list) {
      return Result.fail(new FailedToFetchListException());
    }

    return Result.ok(list);
  }
}
