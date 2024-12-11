import { TaskRepositoryInMemory } from "@contexts/task/usecases/_ports/repositories/inMemory/task-repository.inmemory";
import { ITaskRepository } from "@contexts/task/usecases/_ports/repositories/task-repository.struct";
import { DeleteTaskUseCase } from "./delete-task.usecase";
import { IDeleteTaskUseCase } from "./_ports/delete-task-usecase.struct";
import { describe, expect, it, vi } from "vitest";

const makeFakePayload = () => ({
  id: "any_id",
});

type SutType = {
  taskRepository: ITaskRepository;
  sut: IDeleteTaskUseCase;
};

const makeSut = (): SutType => {
  const taskRepository = new TaskRepositoryInMemory();

  const sut = new DeleteTaskUseCase(taskRepository);

  return {
    sut,
    taskRepository,
  };
};

describe("DeleteTaskUseCase", () => {
  it("should delete the task", async () => {
    const { sut, taskRepository } = makeSut();

    const spy = vi.spyOn(taskRepository, "delete");

    await sut.execute(makeFakePayload());

    expect(spy).toHaveBeenCalled();
  });

  it("should return null if success", async () => {
    const { sut, taskRepository } = makeSut();

    const spy = vi.spyOn(taskRepository, "delete");
    spy.mockReturnValueOnce(
      new Promise((resolve) => {
        resolve();
      })
    );

    const result = await sut.execute(makeFakePayload());

    expect(result.isFailure).toBe(false);
    expect(result.getValue()).toBeNull();
  });
});
