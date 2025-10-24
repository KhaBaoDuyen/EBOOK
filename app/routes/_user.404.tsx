import { Link } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0f1a1f] flex flex-col items-center justify-center text-center text-white px-4 select-none">
      <div className="relative">
        <h1 className="text-[9rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#15B088] to-emerald-400 drop-shadow-[0_0_15px_rgba(21,176,136,0.6)]">
          404
        </h1>
        <div className="absolute inset-0 blur-3xl bg-[var(--primary)] opacity-20 rounded-full -z-10" />
      </div>

      <h2 className="text-2xl font-semibold mt-4 text-white/90">
        Ôi! Trang bạn tìm không tồn tại
      </h2>

      <p className="text-gray-400 max-w-md mt-2 leading-relaxed">
        Có thể đường dẫn đã bị thay đổi hoặc cuốn sách bạn đang tìm chưa được xuất bản.
      </p>

      <button
        onClick={()=>navigate(-1)}
        className="mt-8 inline-flex items-center gap-2 px-5 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)]
          text-white font-medium rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(21,176,136,0.4)]
          hover:shadow-[0_0_25px_rgba(21,176,136,0.7)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Quay lại trang chủ</span>
      </button>

      <div className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} SMARTBOOK – Tủ sách điện tử của bạn
      </div>
    </div>
  );
}
