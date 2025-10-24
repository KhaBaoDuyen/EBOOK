import { json } from "@remix-run/node";
import Book from "~/models/book.server";
import Library from "~/models/library.server";

export async function loader({ request }: { request: Request }) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    let books: any[] = [];

 
     if (!type) {
      books = await Book.find({ status: 1 })
        .populate("categories", "name slug")
        .populate("authorId", "name")
        .sort({ createdAt: -1 });  
    }

    //--------------------[ SÁCH MỚI NHẤT ]--------------------
    else if (type === "sach-moi-nhat") {
      books = await Book.find({ status: 1 })
        .populate("categories", "name slug")
        .populate("authorId", "name")
        .sort({ createdAt: -1 })
        .limit(20);
    }

    //--------------------[ SÁCH ĐỌC NHIỀU NHẤT ]--------------------
    else if (type === "doc-nhieu-nhat") {
      const topReadBooks = await Library.aggregate([
        { $match: { hasRead: true } },
        { $group: { _id: "$bookId", totalRead: { $sum: 1 } } },
        { $sort: { totalRead: -1 } },
        { $limit: 20 },
      ]);

      if (topReadBooks.length === 0) {
        return json({
          status: 200,
          message: "Không có sách được đọc nhiều nhất",
          data: [],
        });
      }

      const bookIds = topReadBooks.map((b) => b._id);
      const readMap = new Map(
        topReadBooks.map((b) => [String(b._id), b.totalRead])
      );

      books = await Book.find({ _id: { $in: bookIds }, status: 1 })
        .populate("categories", "name slug")
        .populate("authorId", "name");

      books.sort(
        (a, b) =>
          (readMap.get(String(b._id)) || 0) -
          (readMap.get(String(a._id)) || 0)
      );
    }

    //--------------------[ TYPE KHÔNG HỢP LỆ ]--------------------
    else {
      return json(
        { status: 400, message: "Type không hợp lệ hoặc thiếu" },
        { status: 400 }
      );
    }

    //--------------------[ TRẢ VỀ DỮ LIỆU ]--------------------
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
