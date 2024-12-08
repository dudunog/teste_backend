import { z } from "zod";

export const newTaskFormSchema = z.object({
  title: z.string().min(1, {
    message: "O nome deve ter pelo menos 1 caractere.",
  }),
  description: z.string(),
});
