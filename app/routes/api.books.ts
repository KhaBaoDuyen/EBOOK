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
      maxPartSize: 35_000_000,
    });

    const formData = await unstable_parseMultipartFormData(request, uploadHandler);

    const title = formData.get("title")?.toString().trim() || "";
    const slug = formData.get("slug")?.toString().trim().toLowerCase() || "";
    const description = formData.get("description")?.toString().trim() || "Đang cập nhật";
    const publisher = formData.get("publisher")?.toString().trim() || "Đang cập nhật";
    const authorId = formData.get("authorId")?.toString().trim() || "";
    const releaseDateStr = formData.get("releaseDate")?.toString() || "";
    const categoriesRaw = formData.get("categories")?.toString() || "[]";
    const status = Number(formData.get("status")) || 1;

    const releaseDate = releaseDateStr ? new Date(releaseDateStr) : new Date();
    const categories = JSON.parse(categoriesRaw || "[]");

    const coverFile = formData.get("cover") as File | null;
    const bookFile = formData.get("filePath") as File | null;

    if (await Book.findOne({ title })) {
      return json({ status: 400, message: "Tên sách đã tồn tại!" }, { status: 400 });
    }

    if (await Book.findOne({ slug })) {
      return json({ status: 400, message: "Slug đã tồn tại, vui lòng nhập slug khác!" }, { status: 400 });
    }

    let coverUrl = "";
    let bookUrl = "";
    let mimeType = "";

     if (coverFile && coverFile.size > 0) {
      const buffer = Buffer.from(await coverFile.arrayBuffer());
      const uploadResult: any = await uploadToCloudinary(buffer, "smartbook/bannerBook");
      coverUrl = uploadResult.secure_url;
    }

     if (bookFile && bookFile.size > 0) {
      const buffer = Buffer.from(await bookFile.arrayBuffer());
      let originalName = bookFile.name || "book.epub";
      if (!originalName.endsWith(".epub")) {
         originalName = originalName + ".epub";
      }

      const uploadResult: any = await uploadToCloudinary(buffer, "smartbook/books", {
        resource_type: "raw",
        use_filename: true,
        filename_override: originalName,
        unique_filename: true,
      });

      bookUrl = uploadResult.secure_url;
      mimeType = bookFile.type || "application/epub+zip";
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
      cover: coverUrl || "https://res.cloudinary.com/demo/image/upload/v1/default-cover.png",
      filePath: bookUrl || "",
      mimeType,
    });

    await newBook.save();

    return json({
      status: 200,
      message: "Thêm sách thành công!",
      data: newBook,
    });
  } catch (err: any) {
    console.error("❌ Lỗi khi thêm sách:", err);
    return json(
      {
        status: 500,
        message: "Lỗi khi thêm sách",
        error: err.message,
        stack: err.stack,
      },
      { status: 500 }
    );
  }
};

