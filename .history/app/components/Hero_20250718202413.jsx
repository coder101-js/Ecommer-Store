"use client";

import Image from "next/image";
import { useState } from "react";

const shoes = [
  {
    color: "orange",
    hex: "#ce3c24",
    image: "/bolt-orange.webp",
  },
  {
    color: "white",
    hex: "#ffffff",
    image: "/bolt-white.webp",
  },
  {
    color: "lime",
    hex: "#264212",
    image: "/bolt-lime.webp",
  },
];

export default function Hero() {
  const [active, setActive] = useState(shoes[0]);

  return (
    <section className="w-full bg-white dark:bg-black text-black dark:text-white pt-16 pb-24 px-4 sm:px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
        {/* Left Text Content */}
        <div className="flex-1 w-full space-y-6 text-center lg:text-left">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Engineered for Speed
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Bolt Into the Future
            <br />
            with <span className="text-white dark:text-yellow-400">BoltForm</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-xl mx-auto lg:mx-0">
            Step into lightning-fast comfort, built for every move.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-6">
            <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
              ⚡ Shop Now
            </button>
            <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
              Explore Collection
            </button>
          </div>
        </div>

        {/* Right Shoe Image + Color Switch */}
        <div className="flex-1 w-full flex flex-col items-center">
          <div
            className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] rounded-full flex items-center justify-center transition-all duration-500 shadow-lg"
            style={{ backgroundColor: active.hex }}
          >
            <Image
              src={active.image}
              alt={`BoltForm Shoe in ${active.color}`}
              width={250}
              height={250}
              className="object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Color Options */}
          <div className="flex gap-3 justify-center mt-6">
            {shoes.map((shoe) => (
              <button
                key={shoe.color}
                aria-label={`Select ${shoe.color}`}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  active.color === shoe.color
                    ? "border-black dark:border-white scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: shoe.hex }}
                onClick={() => setActive(shoe)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
