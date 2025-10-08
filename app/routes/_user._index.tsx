import type { Route } from "./+types/_index";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

import React, { useEffect, useState } from "react";
import CardRanking from "../components/users/Cards/CardRanking";
import CardCategory from "../components/users/Cards/CardCategory";
import Slider from "../components/users/Slider";
import books from "../../public/data/listBook.json";
import Section from "../components/users/Section";

import type { IBook } from "~/interfaces/book.interface";

import { bookByRating } from "~/services/bookByRating";
import { bookByCreateAt } from "~/services/bookBySection.service";

const HomePage = () => {

  useEffect(() => {
    getBookByRating();
    bookByCreateAts();
  }, []);

  //-------------------[ LAY SACH THEO RATING ]-----------------
  const [ratingBook, setRatingBook] = useState([]);

  const getBookByRating = async () => {
    try {
      const rating = await bookByRating();
      setRatingBook(rating.data);
    } catch (err: any) {
      console.log("Loi khi lay sach theo rating", err.message);

    }
  }
  //-------------------[ LAY SACH THEO CREATE ]-----------------
  const [bookByCreate, setBookByCreate] = useState<any>([]);

  const bookByCreateAts = async () => {
    try {
      const res = await bookByCreateAt(); 
      console.log(res);
           
      setBookByCreate(res?.data);
    } catch (err: any) {
      console.log("Loi khi lay sach theo moi nhat", err.message);
    }
  }

  return (
    <main className="relative !w-full">
      <Slider />

      <div className="md:container !mx-auto py-5">
        <div className="!mx-auto py-5">
          <h1 className="font-bold text-2xl">Bảng xếp hạng</h1>
          <div className="flex flex-row overflow-x-auto scrollbar-hide w-full gap-10 p-5">
            {ratingBook.map((rating, i) => (
              <CardRanking
                key={i}
                number={i + 1}
                cover={rating?.cover}
                title={rating.title}
                author={rating?.authorId?.name || "Chưa xác định"}
                category={rating?.categories || "Khác"}
                description={rating.description}
                slug={rating.slug}
              />
            ))}
          </div>
        </div>

        <Section title="Mới nhất" books={bookByCreate} />
        <Section title="Thiền Định - Tìm Bình An trong Tâm Hồn" books={books} />
        <Section title="Kỹ năng vượt qua mùa khó khăn" books={books} />
        <Section title="Tự truyện và Hồi ký" books={books} />
        <Section title="Trinh thám - Kinh dị" books={books} />

        <div className="!mx-auto grid md:grid-cols-4 grid-cols-2 gap-10 py-2">
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
