import CategogyForm from "~/components/admin/from/category";
import type { ICategory } from "~/interfaces/category.interface";
import { useNotify } from "~/context/NotifyContext";

export default function CreateCatPage() {
  const { setNotify } = useNotify();

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });
      if (res.status === 200 || res.status === 201) {
        setNotify({
          open: true,
          type: "success",
          title: "Thêm thể loại thành công!",
          message: "Thể loại đã được lưu vào hệ thống.",
        });
        return true;
      } else if (res.status === 400) {
        const data = await res.json();
        setNotify({
          open: true,
          type: "error",
          title: "Lỗi khi thêm thể loại!",
          message: data.message || "Vui lòng kiểm tra lại thông tin hoặc thử lại sau.",
        });
        return false;
      } else {
        setNotify({
          open: true,
          type: "error",
          title: "Lỗi khi thêm thể loại!",
          message: "Vui lòng kiểm tra lại thông tin hoặc thử lại sau.",
        });
        return false;
      }

     
    } catch (err: any) {
      console.log("Lỗi khi thêm =>", err.message);
      setNotify({
        open: true,
        type: "error",
        title: "Kết nối thất bại!",
        message: "Không thể kết nối đến máy chủ.",
      });
    }

  };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4 text-[var(--input-text)]">Thêm Thể Loại</h1>
      <CategogyForm onSubmit={handleSubmit} />
    </div>
  );
}
