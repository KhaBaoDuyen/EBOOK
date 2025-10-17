import React, { useRef, useEffect } from "react";

interface OtpVerificationProps {
  onSubmit: (otp: string) => void;
  onResend: () => void;
  onClose: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  onSubmit,
  onResend,
  onClose,
}) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

   useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const input = e.target;
    const value = input.value.replace(/[^0-9]/g, "");  
    input.value = value;

    if (value && i < 5) {
      setTimeout(() => {
        inputsRef.current[i + 1]?.focus();
      }, 10);  
    }
  };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && i > 0) {
      setTimeout(() => {
        inputsRef.current[i - 1]?.focus();
      }, 10);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = inputsRef.current.map((input) => input?.value || "").join("");
    onSubmit?.(otp);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[1000]">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-2xl shadow-lg p-8 w-[22rem] text-center"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-500"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-3 text-[#15B088]">Xác minh OTP</h2>
        <p className="text-gray-600 text-sm mb-6">
          Chúng tôi đã gửi mã xác thực đến email của bạn
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              inputMode="numeric"
              className="otp-input w-10 h-12 text-center border border-gray-300 rounded-lg text-lg font-semibold text-[#15B088] focus:border-[#15B088] focus:ring-2 focus:ring-[#15B088]/50 focus:outline-none transition"
              ref={(el) => {
                if (el) inputsRef.current[i] = el;
              }}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#15B088] text-white rounded-lg font-semibold hover:bg-[#13A07D] transition"
        >
          Xác minh
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Không nhận được mã?
          <button
            type="button"
            onClick={onResend}
            className="text-[#15B088] font-semibold ml-1 hover:underline"
          >
            Gửi lại
          </button>
        </p>
      </form>
    </div>
  );
};

export default OtpVerification;
