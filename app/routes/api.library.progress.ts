import { json } from "@remix-run/node";
import Library from "~/models/library.server";
import { decodeUser } from "~/utils/verifyToken.server";
import mongoose from "mongoose";
import { increaseCompletedBook } from "~/services/userRank.service";

export const action = async ({ request }: { request: Request }) => {

  const user = await decodeUser(request);
  if (!user?._id) {
    return json({ status: 401, message: "Không xác thực được người dùng" }, { status: 401 });
  }

  const formData = await request.formData();
  const bookId = formData.get("bookId")?.toString();
  const progress = Number(formData.get("progress") || 0);

  if (!bookId) {
    return json({ status: 400, message: "Thiếu bookId" }, { status: 400 });
  }

  const updated = await Library.findOneAndUpdate(
    {
      userId: new mongoose.Types.ObjectId(user._id),
      bookId: new mongoose.Types.ObjectId(bookId),
    },
    {
      $set: {
        progress: Math.min(progress, 1),
        isFinished: progress >= 1,
        lastReadAt: new Date(),
      },
    },
    { new: true, upsert: true }
  );
  if (progress >= 1) {
    await increaseCompletedBook(user._id);
  }

  return json({ status: 200, message: "Cập nhật tiến độ thành công", data: updated });
};
