"use client";

import { useCallback, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/app/tasks/hooks/use-tasks";
import { useLists } from "@/app/tasks/hooks/use-lists";
import ListsSelect from "./lists-select";
import { newTaskFormSchema } from "@/app/tasks/data/new-task-form-schema";
import { newListFormSchema } from "@/app/tasks/data/new-list-form-schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useTasksSearch from "@/app/tasks/hooks/use-tasks-search";
import { List } from "@/app/tasks/data/list";
import { useListsContext } from "@/app/tasks/contexts/lists-context";
import { cn } from "@/lib/utils";
import createUniqueSlug from "@/lib/create-unique-slug";
import { ChevronDown, ChevronUp, Plus, Smile, X } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { motion, AnimatePresence } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const defaultColors = [
  "#3b82f6",
  "#60a5fa",
  "#06b6d4",
  "#14b8a6",
  "#22c55e",
  "#f59e0b",
  "#eab308",
  "#f97316",
  "#ef4444",
  "#d946ef",
  "#ec4899",
  "#a855f7",
  "#8b5cf6",
  "#6366f1",
  "#78716c",
  "#000000",
];

export default function NewTaskFloatingButton() {
  const [isOpenCreateNewTask, setIsOpenCreateNewTask] = useState(false);
  const [isOpenCreateNewList, setIsOpenCreateNewList] = useState(false);
  const [isOpenListSelect, setIsOpenListSelect] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { lists } = useListsContext();
  const { setNewTaskId } = useTasksSearch();
  const { createTask } = useTasks();
  const { createList } = useLists();
  const { slug } = useParams();
  const router = useRouter();

  const formSchema = isOpenCreateNewList
    ? newListFormSchema
    : newTaskFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      listId: "",
      description: "",
      emoji: "",
      color: "",
    },
  });

  const selectedList = useCallback(
    (listId: string) => lists.find((list) => list.id === listId),
    [lists]
  );

  async function onSubmitTask(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const response = await createTask(values);

      router.push(`/tasks/${slug}/?nTid=${response?.id}`);
    });

    setIsOpenCreateNewTask(false);

    setTimeout(() => {
      setNewTaskId(null);
    }, 400);
  }

  async function onSubmitList(values: z.infer<typeof formSchema>) {
    const body = {
      ...values,
      slug: createUniqueSlug(values.title),
    };

    startTransition(async () => {
      const response = await createList(body);

      router.push(`/tasks/${slug}/?nLid=${response?.id}`);
    });

    setIsOpenCreateNewList(false);
  }

  const handleClickListSelect = useCallback(() => {
    setIsOpenListSelect(!isOpenListSelect);
  }, [isOpenListSelect]);

  const handleClickList = useCallback(
    (list: List | null) => {
      form.setValue("listId", list?.id ?? "");
      form.setValue("emoji", list?.emoji ?? "");
    },
    [form]
  );

  const handleClickCreateNewList = useCallback(() => {
    setIsOpenCreateNewList(!isOpenCreateNewList);
  }, [setIsOpenCreateNewList, isOpenCreateNewList]);

  const handleClickEmoji = useCallback(
    (emoji: EmojiClickData) => {
      form.setValue("emoji", emoji.emoji);
    },
    [form]
  );

  const handleClickDefaultColor = useCallback(
    (color: string) => {
      form.setValue("color", color);
    },
    [form]
  );

  const onTabsValueChange = useCallback(
    (value: string) => {
      if (value === "color") {
        form.setValue("emoji", "");
      }
    },
    [form]
  );

  return (
    <div>
      <div>
        <AnimatePresence>
          {isOpenCreateNewTask && (
            <div className="fixed bottom-24 ">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bottom-24 left-1/2 transform -translate-x-1/2 w-96 p-2 flex flex-col gap-2 bg-white rounded-2xl font-light text-sm">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(
                        isOpenCreateNewList ? onSubmitList : onSubmitTask
                      )}
                      className="space-y-2"
                    >
                      {isOpenCreateNewList ? (
                        <>
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Nova lista"
                                    className="border-0 focus-visible:ring-0 shadow-none bg-[#F5F5F5] rounded-xl py-5"
                                    leftIcon={
                                      <div className="text-2xl">
                                        {form.watch("emoji") ? (
                                          form.watch("emoji")
                                        ) : (
                                          <div
                                            className="border w-5 h-5 rounded-md border-slate-400"
                                            style={{
                                              borderColor: form.watch("color"),
                                            }}
                                          ></div>
                                        )}
                                      </div>
                                    }
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <Tabs
                            defaultValue="emoji"
                            onValueChange={onTabsValueChange}
                          >
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="emoji" className="flex gap-2">
                                <Smile size={17} />
                                Emoji
                              </TabsTrigger>
                              <TabsTrigger value="color" className="flex gap-2">
                                <div className="border w-4 h-4 rounded-md border-slate-400"></div>
                                Color
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent value="emoji">
                              <EmojiPicker onEmojiClick={handleClickEmoji} />
                            </TabsContent>
                            <TabsContent value="color">
                              <div className="ml-3 pt-5 grid grid-cols-8 gap-3">
                                {defaultColors.map((color) => (
                                  <div
                                    key={color}
                                    className="border-2 w-5 h-5 rounded-md cursor-pointer"
                                    onClick={() =>
                                      handleClickDefaultColor(color)
                                    }
                                    style={{
                                      borderColor: color,
                                    }}
                                  />
                                ))}
                              </div>

                              <div className="flex items-center my-5">
                                <div className="flex-1 border-t border-gray-300"></div>{" "}
                                <span className="mx-4 text-center text-base text-slate-500">
                                  Custom color
                                </span>
                                <div className="flex-1 border-t border-gray-300"></div>{" "}
                              </div>

                              <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        placeholder="#F39C11"
                                        className="border-0 focus-visible:ring-0 shadow-none bg-[#F5F5F5] rounded-xl py-5"
                                        minLength={7}
                                        maxLength={7}
                                        rightIcon={
                                          <div className="text-2xl">
                                            <div
                                              className={cn(
                                                "border w-5 h-5 rounded-md",
                                                `border-[${form.watch(
                                                  "color"
                                                )}]`
                                              )}
                                              style={{
                                                borderColor: form
                                                  .watch("color")
                                                  .includes("#")
                                                  ? form.watch("color")
                                                  : `#${form.watch("color")}`,
                                              }}
                                            ></div>
                                          </div>
                                        }
                                        {...field}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </TabsContent>
                          </Tabs>
                        </>
                      ) : (
                        <>
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
                                        {form.watch("emoji") ? (
                                          form.watch("emoji")
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
                                        {form.watch("emoji") ? (
                                          form.watch("emoji")
                                        ) : (
                                          <div className="border w-5 h-5 rounded-md border-slate-400"></div>
                                        )}
                                      </div>
                                      <span>
                                        {form.getValues().listId
                                          ? selectedList(
                                              form.getValues().listId
                                            )?.title
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
                        </>
                      )}

                      <div
                        className="px-4 py-3 flex items-center gap-2 bg-[#F6F6F6] rounded-full font-light text-sm cursor-pointer"
                        onClick={handleClickCreateNewList}
                      >
                        {isOpenCreateNewList ? (
                          <X size={15} />
                        ) : (
                          <Plus size={15} />
                        )}
                        Criar nova lista
                      </div>

                      <Button
                        type="submit"
                        className="rounded-full bg-[#016AF9] w-full"
                        disabled={isPending}
                      >
                        Salvar
                      </Button>
                    </form>
                  </Form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
      <div
        className="fixed bottom-8 transform -translate-x-1/2 w-96 p-5 flex items-center gap-2 bg-black text-white rounded-full font-light text-sm cursor-pointer"
        onClick={() => setIsOpenCreateNewTask(!isOpenCreateNewTask)}
      >
        {isOpenCreateNewTask ? <X size={15} /> : <Plus size={15} />}
        Criar nova tarefa
      </div>
    </div>
  );
}
