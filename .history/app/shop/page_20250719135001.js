"use client";

import Image from "next/image";

const products = [
  {
    name: "BlazeRift 9000 ",
    price: "$120",
    image: "/bolt-orange.webp",
    color: "#ce3c24",
  },
  {
    name: "GhostCore X ",
    price: "$115",
    image: "/bolt-white.webp",
    color: "#ffffff",
  },
  {
    name: "NeoVerdance ⚡",
    price: "$125",
    image: "/bolt-lime.webp",
    color: "#264212",
  },
];

export default function Shop() {
  return (
    <section className="w-full min-h-screen px-4 md:px-12 pt-20 pb-32 bg-white dark:bg-[#111827] text-black dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center tracking-tight">
          ⚡ Step Into the Drop
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#1f2937] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div
                className="w-full h-64 flex items-center justify-center"
                style={{ backgroundColor: product.color }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-3/4 h-auto object-contain transform skew-y-6 rotate-[-6deg]  group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 ease-in-out"
                />
              </div>
              <div className="p-6 flex flex-col gap-3 text-center">
                <h3 className="text-2xl font-extrabold tracking-wide">
                  {product.name}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                  {product.price}
                </p>
                <button className="mt-4 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-md transition-transform">
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
