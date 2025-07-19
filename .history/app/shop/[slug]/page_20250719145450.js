import React from "react";

const page = ({ parmas }) => {
  const slug = parmas.slug; 
  return (
    <div>
      <h1>Product: {slug}</h1>
    </div>
  );
};
export default page;
// https://dummyjson.com/products/category/mens-shoes
