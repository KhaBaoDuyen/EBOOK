import { Bookmark, BookmarkMinus } from "lucide-react";
import { useState } from "react";
import { toggleBookmark } from "~/services/bookmark.library.service";
import type IBookmarkButton from "./BookmarkButton.interface";


export default function BookmarkButton({
    bookId,
    pageIndex,
    isBookmarked = false,
}: IBookmarkButton) {
    const [isSaved, setIsSaved] = useState(isBookmarked);
    const [loading, setLoading] = useState(false);

    const handleBookmark = async () => {
        try {
            setLoading(true);
            const res = await toggleBookmark(bookId, pageIndex, isSaved);
            if (res.status === 200) {
                setIsSaved(!isSaved);
            }
        } catch (err) {
            console.error("Lỗi khi toggle bookmark:", err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div
            className="cursor-pointer hover:text-white transition-all duration-200"
            onClick={handleBookmark}
            title={isSaved ? "Bỏ đánh dấu trang này" : "Đánh dấu trang này"}
        >
            {loading ? (
                <span className="text-gray-400 text-xs">Đang lưu...</span>
            ) : isSaved ? (
                <BookmarkMinus className="text-green-400 w-5 h-5" />
            ) : (
                <Bookmark className="w-5 h-5" />
            )}
        </div>
    );
}
