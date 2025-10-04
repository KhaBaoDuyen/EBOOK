import { useState } from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Render() {
    const [progress, setProgress] = useState(5);

    return (
        <div className=" h-screen  bg-gray-900 text-white">
            <span className="mt-[7rem] h-full flex">
                <aside className="w-[300px]  bg-gray-800 p-5 overflow-y-auto">
                    {/* Ảnh bìa */}
                    <div className="mb-5">
                        <img
                            src="/Images/Slides/Pages/peterpan.jpg"
                            alt="Peter and Wendy"
                            className="rounded-md shadow-lg"
                        />
                    </div>

                    {/* Nút đăng nhập */}
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold mb-4">
                        Đăng nhập
                    </button>

                    {/* Mô tả sách */}
                    <h2 className="font-bold text-lg mb-2">
                        <span className="text-gray-300">[Sách ngoại văn]</span> Peter and Wendy
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-300">
                        "Peter and Wendy" là tác phẩm kinh điển của J.M. Barrie, lần đầu được xuất bản vào
                        năm 1911, là phiên bản tiểu thuyết của câu chuyện nổi tiếng về Peter Pan,
                        nhân vật huyền thoại không bao giờ lớn. Cuốn sách này kể về cuộc phiêu lưu kỳ diệu
                        của Peter Pan và những người bạn của anh, đặc biệt là Wendy Darling và các em của cô...
                    </p>
                </aside>

                <main className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h1 className="font-bold text-lg">[Sách ngoại văn] Peter and Wendy</h1>
                        <div className="flex gap-3">
                            <button className="hover:text-green-400">
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            <button className="hover:text-green-400">
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    </header>

                    {/* Nội dung sách */}
                    <div className="flex-1 p-10 bg-gray-200 text-black overflow-y-auto">
                        <h2 className="text-3xl font-serif text-center mb-8">TABLE OF CONTENTS</h2>
                        <ul className="space-y-3 font-serif text-lg">
                            <li>Peter and Wendy ..................................................</li>
                            <li>Chapter I: Peter Breaks Through ............................</li>
                            <li>Chapter II: The Shadow ....................................</li>
                            <li>Chapter III: Come Away, Come Away! ................</li>
                            <li>Chapter IV: The Flight ......................................</li>
                            <li>Chapter V: The Island Come True .....................</li>
                            <li>Chapter VI: The Little House .............................</li>
                        </ul>
                    </div>

                    <footer className="p-3 bg-gray-900 flex items-center gap-3">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => setProgress(e.target.value)}
                            className="flex-1 accent-green-600"
                        />
                        <span className="text-sm">{progress}%</span>
                    </footer>
                </main>
            </span>

        </div>
    );
}
