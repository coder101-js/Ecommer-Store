"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function Shop() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryFromUrl = searchParams.get("category") || "mens-shoes";
  const searchFromUrl = searchParams.get("search") || "";

  const [category, setCategory] = useState(categoryFromUrl);
  const [search, setSearch] = useState(searchFromUrl);
  const [products, setProducts] = useState([]);

  // Sync state from URL
  useEffect(() => {
    setCategory(categoryFromUrl);
    setSearch(searchFromUrl);
  }, [categoryFromUrl, searchFromUrl]);

  // Fetch products by category
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await res.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, [category]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  // Handle category switch
  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams();
    params.set("category", cat);
    if (search) params.set("search", search);
    router.push(`/shop?${params.toString()}`);
  };


  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    const params = new URLSearchParams();
    params.set("category", category);
    if (val.trim()) params.set("search", val.trim());
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <section className="w-full min-h-screen px-4 md:px-12 pt-20 pb-32 bg-white dark:bg-[#111827] text-black dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center tracking-tight">
          ⚡ Step Into the Drop
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {["mens-shoes", "womens-shoes"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full font-medium border ${
                category === cat
                  ? "bg-black text-white"
                  : "bg-white dark:bg-[#1f2937] border-gray-300"
              }`}
            >
              {cat.replace("-", " ").toUpperCase()}
            </button>
          ))}
          <input
            type="text"
            placeholder="Search products"
            value={search}
            onChange={handleSearchChange}
            className="ml-4 px-4 py-2 rounded-full border bg-gray-100 dark:bg-neutral-900 text-black dark:text-white focus:outline-none outline-black outline-2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <HoverImageCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-center col-span-full text-gray-400 dark:text-gray-500 text-8xl">
              No products found :(
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function HoverImageCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-white dark:bg-[#1f2937] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => (window.location.href = `/product/${product.id}`)}
    >
      <div className="relative w-full h-64 flex items-center justify-center bg-gray-100 dark:bg-[#374151] ">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={400}
          height={400}
          className={`w-3/4 h-auto object-contain absolute transition-opacity duration-500 ease-in-out ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
        />

        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={product.title + " alt"}
            width={400}
            height={400}
            className={`w-3/4 h-auto object-contain absolute transition-opacity duration-500 ease-in-out ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
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
  );
}
