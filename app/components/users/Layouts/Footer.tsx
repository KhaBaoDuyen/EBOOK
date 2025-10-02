import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
    return (
        <footer className="bg-[#121212] text-gray-300 py-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                    <img src="public/Images/Main/logo-light.png" alt="" />
                    <p className="mt-2">Công ty cổ phần sách điện tử Waka</p>
                    <div className="mt-4 flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2">
                            <FaPhoneAlt className="text-emerald-500" />
                            <span>0877736289</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MdEmail className="text-emerald-500" />
                            <span>Support@waka.vn</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="font-bold mb-3">Về chúng tôi</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Giới thiệu</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Cơ cấu tổ chức</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Lĩnh vực hoạt động</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Cơ hội đầu tư</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Tuyển dụng</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Liên hệ</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Dịch vụ xuất bản sách</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold mb-3">Thông tin hữu ích</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Thỏa thuận sử dụng dịch vụ</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Quyền lợi</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Quy định riêng tư</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Quy chế hoạt động sàn TMĐT</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Câu hỏi thường gặp</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold mb-3">Tin tức</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Tin dịch vụ</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Review sách</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-gray-800 transition">Lịch phát hành</a></li>
                    </ul>
                </div>

            </div>
        </footer>
    );
}
