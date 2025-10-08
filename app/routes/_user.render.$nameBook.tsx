import { useEffect, useRef, useState } from "react";
import { useParams } from "@remix-run/react";
import { initEpubViewer } from "~/utils/epubViewer";
import { getBookBySlug } from "~/services/book.service";

export default function UserRenderBook() {
  const { nameBook } = useParams();
  const viewerRef = useRef<HTMLDivElement>(null);
  const [bookInfo, setBookInfo] = useState<any>(null);
  const [book, setBook] = useState<any>(null);
  const [rendition, setRendition] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [current, setCurrent] = useState<any>(null);

   useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookBySlug(nameBook as string);
        setBookInfo(data);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin sách:", err);
      }
    };
    fetchBook();
  }, [nameBook]);

   useEffect(() => {
    if (!bookInfo?.filePath) return;

    initEpubViewer({
      containerRef: viewerRef.current!,
      filePath: bookInfo.filePath,  
      onReady: ({ book, rendition, chapters }) => {
        setBook(book);
        setRendition(rendition);
        setChapters(chapters);
      },
      onLocationChange: (loc) => setCurrent(loc),
    });
  }, [bookInfo]);

  const handleNext = () => rendition?.next();
  const handlePrev = () => rendition?.prev();
  const goToChapter = (href: string) => rendition?.display(href);

  return (
    <div className="flex flex-col h-screen bg-[#1F2937] text-white">
      {/* Thanh tiêu đề */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          📘 {bookInfo?.title || "Đang tải..."}
        </h1>
        <p className="text-sm text-gray-300">{bookInfo?.author}</p>
      </div>

      <div className="flex flex-1">
        {/* Menu chương */}
        <aside className="w-[260px] border-r border-gray-700 overflow-y-auto bg-[#111827] p-3">
          <h2 className="font-medium mb-2 text-green-400">📑 Danh mục chương</h2>
          <ul className="space-y-2 text-sm">
            {chapters.map((ch, idx) => (
              <li key={idx}>
                <button
                  onClick={() => goToChapter(ch.href)}
                  className="text-left hover:text-green-400"
                >
                  {ch.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Viewer EPUB */}
        <main className="flex-1 relative">
          <div
            ref={viewerRef}
            className="w-full h-full bg-[#F5E6B3] text-black overflow-hidden"
          ></div>

          {/* Nút điều hướng */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
          >
            ▶
          </button>

           <div className="absolute bottom-0 left-0 right-0 bg-gray-900 p-2 flex justify-between text-xs text-gray-300">
            <span>{current ? `CFi: ${current.start.cfi}` : "Chưa chọn chương"}</span>
            <span>
              {book && book.locations
                ? `${(
                    book.locations.percentageFromCfi(current?.start?.cfi || 0) * 100
                  ).toFixed(1)}%`
                : ""}
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
