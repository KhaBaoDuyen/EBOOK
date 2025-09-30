import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

type Slider3ImagesProps = {
    images: string[];
};

export default function Slider3Images({ images }: Slider3ImagesProps) {
    return (
        <Splide
            options={{
                type: 'loop',
                perPage: 3,
                autoplay: true,
                gap: "1rem",
                interval: 3000,
                arrows: false,
                pagination: false,
            }}
        >
            {images.map((src, i) => (
                <SplideSlide key={i}>
                    <img
                        src={src}
                        alt={`slide-${i}`}
                        className="w-full h-54 object-cover rounded-md"
                    />
                </SplideSlide>
            ))}
        </Splide>

    );
}
