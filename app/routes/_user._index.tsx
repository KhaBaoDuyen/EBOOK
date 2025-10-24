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

import { bookByRating } from "~/services/bookBy/bookByRating.service";
import { bookByCreateAt } from "~/services/bookBy/bookBySection.service";
import {
  bookByGroupsThienDinh,
  bookByGroupsKyNang,
  bookByGroupsTrinhThamKinhDi,
  bookByGroupsTuTruyenHoiKy,
  bookByRandom
} from "~/services/bookBy/bookByGroups.service";
import { bookByCatgories } from "~/services/bookBy/bookByCategory";
import { getAllCategory } from "~/services/category.service";

const HomePage = () => {

  useEffect(() => {
    getBookByRating();
    bookByCreateAts();
    getBookRandom();
  }, []);

  //-------------------[ LAY SACH THEO RATING ]-----------------
  const [ratingBook, setRatingBook] = useState([]);

  const getBookByRating = async () => {
    try {
      const rating = await bookByRating();
      setRatingBook(rating.data);
    } catch (err: any) {
      console.log("Loi khi lay sach theo view", err.message);

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

  // ---------------[ LẤY TOÀN BỘ SẢN PHẨM ]------------
  const [categories, setCategories] = useState<any[]>([]);
  const [booksAll, setBooksAll] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);

  useEffect(() => {
    getParentCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      fetchBooksByCategories();
    }
  }, [categories]);

  // --------------------- LẤY DANH MỤC CHA ---------------------
  const getParentCategories = async () => {
    try {
      const res = await getAllCategory();
      if (res?.data) {
        const parentCategories = res.data.filter(
          (cat: any) => !cat.parentId || cat.parentId === null
        );
        setCategories(parentCategories);
      }
    } catch (err: any) {
      console.log(" Lỗi khi lấy danh mục:", err.message);
    }
  };

  // --------------------- LẤY SÁCH THEO DANH MỤC ---------------------
  const fetchBooksByCategories = async () => {
    try {
      const results = await Promise.all(
        categories.map(async (cat: any) => {
          try {
            const res = await bookByCatgories(cat.slug);
            return {
              category: cat,
              allBooks: res?.allBooks || [],
              subCategories: res?.subCategories || [],
            };
          } catch (error: any) {
            return { category: cat, allBooks: [], subCategories: [] };
          }
        })
      );

      const validResults = results.filter((r) => r.allBooks.length > 0);

      const allBooksFlat = validResults.map((r) => r.allBooks).flat();

      const uniqueBooks = Array.from(
        new Map(allBooksFlat.map((b: any) => [String(b._id), b])).values()
      );
      
      const allSubsFlat = validResults.map((r) => r.subCategories).flat();

      setBooksAll(uniqueBooks);

      setSubCategories(allSubsFlat);
    } catch (err: any) {
      console.log("Lỗi khi lấy sách:", err.message);
    }
  };



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
        {categories
          .filter(cat =>
            booksAll.some(b =>
              Array.isArray(b.categories) &&
              b.categories.some(c =>
                String(typeof c === "object" ? c._id : c) === String(cat._id)
              )
            )
          )
          .map(cat => {
            const booksInCategory = booksAll.filter(b =>
              Array.isArray(b.categories) &&
              b.categories.some(c =>
                String(typeof c === "object" ? c._id : c) === String(cat._id)
              )
            );

            return (
              <Section
                key={cat._id}
                title={cat.name}
                books={booksInCategory}
              />
            );
          })}


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
