import CategogyForm from "~/components/admin/from/category";
import type { ICategory } from "~/interfaces/category.interface";

export default function CreateCatPage() {
  const handleSubmit = (data: ICategory) => {
    console.log("Dữ liệu thêm thể loại:", data);

   };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4 text-white">Thêm Thể Loại</h1>
      <CategogyForm onSubmit={handleSubmit} />
    </div>
  );
}
