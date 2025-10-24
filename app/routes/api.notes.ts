import { json } from "@remix-run/node";
import Note from "~/models/note.server";
import Library from "~/models/library.server";
import { decodeUser } from "~/utils/verifyToken.server";


// ==========================[ GET NOTES BY BOOK ]=========================
export const loader = async ({ request }: { request: Request }) => {
    try {
        // ----[ Lấy user từ token cookie ]----
        const user = await decodeUser(request);
        if (!user?._id) {
            return json({ status: 401, message: "Chưa đăng nhập hoặc token không hợp lệ" }, { status: 401 });
        }

        const url = new URL(request.url);
        const bookId = url.searchParams.get("bookId");

        if (!bookId) {
            return json({ status: 400, message: "Thiếu bookId" }, { status: 400 });
        }

        // ----[ Lấy danh sách ghi chú theo sách và người dùng ]----
        const notes = await Note.find({ userId: user._id, bookId }).sort({ updatedAt: -1 }).lean();

        return json({
            status: 200,
            message: "Lấy danh sách ghi chú thành công!",
            data: notes,
        });
    } catch (err: any) {
        console.error("❌ Lỗi khi lấy ghi chú:", err.message);
        return json({ status: 500, message: "Lỗi khi tải ghi chú", error: err.message }, { status: 500 });
    }
};


// ==========================[ CREATE / DELETE NOTE ]=========================
export const action = async ({ request }: { request: Request }) => {
    try {
        const user = await decodeUser(request);
        if (!user?._id) {
            return json({ status: 401, message: "Chưa đăng nhập hoặc token không hợp lệ" }, { status: 401 });
        }

        const method = request.method.toUpperCase();
        const formData = await request.formData();

        // ================[ THÊM GHI CHÚ ]=================
        if (method === "POST") {
            const bookId = formData.get("bookId")?.toString();
            const text = formData.get("text")?.toString();
            const highlight = formData.get("highlight")?.toString();
            const color = formData.get("color")?.toString() || "#FFF59D";
            const pageIndex = Number(formData.get("pageIndex") || 0);

            if (!bookId || !text || !highlight) {
                return json({ status: 400, message: "Thiếu dữ liệu ghi chú" }, { status: 400 });
            }

            const note = await Note.create({
                userId: user._id,
                bookId,
                text,
                highlight,
                color,
                pageIndex,
            });

            // ----[ Cập nhật Library để đánh dấu đã đọc ]----
            await Library.findOneAndUpdate(
                { userId: user._id, bookId },
                { $set: { hasRead: true, updatedAt: new Date() } },
                { upsert: true }
            );

            return json({
                status: 201,
                message: "Đã tạo ghi chú mới",
                data: note,
            });
        }

        // ================[ XOÁ GHI CHÚ ]=================
        if (method === "DELETE") {
            const id = formData.get("id")?.toString();
            if (!id) {
                return json({ status: 400, message: "Thiếu id ghi chú" }, { status: 400 });
            }

            const deleted = await Note.findOneAndDelete({ _id: id, userId: user._id });
            if (!deleted) {
                return json({ status: 404, message: "Không tìm thấy ghi chú" }, { status: 404 });
            }

            return json({
                status: 200,
                message: "Đã xoá ghi chú thành công",
            });
        }

        return json({ status: 405, message: "Phương thức không hợp lệ" }, { status: 405 });
    } catch (err: any) {
        console.error("❌ Lỗi khi xử lý ghi chú:", err.message);
        return json({ status: 500, message: "Lỗi khi xử lý ghi chú", error: err.message }, { status: 500 });
    }
};
