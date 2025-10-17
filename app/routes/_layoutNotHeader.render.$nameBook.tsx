import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "@remix-run/react";
import { loadEpubContent } from "~/utils/epubViewerCustom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Menu,
  Type,
  X,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

import Loading from "~/components/Loading";

export default function UserRenderBook() {
  const { nameBook } = useParams();
  const [bookInfo, setBookInfo] = useState<any>(null);
  const [pages, setPages] = useState<string[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showRight, setShowRight] = useState(false);
  const [showTextOptions, setShowTextOptions] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [bgColor, setBgColor] = useState("#F5E6B3");
  const [openNodes, setOpenNodes] = useState<Record<string, boolean>>({});
  const viewerRef = useRef<HTMLDivElement>(null);
  const [anchorIndex, setAnchorIndex] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState(0); // 0: mục lục, 1: dấu trang, 2: ghi chú
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [noteText, setNoteText] = useState("");

  // Giả lập thêm/xoá bookmark
  function removeBookmark(index: number) {
    setBookmarks((prev) => prev.filter((_, i) => i !== index));
  }

  // Ghi chú đơn giản
  function addNote() {
    if (!noteText.trim()) return;
    setNotes((prev) => [...prev, { text: noteText }]);
    setNoteText("");
  }


  useEffect(() => {
    const cachedBook = sessionStorage.getItem("currentBook");
    if (cachedBook)
      setBookInfo(JSON.parse(cachedBook));

  }, [nameBook]);

  console.log("bookInfo", bookInfo);


  useEffect(() => {
    if (!bookInfo?.filePath && !bookInfo?.fileUrl) return;
    const epubPath = bookInfo.fileUrl || bookInfo.filePath;
    const height = viewerRef.current?.clientHeight || 800;
    loadEpubContent(epubPath, height).then((res) => {
      setPages(res.pages);
      setChapters(res.chapters);
      setAnchorIndex(res.anchorIndex || {});
    });
  }, [bookInfo]);

  const goToHref = (href: string) => {
    if (!href) return;
    const [path, frag] = href.split("#");
    const base = path ? path.split("/").pop()! : undefined;
    const candidates = [
      path && frag ? `${path}#${frag}` : null,
      base && frag ? `${base}#${frag}` : null,
      frag ? `#${frag}` : null,
      path || null,
      base || null,
    ].filter(Boolean) as string[];

    for (const key of candidates) {
      const idx = anchorIndex[key];
      if (idx != null) {
        setCurrentPage(Math.max(0, Math.min(idx, pages.length - 1)));
        setShowRight(false);
        return;
      }
    }

    const safe = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(safe, "i");
    const found = pages.findIndex((p) => regex.test(p));
    if (found !== -1) {
      setCurrentPage(found);
      setShowRight(false);
    }
  };

  const renderChapters = (list: any[]) => (
    <ul className="ml-2 space-y-1">
      {list.map((ch: any) => (
        <li key={ch.id}>
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-green-400"
            onClick={() => {
              if (ch.subitems?.length > 0) toggleNode(ch.id);
              if (ch.href) goToHref(ch.href);
            }}
          >
            {ch.subitems?.length > 0 &&
              (openNodes[ch.id] ? <ChevronDown size={14} /> : <ChevronRightIcon size={14} />)}
            <span>{ch.label}</span>
          </div>
          {ch.subitems?.length > 0 && openNodes[ch.id] && (
            <div className="ml-4">{renderChapters(ch.subitems)}</div>
          )}
        </li>
      ))}
    </ul>
  );

  const handleNext = () =>
    setCurrentPage((p) => Math.min(p + 1, pages.length - 1));
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 0));
  const toggleNode = (id: string) =>
    setOpenNodes((prev) => ({ ...prev, [id]: !prev[id] }));


  useEffect(() => {
    const handler = (e: any) => {
      const target = e.target.closest(".chapter-link");
      if (target) {
        e.preventDefault();
        const href = target.getAttribute("data-href");
        const index = pages.findIndex(p =>
          new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(p)
        );
        if (index !== -1) setCurrentPage(index);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [pages]);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(".chapter-link") as HTMLElement | null;
      if (target) {
        e.preventDefault();
        e.stopPropagation();
        const href = target.getAttribute("data-href") || "";
        goToHref(href);
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [pages, anchorIndex]);


  const pastelColors = [
    { name: "Xanh dương ", color: "#A7C7E7" },
    { name: "Vàng ", color: "#FFF5BA" },
    { name: "Hồng ", color: "#FFD1DC" },
    { name: "Xanh lá ", color: "#BEECC5" },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1F2937] text-white">
      <header className="absolute shadow-xl top-0 left-0 right-0 h-14 bg-[#17171A] border-b border-gray-700 flex items-center justify-between px-4 z-20">
        <Link
          to={`/ebook/${bookInfo?.slug || ""}`}
          className="flex items-center gap-2 text-green-400 hover:text-green-300"
        >
          <ArrowLeft size={18} /> Trở về
        </Link>
        <h1 className="text-base font-semibold truncate w-[60%] text-center">
          {bookInfo?.title || "Đang tải..."}
        </h1>
        <div className="flex gap-4 items-center text-gray-300">
          <Type
            className="cursor-pointer hover:text-white"
            onClick={() => setShowTextOptions((v) => !v)}
          />
          <Menu
            className="cursor-pointer hover:text-white"
            onClick={() => setShowRight((v) => !v)}
          />
        </div>
      </header>
      <div
        className="flex h-screen"
        style={{ backgroundColor: bgColor }}
      >
        <aside className="w-[26%] shadow-lg pt-[5rem] max-w-[360px] min-w-[260px] bg-customGray px-5 py-6 border-r border-white/20 overflow-y-auto">
          <div className="pb-4 md:flex md:flex-row flex-col gap-5 mb-4 border-b border-white/20">
            <div className="md:flex-[4] md:w-2/5 w-full">
              <img
                src={bookInfo?.cover}
                alt={bookInfo?.title}
                className="w-full h-auto rounded-md object-cover"
              />
            </div>

            <div className="md:flex-[6] md:w-3/5 w-full mt-4 space-y-1">
              <h1 className="text-lg font-semibold">{bookInfo?.title || "—"}</h1>
              <p className="text-sm text-white/70">
                {bookInfo?.authorId?.name || "Không rõ tác giả"}
              </p>
            </div>
          </div>


          <div
            className="prose prose-invert prose-sm max-w-none text-white/90"
            dangerouslySetInnerHTML={{ __html: bookInfo?.description || "" }}
          />
        </aside>

        <section className="flex-1 relative flex items-center justify-center">
          <div
            ref={viewerRef}
            className="rounded-lg overflow-hidden p-6 text-black"
            style={{
              width: "70%",
              height: "80vh",
              fontSize: `${fontSize}%`,
              lineHeight: "1.8",
              textAlign: "justify",
            }}
          >
            {pages.length > 0 ? (
              <div
                className="book-content prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: pages[currentPage] }}
              />
            ) : (
              <div className="flex h-2/3 justify-center items-center">
                <Loading />
              </div>
            )}
          </div>

          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/70 p-2 rounded-full z-10 disabled:opacity-40"
            aria-label="Trang trước"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === pages.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/70 p-2 rounded-full z-10 disabled:opacity-40"
            aria-label="Trang sau"
          >
            <ChevronRight />
          </button>

          <div className="absolute bottom-0 left-0 right-0 bg-[#111827] h-8 px-4 flex items-center justify-center text-xs text-gray-300">
            Trang {currentPage + 1} / {pages.length}
          </div>
        </section>
      </div>

      <aside
        className={`absolute top-18 rounded-md bottom-0 right-0 w-[320px] bg-black/80 border-l border-gray-700 transform transition-transform duration-300 z-30 ${showRight ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 relative h-full flex flex-col">
          <button
            onClick={() => setShowRight(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>

          <div className="flex bold mb-4 border-b border-gray-700">
            {["Mục lục", "Dấu trang", "Ghi chú"].map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex-1 py-2 text-sm font-medium transition ${activeTab === i
                  ? "text-green-400 border-b-2 border-green-400"
                  : "text-gray-400 hover:text-gray-200"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto pr-2 text-sm">
            {activeTab === 0 && (
              <>
                <h2 className="font-medium mb-3 text-green-400">Danh mục chương</h2>
                {chapters.length > 0 ? (
                  <div className="space-y-2">{renderChapters(chapters)}</div>
                ) : (
                  <p className="text-gray-400 text-sm">Đang tải mục lục...</p>
                )}
              </>
            )}

            {activeTab === 1 && (
              <>
                <h2 className="font-medium mb-3 text-green-400">Dấu trang của bạn</h2>
                {bookmarks.length > 0 ? (
                  <ul className="space-y-2">
                    {bookmarks.map((b, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-center bg-gray-800/50 p-2 rounded hover:bg-gray-700 cursor-pointer"
                        onClick={() => goToHref(b.href)}
                      >
                        <span>{b.title}</span>
                        <X
                          size={14}
                          className="text-gray-400 hover:text-red-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeBookmark(i);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">Chưa có dấu trang nào</p>
                )}
              </>
            )}

            {activeTab === 2 && (
              <>
                <h2 className="font-medium mb-3 text-green-400">Ghi chú</h2>
                <div className="space-y-3">
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Viết ghi chú tại đây..."
                    className="w-full bg-gray-800 text-gray-100 p-2 rounded outline-none resize-none"
                    rows={4}
                  />
                  <button
                    onClick={addNote}
                    className="w-full bg-green-600 hover:bg-green-500 text-white py-1 rounded"
                  >
                    Lưu ghi chú
                  </button>

                  {notes.length > 0 && (
                    <ul className="space-y-2">
                      {notes.map((n, i) => (
                        <li
                          key={i}
                          className="bg-gray-800/50 p-2 rounded hover:bg-gray-700 text-sm"
                        >
                          {n.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </aside>


      {showTextOptions && (
        <div className="absolute top-16 right-16 bg-gray-800 p-4 rounded-lg shadow-lg text-sm space-y-3 z-40">
          <div>
            <label className="block text-gray-300 mb-1">Cỡ chữ</label>
            <input
              type="range"
              min={80}
              max={150}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Màu nền</label>
            <div className="flex gap-3">
              {pastelColors.map((item) => (
                <button
                  key={item.color}
                  type="button"
                  onClick={() => setBgColor(item.color)}
                  className={`w-8 h-8 rounded-md border-2 transition ${bgColor === item.color
                    ? "border-green-400 scale-110"
                    : "border-gray-400"
                    }`}
                  style={{ backgroundColor: item.color }}
                  title={item.name}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
