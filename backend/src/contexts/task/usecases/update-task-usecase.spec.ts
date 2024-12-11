import { TaskRepositoryInMemory } from "@contexts/task/usecases/_ports/repositories/inMemory/task-repository.inmemory";
import { ITaskRepository } from "@contexts/task/usecases/_ports/repositories/task-repository.struct";
import { makeFakeTask } from "@shared/utils/tests/make-fake-task";
import { UpdateTaskUseCase } from "./update-task.usecase";
import { IUpdateTaskUseCase } from "./_ports/update-task-usecase.struct";
import { describe, expect, it, vi } from "vitest";

const makeFakePayload = () => ({
  id: "any_id",
  title: "any_title",
  description: "any_description",
  completed: true,
  listId: "any_list_id",
});

type SutType = {
  taskRepository: ITaskRepository;
  sut: IUpdateTaskUseCase;
};

const makeSut = (): SutType => {
  const taskRepository = new TaskRepositoryInMemory();

  const sut = new UpdateTaskUseCase(taskRepository);

  return {
    sut,
    taskRepository,
  };
};

describe("UpdateTaskUseCase", () => {
  it("should update the task", async () => {
    const { sut, taskRepository } = makeSut();

    const spy = vi.spyOn(taskRepository, "update");

    await sut.execute(makeFakePayload());

    expect(spy).toHaveBeenCalled();
  });

  it("should return the task if success", async () => {
    const { sut, taskRepository } = makeSut();

    const fakeTask = makeFakeTask(true);

    const spy = vi.spyOn(taskRepository, "update");
    spy.mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(fakeTask);
      })
    );

    const result = await sut.execute(makeFakePayload());

    expect(result.isFailure).toBe(false);
    expect(result.getValue()).toEqual({
      id: fakeTask.id,
      title: fakeTask.title,
      description: fakeTask.description,
      completed: fakeTask.completed,
      listId: fakeTask.listId,
      createdAt: fakeTask.createdAt,
      updatedAt: fakeTask.updatedAt,
    });
  });
});
