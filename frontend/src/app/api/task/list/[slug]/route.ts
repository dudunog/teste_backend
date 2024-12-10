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
    const { slug } = z
      .object({
        slug: z.string(),
      })
      .parse({
        slug: listIdParam,
      });

    const validSlug = slug !== "no-list";

    const response = await fetch(
      `${env.API_BASE_URL}/tasks${validSlug ? `?slug=${slug}` : ""}`
    );

    const tasks = await response.json();

    return Response.json(tasks);
  } catch (err) {
    console.error(err);
    return new Response("Error fetching tasks", {
      status: 500,
    });
  }
}
