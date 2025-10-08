import { json } from "@remix-run/node";
import mongoose from "mongoose";
import Book from "~/models/book.server";
import Category from "~/models/category.server";
import type { ICategory } from "~/interfaces/category.interface";

export async function getAllChildCategories(
  parentId: string,
  visited: Set<string> = new Set()
): Promise<ICategory[]> {
  if (visited.has(parentId)) return [];
  visited.add(parentId);

  const children = (await Category.find({ parentId }).lean()) as ICategory[];
  const allChildren: ICategory[] = [...children];

  for (const child of children) {
    const subChildren = await getAllChildCategories(String(child._id), visited);
    allChildren.push(...subChildren);
  }

  return allChildren;
}

export async function loader({ request }: { request: Request }) {
  try {
    const url = new URL(request.url);
    const categorySlug = url.searchParams.get("category");

     if (!categorySlug) {
      const books = await Book.find()
        .populate("categories")
        .populate("authorId")
        .lean();
      return json({ status: 200, books });
    }

     const parentCategory = await Category.findOne({ slug: categorySlug }).lean();
    if (!parentCategory?._id) {
      return json(
        { status: 404, message: "Không tìm thấy danh mục", books: [] },
        { status: 404 }
      );
    }

    const subCategories = await getAllChildCategories(String(parentCategory._id));

     const getBooksByCategory = async (categoryId: mongoose.Types.ObjectId) => {
      return await Book.find({ categories: categoryId })
        .populate("categories")
        .populate("authorId")
        .lean();
    };

    // Nếu không có danh mục con
    if (subCategories.length === 0) {
      const books = await getBooksByCategory(
        new mongoose.Types.ObjectId(parentCategory._id)
      );
      return json({
        status: 200,
        message: "Chỉ có danh mục cha, không có danh mục con",
        parentCategory,
        subCategories: [],
        books,
      });
    }

    // Nếu có danh mục con
    const result = await Promise.all(
      subCategories.map(async (sub) => {
        if (!sub._id) return { ...sub, books: [] };  
        const books = await getBooksByCategory(
          new mongoose.Types.ObjectId(sub._id)
        );
        return { ...sub, books };
      })
    );

    const parentBooks = await getBooksByCategory(
      new mongoose.Types.ObjectId(parentCategory._id)
    );

    return json({
      status: 200,
      message: "Lấy dữ liệu danh mục cha > con > sách thành công",
      parentCategory: { ...parentCategory, books: parentBooks },
      subCategories: result,
    });
  } catch (err: any) {
    console.error("Lỗi khi lấy dữ liệu:", err);
    return json(
      {
        status: 500,
        message: "Lỗi khi lấy dữ liệu books",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
