import { json } from "@remix-run/node";

import Category from "~/models/category.server";
import Author from "~/models/author.server";
import Book from "~/models/book.server";
import Review from "~/models/review.server";

//-------------[ LAY DU LIEU DUOC XEP HANG ]-----------
export async function loader() {
    try {
        Category;
        Author;
        const books = await Book.find()
        .populate("categories", "name slug")
        .populate("authorId", "name")
        .sort({viewCount: -1});

        return json({
            status: 200,
            message: "Lay du lieu thanh cong",
            data: books
        })
    } catch (err:any) {
        return json({
            status: 500,
            message: "loi tu server",
            error: err.message
        },{  status: 500})
    }
}
