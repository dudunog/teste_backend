import { TaskRepositoryInMemory } from "@contexts/task/usecases/_ports/repositories/inMemory/task-repository.inmemory";
import { ServerError } from "@shared/errors";
import { Result } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { DeleteTaskUseCase } from "../usecases/delete-task.usecase";
import { IDeleteTaskUseCase } from "../usecases/_ports/delete-task-usecase.struct";
import { DeleteTaskController } from "./delete-task.controller";
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
  params: {
    id: "any_id",
  },
});

type SutType = {
  deleteTaskUseCase: IDeleteTaskUseCase;
  validator: IValidation;
  sut: DeleteTaskController;
};

const makeDeleteTaskUseCaseReturn = () => ({
  id: "",
  title: "",
  description: "",
  completed: true,
  listId: "",
});

const makeSut = (): SutType => {
  const taskRepository = new TaskRepositoryInMemory();
  const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  const validator = makeValidatorStub();
  const sut = new DeleteTaskController(deleteTaskUseCase);

  return {
    sut,
    validator,
    deleteTaskUseCase,
  };
};

describe("DeleteTaskController", () => {
  it("should call deleteTaskUseCase", async () => {
    const { sut, deleteTaskUseCase } = makeSut();

    const spy = vi.spyOn(deleteTaskUseCase, "execute");
    spy.mockReturnValue(
      new Promise((resolve) => {
        resolve(Result.ok(makeDeleteTaskUseCaseReturn()));
      })
    );
    await sut.handle(makeFakeRequest());

    expect(spy).toHaveBeenCalled();
  });

  it("should return server error if an unexpected error occurs", async () => {
    const { sut, deleteTaskUseCase } = makeSut();

    const spy = vi.spyOn(deleteTaskUseCase, "execute");
    spy.mockImplementation(() => {
      throw new Error();
    });

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  it("should return bad request if use case returns an error", async () => {
    const { sut, deleteTaskUseCase } = makeSut();

    const spy = vi.spyOn(deleteTaskUseCase, "execute");
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
    const { sut, deleteTaskUseCase } = makeSut();

    const spy = vi.spyOn(deleteTaskUseCase, "execute");
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
