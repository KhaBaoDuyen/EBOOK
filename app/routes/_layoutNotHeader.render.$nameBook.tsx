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

  useEffect(() => {
    const cachedBook = sessionStorage.getItem("currentBook");
    if (cachedBook) setBookInfo(JSON.parse(cachedBook));
  }, [nameBook]);

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
    // Chuẩn hóa
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

    // Fallback cũ: tìm thô trong HTML (ít khi cần)
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


  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1F2937] text-white">
      <header className="absolute top-0 left-0 right-0 h-14 bg-[#111827] border-b border-gray-700 flex items-center justify-between px-4 z-20">
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

      <div className="absolute top-14 bottom-0 left-0 right-0 flex items-center justify-center">
        <div
          ref={viewerRef}
          className="rounded-lg shadow-lg overflow-hidden p-6 text-black"
          style={{
            width: "60%",
            height: "80vh",
            background: bgColor,
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
            "Đang tải nội dung..."
          )}
        </div>

        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/70 p-2 rounded-full z-10 disabled:opacity-40"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === pages.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/70 p-2 rounded-full z-10 disabled:opacity-40"
        >
          <ChevronRight />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-[#111827] h-8 px-4 flex items-center justify-center text-xs text-gray-300">
          Trang {currentPage + 1} / {pages.length}
        </div>
      </div>

      <aside
        className={`absolute top-14 bottom-0 right-0 w-[280px] bg-[#111827] border-l border-gray-700 transform transition-transform duration-300 z-30 ${showRight ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4">
          <button
            onClick={() => setShowRight(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
          <h2 className="font-medium mb-3 text-green-400">Danh mục chương</h2>
          {chapters.length > 0 ? (
            <div className="max-h-[80vh] overflow-y-auto pr-2 text-sm">
              {renderChapters(chapters)}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Đang tải mục lục...</p>
          )}
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
            <label className="block text-gray-300 mb-1">Màu nền</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
