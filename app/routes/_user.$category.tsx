import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import categories from "../../public/data/categories.json";
import Splide from "@splidejs/splide";
import { faBook } from "@fortawesome/free-solid-svg-icons";


//==================[ COMPONENT ]====================
import Button from "~/components/users/Buttons/Button";
import Section from "~/components/users/Section";
import CardCategory from "~/components/users/Cards/CardCategory";
import CardRanking from "~/components/users/Cards/CardRanking";
import Slider3Images from "~/components/users/Slider/slider-3image";
import BookSlider from "~/components/users/Slider/BookSlider";
import { useLoaderData } from "@remix-run/react";
import type { IBook } from "~/interfaces/book.interface";
import type { ICategory } from "~/interfaces/category.interface";


//------------------[ API ]--------------------------------
import { bookByCatgories } from "~/services/bookBy/bookByCategory";
import { getAllCategory } from "~/services/category.service";
import { title } from "process";
import { ca } from "date-fns/locale";


interface Book {
  id?: number;
  title?: string;
  author?: string;
  cover?: string;
  status?: number;
  description?: string;
  slug?: string;
  category?: string;
  subCategory?: string;
}


export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  console.log(category);

  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const getcategogy = async (categogy: any) => {
    try {
      const res = await getAllCategory();
      const allCat = res.data;

      const categories = allCat.find((cat: any) => cat.slug === categogy);

      if (!categories) {
        console.warn("loi khong tim thay danh muc", categogy);
        setCurrentCategory(null);
        return;
      }

      const subCategories = allCat.filter(
        (child: any) =>
          Array.isArray(child.parentId) && child.parentId.includes(categories._id)
      );

      const fullCategory = { ...categories, subCategories };
      setCurrentCategory(fullCategory);

      console.log("danh muc hien tai", fullCategory);

    } catch (error: any) {
      console.error(" Lỗi khi lấy danh mục:", error.message);
    }
  };

  useEffect(() => {
    if (category) {
      getcategogy(category);
    }
  }, [category]);

  // ---------------[ LẤY TOÀN BỘ SẢN PHẨM ]------------
  const [subCategories, setSubCaregory] = useState<any[]>([]);
  const [booksAll, setBooksAll] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, [category]);

  const fetchBooks = async () => {
    const res = await bookByCatgories(category);
    if (res?.allBooks) {
      setBooksAll(res.allBooks);
    }
    if (res?.subCategories) {
      setSubCaregory(res.subCategories);
    }
  };

  // ---------------[ LẤY SẢN PHẨM RANDOM GẦN NHẤT ]------------
  const [projects, setProjects] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (booksAll.length > 0) {
      const shuffled = [...booksAll].sort(() => 0.5 - Math.random());
      setProjects(shuffled.slice(0, 5));
    }
  }, [booksAll]);

  //----------------[ SLIDER ]-------------------
  const initSplide = (selector: string, onMove: (newIndex: number) => void) => {
    const splide = new Splide(selector, {
      type: "loop",
      perPage: 1,
      focus: "center",
      padding: { left: "20%", right: "20%" },
      gap: "1rem",
      arrows: true,
      pagination: false,
      autoplay: true,
      interval: 5000,
    });

    splide.on("moved", (newIndex: number) => {
      onMove(newIndex);
    });

    splide.mount();
    return splide;
  };

  useEffect(() => {
    if (projects.length > 0) {
      const splide = initSplide(".splide-desktop", (newIndex) => {
        setCurrentIndex(newIndex);
      });

      return () => {
        splide.destroy();
      };
    }
  }, [projects]);

  const currentBook = projects[currentIndex];

  const images = [
    "/Images/Slides/Pages/2.png",
    "/Images/Slides/Pages/3.png",
    "/Images/Slides/Pages/4.png",
    "/Images/Slides/Pages/5.png",
    "/Images/Slides/Pages/6.png",
    "/Images/Slides/Pages/7.png",
    "/Images/Slides/Pages/8.png",
    "/Images/Slides/Pages/9.png",
    "/Images/Slides/Pages/10.png",
  ];

  return (
    <>
      <div
        className="bg-sec1 h-full !mx-auto py-[7rem] text-white"
        style={{
          backgroundImage: currentBook?.cover
            ? `url(${currentBook.cover})`
            : undefined,
          backgroundColor: "rgba(0,0,0,0.6)",
          backgroundBlendMode: "darken",
        }}
      >
        <div className="container !mx-auto flex items-center justify-center w-full">
          <div className="basis-3/5 flex flex-col gap-3">
            {currentCategory ? (
              <span className="flex items-center gap-5 pr-5">
                <label
                  htmlFor="subCategory"
                  className="block text-6xl mb-2 font-semibold"
                >
                  {String(currentCategory.name)}
                </label>

                {currentCategory.subCategories?.length > 0 ? (
                  <div className="text-white">
                    <select
                      id="subCategory"
                      className="px-5 py-3 bg-white/20 backdrop-blur-md border border-white/30 
                      rounded-md text-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                      defaultValue=""
                    >
                      <option value="">Tất cả danh mục</option>
                      {currentCategory.subCategories.map((sub: any) => (
                        <option
                          key={sub.slug}
                          value={String(sub.slug)}
                          className="bg-black/80 p-5 text-white"
                        >
                          {String(sub.name)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <p className="italic text-gray-400">(Không có danh mục con)</p>
                )}
              </span>
            ) : (
              <p className="text-gray-400 italic">Đang tải danh mục...</p>
            )}

            <h1 className="!font-bold">
              Khám phá thế giới sách Waka với hơn 3500+ Sách điện tử, Sách nói
              và Truyện tranh
            </h1>

            <div className="flex flex-col gap-5">
              <span className="bg-white/20 p-2 !font-bold w-max rounded-lg rounded-bl-none">
                SMARTBOOK ĐỀ XUẤT
              </span>
              {currentBook && (
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold">
                    {String(currentBook.title)}
                  </h1>
                  <p
                    className="text-gray-300 !w-[80%] line-clamp-5"
                    dangerouslySetInnerHTML={{
                      __html: currentBook.description || "",
                    }}
                  ></p>

                  <Button
                    text="Đọc sách"
                    icon={faBook}
                    href={currentBook.slug || "#"}
                    iconPosition="left"
                  />
                </div>
              )}
            </div>
          </div>
          <span className="basis-2/5 ">
            <BookSlider projects={projects} onSlideChange={setCurrentIndex} />
          </span>
        </div>
      </div>

      <main className="container !mx-auto">
        <Section title="Mới nhất" books={booksAll} />

        <div className="mt-5 flex flex-col gap-5">
          <h1 className="text-3xl">Một số thể loại</h1>
          <Slider3Images images={images} />
        </div>

        {subCategories
          .filter((sub) => sub.books && sub.books.length > 0)
          .map((sub) => (
            <Section key={sub._id} title={sub.name} books={sub.books} />
          ))}
      </main>
    </>
  );
}
