import { useEffect, useRef, useState } from "react";
import { Sparkles, BookOpen, Gift, Star } from "lucide-react";

export default function CategoryDropdown({ cat, currentPath }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"left" | "right">("left");

  useEffect(() => {
    const checkPosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const overflowsRight = rect.left + rect.width > screenWidth - 20;
        setPosition(overflowsRight ? "right" : "left");
      }
    };

    checkPosition();
    window.addEventListener("resize", checkPosition);
    return () => window.removeEventListener("resize", checkPosition);
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute lg:p-5 z-[90] w-max top-full mt-1 
        bg-black/80 backdrop-blur-md rounded-lg shadow-lg border border-white/30 
        transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible
        ${position === "right" ? "right-0" : "left-0"}`}
    >
      <h1 className="font-bold py-2 text-white text-xl mb-2">{cat.name}</h1>

      <div
        className="grid auto-rows-auto gap-4 max-h-[10rem] overflow-y-auto p-5"
        style={{ gridTemplateColumns: "repeat(4, minmax(0, max-content))" }}
      >
        {cat.children.map((sub: any) => (
          <a
            key={sub.slug}
            href={`/${cat.slug}/${sub.slug}`}
            className={`block px-4 py-2 text-white hover:bg-white/30 rounded-xl font-bold ${
              currentPath === `/${sub.slug}` ? "text-emerald-400" : ""
            }`}
          >
            {sub.name}
          </a>
        ))}
      </div>

      <hr className="border-white/10 my-2" />

      <div>
        <h1 className="font-bold py-2 text-white text-xl mb-2">KHÁM PHÁ NGAY</h1>

        <span className="flex flex-wrap gap-4 mt-5">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[var(--primary)] text-white rounded-xl backdrop-blur-md transition-all border border-white/20">
            <Sparkles size={18} className="text-[var(--primary)]" />
            <span>Sách mới nhất</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[var(--primary)] text-white rounded-xl backdrop-blur-md transition-all border border-white/20">
            <BookOpen size={18} className="text-[var(--primary)]" />
            <span>Sách đọc nhiều</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[var(--primary)] text-white rounded-xl backdrop-blur-md transition-all border border-white/20">
            <Gift size={18} className="text-[var(--primary)]" />
            <span>Sách miễn phí</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[var(--primary)] text-white rounded-xl backdrop-blur-md transition-all border border-white/20">
            <Star size={18} className="text-[var(--primary)]" />
            <span>Sách đề cử</span>
          </button>
        </span>
      </div>
    </div>
  );
}
