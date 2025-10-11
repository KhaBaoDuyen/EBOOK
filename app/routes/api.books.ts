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
import { uploadToCloudinary } from "~/utils/uploadCloudinary.server";

const coverDir = path.join(process.cwd(), "public/uploads/bannerBook");

const bookDir = path.join(process.cwd(), "public/uploads/books");

if (!fs.existsSync(coverDir)) fs.mkdirSync(coverDir, { recursive: true });
if (!fs.existsSync(bookDir)) fs.mkdirSync(bookDir, { recursive: true });


//----------------[ LAY DU LIEU ]-----------------------
export async function loader() {
  try {
    Category;
    Author;
    const books = await Book.find()
      .populate("categories", "name slug")
      .populate("authorId", "name")
      .sort({ createdAt: -1 });

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
    const uploadHandler = unstable_createMemoryUploadHandler({
      maxPartSize: 15_000_000, // giới hạn 15MB
    });

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

    if (title) {
      const existingBook = await Book.findOne({ title: title });
      if (existingBook) {
        return json({ status: 400, message: "Tên sách đã tồn tại!" }, { status: 400 });
      }
    };

    if (slug) {
      const exictingSlug = await Book.findOne({ slug });
      return json({
        status: 400,
        message: "Slug đã tồn tại, vui lòng sử dụng slug khác!",
      }, { status: 400 })
    }

    // -------- Upload lên Cloudinary ----------
    let coverUrl = "";
    let bookUrl = "";
    let mimeType = "";

    if (coverFile) {
      const buffer = Buffer.from(await coverFile.arrayBuffer());
      const result: any = await uploadToCloudinary(buffer, "smartbook/bannerBook");
      coverUrl = result.secure_url;
    }

    if (bookFile) {
      const buffer = Buffer.from(await bookFile.arrayBuffer());
      const result: any = await uploadToCloudinary(buffer, "smartbook/books");
      bookUrl = result.secure_url;
      mimeType = bookFile.type;
    }

    const newBook = new Book({
      title,
      slug,
      description,
      publisher,
      authorId,
      releaseDate,
      categories,
      status,
      cover: coverUrl,
      filePath: bookUrl,
      mimeType: bookFile.type,
    });

    await newBook.save();

    return json({ status: 200, message: "Thêm sách thành công!", data: newBook });
  } catch (err: any) {
    console.error(" Lỗi thêm sách:", err);
    return json({ status: 500, message: "Lỗi khi thêm sách", error: err.message }, { status: 500 });
  }
};
