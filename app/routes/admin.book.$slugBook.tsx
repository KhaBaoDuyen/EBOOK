import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "@remix-run/react";
import BookForm from "../components/admin/from/book";
import { useNotify } from "~/context/NotifyContext";

export default function UpdateBookPage() {
    const { setNotify } = useNotify();
    const { slugBook } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (formData: FormData) => {
        console.log("from", formData);
        
        try {
            const res = await fetch(`/api/book/${slugBook}`, {
                method: "PUT",
                body: formData,
            });

            if (res.status === 200 || res.status === 201) {
                setNotify({
                    open: true,
                    type: "success",
                    title: "Cập nhật sách thành công!",
                    message: "Cuốn sách đã được sửa dữ liệu trong hệ thống.",
                });
                navigate("/admin/books");
            } else {
                setNotify({
                    open: true,
                    type: "error",
                    title: "Lỗi khi cập nhật sách!",
                    message: "Vui lòng kiểm tra lại thông tin hoặc thử lại sau.",
                });
            }
        } catch (err: any) {
            console.log("Lỗi khi sửa =>", err.message);
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
            <h1 className="text-2xl font-bold mb-4 text-white">Xem Sách</h1>

            <BookForm key={slugBook} slugParam={slugBook} onSubmit={handleSubmit} />
        </div>
    );
}
