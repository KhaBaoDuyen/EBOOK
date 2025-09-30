import { useParams } from "react-router";

export default function SubCategoryPage() {
  const { category, sub } = useParams(); 
 
  return (
    <div className="p-5 text-white">
      <h1 className="text-2xl font-bold">
        Trang Submenu: {sub} (thuộc {category})
      </h1>
      <p>Đây là trang riêng cho submenu "{sub}" trong category "{category}".</p>
     </div>
  );
}
