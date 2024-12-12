import { makeFakeList } from "@shared/utils/tests/make-fake-list";
import { promisify } from "@shared/utils/tests/promisify";
import { ListListsUseCase } from "./list-lists.usecase";
import { IListListsUseCase } from "./_ports/list-lists-usecase.struct";
import { ListRepositoryInMemory } from "./_ports/repositories/inMemory/list-repository.inmemory";
import { IListRepository } from "./_ports/repositories/list-repository.struct";
import { describe, expect, it, vi } from "vitest";

type SutType = {
  sut: IListListsUseCase;
  listRepository: IListRepository;
};

const makeSut = (): SutType => {
  const listRepository = new ListRepositoryInMemory();
  const sut = new ListListsUseCase(listRepository);

  return {
    sut,
    listRepository,
  };
};

describe("ListListsUseCase", () => {
  it("should search for the lists", async () => {
    const { sut, listRepository } = makeSut();

    const spy = vi.spyOn(listRepository, "list");

    await sut.execute({});

    expect(spy).toHaveBeenCalled();
  });

  it("should return an array of lists if success", async () => {
    const { sut, listRepository } = makeSut();

    const spy = vi.spyOn(listRepository, "list");

    const fakeLists = [
      {
        ...makeFakeList(true),
        tasksCount: 0,
      },
      {
        ...makeFakeList(true),
        tasksCount: 0,
      },
    ];

    spy.mockReturnValue(promisify(fakeLists));

    const result = await sut.execute({ listId: "any_list_id" });

    expect(result.isFailure).toBe(false);
    expect(result.getValue()).toEqual(fakeLists);
  });
});
