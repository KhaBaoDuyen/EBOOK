import {
  json,
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_composeUploadHandlers,
} from "@remix-run/node";
import path from "path";
import fs from "fs";
import Book from "~/models/book.server";
import Category from "~/models/category.server";
import Author from "~/models/author.server";

const coverDir = path.join(process.cwd(), "uploads/bannerBook");

const bookDir = path.join(process.cwd(), "uploads/books");

if (!fs.existsSync(coverDir)) fs.mkdirSync(coverDir, { recursive: true });
if (!fs.existsSync(bookDir)) fs.mkdirSync(bookDir, { recursive: true });


//----------------[ LAY DU LIEU ]-----------------------
export async function loader() {
  try {
    Category;
    Author;
    const books = await Book.find()
      .populate("categories", "name slug")
      .populate("authorId", "name");

    //  console.log("danh sach book", books);

    return json({
      status: 200,
      message: "Lấy dữ liệu thành công",
      data: books,
    });

  } catch (err: any) {
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

//----------------[ THEM DU LIEU ]-------------------------------
export const action = async ({ request }: { request: Request }) => {
  try {
    const uploadHandler = unstable_composeUploadHandlers(
      unstable_createFileUploadHandler({
        directory: (file) =>
          file.name?.endsWith(".pdf") || file.name?.endsWith(".epub")
            ? bookDir
            : coverDir,
        file: ({ filename }) => `${Date.now()}-${filename}`,
        maxPartSize: 10_000_000,
      }),
      unstable_createMemoryUploadHandler()
    );

    const formData = await unstable_parseMultipartFormData(request, uploadHandler);

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const publisher = formData.get("publisher") as string;
    const authorId = formData.get("authorId") as string;
    const releaseDate = formData.get("releaseDate") as string;
    const categoriesRaw = formData.get("categories") as string;
    const status = Number(formData.get("status")) || 1;

    const categories = categoriesRaw ? JSON.parse(categoriesRaw) : [];

    const coverFile = formData.get("cover") as File;
    const bookFile = formData.get("filePath") as File;

    const newBook = new Book({
      title,
      slug,
      description,
      publisher,
      authorId,
      releaseDate,
      categories,
      status,
      cover: `${coverFile.name}`,
      filePath: `${bookFile.name}`,
      mimeType: bookFile.type,
    });

    await newBook.save();

    return json({ status: 200, message: "Thêm sách thành công!", data: newBook });
  } catch (err: any) {
    console.error(" Lỗi thêm sách:", err);
    return json({ status: 500, message: "Lỗi khi thêm sách", error: err.message }, { status: 500 });
  }
};
