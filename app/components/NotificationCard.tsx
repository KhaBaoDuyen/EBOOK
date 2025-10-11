import React, { useState } from "react";

interface NotificationCardProps {
    type?: "success" | "error";
    title: string;
    message: string;
}

export default function NotificationCard({
    type = "success",
    title,
    message,
}: NotificationCardProps) {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;

    const isSuccess = type === "success";

    return (
        <div
            className="fixed inset-0 flex items-center justify-center
             bg-black/40 backdrop-blur-sm animate-fadeIn z-[999999]">

            <div className={`relative text-left rounded-lg max-w-[320px] shadow-xl
                    bg-white p-4 transition-all duration-300`}>
                <button
                    onClick={() => setVisible(false)}
                    className="absolute right-2 top-2 flex items-center 
        justify-center w-[30px] h-[30px] rounded-md border
         border-gray-300 text-gray-700 text-lg hover:bg-red-600
          hover:text-white hover:border-red-600 transition"
                >
                    ×
                </button>

                <div className="flex flex-col items-center text-center mt-2">
                    <div
                        className={`flex justify-center items-center w-12 h-12 
                        rounded-full ${isSuccess ? "bg-emerald-200" : "bg-red-100"
                            } animate-pulse`}
                    >
                        {isSuccess ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-8 h-8 text-emerald-600"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20 7L9 18l-5-5"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-8 h-8 text-red-600"
                                fill="none"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                    </div>

                    <div className="mt-3">
                        <span
                            className={`block text-base font-semibold ${isSuccess ? "text-emerald-700" : "text-red-700"
                                }`}
                        >
                            {title}
                        </span>
                        <p className="mt-2 text-sm text-gray-600">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
