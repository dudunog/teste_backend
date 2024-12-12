import { ListRepositoryInMemory } from "@contexts/list/usecases/_ports/repositories/inMemory/list-repository.inmemory";
import { IListRepository } from "@contexts/list/usecases/_ports/repositories/list-repository.struct";
import { makeFakeList } from "@shared/utils/tests/make-fake-list";
import { CreateListUseCase } from "./create-list.usecase";
import { ICreateListUseCase } from "./_ports/create-list-usecase.struct";
import { describe, expect, it, vi } from "vitest";

const makeFakePayload = () => ({
  title: "any_title",
  slug: "any_slug",
  emoji: "any_emoji",
  color: "any_color",
});

type SutType = {
  listRepository: IListRepository;
  sut: ICreateListUseCase;
};

const makeSut = (): SutType => {
  const listRepository = new ListRepositoryInMemory();

  const sut = new CreateListUseCase(listRepository);

  return {
    sut,
    listRepository,
  };
};

describe("CreateListUseCase", () => {
  it("should create the list", async () => {
    const { sut, listRepository } = makeSut();

    const spy = vi.spyOn(listRepository, "create");

    await sut.execute(makeFakePayload());

    expect(spy).toHaveBeenCalled();
  });

  it("should return the list if success", async () => {
    const { sut, listRepository } = makeSut();

    const fakeList = makeFakeList(true);

    const spy = vi.spyOn(listRepository, "create");
    spy.mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(fakeList);
      })
    );

    const result = await sut.execute(makeFakePayload());

    expect(result.isFailure).toBe(false);
    expect(result.getValue()).toEqual({
      id: fakeList.id,
      title: fakeList.title,
      slug: fakeList.slug,
      emoji: fakeList.emoji,
      color: fakeList.color,
      tasks: fakeList.tasks,
      createdAt: fakeList.createdAt,
      updatedAt: fakeList.updatedAt,
    });
  });
});
