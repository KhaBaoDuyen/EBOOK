import ePub from "epubjs";

/**
  * @param containerRef: ref tới div hiển thị
 * @param filePath: đường dẫn file ( /uploads/books/sach.epub hoặc blob)
 * @param onReady: callback khi load xong (trả về {book, rendition, chapters})
 * @param onLocationChange: callback khi chuyển trang
 */
export async function initEpubViewer({
  containerRef,
  filePath,
  onReady,
  onLocationChange,
}: {
  containerRef: HTMLElement | null;
  filePath: string;
  onReady?: (args: { book: any; rendition: any; chapters: any[] }) => void;
  onLocationChange?: (location: any) => void;
}) {
  if (!containerRef || !filePath) return;

   const source = filePath.startsWith("/uploads")
    ? `/api/epub/${encodeURIComponent(filePath.split("/").pop()!)}`
    : filePath;  

  const book = ePub(source);
  const rendition = book.renderTo(containerRef, {
    width: "100%",
    height: "100%",
    spread: "always",
  });
  await rendition.display();

  const nav = await book.loaded.navigation;
  const chapters = nav.toc;

  rendition.on("relocated", (loc: any) => {
    onLocationChange?.(loc);
  });

  onReady?.({ book, rendition, chapters });
  return { book, rendition, chapters };
}
