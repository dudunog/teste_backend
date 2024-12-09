import { Result } from "@shared/protocols";
import { ListModel } from "../domain/models/list-model.struct";
import {
  ICreateListUseCase,
  ICreateListUseCaseDTO,
} from "./_ports/create-list-usecase.struct";
import { IListRepository } from "./_ports/repositories/list-repository.struct";

export class CreateListUseCase implements ICreateListUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  async execute({
    title,
    slug,
    emoji,
  }: ICreateListUseCaseDTO): Promise<Result<ListModel>> {
    const list = await this.listRepository.create({
      title,
      slug,
      emoji,
    });
    return Result.ok(list);
  }
}
