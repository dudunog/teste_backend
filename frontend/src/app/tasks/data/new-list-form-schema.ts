import { z } from "zod";

export const newListFormSchema = z.object({
  title: z.string().min(1, {
    message: "O nome deve ter pelo menos 1 caractere.",
  }),
  emoji: z.string(),
  color: z
    .string()
    .min(7, {
      message: "A cor deve ter 7 caracteres.",
    })
    .max(7, {
      message: "A cor deve ter 7 caracteres.",
    }),
});
