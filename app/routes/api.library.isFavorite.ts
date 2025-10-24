import { json } from "@remix-run/node";
import mongoose from "mongoose";
import Library from "~/models/library.server";
import { decodeUser } from "~/utils/verifyToken.server";


export const action = async ({ request }: { request: Request }) => {
  try {
    const user = await decodeUser(request);
    if (!user?._id) {
      return json({ status: 401, message: "Không xác thực được người dùng" }, { status: 401 });
    }

    const formData = await request.formData();
    const bookId = formData.get("bookId")?.toString();

    if (!bookId) {
      return json({ status: 400, message: "Thiếu bookId" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return json({ status: 400, message: "bookId không hợp lệ" }, { status: 400 });
    }

    console.log("bookId nhận được:", bookId);


    const record = await Library.findOne({
      userId: new mongoose.Types.ObjectId(user._id),
      bookId: new mongoose.Types.ObjectId(bookId),
    });

    const favoriteCount = await Library.countDocuments({
      bookId: new mongoose.Types.ObjectId(bookId),
      isFavorite: true,
    });


    return json({
      status: 200,
      isFavorite: !!record?.isFavorite,
      favoriteCount,
      message: "Lấy trạng thái yêu thích thành công",
    });
  } catch (error: any) {
    console.error("Lỗi khi lấy dữ liệu yêu thích:", error.message);
    return json(
      { status: 500, message: "Lỗi khi lấy dữ liệu yêu thích", error: error.message },
      { status: 500 }
    );
  }
};
