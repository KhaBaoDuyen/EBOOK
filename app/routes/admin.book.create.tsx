import BookForm from "../components/admin/from/book";
import type { IBook } from "~/interfaces/book.interface";
import { toast } from "react-hot-toast";
import { useNavigate } from "@remix-run/react";


export default function CreateBookPage() {

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        body: formData
      });
        toast.success("Thêm sách thành công.");

     if (res.status === 200 || res.status === 201){
        console.log("them thanh cong");
        return;
      }else{
        toast.error("Lỗi xảy ra trong quá trình thêm.");
        return;
      }
    }catch(err:any){
      console.log("Loi log khi them=>", err.message);
      return;
    }
   };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4 text-white">Thêm Sách</h1>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
}
