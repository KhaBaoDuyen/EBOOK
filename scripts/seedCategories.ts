import db from "../app/utils/db.server";
import Category from "../app/models/category.server";
import { readFileSync } from "fs";
import path from "path";

async function main() {
  const file = path.resolve("scripts/categories.json");
  const rawCategories = JSON.parse(readFileSync(file, "utf-8"));

  await db;
  await Category.deleteMany({}); // clear cũ

   for (const cat of rawCategories) {
     const parent = await Category.create({
      name: cat.name,
      slug: cat.slug,
    });

     if (Array.isArray(cat.subCategories)) {
      for (const sub of cat.subCategories) {
        await Category.create({
          name: sub.name,
          slug: sub.slug,
          parentId: parent._id,
        });
      }
    }
  }

  console.log(" Categories seeded thành công!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
