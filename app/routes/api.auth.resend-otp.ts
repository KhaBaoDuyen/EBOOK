 import { json } from "@remix-run/node";
import User from "~/models/user.server";
import { sendOtpEmail } from "~/utils/sendEmailOtp.server";

export async function action({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    if (!email) return json({ message: "Thiếu email" }, { status: 400 });

    const user = await User.findOne({ email });
    if (!user) return json({ message: "Không tìm thấy tài khoản" }, { status: 404 });
    if (user.isVerified) return json({ message: "Tài khoản đã xác minh" }, { status: 200 });

     if (user.otpExpires && user.otpExpires.getTime() - Date.now() > 60 * 1000) {
      return json({ message: "Vui lòng chờ trước khi gửi lại OTP." }, { status: 429 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otpCode = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    await sendOtpEmail(email, otp);
    return json({ message: "Đã gửi lại OTP." }, { status: 200 });
  } catch (err: any) {
    console.error("Resend OTP error:", err);
    return json({ message: err.message || "Lỗi gửi lại OTP" }, { status: 500 });
  }
}
