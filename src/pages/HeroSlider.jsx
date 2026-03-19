import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useBannerFrontend from "../FrontendFetching/useBannerFrontend";

const HeroSlider = () => {
  const { banner, loading } = useBannerFrontend();

  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    if (!banner || banner.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banner.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banner]);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % banner.length);

  const prevSlide = () =>
    setCurrent((prev) =>
      prev === 0 ? banner.length - 1 : prev - 1
    );

  // Loading
  if (loading) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <p className="text-lg font-semibold">Loading banner...</p>
      </div>
    );
  }

  // Safety check
  if (!banner || banner.length === 0) return null;

  return (
    <div className="relative h-[500px] w-full overflow-hidden group">

      {/* Image */}
      <img
        src={banner[current]?.image}
        alt="slider"
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* Arrows */}
      {banner.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
          >
            <FaChevronRight />
          </button>
        </>
      )}

      {/* Indicators */}
      {banner.length > 1 && (
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          {banner.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full cursor-pointer ${
                current === index ? "bg-white" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;