import { json } from "@remix-run/node";
import Library from "~/models/library.server";
import { decodeUser } from "~/utils/verifyToken.server";
import mongoose from "mongoose";

export const action = async ({ request }: { request: Request }) => {
  try {
    const user = await decodeUser(request);
    if (!user?._id) {
      return json({ status: 401, message: "Không xác thực được người dùng" }, { status: 401 });
    }

    const formData = await request.formData();
    const bookId = formData.get("bookId")?.toString();
    const isFavorite = formData.get("isFavorite");

    if (!bookId) {
      return json({ status: 400, message: "Thiếu bookId" }, { status: 400 });
    }

    const updated = await Library.findOneAndUpdate(
      {
        userId: new mongoose.Types.ObjectId(user._id),
        bookId: new mongoose.Types.ObjectId(bookId),
      },
      {
        $set: { isFavorite: isFavorite === "true" },
      },
      { new: true, upsert: true }
    );

    const message =
      updated.isFavorite === true
        ? "Đã thêm vào danh sách yêu thích "
        : "Đã xóa khỏi danh sách yêu thích ";

    return json({
      status: 200,
      message,
      data: {
        bookId: updated.bookId,
        isFavorite: updated.isFavorite,
      },
    });
  } catch (error: any) {
    console.error("Lỗi khi cập nhật yêu thích:", error);
    return json({ status: 500, message: "Lỗi server khi cập nhật yêu thích" });
  }
};
