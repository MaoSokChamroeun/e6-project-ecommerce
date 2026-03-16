import { useState, useEffect } from "react";

const HeroSlider = () => {

  const slides = [
    {
      image: "https://store974.com/cdn/shop/files/keyboard_copy.jpg?v=1732084374",
      title: "E6 TEAM Online Store",
      desc: "Discover the best products with amazing prices",
    },
    {
      image: "https://dlcdnwebimgs.asus.com/gain/6F97E38F-79AE-4638-9E82-003B40BE7185/fwebp",
      title: "Big Sale Today",
      desc: "Get the best deals on your favorite products",
    },
    {
      image: "https://www.apple.com/v/iphone-17-pro/e/images/overview/welcome/hero_endframe__gb7f6nb06rau_xlarge.jpg",
      title: "Shop Smart",
      desc: "Quality products at affordable prices",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[450px] w-full overflow-hidden">

      {/* Image */}
      <img
        src={slides[current].image}
        alt="slider"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">

        <h1 className="text-5xl font-bold mb-4">
          {slides[current].title}
        </h1>

        <p className="text-lg mb-6">
          {slides[current].desc}
        </p>

        <button
          onClick={() =>
            window.scrollTo({ top: 600, behavior: "smooth" })
          }
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Shop Now
        </button>

      </div>

      {/* Indicators */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>

    </div>
  );
};

export default HeroSlider;