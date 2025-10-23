import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "@remix-run/react";
import BookForm from "../components/admin/from/book";
import { useNotify } from "~/context/NotifyContext";
import CusttomLoading from "~/components/Loading";
import AuthForm from "~/components/admin/from/auth";

import { updateAuth } from "~/services/user.service";

export default function AuthByEmail() {
    const [loading, setLoading] = useState(false);
    const { setNotify } = useNotify();
    const navigate = useNavigate();
    const { email } = useParams();
    const decodeEmail = decodeURIComponent(email);

    // console.log("decodeEmail", decodeEmail);

    const handleSubmit = async (formData: FormData) => {
        try {
            setLoading(true);

            const { status, data } = await updateAuth(email, formData);

            if (status === 200 || status === 201) {
                setNotify({
                    open: true,
                    type: "success",
                    title: "Cập nhật tài khoản thành công!",
                    message: "Tài khoản đã được sửa dữ liệu trong hệ thống.",
                });
                // navigate("/admin/books");
            }
            else if (status === 400) {
                setNotify({
                    open: true,
                    type: "error",
                    title: "Lỗi khi cập nhật tài khoản!",
                    message:
                        data?.message || "Vui lòng kiểm tra lại thông tin hoặc thử lại sau.",
                });
            }
            else {
                setNotify({
                    open: true,
                    type: "error",
                    title: "Lỗi hệ thống!",
                    message: data?.message || "Đã xảy ra lỗi không xác định.",
                });
            }
        } catch (err: any) {
            console.error("Lỗi khi sửa =>", err.message);
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
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center shadow-xl bg-gray-300 dark:bg-black/50 backdrop-blur-sm z-[9999]">
                    <CusttomLoading />
                </div>
            )}

            <AuthForm key={email} email={email} onSubmit={handleSubmit} />
        </div>
    )
}