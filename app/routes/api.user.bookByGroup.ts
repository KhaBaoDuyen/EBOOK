import Book from "~/models/book.server";
import Category from "~/models/category.server";
import { json } from "@remix-run/node";
import mongoose from "mongoose";
import Author from "~/models/author.server";

//-------------[ LAY DU LIEU RANDOM ]-----------
export async function loader() {
    try {
        Category;
        Author;

        const count = await Book.countDocuments();
        const random = await Math.floor(Math.random() * Math.max(count - 10, 1));


        const books = await Book.find()
            .skip(random)
            .populate("categories", "name slug")
            .populate("authorId", "name")
            .lean();

        return json({
            status: 200,
            message: "Lấy dữ liệu thành công",
            data: books,
        });

    } catch (err: any) {
        return json(
            {
                status: 500,
                message: "Lỗi khi lấy dữ liệu books",
                error: err.message,
            },
            { status: 500 }
        );
    }
}

export async function action({ request }: { request: Request }) {
    try {
        const { slugs } = await request.json();

        if (!Array.isArray(slugs) || slugs.length === 0) {
            return json({ status: 400, message: "Thiếu danh mục" }, { status: 400 });
        }

        // Tìm danh mục  
        const categories = await Category.find({ slug: { $in: slugs } }).lean();
        if (categories.length === 0) {
            return json({ status: 404, message: "Không tìm thấy danh mục" }, { status: 404 });
        }

        const categoryIds = categories.map((c) => c._id);

        const books = await Book.find({
            $or: [
                { categories: { $in: categoryIds } }, // nếu là ObjectId  
                { categories: { $in: categoryIds.map((id) => id.toString()) } }, // nếu dạng string
            ],
        })
            .populate("categories", "name slug")
            .populate("authorId", "name")
            .lean();

        return json({
            status: 200,
            message: `Lấy sách theo nhóm danh mục (ít nhất 1 trong): ${slugs.join(", ")}`,
            data: books,
        });
    } catch (err: any) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        return json(
            { status: 500, message: "Lỗi server", error: err.message },
            { status: 500 }
        );
    }
}
