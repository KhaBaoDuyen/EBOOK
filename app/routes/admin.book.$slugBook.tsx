import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "@remix-run/react";
import BookForm from "../components/admin/from/book";
import { useNotify } from "~/context/NotifyContext";
import CusttomLoading from "~/components/Loading";

export default function UpdateBookPage() {
    const { setNotify } = useNotify();
    const { slugBook } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        // console.log("from", formData);
        try {
            setLoading(true);
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
            } else if (res.status === 400) {
                const error = await res.json();
                setNotify({
                    open: true,
                    type: "error",
                    title: "Lỗi khi cập nhật sách!",
                    message: error.message || "Vui lòng kiểm tra lại thông tin hoặc thử lại sau.",
                });
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4 text-white">Xem Sách</h1>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999]">
                    <CusttomLoading />
                </div>
            )}

            <BookForm key={slugBook} slugParam={slugBook} onSubmit={handleSubmit} />
        </div>
    );
}
