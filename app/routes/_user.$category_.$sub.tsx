import { useParams, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/users/Buttons/Button";
import Section from "~/components/users/Section";
import CardRanking from "~/components/users/Cards/CardRanking";
import BookSlider from "~/components/users/Slider/BookSlider";
import { getCategoryGroup } from "~/services/category.service";
import { bookByCatgories } from "~/services/bookBy/bookByCategory";
import type { IBook } from "~/interfaces/book.interface";


export default function SubCategoryPage() {
  const { category, sub } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<any[]>([]);
  const [projects, setProjects] = useState<IBook[]>([]);
  const [booksAll, setBooksAll] = useState<IBook[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentBook = projects[currentIndex];
  const currentCategory = categories.find((cat) => cat.slug === category);

  const fetchCategories = async () => {
    const res = await getCategoryGroup();
    setCategories(res || []);
  };

  const fetchBooksBySubCategory = async (slug: string) => {
    const res = await bookByCatgories(slug);
    if (res?.allBooks) {
      if (!res.allBooks || Object.keys(res.allBooks).length === 0) {
        navigate("/404", { replace: true });
        return;
      }
      setBooksAll(res.allBooks);
      const shuffled = [...res.allBooks].sort(() => 0.5 - Math.random());
      setProjects(shuffled.slice(0, 5));
    } else {
      setBooksAll([]);
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (sub) {
      fetchBooksBySubCategory(sub);
    } else if (category) {
      fetchBooksBySubCategory(category);
    }
  }, [category, sub]);

  return (
    <>
      <div
        className="bg-sec1 h-full !mx-auto py-[7rem] text-white"
        style={{
          backgroundImage: currentBook ? `url(${currentBook.cover})` : undefined,
          backgroundColor: "rgba(0,0,0,0.6)",
          backgroundBlendMode: "darken",
        }}
      >
        <div className="container !mx-auto flex items-center justify-center w-full">
          <div className="basis-3/5 flex flex-col gap-3">
            <span className="flex items-center gap-5 pr-5">
              <label
                htmlFor="subCategory"
                className="block text-2xl text-gray-500 mb-2 font-semibold"
              >
                {currentCategory?.name || "Đang tải..."}
              </label>

              {currentCategory?.subCategories?.length ? (
                <div className="text-white">
                  <select
                    id="subCategory"
                    className="px-5 py-3 bg-white/20 backdrop-blur-md border border-white/30 
                      rounded-md text-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    value={sub ?? ""}
                    onChange={(e) => {
                      const newSlug = e.target.value;
                      if (newSlug) {
                        navigate(`/${currentCategory.slug}/${newSlug}`);
                      } else {
                        navigate(`/${currentCategory.slug}`);
                      }
                    }}
                  >
                    <option value="">Tất cả danh mục</option>
                    {currentCategory.subCategories.map((subcat: any) => (
                      <option
                        key={subcat.slug}
                        value={subcat.slug}
                        className="bg-black/80 text-white"
                      >
                        {subcat.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <p className="italic text-gray-400"></p>
              )}
            </span>

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
                  <h1 className="text-3xl font-bold">{currentBook.title}</h1>
                  <p className="text-gray-300 line-clamp-5 w-[80%]"
                    dangerouslySetInnerHTML={{
                      __html: currentBook.description || ""
                    }}>
                  </p>

                  <Button
                    text="Đọc sách"
                    icon={faBook}
                    href={`/ebook/${currentBook.slug}`}
                    iconPosition="left"
                  />
                </div>
              )}
            </div>
          </div>

          <span className="basis-2/5">
            <BookSlider projects={projects} onSlideChange={setCurrentIndex} />
          </span>
        </div>
      </div>

      <main className="container !mx-auto">
        {/* {booksAll.length > 0 ? (
          <Section title="Mới nhất" books={booksAll} />
        ) : null} */}

        <section>
          <h1 className="text-xl mt-5 !font-bold">Tất cả các sách</h1>
          {booksAll.length > 0 ? (
            <div className="flex flex-wrap w-full gap-5 p-5">
              {booksAll.map((book, i) => (
                <CardRanking
                  key={i}
                  cover={book.cover}
                  title={book.title}
                  author={book.authorId?.name}
                  status={book.status}
                  description={book.description}
                  slug={book.slug}
                />
              ))}
            </div>
          ) : (
            <div className="w-full text-center text-gray-400 py-10 ">
              <p className="text-lg font-semibold">
                Hiện chưa có sách nào trong danh mục này
              </p>
              <p className="text-sm mt-2">
                Hãy quay lại sau khi hệ thống cập nhật thêm nội dung mới.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
