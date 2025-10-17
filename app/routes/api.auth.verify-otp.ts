import { json } from "@remix-run/node";
import User from "~/models/user.server";

export async function action({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const otp = formData.get("otp") as string;

    if (!email || !otp)
      return json({ message: "Thiếu email hoặc OTP" }, { status: 400 });

    const user = await User.findOne({ email });
    if (!user)
      return json({ message: "Không tìm thấy tài khoản" }, { status: 404 });

    if (user.isVerified)
      return json({ message: "Tài khoản đã xác minh" }, { status: 200 });

    if (!user.otpCode || !user.otpExpires)
      return json({ message: "Không có OTP để xác minh" }, { status: 400 });

    if (new Date(user.otpExpires).getTime() < Date.now()) {
      user.otpCode = null;
      user.otpExpires = null;
      await user.save();
      return json({ message: "OTP đã hết hạn, vui lòng gửi lại mã mới" }, { status: 400 });
    }

    if (user.otpCode !== otp)
      return json({ message: "Mã OTP không đúng" }, { status: 400 });

    user.isVerified = true;
    user.otpCode = null;
    user.otpExpires = null;
    await user.save();

    return json({ message: "Xác minh thành công!" }, { status: 200 });
  } catch (error: any) {
    console.error("Lỗi verify-otp:", error);
    return json({ message: error.message || "Lỗi xác minh OTP" }, { status: 500 });
  }
}
