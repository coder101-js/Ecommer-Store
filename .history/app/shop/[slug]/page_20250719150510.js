import React from "react";

// This is a Server Component — don't use "use client" here
const page = async ({ params }) => {
  const { slug } = params;

  // Fetch all shoes from the API
  const res = await fetch("https://dummyjson.com/products/category/mens-shoes", {
    cache: "no-store", // SSR: always fetch fresh
  });
  const data = await res.json();
  const shoes = data.products;

  // Try to match the product by slug (you may need to slugify titles)
  const product = shoes.find(
    (item) =>
      item.title.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
  );

  if (!product) {
    return (
      <div>
        <h1>Product not found 😢</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} className="w-64 h-64 object-cover my-4" />
      <p className="text-lg text-gray-700">{product.description}</p>
      <p className="text-xl font-semibold mt-2">${product.price}</p>
    </div>
  );
};

export default page;
