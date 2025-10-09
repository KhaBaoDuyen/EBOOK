import React, { useState, useRef } from "react";
import Button from "../Buttons/Button";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const CardBook = ({
  cover = "",
  title = "",
  author = "",
  category = [],
  description = "",
  link = "#",
}) => {
  const [alignLeft, setAlignLeft] = useState(false);
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    const rect = cardRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const expandedWidth = 600;
    const imageWidth = 208;
    
    if (rect.right + (expandedWidth - imageWidth) > windowWidth) {
      setAlignLeft(true);
    } else {
      setAlignLeft(false);
    }
  };

   const categoryText = category.length
    ? category.map((cat) => cat.name).join(", ")
    : "Khác";

  return (
    <div className="relative w-52 h-80">
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        className="absolute top-0 left-0 w-52 hover:border-1 h-80 bg-black/30 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer
          transition-all duration-400 ease-in-out hover:w-[600px] hover:h-[330px] hover:p-4
          hover:bg-black/70 hover:backdrop-blur-md hover:z-50
          hover:border-white/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
        style={{
          right: alignLeft ? 0 : 'auto',
          left: alignLeft ? 'auto' : 0
        }}
      >
        <div
          className={`flex gap-6 h-full ${
            alignLeft ? "flex-row-reverse text-left" : "flex-row"
          }`}
        >
          <div className="flex-shrink-0 w-52 rounded-lg overflow-hidden transition-all duration-400">
            <img src={`/uploads/bannerBook/${cover}`} alt={title} className="w-full h-full object-cover" />
          </div>
           <div
            className="flex-1 flex flex-col justify-between opacity-0 invisible translate-x-5
            transition-all duration-400 delay-100 text-white group-hover:opacity-100
            group-hover:visible group-hover:translate-x-0"
          >
            <div>
              <h1 className="text-xl font-bold leading-snug mb-2">{title}</h1>
              <p className="text-gray-400 mb-4">{categoryText}</p>
              <div className="!flex items-center justify-between">
                <span className="inline-block bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-sm font-medium">
                  {author}  
                </span>
                <span className="flex lg:flex-row flex-col gap-2">
                  <Button
                    text="Đọc sách"
                    icon={faBook}
                    href={link}
                    iconPosition="left"
                  />
                  <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition">
                    ♥
                  </button>
                </span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mt-4 line-clamp-4 group-hover:line-clamp-none">
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