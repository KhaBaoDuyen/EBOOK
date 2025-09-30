import React from "react";

/**
 * @param {string} cover - Link ảnh
 * @param {string} title - Tên sách
 * @param {string} author - Tên tác giả
 * @param {string} [link="#"] - Link card
 * @param {string} subCategory - Danh mục con
 */

const CardCategory = ({ cover = "", title = "", author = "", link = "#" }, subCategory = "") => {
  return (
    <a href={link} className="grid grid-cols-[40%_60%] gap-6 hover:border-white/60">
      <span className="rounded-xl overflow-hidden">
        <img src={cover} alt={title} className="w-full h-full object-cover" />
      </span>
      <span className="flex flex-col justify-center">
        <h1 className="line-clamp-3 font-semibold">{title}</h1>
        <p className="font-pri line-clamp-2">{author}</p>
        <p className="text-gray-500">{subCategory}</p>
      </span>
    </a>

  );
};

export default CardCategory;