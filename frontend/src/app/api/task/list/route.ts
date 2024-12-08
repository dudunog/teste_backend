import { env } from "@/env";

export async function GET() {
  try {
    const response = await fetch(`${env.API_BASE_URL}/tasks`);

    const tasks = await response.json();

    return Response.json(tasks);
  } catch (err) {
    console.error(err);
    return new Response("Error fetching tasks", {
      status: 500,
    });
  }
}
