import { TaskRepositoryInMemory } from "@contexts/task/usecases/_ports/repositories/inMemory/task-repository.inmemory";
import { MissingParamError, ServerError } from "@shared/errors";
import { Result } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { UpdateTaskUseCase } from "../usecases/update-task.usecase";
import { IUpdateTaskUseCase } from "../usecases/_ports/update-task-usecase.struct";
import { UpdateTaskController } from "./update-task.controller";
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
  updateTaskUseCase: IUpdateTaskUseCase;
  validator: IValidation;
  sut: UpdateTaskController;
};

const makeUpdateTaskUseCaseReturn = () => ({
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
  const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
  const validator = makeValidatorStub();
  const sut = new UpdateTaskController(updateTaskUseCase, validator);

  return {
    sut,
    validator,
    updateTaskUseCase,
  };
};

describe("UpdateTaskController", () => {
  it("should call updateTaskUseCase", async () => {
    const { sut, updateTaskUseCase } = makeSut();

    const spy = vi.spyOn(updateTaskUseCase, "execute");
    spy.mockReturnValue(
      new Promise((resolve) => {
        resolve(Result.ok(makeUpdateTaskUseCaseReturn()));
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
    const { sut, updateTaskUseCase } = makeSut();

    const spy = vi.spyOn(updateTaskUseCase, "execute");
    spy.mockImplementation(() => {
      throw new Error();
    });

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  it("should return bad request if use case returns an error", async () => {
    const { sut, updateTaskUseCase } = makeSut();

    const spy = vi.spyOn(updateTaskUseCase, "execute");
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
    const { sut, updateTaskUseCase } = makeSut();

    const spy = vi.spyOn(updateTaskUseCase, "execute");
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
