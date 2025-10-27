import { json } from "@remix-run/node";
import { es } from "date-fns/locale";
import Book from "~/models/book.server";
import Library from "~/models/library.server";
import Review from "~/models/review.server";

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
    } else if (type === "sach-duoc-yeu-thich-nhat") {
      const Favorite = await Library.aggregate([
        { $match: { isFavorite: true } },
        { $group: { _id: "$bookId", totalFavorite: { $sum: 1 } } },
        { $sort: { totalFavorite: -1 } },
        { $limit: 20 },
      ]);

      const bookIds = Favorite.map((b) => b._id);
      const favoriteMap = new Map(
        Favorite.map((b) => [String(b._id), b.totalFavorite])
      );

      books = await Book.find({ _id: { $in: bookIds }, status: 1 })
        .populate("categories", "name slug")
        .populate("authorId", "name");

      books.sort(
        (a, b) =>
          (favoriteMap.get(String(b._id)) || 0) -
          (favoriteMap.get(String(a._id)) || 0)
      );
    } else if (type === "sach-duoc-danh-gia-cao-nhat") {
      const Rating = await Review.aggregate([
        { $match: { rating: { $gte: 4 } } },
        {
          $group: {
            _id: "$bookId",
            totalHighRatings: { $sum: 1 },
            avgRating: { $avg: "$rating" },
          },
        },
        { $sort: { totalHighRatings: -1, avgRating: -1 } },
        { $limit: 20 },
      ]);

      const bookIds = Rating.map((b) => b._id);
      const ratingMap = new Map(
        Rating.map((b) => [String(b._id), b.totalHighRatings])
      );

      books = await Book.find({ _id: { $in: bookIds }, status: 1 })
        .populate("categories", "name slug")
        .populate("authorId", "name")
        .lean();

      books.sort(
        (a, b) =>
          (ratingMap.get(String(b._id)) || 0) -
          (ratingMap.get(String(a._id)) || 0)
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
