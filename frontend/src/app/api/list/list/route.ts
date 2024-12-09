import { env } from "@/env";

export async function GET() {
  try {
    const response = await fetch(`${env.API_BASE_URL}/lists`);

    const lists = await response.json();

    return Response.json(lists);
  } catch (err) {
    console.error(err);
    return new Response("Error fetching lists", {
      status: 500,
    });
  }
}
