import React, { useState } from "react";
import BookForm from "../components/admin/from/book";
import { useNotify } from "~/context/NotifyContext"; 

export default function CreateBookPage() {
 const { setNotify } = useNotify();
 
 
  const handleSubmit = async (formData: FormData) => {
    try {
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
    }
  };

  return (
    <div className="relative p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Thêm Sách</h1>

      <BookForm onSubmit={handleSubmit} />
    </div>
  );
}
