import { env } from "@/env";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { title, slug, emoji, color } = z
      .object({
        title: z.string(),
        slug: z.string(),
        emoji: z.string(),
        color: z.string(),
      })
      .parse({
        title: body.title,
        slug: body.slug,
        emoji: body.emoji,
        color: body.emoji,
      });

    const response = await fetch(`${env.API_BASE_URL}/list/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        slug,
        emoji,
        color,
      }),
    });

    const list = await response.json();

    return Response.json(list);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid Body", { status: 422 });
    }

    return new Response("Error creating list", {
      status: 500,
    });
  }
}
