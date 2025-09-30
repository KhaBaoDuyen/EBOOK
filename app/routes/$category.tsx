import { useParams } from "react-router";
import { useEffect, useState } from "react";
import categories from "../../public/data/categories.json";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";
import "@splidejs/splide/css/skyblue";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Buttons/Button";
import Section from "~/components/Section";
import CardCategory from "~/components/Cards/CardCategory";
import CardRanking from "~/components/Cards/CardRanking";

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
export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();

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

  useEffect(() => {
    fetch("/data/listBook.json")
      .then((res) => res.json())
      .then((data: Book[]) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setProjects(shuffled.slice(0, 5));
      })
      .catch((err) => console.error(err));
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
    "/Images/Slides/Pages/1.jpg",
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
      <div className="bg-sec1 h-full !mx-auto py-[5rem] text-white">
        <div className="container !mx-auto flex  items-center justify-center w-full">
          <div className="basis-3/5 flex flex-col gap-3">
            <span className=" flex items-center gap-5" >
              <label htmlFor="subCategory" className="block text-7xl mb-2 font-semibold">
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
            <h1>Khám phá thế giới sách Waka với hơn 3500+ Sách điện tử, Sách nói và Truyện tranh</h1>

            <div className="flex flex-col gap-5">
              <span className="  bg-white/20 p-2 w-max rounded-lg rounded-bl-none">
                SMARTBOOK ĐỀ XUẤT
              </span>
              {currentBook && (
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold">{currentBook.title}</h1>
                  <p className="text-gray-300 line-clamp-5">{currentBook.description}</p>

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
            <div className="splide splide-desktop relative z-10">
              <div className="splide__track">
                <ul className="splide__list">
                  {projects.map((ebook, index) => (
                    <li key={index} className="splide__slide h-full">
                      <img
                        src={ebook.cover}
                        alt={`Slide ${index}`}
                        className="rounded-xl shadow-lg h-full w-full object-cover"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </span>

        </div>

      </div>
      <main className="container !mx-auto">
        <Section title="Mới nhất" books={projects} />
        <div className="mt-5">
          <h1 className="text-3xl">Một số thể loại</h1>
          <div className="!mx-auto grid md:grid-cols-4 grid-cols-2 gap-5 py-2">
            {categores.slice(0, 8).map((book, i) => (
              <CardCategory
                key={i}
                cover={book.cover}
                title={book.title}
                author={book.author}
                link={book.link}
                subCategory={book.subCategory}
              />
            ))}
          </div>
        </div>

        <div className="!mx-auto py-5">
          <h1 className="font-bold text-2xl">Bảng xếp hạng</h1>
          <div className="flex flex-row overflow-x-auto scrollbar-hide w-full gap-10 p-5">
            {categores.map((book, i) => (
              <CardRanking
                key={i}
                number={i + 1}
                cover={book.cover}
                title={book.title}
                author={book.author}
                status={book.status}
                description={book.description}
                link={book.link}
              />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h1 className="text-3xl">Một số thể loại</h1>
          <div className="splide splide-desktop hidden lg:block relative rounded-lg overflow-hidden">
            <div className="splide__track">
              <ul className="splide__list">
                {images.map((img, index) => (
                  <li key={index} className="splide__slide">
                    <img
                      src={img}
                      alt="Slide"
                      className="w-full min-h-[30rem] object-cover rounded-lg"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

    </>

  );
}
