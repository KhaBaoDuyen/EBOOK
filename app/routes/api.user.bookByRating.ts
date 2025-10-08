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
        const bookByReview = await Book.aggregate([
            {
                $lookup:{
                    from :"reviews",
                    localField:"_id",
                    foreignField: "book_id",
                    as: "reviews",
                },
            },
            {
                $addFields:{
                    averageRating: { $avg: "$reviews.rating"},
                    reviewCount: {$size: "$reviews"},
                },
            },
            {$match: {averageRating: { $gte: 4}}},
            {$limit:10},
        ]);

        const books = await Book.populate(bookByReview,[
            {path: "categories", select: "name slug"},
            {path: "authorId", select: "name"},
        ]);

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
