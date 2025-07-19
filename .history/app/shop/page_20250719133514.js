"use client";

import Image from "next/image";

const products = [
  {
    name: "BoltForm Orange",
    price: "$120",
    image: "/bolt-orange.webp",
    color: "#ce3c24",
  },
  {
    name: "BoltForm White",
    price: "$115",
    image: "/bolt-white.webp",
    color: "#ffffff",
  },
  {
    name: "BoltForm Lime",
    price: "$125",
    image: "/bolt-lime.webp",
    color: "#264212",
  },
  // 🧠 Add more products here later (e.g. limited editions, collabs, etc.)
];

export default function Shop() {
  return (
    <section className="w-full min-h-screen px-4 md:px-12 pt-20 pb-32 bg-white dark:bg-[#111827] text-black dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-12 text-center">
          🛒 Shop the Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#1f2937] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
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
                  className="w-3/4 h-auto object-contain transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col gap-3 text-center">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {product.price}
                </p>
                <button className="mt-4 bg-blue-700 text-white dark:bg-white dark:text-black px-4 py-2 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-transform">
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
