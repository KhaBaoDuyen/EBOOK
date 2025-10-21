import { json } from "@remix-run/node";
import Library from "~/models/library.server";
import { decodeUser } from "~/utils/verifyToken.server";

export async function loader({ request, params }: any) {
  try {
     const user = await decodeUser(request);
    if (!user?._id) {
      return json({ message: "Chưa đăng nhập hoặc token không hợp lệ" }, { status: 401 });
    }

    const userId = user._id;  
    const { bookId } = params;

     const library = await Library.findOne({ userId, bookId }).lean();

     return json({ progress: library?.progress || 0 });
  } catch (error: any) {
    console.error(" Lỗi lấy tiến độ:", error);
    return json({ message: "Lỗi server" }, { status: 500 });
  }
}
