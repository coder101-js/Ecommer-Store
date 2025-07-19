import React from "react";

const page = async ({ params }) => {
  // const slug = params.slug;
  return (
    <div>
      <h1>Product: {params.slug}</h1>
    </div>
  );
};
export default page;
// https://dummyjson.com/products/category/mens-shoes
