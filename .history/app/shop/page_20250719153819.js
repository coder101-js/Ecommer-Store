"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("mens-shoes");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}`
        );
        const data = await res.json();
        setProducts(data.products); 
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <section className="w-full min-h-screen px-4 md:px-12 pt-20 pb-32 bg-white dark:bg-[#111827] text-black dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center tracking-tight">
          ⚡ Step Into the Drop
        </h2>

        {/* 🔁 Category switcher */}
        <div className="flex justify-center gap-4 mb-10">
          {["mens-shoes", "womens-shoes"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium border ${
                category === cat
                  ? "bg-black text-white"
                  : "bg-white dark:bg-[#1f2937] border-gray-300"
              }`}
            >
              {cat.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </div>

        {/* 🧱 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-[#1f2937] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="w-full h-64 flex items-center justify-center bg-gray-100 dark:bg-[#374151]">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="w-3/4 h-auto object-contain transform skew-y-6 rotate-[-6deg] group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 ease-in-out"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold">{product.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">${product.price}</p>
                <p className="text-sm text-yellow-500">⭐ {product.rating}</p>
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {product.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
