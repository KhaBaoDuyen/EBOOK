import { useEffect } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

type Project = {
  cover: string;
  title?: string;
  author?: string;
};

type BookSliderProps = {
  projects: Project[];
  onSlideChange?: (index: number) => void;
};

export default function BookSlider({ projects, onSlideChange }: BookSliderProps) {
  useEffect(() => {
    if (projects.length > 0) {
      const splide = new Splide(".splide-desktop", {
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
        if (onSlideChange) {
          onSlideChange(newIndex); // báo cho cha index mới
        }
      });

      splide.mount();

      return () => {
        splide.destroy();
      };
    }
  }, [projects, onSlideChange]);

  return (
    <div className="splide splide-desktop relative z-10">
      <div className="splide__track">
        <ul className="splide__list">
          {projects.map((ebook, index) => (
            <li key={index} className="splide__slide h-100">
              <img
                src={ebook.cover}
                alt={`Slide ${index}`}
                className="rounded-xl shadow-lg h-100 w-full object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
