import { FailedToFetchListException } from "./_ports/errors/failed-to-fetch-list.exception";
import { ListRepositoryInMemory } from "./_ports/repositories/inMemory/list-repository.inmemory";
import { IListRepository } from "./_ports/repositories/list-repository.struct";
import { IGetListBySlugUseCase } from "./_ports/get-list-by-slug-usecase.struct";
import { GetListBySlugUseCase } from "./get-list-by-slug.usecase";
import { makeFakeList } from "@shared/utils/tests/make-fake-list";
import { promisify } from "@shared/utils/tests/promisify";
import { describe, expect, it, vi } from "vitest";

interface ISutTypes {
  sut: IGetListBySlugUseCase;
  listRepository: IListRepository;
}

const makeSut = (): ISutTypes => {
  const listRepository = new ListRepositoryInMemory();
  const sut = new GetListBySlugUseCase(listRepository);

  return {
    sut,
    listRepository,
  };
};

const makeFakeGetListBySlugRequest = () => {
  return {
    slug: "any_id",
  };
};

describe("GetListUseCase", () => {
  it("should throw error if list not exists", async () => {
    const { sut, listRepository } = makeSut();

    await listRepository.findBySlug(makeFakeGetListBySlugRequest().slug);
    const result = await sut.execute(makeFakeGetListBySlugRequest());

    expect(result.error).toEqual(new FailedToFetchListException());
  });

  it("should return list if success", async () => {
    const { sut, listRepository } = makeSut();

    const fakeList = makeFakeList(true);

    const spy = vi.spyOn(listRepository, "findBySlug");
    spy.mockReturnValue(promisify(fakeList));

    const result = await sut.execute(makeFakeGetListBySlugRequest());

    expect(result.getValue()).toEqual(fakeList);
  });
});
