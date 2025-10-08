import React from "react";

type CardCategoryProps = {
  cover?: string;
  title?: string;
  author?: string;
  link?: string;
  description?: string | null;
};

const CardCategory: React.FC<CardCategoryProps> = ({
  cover = "",
  title = "",
  author = "",
  link = "#",
  description = "",
}) => {
  return (
    <a
      href={link}
      className="grid grid-cols-[40%_60%] gap-10 hover:border-white/60"
    >
      <span className="rounded-xl overflow-hidden">
        <img src={cover} alt={title} className="w-full h-full object-cover" />
      </span>
      <span className="flex flex-col justify-center">
        <h1 className="line-clamp-3 font-semibold">{title}</h1>
        <p className="font-pri line-clamp-2">{author}</p>
        <p className="text-gray-500 line-clamp-5 text-justify">{description}</p>
      </span>
    </a>
  );
};

export default CardCategory;
