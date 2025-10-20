import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useNotify } from "~/context/NotifyContext";
import { useNavigate } from "@remix-run/react";
import Button from "./users/Buttons/Button";
import OtpVerification from "./FormOTP";
import CusttomLoading from "./Loading";
import { X } from "lucide-react";

const Authentication = ({ isOpen, onClose, mode = "login" }) => {
    if (!isOpen) return null;

    const navigate = useNavigate();
    const { setNotify } = useNotify();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [emailOtp, setEmailOtp] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            if (mode === "register") {
                setLoading(true);
                const formData = new FormData();
                formData.append("email", data.email);
                formData.append("password", data.password);
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    body: formData,
                });
                const result = await res.json();
                setLoading(false);

                if (res.ok) {
                    setEmailOtp(data.email);
                    setShowOtpForm(true);
                    setNotify({
                        open: true,
                        type: "success",
                        title: "Gửi mã OTP thành công",
                        message: "Vui lòng kiểm tra email để xác minh tài khoản.",
                    });
                } else {
                    setNotify({
                        open: true,
                        type: "error",
                        title: "Lỗi đăng ký",
                        message: result.message || "Không thể tạo tài khoản.",
                    });
                }
            } else {
                setLoading(true);
                const formData = new FormData();
                formData.append("email", data.email);
                formData.append("password", data.password);
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    body: formData,
                });
                const result = await res.json();
                setLoading(false);


                if (result.code === "UNVERIFIED") {
                    setEmailOtp(data.email);
                    setShowOtpForm(true);
                    setNotify({
                        open: true,
                        type: "error",
                        title: "Xác minh OTP",
                        message: "Tài khoản của bạn chưa xác minh. Hệ thống đã gửi lại mã OTP qua email.",
                    });
                    return;
                } else if (res.ok) {
                    setNotify({
                        open: true,
                        type: "success",
                        title: "Đăng nhập thành công!",
                        message: "Chào mừng trở lại!, bạn có thể sử dụng dịch vụ của chưng tôi một cách miễn phí.",
                    });
                    onClose();
                    navigate("/");
                } else {
                    setNotify({
                        open: true,
                        type: "error",
                        title: "Đăng nhập thất bại",
                        message: result.message,
                    });
                }

            }
        } catch (error) {
            setLoading(false);
            setNotify({
                open: true,
                type: "error",
                title: "Lỗi kết nối",
                message: "Không thể kết nối máy chủ",
            });
        }
    };

    const handleOtpSubmit = async (otp) => {
        try {
            const formData = new FormData();
            formData.append("email", emailOtp);
            formData.append("otp", otp);
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                body: formData,
            });
            const result = await res.json();

            if (res.ok) {
                setNotify({
                    open: true,
                    type: "success",
                    title: "Xác minh thành công!",
                    message: "Tài khoản của bạn đã được kích hoạt.",
                });
                setShowOtpForm(false);
                onClose();
            } else {
                setNotify({
                    open: true,
                    type: "error",
                    title: "Xác minh thất bại",
                    message: result.message,
                });
            }
        } catch {
            setNotify({
                open: true,
                type: "error",
                title: "Lỗi hệ thống",
                message: "Không thể xác minh OTP.",
            });
        }
    };

    const handleResendOtp = async () => {
        try {
            const formData = new FormData();
            formData.append("email", emailOtp);
            const res = await fetch("/api/auth/resend-otp", {
                method: "POST",
                body: formData,
            });
            const result = await res.json();

            if (res.ok) {
                setNotify({
                    open: true,
                    type: "info",
                    title: "Đã gửi lại mã",
                    message: "Vui lòng kiểm tra email của bạn.",
                });
            } else {
                setNotify({
                    open: true,
                    type: "error",
                    title: "Lỗi gửi lại OTP",
                    message: result.message,
                });
            }
        } catch { }
    };

    return (
        <>
            {showOtpForm ? (
                <OtpVerification
                    onSubmit={handleOtpSubmit}
                    onResend={handleResendOtp}
                    onClose={() => setShowOtpForm(false)}
                />
            ) : (
                <div

                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]"
                >
                    <button className="absolute top-4 right-4 p-2 rounded-md border-1 flex- border-white/30 hover:bg-red-600 text-white"
                        onClick={onClose}>
                        <X size={18} />
                    </button>
                    <div
                        className="rounded-lg backdrop-blur-lg bg-black/50 border border-white/40 p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-5 flex flex-col items-center justify-center gap-5">
                            <span className="text-center">
                                <h2 className="text-2xl font-bold mb-4">
                                    {mode === "login" ? "Đăng nhập tài khoản" : "Đăng ký tài khoản"}
                                </h2>
                                <p>
                                    {mode === "login"
                                        ? "Chọn phương thức đăng nhập"
                                        : "Đăng ký để mua và theo dõi quá trình đọc sách"}
                                </p>
                            </span>
                            <div className="flex gap-5">
                                {mode === "login" && (
                                    <div className="basis-1/2 border-r-1 border-white/40">
                                        <img
                                            src="/Images/Main/authencation.jpg"
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                {loading ? (
                                    <div className="flex flex-col gap-4 items-center w-[25rem]">
                                        <CusttomLoading />
                                    </div>
                                ) : <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className={`flex flex-col gap-3 items-center justify-center !w-[25rem]
    ${mode === "login" ? "basis-1/2" : "basis-full"}`}
                                >

                                    <div className="w-full">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="border w-full p-3 rounded-xl"
                                            {...register("email", {
                                                required: "Vui lòng nhập email",
                                                pattern: {
                                                    value: /^\S+@\S+$/i,
                                                    message: "Email không hợp lệ",
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <p className="text-red-400 text-sm mt-1">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="relative w-full">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Mật khẩu"
                                            className="w-full border p-3 rounded-xl pr-10"
                                            {...register("password", {
                                                required: "Vui lòng nhập mật khẩu",
                                                minLength: {
                                                    value: 6,
                                                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                                                },
                                            })}
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </span>
                                        {errors.password && (
                                            <p className="text-red-400 text-sm mt-1">
                                                {errors.password.message}
                                            </p>
                                        )}
                                    </div>

                                    {mode === "register" && (
                                        <div className="relative w-full">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Nhập lại mật khẩu"
                                                className="w-full border p-3 rounded-xl pr-10"
                                                {...register("confirmPassword", {
                                                    required: "Vui lòng nhập lại mật khẩu",
                                                    validate: (value) =>
                                                        value === password || "Mật khẩu không trùng khớp",
                                                })}
                                            />
                                            <span
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                                            >
                                                <FontAwesomeIcon
                                                    icon={showConfirmPassword ? faEyeSlash : faEye}
                                                />
                                            </span>
                                            {errors.confirmPassword && (
                                                <p className="text-red-400 text-sm mt-1">
                                                    {errors.confirmPassword.message}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        text={mode === "login" ? "Đăng nhập" : "Đăng ký"}
                                        className="!w-full"
                                    />

                                    <p className="!text-gray-600">
                                        {mode === "login" ? "hoặc đăng nhập với" : "hoặc đăng ký với"}
                                    </p>

                                    <button
                                        type="submit"
                                        className="flex gap-5 !w-full bg-gray-700/40 hover:border-white 
          hover:border-1 items-center justify-center py-3 px-5 rounded-full" >
                                        <FcGoogle className="text-2xl" />
                                        <span>
                                            {mode === "login"
                                                ? "Đăng nhập với Google"
                                                : "Đăng ký với Google"}
                                        </span>
                                    </button>

                                    {mode === "register" && (
                                        <p className="!text-gray-500 w-[90%] text-center">
                                            Bằng việc nhấn “Đăng ký”, bạn đã đồng ý với điều khoản của
                                            Waka.
                                        </p>
                                    )}

                                </form>
                                }



                            </div>
                        </div>
                    </div >
                </div >
            )}
        </>

    );
};

export default Authentication;
