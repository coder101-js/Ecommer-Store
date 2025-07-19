import React from "react";

// app/shop/[slug]/page.js

export default async function Page({ params }) {
  return (
    <div>
      <h1>Product: {params.slug}</h1>
    </div>
  );
}

// https://dummyjson.com/products/category/mens-shoes
