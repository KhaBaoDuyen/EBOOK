import type { Route } from "./+types/_index";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

import React, { useState } from "react";
import CardRanking from "../components/users/Cards/CardRanking";
import CardCategory from "../components/users/Cards/CardCategory";
import Slider from "../components/users/Slider";
import books from "../../public/data/listBook.json";
import Section from "../components/users/Section";

import type{ IBook } from "~/interfaces/book.interface";

const HomePage = () => {
  
  // const [books, setBooks] = useState<IBook>();
  
  // const getBookByCategory = async () =>{

  // }


  return (
    <main className="relative !w-full">
      <Slider />

      <div className="md:container !mx-auto py-5">
        <div className="!mx-auto py-5">
          <h1 className="font-bold text-2xl">Bảng xếp hạng</h1>
          <div className="flex flex-row overflow-x-auto scrollbar-hide w-full gap-10 p-5">
            {books.map((book, i) => (
              <CardRanking
                key={i}
                number={1}
                cover={book.cover}
                title={book.title}
                author={book?.author || ""}
                status={book?.status}
                description={book.description}
                slug={book.slug}
              />
            ))}
          </div>
        </div>

        <Section title="Mới nhất" books={books} />
        <Section title="Thiền Định - Tìm Bình An trong Tâm Hồn" books={books} />
        <Section title="Kỹ năng vượt qua mùa khó khăn" books={books} />
        <Section title="Tự truyện và Hồi ký" books={books} />
        <Section title="Trinh thám - Kinh dị" books={books} />

        <div className="!mx-auto grid md:grid-cols-4 grid-cols-2 gap-5 py-2">
          {books.slice(0, 8).map((book, i) => (
            <CardCategory
              key={i}
              cover={book.cover}
              title={book.title}
              author={book.author}
              link={book.slug}
              description={book.description || ""}
            />

          ))}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
