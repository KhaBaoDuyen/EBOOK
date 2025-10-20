import {
    json, redirect,
    unstable_composeUploadHandlers,
    unstable_createFileUploadHandler,
    unstable_createMemoryUploadHandler,
    unstable_parseMultipartFormData,
} from "@remix-run/node";

import Category from "~/models/category.server";
import { toSlug } from "~/utils/toSlug";
import User from "~/models/user.server";
import { authCookie } from "./api.auth.login";
import { uploadToCloudinary } from "~/utils/uploadCloudinary.server";
import { aW } from "node_modules/react-router/dist/development/context-BqL5Eckq.mjs";


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
            const uploadSize = unstable_createMemoryUploadHandler({
                maxPartSize: 35_000_000,
            })
            const formData = await unstable_parseMultipartFormData(request, uploadSize);

            const status = formData.get("status")?.toString().trim();
            const role = formData.get("role")?.toString().trim();
            const name = formData.get("name")?.toString().trim();
            const description = formData.get("description")?.toString().trim();
            const birthDate = formData.get("birthDate")?.toString().trim();
            const avatar = formData.get("avatar") as File | null;
            const gender = formData.get("gender")?.toString()?.trim();

            const oldAvatar = await User.findOne({ email: email });

            const updateData: any = {
                name,
                description,
                birthDate,
                role,
                status,
                gender,
            };
            if (avatar && avatar.size > 0) {
                const buffer = Buffer.from(await avatar.arrayBuffer());
                const uploadResult: any = await uploadToCloudinary(buffer, "smartbook/avatar");
                updateData.avatar = uploadResult.secure_url;
            } else {
                updateData.avatar = oldAvatar?.avatar;
            }
            console.log("form nhan dc =>",updateData);
            
            const updatedUser = await User.findOneAndUpdate(
                { email: new RegExp(`^${email}$`, "i") },
                updateData,
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