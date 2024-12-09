import { v4 as uuidv4 } from "uuid";

export default function createUniqueSlug(str: string) {
  const baseSlug = createSlug(str);
  const uniqueId = uuidv4();
  const uniqueSlug = `${baseSlug}-${uniqueId}`;

  return uniqueSlug;
}

function createSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}
