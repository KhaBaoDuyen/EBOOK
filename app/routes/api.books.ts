import { json } from "@remix-run/node";
import Author from "~/models/author.server";
import Book from "~/models/book.server";
import Category from "../models/category.server";


export async function loader() {
  try {
    Category;
    Author;
    const books = await Book.find()
      .populate("categories", "name slug")
      .populate("authorId", "name");

       console.log("danh sach book", books);

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