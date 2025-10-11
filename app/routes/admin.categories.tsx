import { useEffect, useState } from "react";
import { Eye, Trash2, Search } from "lucide-react";
import { Link } from "@remix-run/react";

import { getAllCategory } from "~/services/category.service";
import type { ICategory } from "~/interfaces/category.interface";
import PaginationComponent from "~/components/Pagination";
import ButtonCustom from "../components/Button";
import CusttomLoading from "../components/Loading";
import ConfirmDeleteDialog from "~/components/FromDelete";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import { useNotify } from "~/context/NotifyContext";


export default function Categories() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const items = 10;
    const { setNotify } = useNotify();

    const startIndex = (page - 1) * items;
    const pagination = categories.slice(startIndex, startIndex + items);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            setLoading(true);
            const data = await getAllCategory();
            setCategories(data.data);
        } catch (err) {
            console.log("Lỗi khi lấy dữ liệu", err);
        } finally {
            setLoading(false);
        }
    };

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        Loading();
    }, [loading]);

    const Loading = () => {
        if (loading) {
            setProgress(0);
            const timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 400);
            return () => clearInterval(timer);
        }
    }

    //---------------[ XOA DANH MUC ]-----------------
    const [open, setOpen] = useState(false);
    const [selectedSlug, setSelectedSlug] = useState<string | undefined>(undefined);
    const [selectedCategories, setSelectedCategories] = useState<ICategory | undefined>(undefined);

    const handleOpenDialog = (slug: string) => {
        setOpen(true);
        setSelectedSlug(slug);
    }

    const handelCloseDialog = () => {
        setOpen(false);
        setSelectedSlug(undefined);
    }

    const handleConfirmDelete = async () => {
        if (!selectedSlug) return;
        try {
            const res = await fetch(`/api/categogy/${selectedSlug}`,
                { method: "DELETE" });
            const data = await res.json();

            if (res.ok) {
                setNotify({
                    open: true,
                    type: "success",
                    title: "Xóa danh mục thành công!",
                    message: "Cuốn danh mục đã được xóa khỏi hệ thống.",
                });
                return await getAll();
            } else {
                setNotify({
                    open: true,
                    type: "error",
                    title: "Lỗi khi xóa!",
                    message: data.message || "Vui lòng thử lại sau.",
                });
                return;
            }
        } catch (err: any) {
            console.error("Lỗi khi xóa:", err);
        }
    };

    //---------------[ TIM KEIM DANH MUC ]-----------------
    const keywourd = search.toLowerCase().trim();
    const searchCategogy = categories.filter((cat) =>
        cat.name.toLowerCase().includes(keywourd)
    );

    return (
        <div className="p-6">
            <span className="flex items-center justify-between">
                <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100"> Quản lý Loại sách </h1>
                <ButtonCustom variant="contained" href="/admin/cat/create">
                    Thêm Loại sách +
                </ButtonCustom>
            </span>
            <div className="relative mb-4 w-72">
                <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500 size-5" />
                <input type="text" placeholder="Tìm kiếm thể loại..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg 
             border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 pr-3 py-2 text-gray-900 dark:text-gray-100 
             focus:border-green-700 dark:focus:border-green-500 focus:ring focus:ring-green-200 dark:focus:ring-green-800" />
                {search && (
                    <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                        {searchCategogy.length > 0 ? (
                            searchCategogy.map((cat) => (
                                <Link to={`/admin/cat/${cat.slug}`} key={cat._id} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    {cat.name}
                                </Link>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-500 dark:text-gray-400">Không tìm thấy thể loại</div>
                        )
                        }
                    </div>
                )

                }

            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                            <th className="p-3">#</th>
                            <th className="p-3">Tên</th>
                            <th className="p-3">Đường dẫn</th>
                            <th className="p-3">Trạng thái</th>
                            <th className="p-3 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={8} className="p-6">
                                    <div className="flex justify-center items-center h-[200px]">
                                        <CusttomLoading />
                                    </div>
                                </td>
                            </tr>
                        ) : pagination.length > 0 ? (
                            pagination.map((cat, i) => (
                                <tr
                                    key={cat._id}
                                    className="border-t border-gray-200 dark:border-gray-700"
                                >
                                    <td className="p-3">{startIndex + i + 1}</td>
                                    <td className="p-3 line-clamp-3">{cat.name}</td>
                                    <td className="p-3">{cat.slug}</td>
                                    <td className="p-3">
                                        {cat.status === 1 ? (
                                            <span className="rounded bg-green-100 dark:bg-green-900 px-2 py-1 text-xs text-green-700 dark:text-green-300">
                                                Hiển thị
                                            </span>
                                        ) : (
                                            <span className="rounded bg-red-100 dark:bg-red-900 px-2 py-1 text-xs text-red-700 dark:text-red-300">
                                                Ẩn
                                            </span>
                                        )}
                                    </td>

                                    <td className="flex items-center justify-center gap-2 p-3">
                                        <Link to={`/admin/cat/${cat.slug}`}
                                            className="rounded bg-blue-100 dark:bg-blue-900 p-2 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
                                            title="Xem"
                                        >
                                            <Eye className="size-4" />
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleOpenDialog(cat.slug);
                                            }}
                                            className="rounded bg-red-100 dark:bg-red-900 p-2 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
                                            title="Xóa"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="p-4 text-center text-gray-500 dark:text-gray-400">
                                    Không có danh mục nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <PaginationComponent
                    totalItems={categories.length}
                    itemsPerPage={items}
                    currentPage={page}
                    onPageChange={setPage} />
            </div>
            <ConfirmDeleteDialog
                open={open}
                title={selectedCategories?.name}
                onClose={handelCloseDialog}
                onConfirmDelete={handleConfirmDelete}
            />
        </div>
    );
}
