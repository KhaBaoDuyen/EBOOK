import React, { useState } from "react";
import BookForm from "../components/admin/from/book";
import { useNotify } from "~/context/NotifyContext";
import CusttomLoading from "~/components/Loading";
import { fi } from "date-fns/locale";

export default function CreateBookPage() {
  const { setNotify } = useNotify();
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      const res = await fetch("/api/books", {
        method: "POST",
        body: formData,
      });

      if (res.status === 200 || res.status === 201) {
        setNotify({
          open: true,
          type: "success",
          title: "Thêm sách thành công!",
          message: "Cuốn sách đã được lưu vào hệ thống.",
        });
        setResetKey((prev) => prev + 1);
        return;
      } else if (res.status === 400) {
        const error = await res.json();
        setNotify({
          open: true,
          type: "error",
          title: "Lỗi khi thêm sách!",
          message: error.message || "Vui lòng kiểm tra lại thông tin hoặc thử lại sau.",
        });
      } else {
        setNotify({
          open: true,
          type: "error",
          title: "Lỗi khi thêm sách!",
          message: "Vui lòng kiểm tra lại thông tin hoặc thử lại sau.",
        });
      }
    } catch (err: any) {
      console.log("Lỗi khi thêm =>", err.message);
      setNotify({
        open: true,
        type: "error",
        title: "Kết nối thất bại!",
        message: "Không thể kết nối đến máy chủ.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Thêm Sách</h1>
      {loading && (
        <>
          <div className="absolute flex items-center justify-center  backdrop-blur-sm z-50">
            <CusttomLoading />
          </div>
        </>
      )}
      <BookForm key={resetKey} onSubmit={handleSubmit} />

    </div>
  );
}
