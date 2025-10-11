import path from "path";

 export const coverDir = path.join(process.cwd(), "public/uploads/bannerBook");

 export const bookDir = path.join(process.cwd(), "public/uploads/books");

 export function getUploadPath(type: "cover" | "book") {
  return type === "cover" ? coverDir : bookDir;
}
