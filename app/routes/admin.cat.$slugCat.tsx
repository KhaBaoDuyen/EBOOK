import CategogyForm from "~/components/admin/from/category";
import type { ICategory } from "~/interfaces/category.interface";
import { useNotify } from "~/context/NotifyContext";
import { useParams, useNavigate } from "@remix-run/react";
import { log } from "console";

export default function UpdateCatPage() {
  const { setNotify } = useNotify();
  const { slugCat } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    console.log("from", formData);
    try {
      const res = await fetch(`/api/categogy/${slugCat}`, {
        method: "PUT",
        body: formData,
      });
      if (res.status === 200 || res.status === 201) {
        setNotify({
          open: true,
          type: "success",
          title: "Cập nhật thể loại thành công!",
          message: "Thể loại đã được cập nhật vào hệ thống.",
        });
        return navigate("/admin/categories");
      } else if (res.status === 400) {
        const data = await res.json();
        setNotify({
          open: true,
          type: "error",
          title: "Lỗi khi cập nhật thể loại!",
          message: data.message || "Vui lòng kiểm tra lại thông tin hoặc thử lại sau.",
        });
        return;
      } else {
        setNotify({
          open: true,
          type: "error",
          title: "Lỗi khi cập nhật thể loại!",
          message: "Vui lòng kiểm tra lại thông tin hoặc thử lại sau.",
        });
        return;
      }


    } catch (err: any) {
      console.log("Lỗi khi cập nhật =>", err.message);
      setNotify({
        open: true,
        type: "error",
        title: "Kết nối thất bại!",
        message: "Không thể kết nối đến máy chủ.",
      });
      return;
    }

  };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4 text-white">Xem thể loại</h1>
      <CategogyForm key={slugCat} slugParam={slugCat} onSubmit={handleSubmit} />
    </div>
  );
}
