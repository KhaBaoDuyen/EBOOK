import { json } from "@remix-run/node";
import Category from "~/models/category.server";
import { decodeUser } from "~/utils/verifyToken.server";
import Review from "~/models/review.server";

export async function loader(){
    
}
//-----------------[ TAO REVIEW  ]------------------------
export async function action({ request }: { request: Request }) {
    try {
        const user = await decodeUser(request);
        if (!user?._id) {
            return json({ status: 401, message: "Không xác thực được người dùng" }, { status: 401 });
        }

        const formData = await request.formData();
        const userId = user._id;
        const bookId = formData.get("bookId");
        const rating = formData.get("rating");
        const comment = formData.get("comment");

        const createReview = new Review({
            userId,
            bookId,
            rating,
            comment,
        });

        console.log("Data form:", createReview);

        await createReview.save();
        return json({
            status: 201,
            message: "Tạo bình luận thành công",
            data: createReview,
        },
            { status: 201 });

    } catch (err: any) {
        return json({
            status: 500,
            message: "Lỗi khi tạo bình luận",
            error: err.message,
        });
    }
}