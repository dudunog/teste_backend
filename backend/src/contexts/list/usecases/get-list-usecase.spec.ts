import { FailedToFetchListException } from "./_ports/errors/failed-to-fetch-list.exception";
import { ListRepositoryInMemory } from "./_ports/repositories/inMemory/list-repository.inmemory";
import { IListRepository } from "./_ports/repositories/list-repository.struct";
import { IGetListUseCase } from "./_ports/get-list-usecase.struct";
import { GetListUseCase } from "./get-list.usecase";
import { makeFakeList } from "@shared/utils/tests/make-fake-list";
import { promisify } from "@shared/utils/tests/promisify";
import { describe, expect, it, vi } from "vitest";

interface ISutTypes {
  sut: IGetListUseCase;
  listRepository: IListRepository;
}

const makeSut = (): ISutTypes => {
  const listRepository = new ListRepositoryInMemory();
  const sut = new GetListUseCase(listRepository);

  return {
    sut,
    listRepository,
  };
};

const makeFakeGetListRequest = () => {
  return {
    id: "any_id",
  };
};

describe("GetListUseCase", () => {
  it("should throw error if list not exists", async () => {
    const { sut, listRepository } = makeSut();

    await listRepository.findById(makeFakeGetListRequest().id);
    const result = await sut.execute(makeFakeGetListRequest());

    expect(result.error).toEqual(new FailedToFetchListException());
  });

  it("should return list if success", async () => {
    const { sut, listRepository } = makeSut();

    const fakeList = makeFakeList(true);

    const spy = vi.spyOn(listRepository, "findById");
    spy.mockReturnValue(promisify(fakeList));

    const result = await sut.execute(makeFakeGetListRequest());

    expect(result.getValue()).toEqual(fakeList);
  });
});
