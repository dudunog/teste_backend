import { Controller, Result } from "@shared/protocols";
import { makeFakeList } from "@shared/utils/tests/make-fake-list";
import { GetListUseCase } from "../usecases/get-list.usecase";
import { IGetListUseCase } from "../usecases/_ports/get-list-usecase.struct";
import { GetListController } from "./get-list.controller";
import { ListRepositoryInMemory } from "../usecases/_ports/repositories/inMemory/list-repository.inmemory";
import { describe, expect, it, vi } from "vitest";

const makeFakeRequest = () => ({});

type SutType = {
  sut: Controller;
  getListUseCase: IGetListUseCase;
};

const makeSut = (): SutType => {
  const listRepository = new ListRepositoryInMemory();
  const getListUseCase = new GetListUseCase(listRepository);
  const sut = new GetListController(getListUseCase);

  return {
    sut,
    getListUseCase,
  };
};

describe("GetListController", () => {
  it("should call GetListUseCase", async () => {
    const { sut, getListUseCase } = makeSut();

    const spy = vi.spyOn(getListUseCase, "execute");

    await sut.handle(makeFakeRequest());

    expect(spy).toHaveBeenCalled();
  });

  it("should return badRequest if the get list use case fails", async () => {
    const { sut, getListUseCase } = makeSut();

    const spy = vi.spyOn(getListUseCase, "execute");
    spy.mockReturnValue(
      new Promise((resolve) => {
        resolve(Result.fail(new Error()));
      })
    );

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new Error());
  });

  it("should return serverError if an unexpected error occurs", async () => {
    const { sut, getListUseCase } = makeSut();

    const spy = vi.spyOn(getListUseCase, "execute");
    spy.mockImplementation(() => {
      throw new Error();
    });

    const result = await sut.handle({});

    expect(result.statusCode).toBe(500);
  });

  it("should return ok if the success", async () => {
    const { sut, getListUseCase } = makeSut();

    const fakeList = makeFakeList(true);

    const spy = vi.spyOn(getListUseCase, "execute");
    spy.mockReturnValue(
      new Promise((resolve) => {
        resolve(Result.ok(fakeList));
      })
    );

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(fakeList);
  });
});
