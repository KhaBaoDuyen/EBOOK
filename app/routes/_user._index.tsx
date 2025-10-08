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

import { bookByRating } from "~/services/bookByRating.service";
import { bookByCreateAt } from "~/services/bookBySection.service";
import {
  bookByGroupsThienDinh,
  bookByGroupsKyNang,
  bookByGroupsTrinhThamKinhDi,
  bookByGroupsTuTruyenHoiKy,
  bookByRandom
} from "~/services/bookByCategogy.service";

const HomePage = () => {

  useEffect(() => {
    getBookByRating();
    bookByCreateAts();
    getBookByThienDinh();
    getBookByKyNang();
    getBookByTuTruyen();
    getBookByTrinhTham();
    getBookRandom();
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

  //-------------------[ LAY SACH THEO GROUPS ]-----------------
  const [bookByThienDinh, setBookByThienDinh] = useState<any>([]);
  const [bookByKyNang, setBookByKyNang] = useState<any>([]);
  const [bookByTuTruyen, setBookByTuTruyen] = useState<any>([]);
  const [bookByTrinhTham, setBookByTrinhTham] = useState<any>([]);

  const getBookByThienDinh = async () => {
    try {
      const res = await bookByGroupsThienDinh()
      setBookByThienDinh(res.data);
    } catch (err: any) {
      return console.log("loi khi lay group Thien Dinh", err.message);
    }
  }
  const getBookByKyNang = async () => {
    try {
      const res = await bookByGroupsKyNang()
      setBookByKyNang(res.data);
    } catch (err: any) {
      return console.log("loi khi lay group Ky nang", err.message);
    }
  }
  const getBookByTuTruyen = async () => {
    try {
      const res = await bookByGroupsTuTruyenHoiKy()
      setBookByTuTruyen(res.data);
    } catch (err: any) {
      return console.log("loi khi lay group Tu truyen", err.message);
    }
  }
  const getBookByTrinhTham = async () => {
    try {
      const res = await bookByGroupsTrinhThamKinhDi()
      setBookByTrinhTham(res.data);
    } catch (err: any) {
      return console.log("loi khi lay group Trinh tham", err.message);
    }
  }

  //--------------------[ LAY SACH RANDOM ]----------------------
  const [random, setRandom] = useState<any>([]);

  const getBookRandom = async () => {
    try {
      const res = await bookByRandom();
      setRandom(res.data);
    } catch (err: any) {
      console.log("loi khi lay sach random", err.message);
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
        <Section title="Thiền Định - Tìm Bình An trong Tâm Hồn" books={bookByThienDinh} />
        <Section title="Kỹ năng vượt qua mùa khó khăn" books={bookByKyNang} />
        <Section title="Tự truyện và Hồi ký" books={bookByTuTruyen} />
        <Section title="Trinh thám - Kinh dị" books={bookByTrinhTham} />

        <div className="!mx-auto grid md:grid-cols-4 grid-cols-2 gap-10 py-2">
          {random.slice(0, 8).map((book, i) => (
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
