import { TaskRepositoryInMemory } from "@contexts/task/usecases/_ports/repositories/inMemory/task-repository.inmemory";
import { MissingParamError, ServerError } from "@shared/errors";
import { Result } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { CreateTaskUseCase } from "../usecases/create-task.usecase";
import { ICreateTaskUseCase } from "../usecases/_ports/create-task-usecase.struct";
import { CreateTaskController } from "./create-task.controller";
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
    listId: "any_list_id",
  },
});

type SutType = {
  createTaskUseCase: ICreateTaskUseCase;
  validator: IValidation;
  sut: CreateTaskController;
};

const makeCreateTaskUseCaseReturn = () => ({
  id: "",
  title: "",
  description: "",
  completed: true,
  listId: "",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const makeSut = (): SutType => {
  const taskRepository = new TaskRepositoryInMemory();
  const createTaskUseCase = new CreateTaskUseCase(taskRepository);
  const validator = makeValidatorStub();
  const sut = new CreateTaskController(createTaskUseCase, validator);

  return {
    sut,
    validator,
    createTaskUseCase,
  };
};

describe("CreateTaskController", () => {
  it("should call createTaskUseCase", async () => {
    const { sut, createTaskUseCase } = makeSut();

    const spy = vi.spyOn(createTaskUseCase, "execute");
    spy.mockReturnValue(
      new Promise((resolve) => {
        resolve(Result.ok(makeCreateTaskUseCaseReturn()));
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
    const { sut, createTaskUseCase } = makeSut();

    const spy = vi.spyOn(createTaskUseCase, "execute");
    spy.mockImplementation(() => {
      throw new Error();
    });

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  it("should return bad request if use case returns an error", async () => {
    const { sut, createTaskUseCase } = makeSut();

    const spy = vi.spyOn(createTaskUseCase, "execute");
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
    const { sut, createTaskUseCase } = makeSut();

    const spy = vi.spyOn(createTaskUseCase, "execute");
    spy.mockReturnValue(
      new Promise((resolve) => {
        resolve(
          Result.ok({
            id: "any_id",
            title: "any_title",
            description: "any_name",
            completed: true,
            listId: "any_list_id",
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
