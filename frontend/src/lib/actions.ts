"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function revalidateLists(redirectPath: string) {
  revalidateTag("lists");
  redirect(redirectPath);
}
