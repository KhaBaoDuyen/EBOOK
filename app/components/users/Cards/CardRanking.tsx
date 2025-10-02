import React from "react";
import CardBook from "./CardBook";

/**
 * @param {number | null} number - Thứ hạng (có thể null)
 * @param {string} cover - Link ảnh bìa
 * @param {string} title - Tên sách
 * @param {string} author - Tên tác giả
 * @param {string} status - Trạng thái
 * @param {string} description - Mô tả
 * @param {string} link  - Link chi tiết
 */
const CardRankings = ({ number = null, cover="", title="", author="", status = "", description = "", link = "#" }) => {
  return (
    <div className="flex flex-col gap-3 w-[18%] hover:z-99">
      <div className="relative group max-w-min">
        <CardBook cover={cover} title={title} author={author} status={status} description={description} link={link} />
        {number !== null && (
          <div
            className="absolute rounded-xl bottom-0 left-0 transition duration-300
            group-hover:opacity-0"
          >
            <h1 className="text-9xl label-rank">{number}</h1>
          </div>
        )}
      </div>
      <p className="line-clamp-2 font-bold">{title}</p>
    </div>
  );
};

export default CardRankings;