import { useEffect, useState } from "react";
import { Eye, Trash2, Search } from "lucide-react";
import { getAllBook } from "~/services/book.service";
import { Link } from "@remix-run/react";

import type { IBook } from "../interfaces/book.interface";
import PaginationComponent from "~/components/Pagination";
import ButtonCustom from "../components/Button";
import CusttomLoading from "../components/Loading";
import ConfirmDeleteDialog from "~/components/FromDelete";
import { useNotify } from "~/context/NotifyContext";
import { set } from "mongoose";

export default function Book() {
    const [books, setBooks] = useState<IBook[]>([]);
    const [search, setSearch] = useState("");
    const { setNotify } = useNotify();

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const items = 5;


    const startIndex = (page - 1) * items;
    const pagination = books.slice(startIndex, startIndex + items);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            setLoading(true);
            const data = await getAllBook();
            setBooks(data.data);
            // console.log("data book=>", data.data);

        } catch (err) {
            console.log("Lỗi khi lấy dữ liệu", err);
        } finally {
            setLoading(false);
        }
    };

    //-----------------[ XOA SACH ]-----------------------
    const [open, setOpen] = useState(false);
    const [selectedSlug, setSelectedSlug] = useState<string | undefined>(undefined);
    const selectedBook = books.find((b) => b.slug === selectedSlug);

    const handleOpenDialog = (slug: string) => {
        setSelectedSlug(slug);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedSlug(undefined);
    };

    const handleConfirmDelete = async () => {
        if (!selectedBook) return;
        try {
            const res = await fetch(`/api/book/${selectedBook.slug}`,
                { method: "DELETE" });
            const data = await res.json();

            if (res.ok) {
                setNotify({
                    open: true,
                    type: "success",
                    title: "Xóa sách thành công!",
                    message: "Cuốn sách đã được xóa khỏi hệ thống.",
                });
                return getAll();
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
    //-----------------[ TIM KIEM ]-----------------------
    const keyword = search.trim().toLowerCase();
    const searchBook = books.filter((book) =>
        keyword
            ? book.title.toLowerCase().includes(keyword) ||
            book.authorId?.name.toLowerCase().includes(keyword)
            : false
    );

    return (
        <div className="p-6">
            <span className="flex items-center justify-between">
                <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100"> Quản lý Sách </h1>
                <ButtonCustom variant="contained" href="/admin/book/create">
                    Thêm sách +
                </ButtonCustom>
            </span>
            <div className="relative mb-4 w-72">
                <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500 size-5" />
                <input type="text" placeholder="Tìm kiếm sách..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg 
             border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 pr-3 py-2 text-gray-900 dark:text-gray-100 
             focus:border-green-700 dark:focus:border-green-500 focus:ring focus:ring-green-200 dark:focus:ring-green-800" />
                {search && (
                    <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                        {searchBook.length > 0 ? (
                            searchBook.map((book) => (
                                <Link
                                    key={book._id}
                                    to={`/admin/book/${book.slug}`}
                                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <img
                                        src={`/uploads/bannerBook/${book.cover}`}
                                        alt={book.title}
                                        className="w-10 h-14 object-cover rounded"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            {book.title}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {book.authorId?.name || "Không rõ tác giả"}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-3">
                                Không tìm thấy kết quả nào
                            </p>
                        )}
                    </div>
                )}
            </div>



            <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                            <th className="p-3">#</th>
                            <th className="p-3 w-[10%]">Ảnh bìa</th>
                            <th className="p-3 w-[20%]">Tên</th>
                            <th className="p-3 w-[20%]">Loại sách</th>
                            <th className="p-3">Tác giả</th>
                            <th className="p-3">Trạng thái</th>
                            <th className="p-3">Ngày tạo</th>
                            <th className="p-3 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="w-full items-center justify-center">
                        {loading ? (
                            <tr>
                                <td colSpan={8} className="p-6">
                                    <div className="flex justify-center items-center h-[200px]">
                                        <CusttomLoading />
                                    </div>
                                </td>
                            </tr>
                        ) : pagination.length > 0 ? (
                            pagination.map((book, i) => (
                                <tr
                                    key={book._id}
                                    className="border-t border-gray-200 dark:border-gray-700"
                                >
                                    <td className="p-3">{startIndex + i + 1}</td>
                                    <td className="p-3">
                                        <img src={`/uploads/bannerBook/${book.cover}`} className="rounded-md" alt="anh bia" />
                                    </td>
                                    <td className="p-3  ">
                                        <p className="line-clamp-4">{book.title} </p> </td>
                                    <td className="p-3 ">
                                        <p className="line-clamp-4"> {book.categories.map((cat) => cat.name).join(", ")} </p>
                                    </td>
                                    <td className="p-3">{book.authorId?.name}</td>
                                    <td className="p-3">
                                        {book.status === 1 ? (
                                            <span className="rounded bg-green-100 dark:bg-green-900 px-2 py-1 text-xs text-green-700 dark:text-green-300">
                                                Hiển thị
                                            </span>
                                        ) : (
                                            <span className="rounded bg-red-100 dark:bg-red-900 px-2 py-1 text-xs text-red-700 dark:text-red-300">
                                                Ẩn
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        {new Date(book.releaseDate).toLocaleDateString("vi-VN")}
                                    </td>
                                    <td className="text-center">
                                        <div className="inline-flex items-center justify-center gap-2">
                                            <Link
                                                to={`/admin/book/${book.slug}`}
                                                className="rounded bg-blue-100 dark:bg-blue-900 p-2 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
                                                title="Xem"
                                            >
                                                <Eye className="size-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleOpenDialog(book.slug)}
                                                className="rounded bg-red-100 dark:bg-red-900 p-2 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
                                                title="Xóa"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="p-4 text-center text-gray-500 dark:text-gray-400">
                                    Không có sách nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <PaginationComponent
                    totalItems={books.length}
                    itemsPerPage={items}
                    currentPage={page}
                    onPageChange={setPage} />
            </div>
            <ConfirmDeleteDialog
                open={open}
                title={selectedBook?.title}
                onClose={handleCloseDialog}
                onConfirmDelete={handleConfirmDelete}
            />
        </div>
    );
}
