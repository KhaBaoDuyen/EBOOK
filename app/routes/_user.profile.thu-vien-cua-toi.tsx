import { useState } from "react";
import { BookOpen, Bookmark, CheckCircle, Clock3 } from "lucide-react";
import CardLibrary from "~/components/users/Cards/CardLibrary";

export default function UserLibrary() {
    const [activeTab, setActiveTab] = useState<"reading" | "finished" | "saved">("reading");

    const books = [
        {
            id: 1,
            title: "Tư Duy Ngược",
            author: "Nguyễn Anh Dũng",
            cover: "https://res.cloudinary.com/dyrkozszp/image/upload/v1760196638/smartbook/bannerBook/kbtv3j6xzsrcucg6ggfl.jpg",
            progress: 0.42,
            isFinished: false,
            isSaved: true,
        },
        {
            id: 2,
            title: "Đắc Nhân Tâm",
            author: "Dale Carnegie",
            cover: "https://res.cloudinary.com/dyrkozszp/image/upload/v1760196638/smartbook/bannerBook/kbtv3j6xzsrcucg6ggfl.jpg",
            progress: 1,
            isFinished: true,
            isSaved: true,
        },
        {
            id: 3,
            title: "Khéo Ăn Nói Sẽ Có Được Thiên Hạ",
            author: "Trác Nhã",
            cover: "https://res.cloudinary.com/dyrkozszp/image/upload/v1760196638/smartbook/bannerBook/kbtv3j6xzsrcucg6ggfl.jpg",
            progress: 0,
            isFinished: false,
            isSaved: true,
        },
    ];

    const filteredBooks =
        activeTab === "reading"
            ? books.filter((b) => b.progress > 0 && !b.isFinished)
            : activeTab === "finished"
                ? books.filter((b) => b.isFinished)
                : books.filter((b) => b.isSaved);

    return (
        <div className="min-h-screen  text-white px-5">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-semibold mb-8 text-white">
                    Thư viện của tôi
                </h1>
                <div className="bg-[#1e1e2d] p-4">
                    <div className="flex bg-[#1e1e2d] border-b border-white/10 mb-8">
                        {[
                            { key: "reading", label: "Đang đọc" },
                            { key: "finished", label: " Đã đọc" },
                            { key: "saved", label: " Đã lưu" },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as any)}
                                className={`px-5 py-2 text-sm font-medium transition-all border-b-2 ${activeTab === tab.key
                                    ? "text-[var(--primary)] border-[var(--primary)]"
                                    : "text-gray-400 border-transparent hover:text-[var(--primary-hover)]"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredBooks.map((book) => (
                            <CardLibrary key={book.id} book={book} />
                        ))}
                    </div>

                    {filteredBooks.length === 0 && (
                        <p className="text-center text-gray-400 mt-12">
                            Chưa có sách nào trong mục này.
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
}
