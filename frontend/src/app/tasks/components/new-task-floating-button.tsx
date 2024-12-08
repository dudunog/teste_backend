"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/app/tasks/hooks/use-tasks";
import { newTaskFormSchema } from "@/app/tasks/data/new-task-form-schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import useTasksSearch from "../hooks/use-tasks-search";

export default function NewTaskFoatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { setNewTaskId } = useTasksSearch();
  const { createTask } = useTasks();
  const router = useRouter();

  const form = useForm<z.infer<typeof newTaskFormSchema>>({
    resolver: zodResolver(newTaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newTaskFormSchema>) {
    startTransition(async () => {
      const response = await createTask(values);

      router.push(`/tasks?nTid=${response?.id}`);
    });

    setTimeout(() => {
      setNewTaskId(null);
    }, 400);
  }

  return (
    <div>
      <div>
        <AnimatePresence>
          {isOpen && (
            <div className="fixed bottom-24 ">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bottom-24 left-1/2 transform -translate-x-1/2 w-96 p-2 flex flex-col gap-2 bg-white rounded-2xl font-light text-sm">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Nova tarefa"
                                className="border-0 focus-visible:ring-0 shadow-none bg-[#F5F5F5] rounded-xl py-5"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

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
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-96 p-4 flex items-center gap-2 bg-black text-white rounded-full font-light text-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={15} /> : <Plus size={15} />}
        Criar nova tarefa
      </div>
    </div>
  );
}
