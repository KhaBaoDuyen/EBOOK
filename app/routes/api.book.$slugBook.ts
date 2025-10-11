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

    return json({ status: 200, data: book });
  } catch (err: any) {
    console.error("Lỗi lấy dữ liệu sách:", err);
    return json({ status: 500, message: "Lỗi server", error: err.message }, { status: 500 });
  }
}

//----------------[ CẬP NHẬT DU LIEU ]-------------------------------
export const action = async ({ request, params }: { request: Request; params: { slugBook: string } }) => {
  try {
    // console.log(request);
    const method = request.method.toUpperCase();
    if (method === "PUT") {
      const uploadHandler = unstable_composeUploadHandlers(
        unstable_createFileUploadHandler({
          directory: ({ filename }) => {
            if (filename.endsWith(".pdf") || filename.endsWith(".epub")) {
              return bookDir;
            }
            return coverDir;
          },
          file: ({ filename }) => `${Date.now()}-${filename}`,
          maxPartSize: 10_000_000, // 10MB
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

      const coverFile = formData.get("cover") as File | null;
      const bookFile = formData.get("filePath") as File | null;

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

      if (coverFile && typeof coverFile.name === "string") {
        updateData.cover = `/uploads/bannerBook/${coverFile.name}`;
      }
      if (bookFile && typeof bookFile.name === "string") {
        updateData.filePath = `/uploads/books/${bookFile.name}`;
        updateData.mimeType = bookFile.type;
      }

      const slugParam = toSlug(params.slugBook);


      const updatedBook = await Book.findOneAndUpdate({ slug: slugParam }, updateData, { new: true });

      if (!updatedBook) {
        return json({ status: 404, message: "Không tìm thấy sách cần cập nhật!" }, { status: 404 });
      }

      console.log(" Cập nhật thành công:", updatedBook);
      return json({ status: 200, message: "Cập nhật sách thành công!", data: updatedBook });
    } else if (method === "DELETE") {
      const slugParam = toSlug(params.slugBook);
      const deletedBook = await Book.findOneAndDelete({ slug: slugParam });
      if (!deletedBook) {
        return json({ status: 404, message: "Không tìm thấy sách cần xóa!" }, { status: 404 });
      }
      console.log("Xóa thành công:", deletedBook);
      return json({ status: 200, message: "Xóa sách thành công!", data: deletedBook });
    } else {
      return json({ status: 405, message: "Phương thức không được hỗ trợ" }, { status: 405 });
    }
  } catch (err: any) {
    console.error("Lỗi khi cập nhật sách:", err);
    return json({ status: 500, message: "Lỗi khi cập nhật sách", error: err.message }, { status: 500 });
  }
};