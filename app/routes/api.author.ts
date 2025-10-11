import { json, unstable_parseMultipartFormData, unstable_createMemoryUploadHandler } from "@remix-run/node";
import Author from "~/models/author.server";
import { uploadToCloudinary } from "~/utils/uploadCloudinary.server";
import { toSlug } from "~/utils/toSlug";

export const action = async ({ request }: { request: Request }) => {
  try {
    const uploadHandler = unstable_createMemoryUploadHandler();
    const formData = await unstable_parseMultipartFormData(request, uploadHandler);

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const bio = formData.get("bio") as string;
    const nationality = formData.get("nationality") as string;
    const birthDate = formData.get("birthDate") as string;
    const avatarFile = formData.get("avatar") as File | null;

    if (!name) {
      return json({ status: 400, message: "Tên tác giả không được để trống!" }, { status: 400 });
    }

    // check trùng
    const exist = await Author.findOne({ name });
    if (exist) {
      return json({ status: 400, message: "Tác giả đã tồn tại!" }, { status: 400 });
    }

    let avatarUrl = "/uploads/authors/default.jpg";
    if (avatarFile) {
      const buffer = Buffer.from(await avatarFile.arrayBuffer());
      const result: any = await uploadToCloudinary(buffer, "smartbook/authors");
      avatarUrl = result.secure_url;
    }

    const author = new Author({
      name,
      slug: slug || toSlug(name),
      avatar: avatarUrl,
      bio: bio || "Đang cập nhật",
      nationality: nationality || "Đang cập nhật",
      birthDate: birthDate === "Đang cập nhật" ? null : new Date(birthDate),
    });

    await author.save();

    return json({ status: 200, message: "Thêm tác giả thành công!", data: author });
  } catch (err: any) {
    console.error("❌ Lỗi khi thêm tác giả:", err);
    return json({ status: 500, message: "Lỗi khi thêm tác giả", error: err.message }, { status: 500 });
  }
};
