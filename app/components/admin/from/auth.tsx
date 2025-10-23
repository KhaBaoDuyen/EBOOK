import React, { useEffect, useState } from "react";
import CustomTextField from "~/components/text/CustomTextField";
import { useNotify } from "~/context/NotifyContext";
import { getAuthByEmail, updateAuth } from "~/services/user.service";
import { CircleSmall } from 'lucide-react';
import CusttomLoading from "~/components/Loading";

export default function AuthForm({
  email,
  onSubmitSuccess,
}: {
  email: string;
  onSubmitSuccess?: () => void;
}) {
  const { setNotify } = useNotify();

  //---------------[ SET FORM ]--------------------
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState<number>(1);
  const [role, setRole] = useState<string>("user");
  const [avatar, setAvatar] = useState<any>();
  const [gender, setGender] = useState<string>("Khác");
  const [birthDate, setBirthDate] = useState<string>();

  const [loading, setLoading] = useState(false);

  console.log(email);

  useEffect(() => {
    if (!email) return;
    (async () => {
      try {
        const res = await getAuthByEmail(email);
        if (res.data) {
          setUser(res.data);
          setStatus(res.data.status ?? 1);
          setRole(res.data.role ?? "user");
          setAvatar(res.data.avatar);
          setGender(res.data.gender ?? "Khác");
          setBirthDate(res.data.birthDate ?? "Chưa có thông tin");
        }
        // console.log("dulieu res",res);

      } catch (err: any) {
        console.error(" Lỗi khi lấy thông tin người dùng:", err.message);
        setNotify({
          open: true,
          type: "error",
          title: "Không thể tải tài khoản",
          message: "Vui lòng thử lại sau.",
        });
      }
    })();
  }, [email]);

  // ================[ Gửi form ]=====================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData();
    formData.append("status", status.toString());
    formData.append("role", role);

    try {
      setLoading(true);
      const { status: code, data } = await updateAuth(email, formData);

      if (code === 200 || code === 201) {
        setNotify({
          open: true,
          type: "success",
          title: "Cập nhật tài khoản thành công!",
          message: "Thông tin quyền và trạng thái đã được lưu.",
        });
        onSubmitSuccess?.();
      } else if (code === 400) {
        setNotify({
          open: true,
          type: "error",
          title: "Lỗi khi cập nhật tài khoản!",
          message: data?.message || "Vui lòng kiểm tra lại thông tin.",
        });
      } else {
        setNotify({
          open: true,
          type: "error",
          title: "Cập nhật thất bại!",
          message: data?.message || "Đã xảy ra lỗi không xác định.",
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

  if (!user) {
    return (
      <div className="p-6  rounded-md">
        <CusttomLoading />
        <p>Đang tải thông tin người dùng...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" shadow-xl text-[var(--input-text)] bg-[var(--input-bg)] border border-white/20 dark:border-gray-600 rounded-md space-y-6"
    >
      <div className="w-full flex gap-4 flex-col justify-center items-center">
        <img src={user.avatar || "/Images/main/user.png"} alt="Ảnh người dùng"
          className="w-35 h-35 rounded-full" />
        <p className="flex"><CircleSmall className={user.isVerified === true ? "text-[var(--primary)]" : "text-red-600"} />
          <span className={user.isVerified === true ? "text-[var(--primary)]" : "text-red-600"}>
            {user.isVerified === true ? "Đã xác thực" : "Chưa xác thực"} </span></p>

        <p className={user.isVerified === true ? "text-[var(--primary)]" : "text-red-600"}>
          {user.name}
        </p>
      </div>
      <div className="grid gap-6 text-[var(--input-text)] grid-cols-2">
        <div>
          <CustomTextField
            label="Tên người dùng"
            value={user.name || ""}
            disabled />
        </div>

        <div>
          <CustomTextField
            label="Email"
            value={user.email}
            disabled />
        </div>

        <div>
          <CustomTextField
            label="Ngày sinh nhật"
            value={user.birthDate || "Chưa cập nhật"}
            disabled />
        </div>

        <div>
          <CustomTextField
            label="Giới tính"
            value={user.gender || "Chưa cập nhật"}
            disabled />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Trạng thái</label>
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="w-full p-2 rounded-md border border-[var(--input-border)] bg-[var(--input-bg)] 
             dark:text-white focus:border-blue-400 focus:ring focus:ring-blue-500/30 outline-none">
            <option value={1}>Hoạt động</option>
            <option value={0}>Khóa</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Vai trò</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 rounded-md border border-[var(--input-border)] bg-[var(--input-bg)] 
             dark:text-white focus:border-blue-400 focus:ring focus:ring-blue-500/30 outline-none">
            <option value="user">Người dùng</option>
            <option value="admin">Quản trị viên</option>
          </select>
        </div>

      </div>


      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 w-full py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:bg-gray-600 text-white rounded-md transition"
        >
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
}
