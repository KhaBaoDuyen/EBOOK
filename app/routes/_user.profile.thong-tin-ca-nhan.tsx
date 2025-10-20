import { useOutletContext } from "@remix-run/react";
import type IUser from "~/interfaces/user.interface";
import { useEffect, useState } from "react";
import { CircleSmall } from "lucide-react";

//-----------------[ CONTEXT ]--------------------
import { useNotify } from "~/context/NotifyContext";
import { getAuthByEmail, updateAuth } from "~/services/user.service";

export default function ProfilePage() {
    const { user } = useOutletContext<{ user: IUser | null }>();

    if (!user) {
        return <p className="text-gray-200">Bạn chưa đăng nhập.</p>;
    }
    const { setNotify } = useNotify();

    const [users, setUsers] = useState<any>(null);
    const [name, setName] = useState<string>();
    const [status, setStatus] = useState<number>(1);
    const [role, setRole] = useState<string>("user");
    const [avatar, setAvatar] = useState<any>();
    const [gender, setGender] = useState<string>("Khác");
    const [birthDate, setBirthDate] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    //----------------[ LAY THONG TIN NGUOI DUNG ]------------------
    const email = user.email;

    const getOneAuth = async () => {
        try {
            const res = await getAuthByEmail(email);
            if (res.data) {
                const u = res.data
                setUsers(u);
                setName(u.name)
                setStatus(u.status ?? 1);
                setRole(u.role ?? "user");
                setAvatar(u.avatar);
                setGender(u.gender ?? "Khác");
                setBirthDate(u.birthDate ?? "Chưa có thông tin");
                setDescription(u.description || `Xin chào! mình tên là ${user.name}`);
                setIsVerified(u.isVerified ?? false);
            }
        } catch (error: any) {
            console.error(" Lỗi khi lấy thông tin người dùng:", error.message);
        }
    }

    useEffect(() => {
        getOneAuth();
    }, [email])

    // ================[ HÀM GỬI DỮ LIỆU CẬP NHẬT ]=====================
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            setLoading(true);

            const formData = new FormData();

            if (avatar instanceof File) {
                formData.append("avatar", avatar);
            } else if (typeof avatar === "string") {
                formData.append("avatar", avatar);
            }

            formData.append("gender", gender || "Khác");
            if (birthDate) formData.append("birthDate", birthDate);
            if (description) formData.append("description", description);
            if (name) formData.append("name", name);

            const { status: code, data } = await updateAuth(email, formData);

            if (code === 200 || code === 201) {
                setNotify({
                    open: true,
                    type: "success",
                    title: "Cập nhật hồ sơ thành công!",
                    message: "Thông tin cá nhân đã được lưu lại.",
                });

                await getOneAuth();
            } else {
                setNotify({
                    open: true,
                    type: "error",
                    title: "Cập nhật thất bại!",
                    message: data?.message || "Vui lòng thử lại sau.",
                });
            }
        } catch (err: any) {
            console.error(" Lỗi khi cập nhật:", err.message);
            setNotify({
                open: true,
                type: "error",
                title: "Lỗi hệ thống!",
                message: "Không thể kết nối đến máy chủ.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="space-y-6 w-full">
            <h1 className="text-gray-50 text-2xl font-semibold">Thông tin cá nhân</h1>

            <form
                onSubmit={handleSubmit}
                className="shadow-theme-md bg-[#1e1e2d] p-6 rounded-2xl shadow-lg flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:w-1/4">
                    <div className="relative">
                        <img
                            src={
                                avatar instanceof File
                                    ? URL.createObjectURL(avatar)
                                    : avatar || "/Images/Main/user.png"
                            }
                            alt={name}
                            className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
                        />
                        <label
                            htmlFor="avatarInput"
                            className="absolute mt-3 bottom-2 right-2 cursor-pointer bg-[var(--primary)] hover:bg-[var(--primary-hover)] 
                          text-black font-semibold px-2 rounded-full transition">
                            +
                        </label>
                        <input
                            id="avatarInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setAvatar(file);
                                }
                            }}
                        />
                    </div>

                    <p className="mt-3 text-[var(--primary)] font-semibold">
                        {role === "admin" ? "Quản trị viên" : "Thành viên"}
                    </p>

                    <p className="flex gap-3">
                        <CircleSmall className={isVerified === true ? "text-[var(--primary)]" : "text-red-600"} />
                        <span className={isVerified === true ? "text-[var(--primary)]" : "text-red-600"}>
                            {isVerified === true ? "Đã xác thực" : "Chưa xác thực"} </span>
                    </p>
                </div>

                <div className="flex-1 grid md:grid-cols-2 gap-5 text-gray-200">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Họ và tên</label>
                        <input
                            type="text"
                            defaultValue={name}
                            className="w-full bg-transparent border border-white/20 rounded-lg p-2 outline-none focus:border-green-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            disabled
                            className="w-full bg-transparent border border-white/20 rounded-lg p-2 text-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Giới tính</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="  w-full bg-[#1e1e2d] text-gray-100 border border-white/20 
                            rounded-lg  p-2  outline-none focus:border-green-400 appearance-none">
                            <option
                                value="Nam"
                                className="bg-[#1e1e2d] text-gray-100 hover:bg-green-600 hover:text-white">
                                Nam
                            </option>
                            <option
                                value="Nữ"
                                className="bg-[#1e1e2d] text-gray-100 hover:bg-pink-600 hover:text-white">
                                Nữ
                            </option>
                            <option
                                value="Khác"
                                className="bg-[#1e1e2d] text-gray-100 hover:bg-yellow-600 hover:text-black">
                                Khác
                            </option>
                        </select>


                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Ngày sinh</label>
                        <input
                            type="date"
                            defaultValue={birthDate || ""}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full bg-transparent border border-white/20 rounded-lg p-2 outline-none focus:border-green-400"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-400 mb-1">Giới thiệu bản thân</label>
                        <textarea
                            defaultValue={description || `Xin chào, tôi là ${name || "..."}, rất vui được gặp bạn!`}
                            rows={4}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-transparent border border-white/20 rounded-lg p-2 outline-none focus:border-green-400"
                        ></textarea>
                    </div>

                    <div className="flex justify-end md:col-span-2">
                        <button
                            type="submit"
                            className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors px-6 py-2 rounded-lg text-black font-semibold"
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </form>


        </section>
    );
}
