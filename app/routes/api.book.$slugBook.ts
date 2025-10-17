import { json } from "@remix-run/node";
import {
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { log } from "console";
import Book from "~/models/book.server";
import { bookDir, coverDir } from "~/utils/path.server";
import { toSlug } from "~/utils/toSlug";
import { uploadToCloudinary } from "~/utils/uploadCloudinary.server";


//----------------[ LAY DU LIEU ]-----------------------
export async function loader({ params }: { params: { slugBook: string } }) {
  try {
    const { slugBook } = params;
    const book = await Book.findOne({ slug: slugBook })
      .populate("authorId")
      .populate("categories")
      .lean();

    if (!book) {
      return json({ status: 404, message: "Không tìm thấy sách" }, { status: 404 });
    }

    const relateBook = await Book.find({
      authorId: book.authorId._id,
      _id: { $ne: book._id },
    })
      .populate("authorId")
      .populate("categories")
      .lean();

    return json({
      status: 200,
      data: book,
      relateBook: relateBook || [],
    });
  } catch (err: any) {
    console.error("Lỗi lấy dữ liệu sách:", err);
    return json({ status: 500, message: "Lỗi server", error: err.message }, { status: 500 });
  }
}

//----------------[ CẬP NHẬT DU LIEU ]-------------------------------
export const action = async ({
  request,
  params,
}: {
  request: Request;
  params: { slugBook: string };
}) => {
  try {
    const method = request.method.toUpperCase();

    if (method === "PUT") {
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

      const slugParam = toSlug(params.slugBook);
      const oldBook = await Book.findOne({ slug: slugParam });

      if (!oldBook) {
        return json({ status: 404, message: "Không tìm thấy sách cần cập nhật!" }, { status: 404 });
      }

      if (title) {
        const existingTitle = await Book.findOne({ title });
        if (existingTitle && existingTitle._id.toString() !== oldBook._id.toString()) {
          return json({ status: 400, message: "Tên sách đã tồn tại!" }, { status: 400 });
        }
      }

      if (slug) {
        const existingSlug = await Book.findOne({ slug });
        if (existingSlug && existingSlug._id.toString() !== oldBook._id.toString()) {
          return json({ status: 400, message: "Slug đã tồn tại, vui lòng nhập slug khác!" }, { status: 400 });
        }
      }

      const updateData: any = {
        title,
        slug,
        description,
        publisher,
        authorId,
        releaseDate,
        categories,
        status,
      };

      if (coverFile && coverFile.size > 0) {
        const buffer = Buffer.from(await coverFile.arrayBuffer());
        const uploadResult: any = await uploadToCloudinary(buffer, "smartbook/bannerBook");
        updateData.cover = uploadResult.secure_url;
      } else {
        updateData.cover = oldBook.cover;
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
          filename_override: originalName.replace(/\.epub$/i, ""),
          unique_filename: false,
          format: "epub",
        });

        updateData.filePath = uploadResult.secure_url;
        updateData.mimeType = bookFile.type || "application/epub+zip";
      } else {
        updateData.filePath = oldBook.filePath;
        updateData.mimeType = oldBook.mimeType;
      }

      const updatedBook = await Book.findOneAndUpdate(
        { slug: slugParam },
        updateData,
        { new: true }
      );

      if (!updatedBook) {
        return json({ status: 404, message: "Không tìm thấy sách để cập nhật!" }, { status: 404 });
      }

      return json({
        status: 200,
        message: "Cập nhật sách thành công!",
        data: updatedBook,
      });
    }

    // ========== XÓA SÁCH ==========
    else if (method === "DELETE") {
      const slugParam = toSlug(params.slugBook);
      const deletedBook = await Book.findOneAndDelete({ slug: slugParam });

      if (!deletedBook) {
        return json({ status: 404, message: "Không tìm thấy sách cần xóa!" }, { status: 404 });
      }

      console.log("🗑️ Xóa thành công:", deletedBook);
      return json({
        status: 200,
        message: "Xóa sách thành công!",
        data: deletedBook,
      });
    }

    else {
      return json({ status: 405, message: "Phương thức không được hỗ trợ" }, { status: 405 });
    }
  } catch (err: any) {
    console.error("  Lỗi khi cập nhật sách:", err);
    return json(
      {
        status: 500,
        message: "Lỗi khi cập nhật sách",
        error: err.message,
        stack: err.stack,
      },
      { status: 500 }
    );
  }
};
