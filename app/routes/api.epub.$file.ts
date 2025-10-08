import { readFile } from "fs/promises";
import path from "path";

export const loader = async ({ params }) => {
  const { file } = params;
  const filePath = path.join(process.cwd(), "uploads/books", file);

  const data = await readFile(filePath);
  return new Response(data, {
    headers: { "Content-Type": "application/epub+zip" },
  });
};
