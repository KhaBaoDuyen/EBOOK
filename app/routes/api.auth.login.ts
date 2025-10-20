import { json, createCookie } from "@remix-run/node";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "~/models/user.server";
import { sendOtpEmail } from "~/utils/sendEmailOtp.server";

const JWT_SECRET = process.env.JWT_SECRET || "SMARTBOOK_SECRET_KEY";

export const authCookie = createCookie("tokenAuth", {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60,
  secure: process.env.NODE_ENV === "production",
});

function generateOTP(len = 6) {
  return Math.floor(Math.pow(10, len - 1) + Math.random() * 9 * Math.pow(10, len - 1)).toString();
}

export async function action({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return json({ message: "Thiếu email hoặc mật khẩu" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return json({ message: "Tài khoản không tồn tại" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return json({ message: "Sai mật khẩu" }, { status: 401 });
    }

    if (!user.isVerified) {
      const otp = generateOTP(6);
      const expires = new Date(Date.now() + 5 * 60 * 1000);
      user.otpCode = otp;
      user.otpExpires = expires;
      user.isVerified = false;
      await user.save();
      await sendOtpEmail(user.email, otp);
      return json({
        message: "Tài khoản chưa xác minh. Hệ thống đã gửi lại mã OTP qua email.",
        email: user.email,
        code: "UNVERIFIED",
      }, { status: 202 });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return json(
      {
        message: "Đăng nhập thành công",
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { headers: { "Set-Cookie": await authCookie.serialize(token) } }
    );
  } catch (error: any) {
    return json({ message: error.message || "Lỗi hệ thống" }, { status: 500 });
  }
}
