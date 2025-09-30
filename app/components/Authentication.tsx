import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FcGoogle } from "react-icons/fc";

import Button from "./Buttons/Button";

const Authentication = ({ isOpen, onClose, mode = "login" }) => {
    if (!isOpen) return null;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black/70 flex items-center justify-center z-999">
            <div className=" rounded-lg backdrop-blur-lg bg-black/50 border-1 border-white/40
              p-6  shadow-lg"  onClick={(e) => e.stopPropagation()}>

                <div className="p-5 flex flex-col items-center justify-center gap-5">
                    <span className="text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            {mode === "login" ? "Đăng nhập tài khoản" : "Đăng ký tài khoản"}
                        </h2>
                        <p>  {mode === "login" ? "Chọn phương thức đăng nhập"
                            : "Đăng ký để mua và theo dõi quá trình đọc sách"}</p>
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
                        <form
                            className={`flex flex-col gap-3 items-center justify-center !w-[25rem]
    ${mode === "login" ? "basis-1/2" : "basis-full"}`}
                        >
                            <h1 className="text-center font-light text-md">
                                {mode === "register"
                                    ? "Đăng ký với thông tin"
                                    : "Đăng nhập với mật khẩu"}
                            </h1>

                            <div className="flex flex-col gap-5 w-full">

                                <input
                                    type="phone"
                                    placeholder="Số điện thoại"
                                    className="border-1 w-full p-3 rounded-xl"
                                />

                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mật khẩu"
                                        className="w-full border p-3 rounded-xl pr-10"
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </span>
                                </div>

                                {mode === "register" && (
                                    <div className="relative w-full">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Nhập lại mật khẩu"
                                            className="w-full border p-3 rounded-xl pr-10"
                                        />
                                        <span
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                                        >
                                            <FontAwesomeIcon
                                                icon={showConfirmPassword ? faEyeSlash : faEye}
                                            />
                                        </span>
                                    </div>
                                )}
                            </div>
                            <Button
                                text={mode === "login" ? "Đăng nhập" : "Đăng ký"}
                                className="!w-full !text-center"
                            />
                            <p className="!text-gray-600">
                                {mode === "login" ? "hoặc đăng nhập với " : "hoặc đăng ký với "}</p>
                            <button className="flex gap-5 !w-full bg-gray-700/40 hover:border-white 
          hover:border-1 items-center justify-center py-3 px-5 rounded-full">
                                <FcGoogle className="text-2xl" />
                                <span> {mode === "login" ? "Đăng nhập với Google " : "Đăng ký với Google"}</span>
                            </button>
                            {mode === "register" && (
                                <p className="!text-gray-500 w-[90%] text-center">
                                    Bằng việc nhấn “Đăng nhập”, bạn đã đọc và đồng ý với điều kiện và điều khoản của Waka
                                </p>
                            )}
                        </form>


                    </div>

                </div>

            </div>
        </div>
    );
};

export default Authentication;
