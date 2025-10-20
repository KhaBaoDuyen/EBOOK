import { json, redirect } from "@remix-run/node";
import Category from "~/models/category.server";
import { toSlug } from "~/utils/toSlug";
import User from "~/models/user.server";
import { authCookie } from "./api.auth.login";

//----------------[ LAY DU LIEU ]-----------------------
export async function loader({ params }: { params: { email: string } }) {
    try {
        const email = decodeURIComponent(params.email);
        const user = await User.findOne({ email });


        if (!user) {
            return json(
                {
                    status: 404,
                    message: "Tài khoản không tồn tại",
                },
                { status: 404 }
            );
        }
        return json({ status: 200, data: user }, { status: 200 });
    } catch (err: any) {
        console.error("Lỗi khi lấy tài khoản:", err);
        return json(
            { status: 500, message: "Lỗi khi lấy tài khoản", error: err.message },
            { status: 500 }
        );
    }

}

//----------------[ CẬP NHẬT DU LIEU ]-------------------------------
export const action = async ({
    request,
    params,
}: {
    request: Request;
    params: { email: string };
}) => {
    try {
        const method = request.method.toUpperCase();
        const email = decodeURIComponent(params.email).toLowerCase();

        // ======================= [ PUT - CẬP NHẬT TÀI KHOẢN ] =======================
        if (method === "PUT") {
            const formData = await request.formData();
            const status = formData.get("status") as string;
            const role = formData.get("role") as string;

            const updatedUser = await User.findOneAndUpdate(
                { email: new RegExp(`^${email}$`, "i") },
                { status, role },
                { new: true }
            );

            if (!updatedUser) {
                return json(
                    { status: 404, message: "Không tìm thấy tài khoản cần cập nhật!" },
                    { status: 404 }
                );
            }

            console.log(" Cập nhật thành công:", updatedUser.email);
            return json({
                status: 200,
                message: "Cập nhật tài khoản thành công!",
                data: updatedUser,
            });
        }

        // ======================= [ DELETE - XÓA TÀI KHOẢN ] =======================
        else if (method === "DELETE") {
            const deletedUser = await User.findOneAndDelete({
                email: new RegExp(`^${email}$`, "i"),
            });

            if (!deletedUser) {
                return json(
                    { status: 404, message: "Không tìm thấy tài khoản cần xóa!" },
                    { status: 404 }
                );
            }

            // console.log(" Xóa thành công:", deletedUser.email);
            const cookieHeader = request.headers.get("Cookie");
            const currentToken = cookieHeader ? await authCookie.parse(cookieHeader) : null;

            if (currentToken) {
                try {
                    const decoded = JSON.parse(Buffer.from(currentToken.split(".")[1], "base64").toString());
                    if (decoded?.email?.toLowerCase() === deletedUser.email.toLowerCase()) {
                        console.log("dang xoa tai khoan dang dang nhap =>");
                        return redirect("/", {
                            headers: {
                                "Set-Cookie": await authCookie.serialize("", {
                                    maxAge: 0,
                                    path: "/"
                                })
                            }
                        })
                    }
                } catch (error) {
                    console.warn("khong the decode token hien tai => ", error)
                }
            }
            return json({
                status: 200,
                message: "Xóa tài khoản thành công!",
                data: deletedUser,
            });
        }

        // ======================= [ METHOD KHÔNG HỖ TRỢ ] =======================
        else {
            return json(
                { status: 405, message: "Phương thức không được hỗ trợ" },
                { status: 405 }
            );
        }
    } catch (err: any) {
        console.error(" Lỗi khi cập nhật tài khoản:", err);
        return json(
            {
                status: 500,
                message: "Lỗi khi cập nhật tài khoản",
                error: err.message,
            },
            { status: 500 }
        );
    }
};