import { json } from "@remix-run/node";
import { authCookie } from "./api.auth.login";

export async function action() {
    return json(
        {
            message: "Đăng xuất thành công",
            status: 200
        },
        {
            headers: {
                "Set-Cookie": await authCookie.serialize("", {
                    maxAge: 0,
                    path: "/",
                })
            }
        }
    )
}