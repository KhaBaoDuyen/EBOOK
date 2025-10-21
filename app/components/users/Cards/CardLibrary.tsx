import { BookOpen, Bookmark, CheckCircle, Clock3 } from "lucide-react";
import { Link } from "@remix-run/react";
import type ICardLibrary from "~/interfaces/components/ICardLibrary.interface";

export default function CardLibrary({ book }: ICardLibrary) {
  const urlRender = `/render/${book.slug}`;
  return (
    <div
      key={book.id}
      className="group bg-[#1E293B] rounded-2xl overflow-hidden shadow-md hover:shadow-lg 
      transition transform hover:-translate-y-1 border border-white/5 hover:border-[var(--primary-hover)]"
    >

      <div className="relative">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-52 object-cover"
        />
        {book.isFinished && (
          <div className="absolute top-2 right-2 bg-[var(--primary)] text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
            <CheckCircle size={14} /> Hoàn thành
          </div>
        )}
      </div>


      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-base line-clamp-2">{book.title}</h3>
        <p className="text-sm text-gray-400">{book.author}</p>

        {book.progress && book.progress > 0 && (
          <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
            <div
              className="h-2 rounded-full bg-[var(--primary)] transition-all"
              style={{ width: `${book.progress * 100}%` }}
            ></div>
          </div>
        )}

        <Link
          to={urlRender}
          className="mt-3 w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm py-1.5 
          rounded-md flex items-center justify-center gap-2 transition"
        >
          {book.isFinished ? (
            <>
              <BookOpen size={16} /> Đọc lại
            </>
          ) : book.progress && book.progress > 0 ? (
            <>
              <Clock3 size={16} /> Tiếp tục đọc
            </>
          ) : (
            <>
              <Bookmark size={16} /> Mở sách
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
