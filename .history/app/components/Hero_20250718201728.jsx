// components/Hero.tsx

"use client";

import Image from "next/image";
import { useState } from "react";

const shoes = [
  {
    color: "orange",
    hex: "#ce3c24",
    image: "/bolt-orange.png",
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
    <section className="w-full bg-white dark:bg-black text-black dark:text-white pt-16 pb-32 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
            Engineered for Speed
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Bolt Into the Future
            <br />
            with <span className="text-white">BoltForm</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Step into lightning-fast comfort, built for every move.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
              Shop Now
            </button>
            <button className="text-blue-500 font-medium hover:underline">
              Explore Collection
            </button>
          </div>
        </div>

        {/* Shoe Image */}
        <div className="flex-1 relative">
          <div
            className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full mx-auto flex items-center justify-center transition-all duration-300"
            style={{ backgroundColor: active.hex }}
          >
            <Image
              src={active.image}
              alt={`BoltForm Shoe in ${active.color}`}
              width={250}
              height={250}
              className="object-contain"
            />
          </div>

          {/* Color Switcher */}
          <div className="flex gap-3 justify-center mt-6">
            {shoes.map((shoe) => (
              <button
                key={shoe.color}
                className={`w-6 h-6 rounded-full border-2 ${
                  active.color === shoe.color
                    ? "border-black dark:border-white"
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
