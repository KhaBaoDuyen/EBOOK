import { json } from "@remix-run/node";
import Review from "~/models/review.server";
import { decodeUser } from "~/utils/verifyToken.server";

//----------------[ ACTION – XÓA REVIEW THEO ID ]-----------------------
export const action = async ({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) => {
  try {
    const method = request.method.toUpperCase();

    if (method === "DELETE") {
      const { id } = params;
      const user = await decodeUser(request); 

      if (!id) {
        return json({ status: 400, message: "Thiếu ID đánh giá cần xóa" }, { status: 400 });
      }

      const review = await Review.findById(id);
      if (!review) {
        return json({ status: 404, message: "Không tìm thấy đánh giá" }, { status: 404 });
      }

       if (user && review.userId?.toString() !== user._id.toString() && user.role !== "admin") {
        return json({ status: 403, message: "Bạn không có quyền xóa bình luận này" }, { status: 403 });
      }

      const deleted = await Review.findByIdAndDelete(id);

      return json({
        status: 200,
        message: "Xóa đánh giá thành công!",
        data: deleted,
      });
    }

     return json({ status: 405, message: "Phương thức không được hỗ trợ" }, { status: 405 });
  } catch (err: any) {
    console.error("  Lỗi khi xóa review:", err);
    return json(
      {
        status: 500,
        message: "Lỗi server khi xóa review",
        error: err.message,
      },
      { status: 500 }
    );
  }
};
