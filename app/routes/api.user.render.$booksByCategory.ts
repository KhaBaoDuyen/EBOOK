import { json } from "@remix-run/node";
import mongoose from "mongoose";
import Book from "~/models/book.server";
import Category from "~/models/category.server";
import type { ICategory } from "~/interfaces/category.interface";

/* ===================== 🔹 HÀM 1: ĐỆ QUY LẤY TẤT CẢ DANH MỤC CON ===================== */
// -> Truyền vào ID danh mục cha, duyệt toàn bộ các cấp con (cấp 1, 2, 3...) và trả về mảng danh mục con.
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

/* =====================[ LẤY TẤT CẢ SÁCH THEO NHIỀU DANH MỤC ]===================== */
export async function getAllBooksFromCategories(categoryIds: string[]) {
  const objectIds = categoryIds.map((id) => new mongoose.Types.ObjectId(id));

  const books = await Book.find({ categories: { $in: objectIds } })
    .populate("categories")
    .populate("authorId")
    .sort({ createdAt: -1 })  
    .lean();

  return books;
}


 export async function loader({ params }: { params: { booksByCategory?: string } }) {
  try {
    const categorySlug = params.booksByCategory;

    //Tìm danh mục cha dựa trên slug
    const parentCategory = await Category.findOne({ slug: categorySlug }).lean();
    if (!parentCategory?._id) {
      return json(
        { status: 404, message: "Không tìm thấy danh mục", books: [] },
        { status: 404 }
      );
    }

    //Lấy toàn bộ danh mục con
    const subCategories = await getAllChildCategories(String(parentCategory._id));

    //lấy sách theo 1 danh mục  
    const getBooksByCategory = async (categoryId: mongoose.Types.ObjectId) => {
      return await Book.find({ categories: categoryId })
        .populate("categories")
        .populate("authorId")
        .lean();
    };

    // Nếu danh mục không có con
    if (subCategories.length === 0) {
      const books = await getBooksByCategory(new mongoose.Types.ObjectId(parentCategory._id));
      return json({
        status: 200,
        message: "Chỉ có danh mục cha, không có danh mục con",
        parentCategory,
        subCategories: [],
        books,
        allBooks: books,
      });
    }

    // Nếu có danh mục con → lấy sách từng danh mục con
    const result = await Promise.all(
      subCategories.map(async (sub) => {
        const books = await getBooksByCategory(new mongoose.Types.ObjectId(sub._id));
        return { ...sub, books };
      })
    );

    // Lấy sách của danh mục cha
    const parentBooks = await getBooksByCategory(new mongoose.Types.ObjectId(parentCategory._id));

    // cha + con để lấy toàn bộ sách
    const allCategoryIds = [String(parentCategory._id), ...subCategories.map((c) => String(c._id))];
    const allBooks = await getAllBooksFromCategories(allCategoryIds);

    // Loại bỏ trùng lặp 
    const seen = new Set();
    const uniqueBooks = allBooks.filter((book) => {
      const id = String(book._id);
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });

    return json({
      status: 200,
      message: "Lấy dữ liệu danh mục cha > con > sách thành công",
      parentCategory: { ...parentCategory, books: parentBooks },
      subCategories: result,
      allBooks: uniqueBooks,
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
