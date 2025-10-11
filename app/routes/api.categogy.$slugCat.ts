import { json } from "@remix-run/node";
import Category from "~/models/category.server";
import { toSlug } from "~/utils/toSlug";

//----------------[ LAY DU LIEU ]-----------------------
export async function loader({ params }: { params: { slugCat: string } }) {
    try {
        const { slugCat } = params;
        const category = await Category.findOne({ slug: slugCat })
            .populate("parentId", "name slug")
            .lean();

        if (!category) {
            return json(
                {
                    status: 404,
                    message: "Thể loại không tồn tại",
                },
                { status: 404 }
            );
        }
        return json({ status: 200, data: category }, { status: 200 });
    } catch (err: any) {
        console.error("Lỗi khi lấy thể loại:", err);
        return json(
            { status: 500, message: "Lỗi khi lấy thể loại", error: err.message },
            { status: 500 }
        );
    }

}

//----------------[ CẬP NHẬT DU LIEU ]-------------------------------
export const action = async ({ request, params }: { request: Request; params: { slugCat: string } }) => {
     try {
        const method = request.method.toUpperCase();

        if (method === "PUT") {
            const formData = await request.formData();
            const name = formData.get("name") as string;
            let slug = formData.get("slug")?.toString().trim().toLowerCase();
            const status = formData.get("status") as string;

            const parentId = formData.getAll("parentId[]") as string[];


            const updateData: any = { 
                name,
                slug, 
                parentId, 
                status };

             if (name) {
                const existingCategory = await Category.findOne({ name });
                if (existingCategory && existingCategory.slug !== params.slugCat) {
                    return json({ status: 400, message: "Tên danh mục đã tồn tại!" }, { status: 400 });
                }
            }

             if (slug) {
                const existingSlug = await Category.findOne({ slug });
                if (existingSlug && existingSlug.slug !== params.slugCat) {
                    return json({
                        status: 400,
                        message: "Slug đã tồn tại, vui lòng sử dụng slug khác!",
                    }, { status: 400 });
                }
            }

            const slugParam = toSlug(params.slugCat);

            const updatedCategory = await Category.findOneAndUpdate(
                { slug: slugParam },
                updateData,
                { new: true }
            );

            if (!updatedCategory) {
                return json({ status: 404, message: "Không tìm thấy danh mục cần cập nhật!" }, { status: 404 });
            }

            console.log("Cập nhật thành công:", updatedCategory);
            return json({ status: 200, message: "Cập nhật danh mục thành công!", data: updatedCategory });
        }

         else if (method === "DELETE") {
            const slugParam = toSlug(params.slugCat);
            const deletedCategory = await Category.findOneAndDelete({ slug: slugParam });
            if (!deletedCategory) {
                return json({ status: 404, message: "Không tìm thấy danh mục cần xóa!" }, { status: 404 });
            }
            console.log("🗑️ Xóa thành công:", deletedCategory);
            return json({ status: 200, message: "Xóa danh mục thành công!", data: deletedCategory });
        }

         else {
            return json({ status: 405, message: "Phương thức không được hỗ trợ" }, { status: 405 });
        }
    } catch (err: any) {
        console.error("Lỗi khi cập nhật danh mục:", err);
        return json({ status: 500, message: "Lỗi khi cập nhật danh mục", error: err.message }, { status: 500 });
    }
};
