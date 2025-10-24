import React, { useEffect, useState } from "react";
import { updateIsFavorite, IsFavorite } from "~/services/userIsFavorite.service";

export default function FavoriteButton({ book }: { book: any }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const getFavorite = async () => {
    try {
      if (!book?._id) return;
      const id = book._id.trim();
      const res = await IsFavorite(id);

      console.log("Kết quả yêu thích:", res);

      setIsFavorite(res?.isFavorite ?? false);
      setFavoriteCount(res?.favoriteCount ?? 0);
      setIsLoaded(true);
    } catch (error: any) {
      console.error("Lỗi lấy yêu thích:", error.message);
    }
  };

  useEffect(() => {
    if (book && book._id) {
      getFavorite();
    }
  }, [book?._id]);

  const handleToggleFavorite = async () => {
    if (loading || !book?._id) return;
    setLoading(true);
    try {
      const id = book._id.trim();
      const newState = !isFavorite;
      await updateIsFavorite(id, newState);
      setIsFavorite(newState);
      setFavoriteCount((prev) => prev + (newState ? 1 : -1));
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative cursor-pointer flex h-12 w-40 px-2 shadow-gray-700 rounded-xl border-none bg-[#1d1d1d] overflow-hidden"
    >
      <input
        type="checkbox"
        id={`heart-${book?._id}`}
        className="hidden peer"
        checked={isFavorite}
        onChange={handleToggleFavorite}
        disabled={loading}
      />
      <label
        htmlFor={`heart-${book?._id}`}
        className="w-[70%] border-r-2 px-1 border-gray-300/40 h-full flex items-center justify-evenly cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`h-7 w-7 transition-all duration-200 ${isFavorite ? "fill-[#fc4e4e] animate-pulse" : "fill-[#505050]"
            }`}
        >
          <path
            d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 
            25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 
            2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 
            5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 
            0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 
            15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 
            0 0 1-.704 0l-.003-.001Z"
          />
        </svg>
        <span className="text-[#fcfcfc] px-2 min-w-max text-sm font-[Segoe UI]">
          {isFavorite ? "Đã thích" : "Thích"}
        </span>
      </label>

      <span
        className={`absolute right-0 w-[30%] h-full flex justify-center items-center 
  text-[16px] font-semibold transition-all duration-500
  ${isLoaded
            ? isFavorite
              ? "translate-y-[-4px] scale-110 text-[#fcfcfc]"
              : "translate-y-0 text-[#d1d1d1]"
            : "translate-y-10 opacity-0 text-[#717070]"
          }`}
      >
        {favoriteCount}
      </span>

    </div>
  );
}
