import { json } from "@remix-run/node";
import Author from "~/models/author.server";

export async function loader() {
    try {
        const author = (await Author.find());
        return json({
            status: 200,
            message: "Lay du lieu thanh cong",
            data: author,
        })
    } catch (err:any) {
        return json({
            status: 500,
            message: "Loi khi lay dulieu",
            error: err.error,
        })
    }
}