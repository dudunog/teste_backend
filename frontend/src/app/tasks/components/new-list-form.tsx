"use client";

import { useCallback, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { CreateListDTO, useLists } from "@/app/tasks/hooks/use-lists";
import { newListFormSchema } from "@/app/tasks/data/new-list-form-schema";
import { useNewTaskBoxContext } from "@/app/tasks/contexts/new-task-box-context";
import useListsSearch from "@/app/tasks/hooks/use-lists-search";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateNewListButton from "./create-new-list-button";
import { cn } from "@/lib/utils";
import { revalidateLists } from "@/lib/actions";
import createUniqueSlug from "@/lib/create-unique-slug";
import { Smile } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
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

export default function NewListForm() {
  const { setIsOpenCreateNewList } = useNewTaskBoxContext();
  const [isPending, startTransition] = useTransition();
  const { setNewListId } = useListsSearch();
  const { createList } = useLists();
  const { slug } = useParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof newListFormSchema>>({
    resolver: zodResolver(newListFormSchema),
    defaultValues: {
      title: "",
      emoji: "",
      color: "",
    },
  });

  const createRequestBody = useCallback(
    (values: z.infer<typeof newListFormSchema>) => {
      return {
        ...values,
        slug: createUniqueSlug(values.title),
      };
    },
    []
  );

  const addListIdToQueryParams = useCallback(
    (newListId: string | undefined) => {
      router.push(`/tasks/${slug}/?nLid=${newListId}`);
    },
    [router, slug]
  );

  const handleListCreation = useCallback(
    async (body: CreateListDTO) => {
      startTransition(async () => {
        const response = await createList(body);

        addListIdToQueryParams(response?.id);
      });
    },
    [createList, addListIdToQueryParams]
  );

  const finalizeListCreation = useCallback(() => {
    setIsOpenCreateNewList(false);
    revalidateLists(`/tasks/${slug}`);

    setTimeout(() => {
      setNewListId(null);
    }, 400);
  }, [setIsOpenCreateNewList, slug, setNewListId]);

  const onSubmitList = useCallback(
    async (values: z.infer<typeof newListFormSchema>) => {
      handleListCreation(createRequestBody(values));

      finalizeListCreation();
    },
    [createRequestBody, handleListCreation, finalizeListCreation]
  );

  const onTabsValueChange = useCallback(
    (value: string) => {
      if (value === "color") {
        form.setValue("emoji", "");
      }
    },
    [form]
  );

  const handleClickEmoji = useCallback(
    (emoji: EmojiClickData) => form.setValue("emoji", emoji.emoji),
    [form]
  );

  const handleClickDefaultColor = useCallback(
    (color: string) => {
      form.setValue("color", color);
    },
    [form]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitList)} className="space-y-2">
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

        <Tabs defaultValue="emoji" onValueChange={onTabsValueChange}>
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
                  onClick={() => handleClickDefaultColor(color)}
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
                              `border-[${form.watch("color")}]`
                            )}
                            style={{
                              borderColor: form.watch("color").includes("#")
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
