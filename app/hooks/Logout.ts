 import { useNavigate } from "@remix-run/react";
import { useNotify } from "~/context/NotifyContext";
import { useUser } from "~/context/UserContext";
import { Logout } from "~/services/Auth/logout";

export function useLogout() {
  const navigate = useNavigate();
  const { setNotify } = useNotify();
  const { reloadUser } = useUser();

  const logout = async () => {
    try {
      const res = await Logout();
      if (res?.ok || res?.status === 200) {
        setNotify({
          open: true,
          type: "success",
          title: "Đăng xuất thành công",
          message: "Tài khoản đã được đăng xuất ra khỏi hệ thống.",
        });
        await reloadUser();
        navigate("/");
      }
    } catch (error) {
      setNotify({
        open: true,
        type: "error",
        title: "Đăng xuất thất bại",
        message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
      });
    }
  };

  return logout;
}
