import { useEffect, useState } from "react";
import CardLibrary from "~/components/users/Cards/CardLibrary";
import { getLibraryByUser } from "~/services/library.service";

export default function UserFavorite() {
    const [favoriteBooks, setFavoriteBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getFavoriteBooks = async () => {
        try {
            setLoading(true);
            const res = await getLibraryByUser();

            if (res?.data?.data?.isFavorite) {
                setFavoriteBooks(res.data.data.isFavorite);
            }
            
            console.log("Danh sách yêu thích =>", res);
        } catch (error: any) {
            console.log("Lỗi khi lấy danh sách yêu thích:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFavoriteBooks();
    }, []);

    return (
        <div className="min-h-screen text-white px-5">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-semibold mb-8 text-white">
                    Danh sách yêu thích
                </h1>
                <div className="bg-[#1e1e2d] p-4 rounded-xl">
                    {loading ? (
                        <p className="text-center text-gray-400 mt-12">
                            Đang tải dữ liệu...
                        </p>
                    ) : favoriteBooks.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {favoriteBooks.map((lib: any) => (
                                <CardLibrary
                                    key={lib._id}
                                    book={{
                                        id: lib.bookId?._id,
                                        title: lib.bookId?.title,
                                        author: lib.bookId?.authorId?.name || "Không rõ tác giả",
                                        cover:
                                            lib.bookId?.cover || "/Images/Main/book-default.png",
                                        progress: lib.progress || 0,
                                        isFinished: lib.isFinished,
                                        isSaved: lib.isSaved,
                                        slug: lib.bookId?.slug,
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 mt-12">
                            Bạn chưa thêm quyển sách nào vào danh sách yêu thích.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
