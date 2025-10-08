import React, { useEffect, useRef, useState } from "react";
import ePub from "epubjs";

export default function EpubReaderTest() {
    const viewerRef = useRef(null);
    const [rendition, setRendition] = useState(null);
    const [book, setBook] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [current, setCurrent] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);

     const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const blobUrl = URL.createObjectURL(file);  
            setFileUrl(blobUrl);
        }
    };
   
 
    useEffect(() => {
        if (!fileUrl) return;

        const book = ePub(`/api/epub/${encodeURIComponent("Ben-Bo-Song-Piedra-Toi-Ngoi-Khoc.epub")}`);

        const rendition = book.renderTo(viewerRef.current, {
            width: "100%",
            height: "100%",
            spread: "always",
        });

        rendition.display();
        setBook(book);
        setRendition(rendition);

         book.loaded.navigation.then((nav) => {
            setChapters(nav.toc);
        });

         rendition.on("relocated", (location) => {
            setCurrent(location);
        });

        return () => {
            rendition.destroy();
            book.destroy();
        };
    }, [fileUrl]);

    const handleNext = () => rendition && rendition.next();
    const handlePrev = () => rendition && rendition.prev();

    const goToChapter = (href) => {
        rendition.display(href);
    };

    return (
        <div className="flex flex-col h-screen bg-[#1F2937] text-white">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h1 className="text-xl font-semibold">📖 EPUB Viewer Test</h1>
                <input
                    type="file"
                    accept=".epub"
                    onChange={handleFileChange}
                    className="text-sm file:bg-green-700 file:text-white file:rounded-md file:px-4 file:py-2"
                />
            </div>

            <div className="flex flex-1">
                 <aside className="w-[250px] border-r border-gray-700 overflow-y-auto bg-[#111827] p-3">
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

                 <main className="flex-1 relative">
                    <div
                        ref={viewerRef}
                        className="w-full h-full bg-[#F5E6B3] text-black overflow-hidden"
                    ></div>

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
                            {book && book.locations && book.locations.length
                                ? `${(
                                    (book.locations.percentageFromCfi(current?.start?.cfi) * 100).toFixed(1)
                                )}%`
                                : ""}
                        </span>
                    </div>
                </main>
            </div>
        </div>
    );
}
