import { TaskRepositoryInMemory } from "@contexts/task/usecases/_ports/repositories/inMemory/task-repository.inmemory";
import { ITaskRepository } from "@contexts/task/usecases/_ports/repositories/task-repository.struct";
import { makeFakeTask } from "@shared/utils/tests/make-fake-task";
import { CreateTaskUseCase } from "./create-task.usecase";
import { ICreateTaskUseCase } from "./_ports/create-task-usecase.struct";
import { describe, expect, it, vi } from "vitest";

const makeFakePayload = () => ({
  title: "any_title",
  listId: "any_list_id",
});

type SutType = {
  taskRepository: ITaskRepository;
  sut: ICreateTaskUseCase;
};

const makeSut = (): SutType => {
  const taskRepository = new TaskRepositoryInMemory();

  const sut = new CreateTaskUseCase(taskRepository);

  return {
    sut,
    taskRepository,
  };
};

describe("CreateTaskUseCase", () => {
  it("should create the task", async () => {
    const { sut, taskRepository } = makeSut();

    const spy = vi.spyOn(taskRepository, "create");

    await sut.execute(makeFakePayload());

    expect(spy).toHaveBeenCalled();
  });

  it("should return the task if success", async () => {
    const { sut, taskRepository } = makeSut();

    const fakeTask = makeFakeTask(true);

    const spy = vi.spyOn(taskRepository, "create");
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
