import Splide from "@splidejs/splide";
import "@splidejs/splide/css";
import "@splidejs/splide/css/skyblue";
import { useState, useEffect } from "react";

const Slider = () => {
  const images = [
    "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/4276.jpg?v=3&w=1920&h=600",
    "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/4024.jpg?v=1&w=1920&h=600",
    "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/4174.jpg?v=1&w=1920&h=600",
    "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/4267.jpg?v=2&w=1920&h=600",
    "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/4282.jpg?v=4&w=1920&h=600",
  ];

  const imagesMobile = [
    "/Images/Slides/mobile/4321.png",
    "/Images/Slides/mobile/4024.png",
    "/Images/Slides/mobile/4174.png",
    "/Images/Slides/mobile/4276.png",
    "/Images/Slides/mobile/4282.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const splideDesktop = new Splide(".splide-desktop", {
      type: "loop",
      perPage: 1,
      autoplay: true,
      interval: 5000,
      arrows: true,
      pagination: false,
    }).mount();

    const splideMobile = new Splide(".splide-mobile", {
      type: "loop",
      perPage: 1,
      focus: "center",
      padding: { left: "20%", right: "20%" },
      gap: "1rem",
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 5000,
    });

    splideMobile.on("moved", (newIndex) => {
      setActiveIndex(newIndex);
    });

    splideMobile.mount();

     return () => {
      splideDesktop.destroy();
      splideMobile.destroy();
    };
  }, []);

  return (
    <>
      {/* Desktop */}
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

      {/* Mobile */}
      <div
        className="pt-[5rem] pb-[2rem] lg:!hidden block min-h-[20rem] relative overflow-hidden"
        style={{
          backgroundImage: `url(${images[activeIndex]})`,  
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        <div className="splide splide-mobile relative z-10">
          <div className="splide__track">
            <ul className="splide__list">
              {imagesMobile.map((mobile, index) => (
                <li key={index} className="splide__slide">
                  <img
                    src={mobile}
                    alt={`Slide ${index}`}
                    className="rounded-xl shadow-lg h-full w-full object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
