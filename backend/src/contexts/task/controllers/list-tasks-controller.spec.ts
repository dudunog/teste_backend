import { ServerError } from "@shared/errors";
import { Result } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { makeFakeTask } from "@shared/utils/tests/make-fake-task";
import { promisify } from "@shared/utils/tests/promisify";
import { ListTasksUseCase } from "../usecases/list-tasks.usecase";
import { GetListBySlugUseCase } from "@contexts/list/usecases/get-list-by-slug.usecase";
import { IListTasksUseCase } from "../usecases/_ports/list-tasks-usecase.struct";
import { IGetListBySlugUseCase } from "@contexts/list/usecases/_ports/get-list-by-slug-usecase.struct";
import { TaskRepositoryInMemory } from "../usecases/_ports/repositories/inMemory/task-repository.inmemory";
import { ListRepositoryInMemory } from "@contexts/list/usecases/_ports/repositories/inMemory/list-repository.inmemory";
import { ListTasksController } from "./list-tasks.controller";
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
  sut: ListTasksController;
  listTasksUseCase: IListTasksUseCase;
  getListBySlugUseCase: IGetListBySlugUseCase;
  validation: IValidation;
};

const makeSut = (): SutType => {
  const taskRepository = new TaskRepositoryInMemory();
  const listRepository = new ListRepositoryInMemory();

  const listTasksUseCase = new ListTasksUseCase(taskRepository);
  const getListBySlugUseCase = new GetListBySlugUseCase(listRepository);
  const validation = makeValidationStub();

  const sut = new ListTasksController(
    listTasksUseCase,
    getListBySlugUseCase,
    validation
  );

  return {
    sut,
    listTasksUseCase,
    getListBySlugUseCase,
    validation,
  };
};

describe("ListTasksController", () => {
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

  it("should call get list by slug use case", async () => {
    const { sut, getListBySlugUseCase } = makeSut();

    const spy = vi.spyOn(getListBySlugUseCase, "execute");

    await sut.handle(makeFakeRequest());

    expect(spy).toHaveBeenCalled();
  });

  it("should return bad request if get list by slug use case returns an error", async () => {
    const { sut, getListBySlugUseCase } = makeSut();

    const spy = vi.spyOn(getListBySlugUseCase, "execute");
    spy.mockReturnValue(promisify(Result.fail(new Error())));

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new Error());
  });

  it("should call list tasks use case", async () => {
    const { sut, getListBySlugUseCase, listTasksUseCase } = makeSut();

    const getListBySlugUseCaseSpy = vi.spyOn(getListBySlugUseCase, "execute");
    getListBySlugUseCaseSpy.mockReturnValue(promisify(Result.ok()));

    const spy = vi.spyOn(listTasksUseCase, "execute");

    await sut.handle(makeFakeRequest());

    expect(spy).toHaveBeenCalled();
  });

  it("should return bad request if the list tasks use case returns an error", async () => {
    const { sut, getListBySlugUseCase, listTasksUseCase } = makeSut();

    const getListBySlugUseCaseSpy = vi.spyOn(getListBySlugUseCase, "execute");
    getListBySlugUseCaseSpy.mockReturnValue(promisify(Result.ok()));

    const spy = vi.spyOn(listTasksUseCase, "execute");
    spy.mockReturnValue(promisify(Result.fail(new Error())));

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new Error());
  });

  it("should return server error if an unexpected error occurs", async () => {
    const { sut, getListBySlugUseCase } = makeSut();

    const spy = vi.spyOn(getListBySlugUseCase, "execute");
    spy.mockImplementation(() => {
      throw new Error();
    });

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  it("should return ok if success", async () => {
    const { sut, getListBySlugUseCase, listTasksUseCase } = makeSut();

    const fakeTask = makeFakeTask(true);

    const getListBySlugUseCaseSpy = vi.spyOn(getListBySlugUseCase, "execute");
    getListBySlugUseCaseSpy.mockReturnValue(promisify(Result.ok()));

    const spy = vi.spyOn(listTasksUseCase, "execute");
    spy.mockReturnValue(promisify(Result.ok([fakeTask])));

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual([fakeTask]);
  });
});
