import { env } from "@/env";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { title, description } = z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .parse({
        title: body.title,
        description: body.description,
      });

    const response = await fetch(`${env.API_BASE_URL}/task/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    const task = await response.json();

    return Response.json(task);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid Body", { status: 422 });
    }

    return new Response("Error creating task", {
      status: 500,
    });
  }
}
