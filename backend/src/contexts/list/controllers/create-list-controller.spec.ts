import { ListRepositoryInMemory } from "@contexts/list/usecases/_ports/repositories/inMemory/list-repository.inmemory";
import { MissingParamError, ServerError } from "@shared/errors";
import { Result } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { CreateListUseCase } from "../usecases/create-list.usecase";
import { ICreateListUseCase } from "../usecases/_ports/create-list-usecase.struct";
import { CreateListController } from "./create-list.controller";
import { describe, expect, it, vi } from "vitest";

const makeValidatorStub = (): IValidation => {
  class ValidatorStub implements IValidation {
    validate(): Error {
      return null;
    }
  }

  return new ValidatorStub();
};

const makeFakeRequest = () => ({
  body: {
    title: "any_title",
    slug: "any_slug",
    emoji: "any_emoji",
    color: "any_color",
  },
});

type SutType = {
  createListUseCase: ICreateListUseCase;
  validator: IValidation;
  sut: CreateListController;
};

const makeCreateListUseCaseReturn = () => ({
  id: "",
  title: "",
  slug: "",
  emoji: "",
  color: "",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const makeSut = (): SutType => {
  const listRepository = new ListRepositoryInMemory();
  const createListUseCase = new CreateListUseCase(listRepository);
  const validator = makeValidatorStub();
  const sut = new CreateListController(createListUseCase, validator);

  return {
    sut,
    validator,
    createListUseCase,
  };
};

describe("CreateListController", () => {
  it("should call createListUseCase", async () => {
    const { sut, createListUseCase } = makeSut();

    const spy = vi.spyOn(createListUseCase, "execute");
    spy.mockReturnValue(
      new Promise((resolve) => {
        resolve(Result.ok(makeCreateListUseCaseReturn()));
      })
    );
    await sut.handle(makeFakeRequest());

    expect(spy).toHaveBeenCalled();
  });

  it("should return bad request if data is missing", async () => {
    const { sut, validator } = makeSut();

    const spy = vi.spyOn(validator, "validate");
    spy.mockReturnValue(new MissingParamError("any_field"));

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new MissingParamError("any_field"));
  });

  it("should return server error if an unexpected error occurs", async () => {
    const { sut, createListUseCase } = makeSut();

    const spy = vi.spyOn(createListUseCase, "execute");
    spy.mockImplementation(() => {
      throw new Error();
    });

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  it("should return bad request if use case returns an error", async () => {
    const { sut, createListUseCase } = makeSut();

    const spy = vi.spyOn(createListUseCase, "execute");
    spy.mockReturnValue(
      new Promise((resolve) => {
        resolve(Result.fail(new Error()));
      })
    );

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new Error());
  });

  it("should return ok", async () => {
    const { sut, createListUseCase } = makeSut();

    const spy = vi.spyOn(createListUseCase, "execute");
    spy.mockReturnValue(
      new Promise((resolve) => {
        resolve(
          Result.ok({
            id: "any_id",
            title: "any_title",
            slug: "any_slug",
            emoji: "any_emoji",
            color: "any_color",
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        );
      })
    );

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(200);
  });
});
