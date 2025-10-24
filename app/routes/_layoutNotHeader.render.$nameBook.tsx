import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "@remix-run/react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Menu,
  Info,
  Type,
  X,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

//-----------------------[ SERVICES ]-------------------------
import { updateLibraryProgress } from "~/services/library.service";
import { getLibraryProgress } from "~/services/library.service";
import { createNote, getNotesByBook } from "~/services/note.service";

//-----------------------[ COMPONENT ]------------------------
import AddNotePopup from "~/components/users/Ui/AddNotePopup";
import SaveButton from "~/components/users/Buttons/Button-SaveBook";
import Loading from "~/components/Loading";
import TextOptionsPanel from "~/components/users/Ui/TextOptionsPanel";
import BookmarkButton from "~/components/users/Buttons/Bookmark-book";
//-----------------------[ UTILS - CONTEXT ]------------------
import { useNotify } from "~/context/NotifyContext";
import { formatDateTime } from "~/utils/formatDateTime";
import { loadEpubContent } from "~/utils/epubViewerCustom";


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
  const [activeTab, setActiveTab] = useState(0);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [noteText, setNoteText] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{ show: boolean; text: string; x: number; y: number }>({ show: false, text: "", x: 0, y: 0 });
  const [noteColor, setNoteColor] = useState("#FFF59D");
  const { setNotify } = useNotify();
  const progressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showInfo, setShowInfo] = useState(true);

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

  useEffect(() => {
    if (!bookInfo?._id) return;
    (async () => {
      try {
        const res = await getNotesByBook(bookInfo._id);
        const noteList = res?.data || [];
        setNotes(noteList);
        const contentEl = viewerRef.current;
        if (contentEl && pages.length > 0 && noteList.length > 0) {
          let html = pages[currentPage];
          noteList
            .filter((n: any) => n.pageIndex === currentPage)
            .forEach((n: any) => {
              const escaped = n.highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
              const regex = new RegExp(escaped, "i");
              html = html.replace(regex, `<span style="background-color:${n.color};" class="note-highlight">${n.highlight}</span>`);
            });
          contentEl.innerHTML = html;
        }
      } catch { }
    })();
  }, [bookInfo, currentPage, pages]);

  const handlePageChange = async (percent: number) => {
    try {
      await updateLibraryProgress(bookInfo._id, percent);
      if (percent >= 1) {
        setNotify({
          open: true,
          type: "success",
          title: "Chúc mừng bạn đã hoàn thành!",
          message: "Tuyệt vời! Bạn đã hoàn tất quyển sách này. Hãy tiếp tục hành trình đọc của mình nhé!",
        });
      }
    } catch { }
  };

  const percent = pages.length > 0 ? (currentPage + 1) / pages.length : 0;
  useEffect(() => {
    if (!pages.length) return;
    if (progressTimer.current) clearTimeout(progressTimer.current);
    progressTimer.current = setTimeout(() => {
      if (percent > 0 && isFinite(percent)) handlePageChange(percent);
    }, 1000);
    return () => {
      if (progressTimer.current) clearTimeout(progressTimer.current);
    };
  }, [currentPage, pages.length]);

  useEffect(() => {
    if (!bookInfo?.filePath && !bookInfo?.fileUrl || !bookInfo?._id) return;
    const loadBookAndProgress = async () => {
      try {
        setLoading(true);
        const epubPath = bookInfo.fileUrl || bookInfo.filePath;
        const height = viewerRef.current?.clientHeight || 800;
        const [res, progressData] = await Promise.all([loadEpubContent(epubPath, height), getLibraryProgress(bookInfo._id)]);
        setPages(res.pages);
        setChapters(res.chapters);
        setAnchorIndex(res.anchorIndex || {});
        const savedProgress = progressData?.progress || 0;
        if (savedProgress > 0 && res.pages?.length > 0) {
          const pageIndex = Math.floor(savedProgress * res.pages.length);
          setCurrentPage(pageIndex);
        } else {
          setCurrentPage(0);
        }
      } catch { } finally {
        setLoading(false);
      }
    };
    loadBookAndProgress();
  }, [bookInfo]);

  const goToHref = (href: string) => {
    if (!href) return;
    const [path, frag] = href.split("#");
    const base = path ? path.split("/").pop()! : undefined;
    const candidates = [path && frag ? `${path}#${frag}` : null, base && frag ? `${base}#${frag}` : null, frag ? `#${frag}` : null, path || null, base || null].filter(Boolean) as string[];
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
          <div className="flex items-center gap-1 cursor-pointer hover:text-[var(--primary)]" onClick={() => {
            if (ch.subitems?.length > 0) toggleNode(ch.id);
            if (ch.href) goToHref(ch.href);
          }}>
            {ch.subitems?.length > 0 && (openNodes[ch.id] ? <ChevronDown size={14} /> : <ChevronRightIcon size={14} />)}
            <span>{ch.label}</span>
          </div>
          {ch.subitems?.length > 0 && openNodes[ch.id] && <div className="ml-4">{renderChapters(ch.subitems)}</div>}
        </li>
      ))}
    </ul>
  );

  //--------------------------[ GHI CHU ]-------------------------------
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, pages.length - 1));
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 0));
  const toggleNode = (id: string) => setOpenNodes((prev) => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    const handleSelect = () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();
      if (selectedText) {
        const range = selection!.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setPopup({ show: true, text: selectedText, x: rect.x + window.scrollX, y: rect.y + window.scrollY - 60 });
      }
    };
    el.addEventListener("mouseup", handleSelect);
    return () => el.removeEventListener("mouseup", handleSelect);
  }, [viewerRef]);


  async function addNoteFromSelection(selectedText: string, noteText: string, color: string) {
    const contentEl = viewerRef.current;
    if (!contentEl || !bookInfo?._id) return;
    try {

      const res = await createNote({
        bookId: bookInfo._id,
        text: noteText, highlight:
          selectedText, color,
        pageIndex: currentPage
      });

      const note = res?.data;
      setNotes((prev) => [note, ...prev]);
      const html = contentEl.innerHTML;
      const escaped = selectedText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "i");
      const highlighted = html.replace(regex, `
        <span style="background-color:${color};" class="note-highlight">${selectedText}</span>`);
      contentEl.innerHTML = highlighted;
      setNotify(
        {
          open: true,
          type: "success",
          title: "Đã lưu ghi chú",
          message: "Đoạn văn đã được đánh dấu và lưu vào ghi chú của bạn!"
        });
    } catch {
      setNotify({
        open: true,
        type: "error",
        title: "Lỗi lưu ghi chú",
        message: "Không thể lưu ghi chú, vui lòng thử lại."
      });
    }
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const popupEl = document.querySelector(".note-popup");
      if (popup.show && popupEl && !popupEl.contains(e.target as Node)) {
        setPopup({ ...popup, show: false });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [popup]);

  const pastelColors = [
    { name: "Xanh dương", color: "#A7C7E7" },
    { name: "Vàng", color: "#FFF5BA" },
    { name: "Hồng", color: "#FFD1DC" },
    { name: "Xanh lá", color: "#BEECC5" }];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1F2937] text-white">
      <header className="absolute shadow-2xl top-0 left-0 right-0 h-14 bg-[#17171A] border-b border-gray-700 flex items-center justify-between px-4 z-20">
        <Link to={`/ebook/${bookInfo?.slug || ""}`} className="flex items-center gap-2 text-green-400 hover:text-green-300">
          <ArrowLeft size={18} /> Trở về
        </Link>
        <h1 className="text-base font-semibold truncate w-[60%] text-center">{bookInfo?.title || "Đang tải..."}</h1>
        <div className="flex gap-4 items-center text-gray-300">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-gray-300 hover:text-white"
          >
            {showInfo ? <X size={24} /> : <Info size={24} />}
          </button>

          <Type className="cursor-pointer hover:text-white" onClick={() => setShowTextOptions((v) => !v)} />
          <BookmarkButton 
          bookId={bookInfo?._id} 
          pageIndex={currentPage}
          isBookmarked ={bookmarks.some( b => b.pageIndex === currentPage)}
          />
          <Menu className="cursor-pointer hover:text-white" onClick={() => setShowRight((v) => !v)} />
        </div>
      </header>
      {showInfo && (
        <div
          onClick={() => setShowInfo(false)}
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
        />
      )}

      <div className="relative flex h-screen overflow-hidden" style={{ backgroundColor: bgColor }}>
        <aside
          className={`bg-[var(--bg)] border-r border-white/20 shadow-lg transition-transform duration-300 z-30
    w-[26%] max-w-[360px] min-w-[260px] px-5 py-6 overflow-y-auto scrollbar-hide
    ${showInfo ? "translate-x-0" : "-translate-x-full"} absolute top-14 bottom-0 left-0`}>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="absolute top-3 right-5  border border-white/20
             rounded-xl p-2 hover:bg-[#374151] transition text-gray-300 hover:text-white shadow-md z-40"
          >
            {showInfo ? <X size={16} /> : <Info size={16} />}
          </button>

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

        <section
          className={`flex-1 relative flex items-center justify-center transition-all duration-300 ${showInfo ? "ml-[24%]" : "ml-0"
            }`}>
          <div
            ref={viewerRef}
            className="rounded-lg text-[#1A1A1A]"
            style={{
              width: "640px",
              height: "80vh",
              fontSize: "19px",
              lineHeight: "1.9",
              textAlign: "justify",
              fontFamily: "'Times New Roman', serif",
             }}>
            {pages.length > 0 ? (
              <div
                className="book-content prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: pages[currentPage] }}/>
            ) : (
              <div className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2">
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

          <div className="absolute w-full bottom-0 left-0 right-0 bg-[var(--bg)] h-8 px-4 flex items-center justify-center text-xs text-gray-300">
            Trang {currentPage + 1} / {pages.length}
          </div>
        </section>
      </div>


      <aside className={`absolute top-15 rounded-md bottom-0 right-0 w-[320px] bg-[var(--bg)] border-l border-gray-700 transform transition-transform duration-300 z-30 ${showRight ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 relative h-full flex flex-col">
          <button onClick={() => setShowRight(false)} className="absolute top-3 right-3
           text-gray-400 hover:text-white"><X size={18} />
          </button>
          <div className="flex bold mb-4 border-b border-gray-700">
            {["Mục lục", "Dấu trang", "Ghi chú"].map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className={`flex-1 py-2 text-sm font-medium transition 
                ${activeTab === i ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                    : "text-gray-400 hover:text-gray-200"}`}>{tab}</button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto pr-2 text-sm">

            {activeTab === 0 && (<>
              <h2 className="font-medium mb-3 text-[var(--primary)]">Danh mục chương</h2>
              {chapters.length > 0 ?
                <div className="space-y-2">{renderChapters(chapters)}</div>
                : <p className="text-gray-400 text-sm">Đang tải mục lục...</p>
              }</>)}

            {activeTab === 1 && (<>
              <h2 className="font-medium mb-3 text-[var(--primary)]">Dấu trang của bạn</h2>
              {bookmarks.length > 0 ? (<ul className="space-y-2">{bookmarks.map((b, i) => (
                <li key={i} className="flex justify-between items-center bg-gray-800/50 p-2 rounded
               hover:bg-gray-700 cursor-pointer"><span>{b.title}</span></li>))}</ul>) : (
                <p className="text-gray-400 text-sm">Chưa có dấu trang nào</p>)}
            </>)}

            {activeTab === 2 && (
              <div className="space-y-3">{
                notes.length > 0 ? (<ul className="space-y-2">{notes.map((n, i) => (
                  <li key={i} className="p-2 rounded border-b border-gray-200/30 hover:bg-gray-700 text-sm cursor-pointer"
                    onClick={() => setCurrentPage(n.pageIndex)}>
                    <p className="text-white">{n.text}</p>
                    <p className="text-xs italic text-gray-700 p-2"
                      style={{ backgroundColor: n.color }}>“{n.highlight}”</p>
                    <p className="text-gray-500 italic text-right">{formatDateTime(n.createdAt)}</p>
                  </li>))}</ul>)
                  : (<p className="text-white text-sm">Chưa có ghi chú nào</p>)}</div>)}
          </div>
        </div>
      </aside>

      {showTextOptions && (
        <TextOptionsPanel
          fontSize={fontSize}
          bgColor={bgColor}
          pastelColors={pastelColors}
          onFontSizeChange={(size) => setFontSize(size)}
          onColorSelect={(color) => setBgColor(color)}
        />
      )}

      {popup.show && (
        <AddNotePopup
          popup={popup}
          noteText={noteText}
          noteColor={noteColor}
          setNoteColor={setNoteColor}
          setNoteText={setNoteText}
          onSave={(text, note, color) => {
            addNoteFromSelection(text, note, color);
            setPopup({ ...popup, show: false });
            setNoteText("");
          }}
          onClose={() => setPopup({ ...popup, show: false })}
        />

      )}

    </div>
  );
}
