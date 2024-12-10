"use client";

import { useCallback, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { newTaskFormSchema } from "@/app/tasks/data/new-task-form-schema";
import { useNewTaskBoxContext } from "@/app/tasks/contexts/new-task-box-context";
import { List } from "@/app/tasks/data/list";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useListsContext } from "@/app/tasks/contexts/lists-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateTaskDTO, useTasks } from "@/app/tasks/hooks/use-tasks";
import useTasksSearch from "@/app/tasks/hooks/use-tasks-search";
import ListsSelect from "./lists-select";
import CreateNewListButton from "./create-new-list-button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function NewTaskForm() {
  const [isPending, startTransition] = useTransition();
  const [isOpenListSelect, setIsOpenListSelect] = useState(false);
  const [selectedListEmoji, setSelectedListEmoji] = useState<
    string | undefined
  >(undefined);
  const { setIsOpenCreateNewTask } = useNewTaskBoxContext();
  const { lists } = useListsContext();
  const { setNewTaskId } = useTasksSearch();
  const { createTask } = useTasks();
  const { slug } = useParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof newTaskFormSchema>>({
    resolver: zodResolver(newTaskFormSchema),
    defaultValues: {
      title: "",
      listId: "",
      description: "",
    },
  });

  const createRequestBody = useCallback(
    (values: z.infer<typeof newTaskFormSchema>) => {
      return {
        ...values,
        listId: values.listId ? values.listId : null,
      };
    },
    []
  );

  const addTaskIdToQueryParams = useCallback(
    (newTaskId: string | undefined) => {
      router.push(`/tasks/${slug}/?nTid=${newTaskId}`);
    },
    [router, slug]
  );

  const handleTaskCreation = useCallback(
    async (body: CreateTaskDTO) => {
      startTransition(async () => {
        const response = await createTask(body);

        addTaskIdToQueryParams(response?.id);
      });
    },
    [createTask, addTaskIdToQueryParams]
  );

  const finalizeTaskCreation = useCallback(() => {
    setIsOpenCreateNewTask(false);

    setTimeout(() => {
      setNewTaskId(null);
    }, 400);
  }, [setIsOpenCreateNewTask, setNewTaskId]);

  const onSubmitTask = useCallback(
    async (values: z.infer<typeof newTaskFormSchema>) => {
      handleTaskCreation(createRequestBody(values));

      finalizeTaskCreation();
    },
    [createRequestBody, handleTaskCreation, finalizeTaskCreation]
  );

  const selectedList = useCallback(
    (listId: string) => lists.find((list) => list.id === listId),
    [lists]
  );

  const handleClickListSelect = useCallback(() => {
    setIsOpenListSelect(!isOpenListSelect);
  }, [isOpenListSelect]);

  const handleClickList = useCallback(
    (list: List | null) => {
      form.setValue("listId", list?.id ?? "");
      setSelectedListEmoji(list?.emoji);
    },
    [form]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitTask)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Nova tarefa"
                  className="border-0 focus-visible:ring-0 shadow-none bg-[#F5F5F5] rounded-xl py-5"
                  leftIcon={
                    <div className="text-2xl">
                      {selectedListEmoji ? (
                        selectedListEmoji
                      ) : (
                        <div className="border w-5 h-5 rounded-md border-slate-400"></div>
                      )}
                    </div>
                  }
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="listId"
          render={({}) => (
            <FormItem>
              <FormControl>
                <div
                  className="flex items-center justify-between border-0 focus-visible:ring-0 shadow-none bg-[#F5F5F5] rounded-xl px-3 py-1 cursor-pointer"
                  onClick={handleClickListSelect}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">
                      {selectedListEmoji ? (
                        selectedListEmoji
                      ) : (
                        <div className="border w-5 h-5 rounded-md border-slate-400"></div>
                      )}
                    </div>
                    <span>
                      {form.getValues().listId
                        ? selectedList(form.getValues().listId)?.title
                        : "Sem lista"}
                    </span>
                  </div>
                  {isOpenListSelect ? (
                    <ChevronUp className="text-slate-400" />
                  ) : (
                    <ChevronDown className="text-slate-400" />
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {isOpenListSelect && (
          <ListsSelect
            lists={lists}
            onClickList={handleClickList}
            selectedList={selectedList(form.watch().listId)}
          />
        )}

        <CreateNewListButton />

        <Button
          type="submit"
          className="rounded-full bg-[#016AF9] w-full"
          disabled={isPending}
        >
          Salvar
        </Button>
      </form>
    </Form>
  );
}
