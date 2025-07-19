import React from "react";

export default async function Page({ params }) {
  const slug = params.slug; 

  return (
    <div>
      <h1>Product: {slug}</h1>
    </div>
  );
}

// https://dummyjson.com/products/category/mens-shoes
