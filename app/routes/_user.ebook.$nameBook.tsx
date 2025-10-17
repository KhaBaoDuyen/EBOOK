import Button from "../components/users/Buttons/Button";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import books from "../../public/data/listBook.json";
import { useParams } from "@remix-run/react";

import { getBookBySlug } from "~/services/book.service";
import type { IBook } from "~/interfaces/book.interface";

import Section from "../components/users/Section";
import { Link } from "@remix-run/react";
import { Eye } from "lucide-react";

export default function Ebook() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const { nameBook } = useParams();

    //-----------------[ LẤY DỮ LIỆU SÁCH THEO SLUG ]-------------------------------
    const [book, setBook] = useState<IBook | null>(null);
    const [authorBooks, setAuthorBooks] = useState<IBook[]>([]);

    const getBySlug = async (nameBook: string) => {
        if (!nameBook) return null;

        try {
            const res = await getBookBySlug(nameBook);
            if (res.status === 200) {
                setBook(res.data);
                setAuthorBooks(res.relateBook || []);
                sessionStorage.setItem("currentBook", JSON.stringify(res.data));
                return res.data;
            } else {
                console.error("Lỗi khi lấy dữ liệu sách:", res.message);
                return null;
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            return null;
        }
    }

    //-----------------[ HIEN THI COUNT VIEW ]-------------------------
    const [view, setView] = useState<number | null>(0);

    const viewBook = async (nameBook: string) => {
        try {
            const res = await fetch(`/api/book/${nameBook}/view`);
            const data = await res.json();

            if (data?.success && typeof data.viewCount === "number") {
                setView(data.viewCount);
            } else {
                console.warn("Không có viewCount trong response:", data);
                setView(0);
            }

        } catch (err: any) {
            console.log("loi khi dem luot xem =>", err.message);
        }
    }
    //-----------------[ GOI DU LIEU ]-------------------------------

    useEffect(() => {
        getBySlug(nameBook);
        viewBook(nameBook);
    }, [nameBook]);


    return (
        <main className="  py-10 px-5 flex flex-col gap-5 container mx-auto ">
            <span className="mt-[7rem] flex flex-col gap-10">
                <span className="text-white font-bold text-sm">
                    <Link to="/">Trang chủ</Link> / <Link to={`${book?.categories[0]?.slug}`}>{book?.categories[0].name}</Link> / <span className="text-gray-400">{book?.title || "Đang tải..."}</span>
                </span>
                <div className="flex  gap-10 ">
                    <div className="flex ">
                        <img
                            src={book?.cover || "/images/book-default.png"}
                            alt="Bìa sách"
                            className="rounded-xl shadow-lg max-h-[500px] object-cover"
                        />
                    </div>

                    <div className="flex flex-col h-[30rem] overflow-y-auto scrollbar-hide w-[50%] gap-3 text-white">
                        <h1 className="text-3xl font-bold">
                            {book?.title || "Đang tải..."}
                        </h1>

                        <span className="flex flex-col gap-5">
                            <div className="flex gap-5">
                                <p className="!text-gray-500">Lượt xem</p>
                                <p className="text-white font-medium">{view || 0}</p>
                            </div>

                            <div className="grid border-b-1 py-5 border-b-white/30 grid-cols-2 gap-y-5 text-sm md:text-base">
                                <div>
                                    <p className="!text-gray-500">Tác giả</p>
                                    <p className="text-white font-medium">{book?.authorId?.name}</p>
                                </div>
                                <div className="!text-gray-600">
                                    <p className="!text-gray-500">Thể loại</p>
                                    <p className="text-white font-medium">
                                        {book?.categories?.map((cat) => cat.name).join(", ") || "Đang cập nhật"}
                                    </p>
                                </div>
                                <div>
                                    <p className="!text-gray-500">Nhà xuất bản</p>
                                    <p className="text-white font-medium">{book?.publisher}</p>
                                </div>

                                <div>
                                    <p className="!text-gray-500">Phát hành</p>
                                    <p className="text-white font-medium">
                                        {book?.releaseDate
                                            ? new Date(book.releaseDate).toLocaleDateString("vi-VN")
                                            : "Đang cập nhật"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-gray-400">Chọn nội dung</span>
                                <div className="flex rounded-lg bg-gray-700 p-1">
                                    <button
                                        onClick={() => setIsExpanded(true)}
                                        className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isExpanded ? "bg-pri text-white" : "text-gray-400"
                                            }`}
                                    >
                                        Đầy đủ
                                    </button>
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className={`px-4 py-2 rounded-md font-medium transition-colors duration-200
                                     ${!isExpanded ? "bg-pri text-white" : "text-gray-400"
                                            }`}
                                    >
                                        Tóm tắt
                                    </button>
                                </div>
                            </div>
                            <Button
                                text="Đọc sách"
                                icon={faBookOpen}
                                href={`/render/` + (book?.slug)}
                                iconPosition="left"
                            />

                            <div>
                                <p
                                    className={`text-gray-200 text-justify ${isExpanded ? "" : "line-clamp-5"
                                        }`} dangerouslySetInnerHTML={{ __html: book?.description || "Đang tải cập nhật..." }}
                                >
                                </p>

                                <button
                                    onClick={toggleExpand}
                                    className="font-pri font-bold mt-2 "
                                >
                                    {isExpanded ? "Rút gọn" : "Xem thêm"}
                                </button>
                            </div>
                        </span>



                    </div>
                </div>

                <span>
                    {authorBooks.length > 0 &&
                        (<Section title="Cùng tác giả" books={authorBooks} />)}
                    <Section title="Các sách khác" books={books} />
                </span>
            </span>
        </main>
    );
}
