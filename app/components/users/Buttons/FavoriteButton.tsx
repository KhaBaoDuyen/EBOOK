import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateIsFavorite } from "~/services/userIsFavorite.service";

export default function FavoriteButton({ book }: { book: any }) {
  const [isFavorite, setIsFavorite] = useState(!!book?.isFavorite);
  const [loading, setLoading] = useState(false);

  const handleToggleFavorite = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await updateIsFavorite(book._id, !isFavorite);
      setIsFavorite(!isFavorite);
      console.log(res.message);
    } catch (error: any) {
      console.log("Lỗi handleToggleFavorite =>", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <label className="relative inline-flex items-center justify-center cursor-pointer">
      <input
        type="checkbox"
        onChange={handleToggleFavorite}
        checked={isFavorite}
        className="hidden"
      />
      <motion.div
        className={`flex items-center justify-center w-7 h-7 transition-all duration-200 ${
          isFavorite ? "text-red-500" : "text-gray-500 hover:text-gray-600"
        }`}
        animate={isFavorite ? { scale: [1, 0.6, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
        </svg>
      </motion.div>
      <AnimatePresence>
        {isFavorite && (
          <motion.span
            className="absolute rounded-full border border-red-500"
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: [1, 0.7, 0], scale: [0, 2, 2.8] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </label>
  );
}
