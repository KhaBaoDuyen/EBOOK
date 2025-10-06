import { json } from "@remix-run/node";
import Category from "~/models/category.server";

export async function loader() {
    try {
        const categories = await Category.find();
        return json({
            status: 200,
            message: "Lay du lieu thanh cong",
            data: categories,
        })
    } catch (err:any) {
        return json({
            status: 500,
            message: "Loi khi lay dulieu",
            error: err.error,
        })
    }
}