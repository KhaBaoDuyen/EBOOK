import React from "react";
import CardBook from "./CardBook";

type CardRankingsProps = {
  number?: number | null;
  cover?: string;
  title?: string;
  author?: string;
  category?: {name:string}[];
  description?: string;
  slug?: string;  
};

/**
 * CardRankings hiển thị sách trong bảng xếp hạng
 */
const CardRankings: React.FC<CardRankingsProps> = ({
  number = null,
  cover = "",
  title = "",
  author = "",
  category = "",
  description = "",
  slug = "#",
}) => {
  return (
    <div className="flex flex-col gap-3 w-[18%] hover:z-99">
      <div className="relative group max-w-min">
        <CardBook
          cover={cover}
          title={title}
          author={author}
          category={category}
          description={description}
          link={`/ebook/${slug}`} 
        />
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
