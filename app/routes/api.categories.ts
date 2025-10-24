import { json } from "@remix-run/node";
import Category from "~/models/category.server";
import Book from "~/models/book.server";

export async function loader() {
    try {
        const categories = await Category.find({
            status: 1
        })
            .sort({ createdAt: -1 })
            .lean();
        return json({
            status: 200,
            message: "Lay du lieu thanh cong",
            data: categories,
        })
    } catch (err: any) {
        return json({
            status: 500,
            message: "Loi khi lay dulieu",
            error: err.error,
        })
    }
}

//-----------------[ TAO DANH MUC MOI ]------------------------
export async function action({ request }: { request: Request }) {
    try {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        let slug = formData.get("slug")?.toString().trim().toLowerCase();
        const status = formData.get("status") as string;
        const parentIdRaw = formData.getAll("parentId[]") as string[];
        const parentId = parentIdRaw.length > 0 ? parentIdRaw : null;


        if (slug) {
            const existingCategory = await Category.findOne({ slug });
            if (existingCategory) {
                return json({
                    status: 400,
                    message: "Slug đã tồn tại. Vui lòng nhập tên danh mục khác hoặc thêm ký tự.",
                    error: "Duplicate slug",
                },
                    { status: 400 });
            }
        };
        if (name) {
            const existingCategoryByName = await Category.findOne({ name });
            if (existingCategoryByName) {
                return json({
                    status: 400,
                    message: "Tên thể loại đã tồn tại. Vui lòng nhập tên khác.",
                    error: "Duplicate name",
                },
                    { status: 400 });
            }
        }

        const newCategory = new Category({
            name,
            slug,
            parentId,
            status,
        });
        console.log("Data form:", newCategory);

        await newCategory.save();
        return json({
            status: 201,
            message: "Tạo danh mục thành công",
            data: newCategory,
        });
    } catch (err: any) {
        return json({
            status: 500,
            message: "Lỗi khi tạo danh mục",
            error: err.message,
        });
    }
}