import { ServerError } from "@shared/errors";
import { Result } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { makeFakeList } from "@shared/utils/tests/make-fake-list";
import { promisify } from "@shared/utils/tests/promisify";
import { ListListsUseCase } from "../usecases/list-lists.usecase";
import { IListListsUseCase } from "../usecases/_ports/list-lists-usecase.struct";
import { ListRepositoryInMemory } from "@contexts/list/usecases/_ports/repositories/inMemory/list-repository.inmemory";
import { ListListsController } from "./list-lists.controller";
import { describe, expect, it, vi } from "vitest";

const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate() {
      return null;
    }
  }

  return new ValidationStub();
};

const makeFakeRequest = () => ({
  query: {},
});

type SutType = {
  sut: ListListsController;
  listListsUseCase: IListListsUseCase;
  validation: IValidation;
};

const makeSut = (): SutType => {
  const listRepository = new ListRepositoryInMemory();

  const listListsUseCase = new ListListsUseCase(listRepository);
  const validation = makeValidationStub();

  const sut = new ListListsController(listListsUseCase, validation);

  return {
    sut,
    listListsUseCase,
    validation,
  };
};

describe("ListListsController", () => {
  it("should call validation", async () => {
    const { sut, validation } = makeSut();

    const spy = vi.spyOn(validation, "validate");

    await sut.handle(makeFakeRequest());

    expect(spy).toHaveBeenCalled();
  });

  it("should return bad request if validation returns an error", async () => {
    const { sut, validation } = makeSut();

    const spy = vi.spyOn(validation, "validate");
    spy.mockReturnValue(new Error());

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new Error());
  });

  it("should call list lists use case", async () => {
    const { sut, listListsUseCase } = makeSut();

    const spy = vi.spyOn(listListsUseCase, "execute");

    await sut.handle(makeFakeRequest());

    expect(spy).toHaveBeenCalled();
  });

  it("should return bad request if the list lists use case returns an error", async () => {
    const { sut, listListsUseCase } = makeSut();

    const spy = vi.spyOn(listListsUseCase, "execute");
    spy.mockReturnValue(promisify(Result.fail(new Error())));

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new Error());
  });

  it("should return server error if an unexpected error occurs", async () => {
    const { sut, listListsUseCase } = makeSut();

    const spy = vi.spyOn(listListsUseCase, "execute");
    spy.mockImplementation(() => {
      throw new Error();
    });

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  it("should return ok if success", async () => {
    const { sut, listListsUseCase } = makeSut();

    const fakeList = {
      ...makeFakeList(true),
      tasksCount: 0,
    };

    const spy = vi.spyOn(listListsUseCase, "execute");
    spy.mockReturnValue(promisify(Result.ok([fakeList])));

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual([fakeList]);
  });
});
