import BookForm from "../components/admin/from/book";
import type { IBook } from "~/interfaces/book.interface";

export default function CreateBookPage() {
  const handleSubmit = (data: IBook) => {
    console.log("Dữ liệu thêm sách:", data);

   };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4 text-white">Thêm Sách</h1>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
}
