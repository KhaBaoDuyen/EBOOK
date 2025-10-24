import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";
import { updateLibraryProgress } from "~/services/library.service";

export default function SaveButton({ bookId }: { bookId: string }) {
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleToggleSave = async () => {
        try {
            setLoading(true);
            if (!bookId) return;
            const formData = new FormData();

            formData.append("bookId", bookId);
            formData.append("isSaved", (!isSaved).toString());

            const res = await fetch("/api/library", {
                method: "PUT",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                console.log(" Cập nhật isSaved:", data);
                setIsSaved(!isSaved);
            } else {
                console.error(" Lỗi khi cập nhật:", data);
            }
        } catch (err) {
            console.error("Lỗi khi toggle isSaved:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cursor-pointer hover:text-white" onClick={handleToggleSave}>
            {loading ? (
                <span className="text-gray-400 text-sm">Đang lưu...</span>
            ) : isSaved ? (
                <BookmarkCheck className="text-green-400" />
            ) : (
                <Bookmark />
            )}
        </div>
    );
}
