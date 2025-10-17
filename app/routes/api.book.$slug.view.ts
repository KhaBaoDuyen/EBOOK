import { json } from "@remix-run/node";
import Book from "~/models/book.server";

export async function loader({ params }: { params: { slug: string } }) {
  try {
    const { slug } = params;

     const book = await Book.findOneAndUpdate(
      { slug },
      { $inc: { viewCount: 1 } }, 
      { new: true }  
    );

    if (!book) {
      return json({ message: "Không tìm thấy sách" }, { status: 404 });
    }

    return json({ success: true, viewCount: book.viewCount }, { status: 200});
  } catch (error) {
    console.error(error);
    return json({ success: false, error: "Lỗi server" }, { status: 500 });
  }
}
