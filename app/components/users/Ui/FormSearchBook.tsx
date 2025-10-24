import { getAllIsBook } from "~/services/book.service";
import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "@remix-run/react";

export function FormSearchBook() {
    // ------------------[ LAY DU LIEU SACH - SEARCH ]---------------------
    const [books, setBooks] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const keyword = search.trim().toLowerCase();
    const [showResults, setShowResults] = useState(false);

    const getSearchBook = async () => {
        try {
            const res = await getAllIsBook();
            setBooks(res.data);
            console.log(res);

        } catch (error: any) {
            console.log("loi getSearchBook", error.message);
        }
    }

    useEffect(() => {
        getSearchBook();
    }, []);

    const searchBook = books.filter((b) =>
        keyword
            ? b.title?.toLowerCase().includes(keyword) ||
            b.authorId?.name?.toLowerCase().includes(keyword)
            : true
    ).slice(0, 5);

    return (
        <div className="relative items-center group">
            <div>
                <input
                    type="text"
                    value={search}
                    onFocus={() => setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 150)}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm sách, tác giả..."
                    className="absolute !bg-gray-200 right-12 w-0 opacity-0 px-0 py-2 rounded-xl text-gray-700
          placeholder-gray-400 border border-gray-600 focus:outline-none 
          focus:w-64 focus:px-4 focus:opacity-100 transition-all duration-300 
          group-hover:w-64 group-hover:opacity-100 group-hover:px-4 focus:ring-emerald-600"
                />

                {showResults && search.trim() && searchBook.length > 0 && (
                    <div className="absolute top-12 right-12 bg-gray-800/80 backdrop-blur-md shadow-xl rounded-xl w-100 p-3 z-50">
                        {searchBook.map((b) => (
                            <Link
                                to={`/ebook/${b.slug}`}
                                key={b._id}
                                className="block w-full p-2 hover:bg-gray-600/40 cursor-pointer rounded-md transition"
                            >
                                <h3 className="font-semibold text-white text-sm line-clamp-1">
                                    {b.title}
                                </h3>
                                <p className="text-xs text-gray-300">{b.authorId?.name}</p>
                            </Link>

                        ))}
                    </div>
                )}

                <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-emerald-500 transition-colors duration-300">
                    <FaSearch className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    );
}