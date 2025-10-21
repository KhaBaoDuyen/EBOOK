import { useEffect, useState } from "react";
import CardLibrary from "~/components/users/Cards/CardLibrary";
import { getLibraryByUser } from "~/services/library.service";

export default function UserLibrary() {
  const [activeTab, setActiveTab] = useState<"reading" | "finished" | "saved">("reading");
  const [reading, setReading] = useState<any[]>([]);
  const [finished, setFinished] = useState<any[]>([]);
  const [saved, setSaved] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllLibraryByUser = async () => {
    try {
      setLoading(true);
      const res = await getLibraryByUser();
      if (res?.data?.data) {
        const data = res.data.data;
        setReading(data.reading || []);
        setFinished(data.finished || []);
        setSaved(data.saved || []);     
        console.log("dulieu getLibraryByUser =>", data);
      }

      
    } catch (error: any) {
      console.log("Lỗi khi lấy getLibraryByUser:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllLibraryByUser();
  }, []);

  const filteredBooks =
    activeTab === "reading"
      ? reading
      : activeTab === "finished"
        ? finished
        : saved;

  return (
    <div className="min-h-screen text-white px-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-white">
          Thư viện của tôi
        </h1>
        <div className="bg-[#1e1e2d] p-4 rounded-xl">
          <div className="flex border-b border-white/10 mb-8">
            {[
              { key: "reading", label: "Đang đọc" },
              { key: "finished", label: "Đã đọc" },
              { key: "saved", label: "Đã lưu" },
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

          {loading ? (
            <p className="text-center text-gray-400 mt-12">Đang tải dữ liệu...</p>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((lib: any) => (
                <CardLibrary
                  key={lib._id}
                  book={{
                    id: lib.bookId?._id,
                    title: lib.bookId?.title,
                    author: lib.bookId?.authorId.name || "Không rõ tác giả",
                    cover: lib.bookId?.cover || "/Images/Main/book-default.png",
                    progress: lib.progress || 0,
                    isFinished: lib.isFinished,
                    isSaved: lib.isSaved,
                    slug: lib.bookId.slug,
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-12">
              Chưa có sách nào trong mục này.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
