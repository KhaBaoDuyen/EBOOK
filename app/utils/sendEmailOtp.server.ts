import nodemailer from "nodemailer";

export async function sendOtpEmail(to: string, otp: string) {
   const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,  
      pass: process.env.SMTP_PASS,  
    },
  });

   const mailOptions = {
    from: `"SMARTBOOK" <${process.env.SMTP_USER}>`,
    to,
    subject: "Mã OTP xác thực tài khoản",
    html: `
      <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 20px;">
        <div style="background: #fff; border-radius: 10px; padding: 30px; text-align: center;">
          <h2 style="color: #0F3079;">Xác minh tài khoản của bạn</h2>
          <p style="font-size: 16px;">Mã OTP của bạn là:</p>
          <h1 style="letter-spacing: 4px; color: #0F3079;">${otp}</h1>
          <p style="font-size: 14px; color: gray;">Mã này có hiệu lực trong 5 phút.</p>
        </div>
      </div>
    `,
  };

   await transporter.sendMail(mailOptions);
}
