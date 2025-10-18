import { useOutletContext } from "@remix-run/react";
import type IUser from "~/interfaces/user.interface";

export default function ProfilePage() {
    const { user } = useOutletContext<{ user: IUser | null }>();

    if (!user) {
        return <p className="text-gray-200">Bạn chưa đăng nhập.</p>;
    }

    return (
        <section className="space-y-6 w-full">
            <h1 className="text-gray-50 text-2xl font-semibold">Thông tin cá nhân</h1>

            <div className="shadow-theme-md bg-[#1e1e2d] p-6 rounded-2xl shadow-lg flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:w-1/4">
                    <img
                        src={user.avatar || "/images/avatar-default.png"}
                        alt={user.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
                    />
                    <p className="mt-3 text-green-400 font-semibold">
                        {user.role === "admin" ? "Quản trị viên" : "Thành viên"}
                    </p>
                    <p>
                        {user.isVerified ? "Đã xác minh" : "Chưa xác minh"}
                    </p>
                </div>

                <div className="flex-1 grid md:grid-cols-2 gap-5 text-gray-200">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Họ và tên</label>
                        <input
                            type="text"
                            defaultValue={user.name}
                            className="w-full bg-transparent border border-white/20 rounded-lg p-2 outline-none focus:border-green-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full bg-transparent border border-white/20 rounded-lg p-2 text-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Giới tính</label>
                        <select
                            defaultValue={user.gender || ""}
                            className="w-full bg-transparent border border-white/20 rounded-lg p-2 outline-none focus:border-green-400"
                        >
                            <option value="" className="bg-[#1e1e2d] hover:text-black">
                                Chưa chọn
                            </option>
                            <option value="Nam" className="bg-[#1e1e2d] hover:text-black">
                                Nam
                            </option>
                            <option value="Nữ" className="bg-[#1e1e2d] hover:text-black">
                                Nữ
                            </option>
                            <option value="Khác" className="bg-[#1e1e2d] hover:text-black">
                                Khác
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Ngày sinh</label>
                        <input
                            type="date"
                            defaultValue={user.birthDate || ""}
                            className="w-full bg-transparent border border-white/20 rounded-lg p-2 outline-none focus:border-green-400"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-400 mb-1">Địa chỉ</label>
                        <input
                            type="text"
                            defaultValue={user.address || "Chưa cập nhật"}
                            className="w-full bg-transparent border border-white/20 rounded-lg p-2 outline-none focus:border-green-400"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-400 mb-1">Giới thiệu bản thân</label>
                        <textarea
                            defaultValue={user.description || `Xin chào, tôi là ${user.name} rất vui được gặp bạn!`}
                            rows={4}
                            className="w-full bg-transparent border border-white/20 rounded-lg p-2 outline-none focus:border-green-400"
                        ></textarea>
                    </div>

                    <div className="flex justify-end md:col-span-2">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 transition-colors px-6 py-2 rounded-lg text-black font-semibold"
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </div>


        </section>
    );
}
