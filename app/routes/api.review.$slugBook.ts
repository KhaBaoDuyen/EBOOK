import { json } from "@remix-run/node";
import Book from "~/models/book.server";
import Review from "~/models/review.server";


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

        const reviews = await Review.find({ bookId: book._id })
            .populate("userId", "name avatar")
            .sort({ createdAt: -1 })
            .lean();

        return json({
            status: 200,
            reviews: reviews || [],
        });
    } catch (err: any) {
        console.error("Lỗi lấy dữ liệu review:", err);
        return json({ status: 500, message: "Lỗi server", error: err.message }, { status: 500 });
    }
}