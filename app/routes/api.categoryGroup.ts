 import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import Category from "~/models/category.server";  

export const loader: LoaderFunction = async () => {
  try {
    const categories = await Category.find().lean();

    const map = new Map<string, any>();
    categories.forEach((cat) =>
      map.set(cat._id.toString(), { ...cat, subCategories: [] })
    );

    const roots: any[] = [];

    categories.forEach((cat) => {
      if (cat.parentId) {
        const parent = map.get(cat.parentId.toString());
        if (parent) {
          parent.subCategories.push(map.get(cat._id.toString()));
        }
      } else {
        roots.push(map.get(cat._id.toString()));
      }
    });

    return json(roots);
  } catch (error: any) {
    console.error(" Lỗi khi gom nhóm danh mục:", error);
    return json({ message: "Lỗi server", error: error.message }, { status: 500 });
  }
};
