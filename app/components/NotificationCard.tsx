import React, { useState } from "react";

interface NotificationCardProps {
  type?: "success" | "error" | "warning";
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
  const isError = type === "error";
  const isWarning = type === "warning";

   const colors = {
    bg:
      isSuccess
        ? "bg-emerald-200"
        : isError
        ? "bg-red-100"
        : "bg-yellow-200",
    icon:
      isSuccess
        ? "text-emerald-600"
        : isError
        ? "text-red-600"
        : "text-yellow-600",
    title:
      isSuccess
        ? "text-emerald-700"
        : isError
        ? "text-red-700"
        : "text-yellow-700",
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center
       bg-black/40 backdrop-blur-sm animate-fadeIn z-[999999]"
    >
      <div
        className={`relative text-left rounded-lg max-w-[320px] shadow-xl
        bg-white p-4 transition-all duration-300`}
      >
        {/* Nút đóng */}
        <button
          onClick={() => setVisible(false)}
          className="absolute right-2 top-2 flex items-center 
            justify-center w-[30px] h-[30px] rounded-md border
            border-gray-300 text-gray-700 text-lg hover:bg-gray-200
            hover:text-black transition"
        >
          ×
        </button>

        {/* Nội dung */}
        <div className="flex flex-col items-center text-center mt-2">
          <div
            className={`flex justify-center items-center w-12 h-12 
              rounded-full ${colors.bg} animate-pulse`}
          >
            {isSuccess && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className={`w-8 h-8 ${colors.icon}`}
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7L9 18l-5-5"
                />
              </svg>
            )}

            {isError && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`w-8 h-8 ${colors.icon}`}
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

            {isWarning && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className={`w-8 h-8 ${colors.icon}`}
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86L2.82 18a1 1 0 00.88 1.47h16.6a1 1 0 00.88-1.47L13.71 3.86a1 1 0 00-1.74 0z"
                />
              </svg>
            )}
          </div>

          <div className="mt-3">
            <span
              className={`block text-base font-semibold ${colors.title}`}
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
