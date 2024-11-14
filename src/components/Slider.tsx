"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Nouvelle collection de Baya",
    description: "Découvrez la nouvelle collection été 2024",
    img: "/Hero.webp",
    imgClassName: "object-right",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    url: "/",
  },
  {
    id: 2,
    title: "Nouvelle collection de Baya",
    description: "Découvrez la nouvelle collection été 2024",
    img: "/Hero2.webp",
    imgClassName: "object-top",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    url: "/",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateSlideWidth = () => {
      if (sliderRef.current) {
        setSlideWidth(sliderRef.current.offsetWidth);
      }
    };

    updateSlideWidth();

    window.addEventListener("resize", updateSlideWidth);
    return () => {
      window.removeEventListener("resize", updateSlideWidth);
    };
  }, []);

  // SLIDER ANIMATION
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  //   }, 6000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="relative h-[600px] overflow-hidden">
      <div
        className="w-max flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * slideWidth}px)` }}
      >
        {slides.map((slide, index) => (
          <div
            ref={index === current ? sliderRef : null}
            className="relative w-[calc(100vw-32px)] md:w-[calc(100vw-64px)] lg:w-[calc(100vw-96px)] xl:w-[calc(100vw-192px)] h-[600px]"
            key={slide.id}
          >
            <Image
              src={slide.img}
              alt="bannière bijoux oshun jewelry"
              fill
              sizes="100%"
              className={`object-cover brightness-90 ${slide.imgClassName}`}
              priority
            />

            <div className="relative w-full h-full grid place-content-center">
              <div className="absolute bottom-32 flex flex-col justify-center items-center gap-6 w-full">
                <div className="relative w-[300px]">
                  <Image
                    src={"/sunday_club_white.svg"}
                    alt="bannière bijoux oshun jewelry"
                    width={300}
                    height={100}
                    className={`object-cover ${slide.imgClassName}`}
                    priority
                  />
                </div>
                <Button color="white" href={slide.url} width="normal">
                  Découvrir la collection
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 -translate-x-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ring-1 ring-gray-100 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-100 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
