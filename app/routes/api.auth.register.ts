import User from "~/models/user.server";
import bcrypt from "bcryptjs";
import { json } from "@remix-run/node";
import { sendOtpEmail } from "~/utils/sendEmailOtp.server";

function generateOTP(len = 6) {
    return Math.floor(Math.pow(10, len - 1) + Math.random() * 9 * Math.pow(10, len - 1)).toString();
}

function nameRandom() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `user_${result}`;
}

export async function action({ request }: { request: Request }) {
    try {
        const formData = await request.formData();
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const existing = await User.findOne({ email });
        if (existing)
            return json({ message: "Email đã tồn tại" }, { status: 400 });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP(6);
        const expires = new Date(Date.now() + 5 * 60 * 1000);


        const user = await User.create({
            name: nameRandom(),
            email,
            password: hashedPassword,
            otpCode: otp,
            otpExpires: expires,
            isVerified: false,
        });

        await sendOtpEmail(email, otp);

        return json(
            { message: "Đã gửi OTP đến email.", userId: user._id, email },
            { status: 201 }
        );
    } catch (err: any) {
        console.error(err);
        return json({ message: err.message }, { status: 500 });
    }
}
