// scripts/seed.ts
import db from "../app/utils/db.server";
import Book from "../app/models/book.server";
import { readFileSync } from "fs";
import path from "path";

async function main() {
  // đọc JSON từ public/data/listBook.json
  const file = path.resolve("public/data/listBook.json");
  const books = JSON.parse(readFileSync(file, "utf-8"));

  await db;
  await Book.deleteMany({});
  await Book.insertMany(books);

  console.log("✅ Seeded successfully");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
