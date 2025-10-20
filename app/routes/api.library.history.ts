import { json } from "@remix-run/node";
import Library from "~/models/library.server";
import { decodeUser } from "~/utils/verifyToken.server";
import mongoose from "mongoose";

export const action = async ({ request }: { request: Request }) => {
  const user = await decodeUser(request);
  if (!user?._id) {
    return json({ status: 401, message: "Chưa đăng nhập" }, { status: 401 });
  }

  const formData = await request.formData();
  const bookId = formData.get("bookId")?.toString();
  if (!bookId) {
    return json({ status: 400, message: "Thiếu bookId" }, { status: 400 });
  }

  const updated = await Library.findOneAndUpdate(
    { userId: new mongoose.Types.ObjectId(user._id), bookId: new mongoose.Types.ObjectId(bookId) },
    {
      $set: {
        hasRead: true,           //  đánh dấu đã đọc
        lastReadAt: new Date(),  //  cập nhật thời gian gần nhất
      },
    },
    { new: true, upsert: true }
  );

  return json({ status: 200, message: "Đã ghi nhận lịch sử đọc", data: updated });
};
