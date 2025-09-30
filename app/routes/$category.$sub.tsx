import { useParams } from "react-router";
import { useEffect, useState } from "react";
import categories from "../../public/data/categories.json";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";
import "@splidejs/splide/css/skyblue";
import { faBook } from "@fortawesome/free-solid-svg-icons";

//==================[ COMPONENT ]====================
import Button from "~/components/Buttons/Button";
import Section from "~/components/Section";
import CardCategory from "~/components/Cards/CardCategory";
import CardRanking from "~/components/Cards/CardRanking";
import BookSlider from "~/components/Slider/BookSlider";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  status: string;
  description: string;
  link: string;
  category: string;
  subCategory?: string;
}
export default function SubCategoryPage() {
  const { category, sub } = useParams();

  const currentCategory = categories.find((cat) => cat.slug === category);

  if (!currentCategory) {
    return (
      <div className="p-5 text-white">
        <h1 className="text-2xl font-bold">Không tìm thấy danh mục!</h1>
      </div>
    );
  }
  // ---------------[ LAY SAN PHAM RANDOW GAN NHAT ]------------

  const [projects, setProjects] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBook = projects[currentIndex];

  const dataRandom = () => {
    fetch("/data/listBook.json")
      .then((res) => res.json())
      .then((data: Book[]) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setProjects(shuffled.slice(0, 5));
      })
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    dataRandom();
  }, []);

  // ---------------[ LAY SAN PHAM ]------------
  const [categores, setCaregory] = useState<any[]>([]);

  const fetchProjects = () => {
    fetch("/data/listBook.json")
      .then((res) => res.json())
      .then((data) => {
        setCaregory(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);



  return (
    <>
      <div className="bg-sec1 h-full !mx-auto py-[7rem] text-white"
        style={{
          backgroundImage: currentBook ? `url(${currentBook.cover})` : undefined,
          backgroundColor: "rgba(0,0,0,0.6)",
          backgroundBlendMode: "darken",
        }}>
        <div className="container !mx-auto flex  items-center justify-center w-full">
          <div className="basis-3/5 flex flex-col gap-3">
            <span className=" flex items-center gap-5 pr-5" >
              <label htmlFor="subCategory" className="block text-2xl text-gray-500 mb-2 font-semibold">
                {currentCategory.name}
              </label>
              {currentCategory.subCategories ? (
                <div className=" text-white">
                  <select
                    id="subCategory"
                    className="px-5 py-3 bg-white/20 backdrop-blur-md border border-white/30 
                  rounded-md text-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    defaultValue=""
                  >
                    <option value="">Tất cả danh mục</option>
                    {currentCategory.subCategories.map((sub) => (
                      <option
                        key={sub.slug}
                        value={sub.slug}
                        className="bg-black/80 p-5 text-white"
                      >
                        {sub.name}
                      </option>
                    ))}
                  </select>

                </div>
              ) : (
                <p className="italic text-gray-400"></p>
              )}
            </span>
            <h1 className="!font-bold">Khám phá thế giới sách Waka với hơn 3500+ Sách điện tử, Sách nói và Truyện tranh</h1>

            <div className="flex flex-col gap-5">
              <span className="  bg-white/20 p-2 !font-bold w-max rounded-lg rounded-bl-none">
                SMARTBOOK ĐỀ XUẤT
              </span>
              {currentBook && (
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold">{currentBook.title}</h1>
                  <p className="text-gray-300 line-clamp-5 w-[80%]">{currentBook.description}</p>

                  <Button
                    text="Đọc sách"
                    icon={faBook}
                    href={currentBook.link}
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
        <Section title="Mới nhất" books={categores} />

        <section>
          <h1 className="text-xl !font-bold">Tất cả các sách</h1>

          <div className="flex flex-wrap w-full gap-5 p-5">
            {categores.map((book, i) => (
              <CardRanking
                key={i}
                cover={book.cover}
                title={book.title}
                author={book.author}
                status={book.status}
                description={book.description}
                link={book.link}
              />
            ))}
          </div>
        </section>

      </main>

    </>

  );
}
