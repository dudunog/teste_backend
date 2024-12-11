import { makeFakeTask } from "@shared/utils/tests/make-fake-task";
import { promisify } from "@shared/utils/tests/promisify";
import { ListTasksUseCase } from "./list-tasks.usecase";
import { IListTasksUseCase } from "./_ports/list-tasks-usecase.struct";
import { TaskRepositoryInMemory } from "./_ports/repositories/inMemory/task-repository.inmemory";
import { ITaskRepository } from "./_ports/repositories/task-repository.struct";
import { describe, expect, it, vi } from "vitest";

type SutType = {
  sut: IListTasksUseCase;
  taskRepository: ITaskRepository;
};

const makeSut = (): SutType => {
  const taskRepository = new TaskRepositoryInMemory();
  const sut = new ListTasksUseCase(taskRepository);

  return {
    sut,
    taskRepository,
  };
};

describe("ListTasksUseCase", () => {
  it("should search for the tasks", async () => {
    const { sut, taskRepository } = makeSut();

    const spy = vi.spyOn(taskRepository, "list");

    await sut.execute({});

    expect(spy).toHaveBeenCalled();
  });

  it("should return an array of tasks if success", async () => {
    const { sut, taskRepository } = makeSut();

    const spy = vi.spyOn(taskRepository, "list");

    const fakeTasks = [makeFakeTask(true), makeFakeTask(true)];

    spy.mockReturnValue(promisify(fakeTasks));

    const result = await sut.execute({ listId: "any_list_idany_list_id" });

    expect(result.isFailure).toBe(false);
    expect(result.getValue()).toEqual(fakeTasks);
  });
});
