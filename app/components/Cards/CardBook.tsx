import React from "react";
import Button from "../Buttons/Button";
import { faBook } from "@fortawesome/free-solid-svg-icons";


/**
 * @param {string} cover - Link ảnh
 * @param {string} title - Tên sách
 * @param {string} author - tên tác giả
 * @param {string} status - Trạng thái
 * @param {string} description - mô tả
 * @param {string} link - Link card
 */

const CardBook = ({
     cover="", 
     title="", 
     author="", 
     status = "", 
     description = "", 
     link = "#" }) => {
  return (
    <div>
      <div
        className="group relative w-52 h-80 bg-black/30 backdrop-blur-xl rounded-xl overflow-hidden cursor-pointer
        transition-all duration-400 ease-in-out hover:w-[600px] hover:h-[300px] hover:p-4
        hover:bg-black/30 hover:backdrop-blur-md hover:border
        hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
      >
        <div className="flex gap-6 h-full">
          <div
            className="flex-shrink-0 w-52 rounded-lg overflow-hidden transition-all duration-400
            ease-in-out group-hover:h-68"
          >
            <img
              src={cover}
              alt={title}
              className="w-full h-full object-cover transition-all duration-400"
            />
          </div>

          <div
            className="flex-1 flex flex-col justify-between opacity-0 invisible translate-x-5
            transition-all duration-400 delay-100 text-white group-hover:opacity-100
            group-hover:visible group-hover:translate-x-0"
          >
            <div>
              <h1 className="text-xl font-bold leading-snug mb-2">{title}</h1>
              <p className="text-gray-400 mb-4">{author}</p>

              <div className="!flex items-center justify-between">
                <span
                  className="inline-block bg-emerald-500/10 text-emerald-500 px-3 py-1
                  rounded-full text-sm font-medium"
                >
                  {status}
                </span>

                <span className="flex lg:flex-row flex-col gap-2">
                  <Button
                    text="Đọc sách"
                    icon={faBook}   
                    href={link}
                    iconPosition="left"
                  />
                  <button
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition"
                  >
                    ♥
                  </button>
                </span>
              </div>
              <p
                className="text-sm text-gray-300 leading-relaxed mt-4 line-clamp-4 group-hover:line-clamp-none"
              >
                {description}
              </p>
            </div>

            <a
              href={link}
              className="text-emerald-500 text-sm font-medium mt-4 block hover:underline hover:text-emerald-600 transition"
            >
              Chi tiết
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBook;