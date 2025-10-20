import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";

type Project = {
  cover?: string;
  title?: string;
  author?: string;
};

type BookSliderProps = {
  projects: Project[];
  onSlideChange?: (index: number) => void;
};

export default function BookSlider({ projects, onSlideChange }: BookSliderProps) {
  const splideRef = useRef<Splide | null>(null);

  useEffect(() => {
    if (projects.length > 0) {
      if (splideRef.current) {
        splideRef.current.destroy();
      }

      const splide = new Splide(".splide-desktop", {
        type: "loop",
        perPage: 1,
        focus: "center",
        padding: { left: "20%", right: "20%" },
        gap: "0.5rem",
        arrows: true,
        pagination: false,
        autoplay: true,
        interval: 5000,
      });

      splide.on("moved", (newIndex: number) => {
        onSlideChange?.(newIndex);
      });

      splide.mount();
      splideRef.current = splide;

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
                alt={ebook.title ?? `Slide ${index}`}
                className="rounded-xl shadow-lg h-100 w-[90%] object-cover"
              />
              {/* {(ebook.title || ebook.author) && (
                <div className="absolute bottom-4 left-4 text-white drop-shadow">
                  {ebook.title && <h3 className="font-bold">{ebook.title}</h3>}
                  {ebook.author && <p className="text-sm">{ebook.author}</p>}
                </div>
              )} */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
