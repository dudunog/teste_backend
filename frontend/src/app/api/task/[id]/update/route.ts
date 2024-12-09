import { env } from "@/env";
import { z } from "zod";

type ParamsProps = {
  params: {
    id: string;
  };
};

export async function PUT(req: Request, { params }: ParamsProps) {
  const body = await req.json();
  const { id: taskIdParam } = await params;

  try {
    const { taskId, title, description, completed } = z
      .object({
        taskId: z.string(),
        title: z.string(),
        description: z.string(),
        completed: z.boolean(),
      })
      .parse({
        taskId: taskIdParam,
        title: body.title,
        description: body.description,
        completed: body.completed,
      });

    const response = await fetch(`${env.API_BASE_URL}/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        completed,
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
