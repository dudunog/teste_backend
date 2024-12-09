import { env } from "@/env";
import { z } from "zod";

type ParamsProps = {
  params: {
    slug: string;
  };
};

export async function GET(req: Request, { params }: ParamsProps) {
  const { slug: listIdParam } = await params;

  try {
    const { listId } = z
      .object({
        listId: z.string(),
      })
      .parse({
        listId: listIdParam,
      });

    const response = await fetch(`${env.API_BASE_URL}/tasks?slug=${listId}`);

    const tasks = await response.json();

    return Response.json(tasks);
  } catch (err) {
    console.error(err);
    return new Response("Error fetching tasks", {
      status: 500,
    });
  }
}
