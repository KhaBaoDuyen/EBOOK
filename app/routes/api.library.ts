import { json } from "@remix-run/node";
import Library from "~/models/library.server";
import { decodeUser } from "~/utils/verifyToken.server";

export const action = async ({ request }: { request: Request }) => {
    try {
        const user = await decodeUser(request);
        if (!user?._id) {
            return json({ status: 401, message: "Chưa đăng nhập hoặc token không hợp lệ" }, { status: 401 });
        }


        const formData = await request.formData();
        const bookId = formData.get("bookId")?.toString();
        const userId = user._id;

        const updateFields: Record<string, any> = {};

        const progress = formData.get("progress");
        const isFinished = formData.get("isFinished");
        const isSaved = formData.get("isSaved");
        const hasRead = formData.get("hasRead");

        if (progress !== null) updateFields.progress = Number(progress);
        if (isFinished !== null) updateFields.isFinished = isFinished === "true";
        if (isSaved !== null) updateFields.isSaved = isSaved === "true";
        if (hasRead !== null) updateFields.hasRead = hasRead === "true";

        if (Object.keys(updateFields).length > 0) {
            updateFields.lastReadAt = new Date();
        }

        const record = await Library.findOneAndUpdate(
            { userId, bookId },
            Object.keys(updateFields).length > 0
                ? { $set: updateFields }
                : { $setOnInsert: { progress: 0, isFinished: false, lastReadAt: new Date() } },
            { upsert: true, new: true }
        );

        return json({
            status: 200,
            message:
                Object.keys(updateFields).length > 0
                    ? "Đã cập nhật Library"
                    : "Đã tồn tại hoặc tạo Library mới",
            data: record,
        });
    } catch (err: any) {
        console.error("  Lỗi khi tạo/cập nhật Library:", err);
        return json(
            { status: 500, message: "Lỗi khi tạo hoặc cập nhật Library", error: err.message },
            { status: 500 }
        );
    }
};