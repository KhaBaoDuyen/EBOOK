import { json } from "@remix-run/node";
import Library from "~/models/library.server";
import { decodeUser } from "~/utils/verifyToken.server";

export const loader = async ({ request }: { request: Request }) => {
    try {
        // --------------[ lay usser tu cookie]---------------------
        const user = await decodeUser(request);
        if (!user) {
            return json({ status: 401, message: "Chưa đăng nhập!" }, { status: 401 });
        }

        // -------------[ Lay thu vien theo nguoi dung ]-------------------
        const libraries = await Library.find({ userId: user._id })
            .populate({
                path: "bookId",
                populate: {
                    path: "authorId",
                    select: "name",
                }
            })
            .lean()
            .sort({ lastReadAt: -1 });


        if (!libraries || libraries.length === 0) {
            return json({
                status: 200,
                message: "Người dùng chưa có sách trong thư viện.",
                data: { reading: [], finished: [], saved: [] },
            });
        }



        // -------------[ Phân loại thành 3 nhóm ]---------------------
        const reading = libraries.filter(
            (item: any) =>
                item.hasRead === true &&
                item.progress > 0 &&
                item.progress < 100 &&
                !item.isFinished
        );

        const finished = libraries.filter(
            (item: any) => item.isFinished === true
        );

        const saved = libraries.filter(
            (item: any) => item.isSaved === true
        );

        const isFavorite = libraries.filter(
            (item: any) => item.isFavorite === true
        );

        return json({
            status: 200,
            message: "Lấy thư viện thành công!",
            data: { reading, finished, saved, isFavorite },
        });
    } catch (error: any) {
        console.error("  Lỗi khi lấy dữ liệu thư viện:", error.message);
        return json(
            { status: 500, message: "Lỗi khi tải thư viện người dùng." },
            { status: 500 }
        );
    }
};


export const action = async ({ request }: { request: Request }) => {
    try {
        const user = await decodeUser(request);
        if (!user?._id) {
            return json(
                { status: 401, message: "Chưa đăng nhập hoặc token không hợp lệ" },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const bookId = formData.get("bookId")?.toString();
        const userId = user._id;
        const actionType = formData.get("actionType")?.toString();  
        const pageIndex = Number(formData.get("pageIndex"));

        //------------------ [ THÊM / XÓA BOOKMARK ] ------------------
        if (actionType === "addBookmark") {
            const updated = await Library.findOneAndUpdate(
                { userId, bookId },
                {
                    $addToSet: {
                        bookmarks: { pageIndex, createdAt: new Date() },
                    },
                    $setOnInsert: { userId, bookId },
                },
                { upsert: true, new: true }
            );

            return json({
                status: 200,
                message: "Đã thêm bookmark thành công",
                data: updated,
            });
        }

        if (actionType === "removeBookmark") {
            const updated = await Library.findOneAndUpdate(
                { userId, bookId },
                { $pull: { bookmarks: { pageIndex } } },
                { new: true }
            );

            return json({
                status: 200,
                message: "Đã xóa bookmark thành công",
                data: updated,
            });
        }

        //---------------- [ CẬP NHẬT TIẾN ĐỘ / TRẠNG THÁI ] ----------------
        const updateFields: Record<string, any> = {};

        const progress = formData.get("progress");
        const isFinished = formData.get("isFinished");
        const isSaved = formData.get("isSaved");
        const hasRead = formData.get("hasRead");

        if (progress !== null) updateFields.progress = Number(progress);
        if (isFinished !== null) updateFields.isFinished = isFinished === "true";
        if (isSaved !== null) updateFields.isSaved = isSaved === "true";
        if (hasRead !== null) updateFields.hasRead = hasRead === "true";

        if (updateFields.progress > 0 || updateFields.isFinished === true) {
            updateFields.hasRead = true;
        }

        if (Object.keys(updateFields).length > 0) {
            updateFields.lastReadAt = new Date();
        }

        const record = await Library.findOneAndUpdate(
            { userId, bookId },
            Object.keys(updateFields).length > 0
                ? { $set: updateFields }
                : {
                    $setOnInsert: {
                        progress: 0,
                        isFinished: false,
                        lastReadAt: new Date(),
                        hasRead: true,
                    },
                },
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
        console.error("Lỗi khi tạo/cập nhật Library:", err);
        return json(
            {
                status: 500,
                message: "Lỗi khi tạo hoặc cập nhật Library",
                error: err.message,
            },
            { status: 500 }
        );
    }
};