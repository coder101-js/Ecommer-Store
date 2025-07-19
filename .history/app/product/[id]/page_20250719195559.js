"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://dummyjson.com/products/${params.id}`);
      const data = await res.json();
      setProduct(data);
      setSelectedImg(data.thumbnail);
    }

    fetchProduct();
  }, [params.id]);

  if (!product) return <div className="p-10">Loading...</div>;

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 text-black dark:text-white">
      <div className="grid md:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-md">
            <Image
              src={selectedImg || product.thumbnail}
              alt={product.title}
              fill
              className="object-contain p-6"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {[product.thumbnail, ...product.images].map((src, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(src)}
                className={`w-20 h-20 relative flex-shrink-0 border-2 rounded-md overflow-hidden ${
                  selectedImg === src
                    ? "border-blue-500 ring-2 ring-blue-400"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={src}
                  alt={`Image ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {product.description}
          </p>

          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              ${product.price}
            </p>
            <span className="text-yellow-500 flex items-center gap-1">
              <StarIcon className="h-5 w-5" />
              {product.rating}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock} available
            </p>
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Weight:</strong> {product.weight} lbs
            </p>
            <p>
              <strong>Dimensions:</strong> {product.dimensions.width}W x{" "}
              {product.dimensions.height}H x {product.dimensions.depth}D
            </p>
            <p>
              <strong>Warranty:</strong> {product.warrantyInformation}
            </p>
            <p>
              <strong>Shipping:</strong> {product.shippingInformation}
            </p>
            <p>
              <strong>Return:</strong> {product.returnPolicy}
            </p>
            <p>
              <strong>Min. Order:</strong> {product.minimumOrderQuantity}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            toast.success("Added to cart!");
            className="mt-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300 transition"
          >
            Add to Cart
          </button>

          <div className="mt-6">
            <p className="text-sm text-gray-400">Barcode:</p>
            <code className="text-xs bg-gray-100 dark:bg-neutral-800 px-2 py-1 rounded-md">
              {product.meta.barcode}
            </code>
            <div className="mt-2 w-32">
              <Image
                src={product.meta.qrCode}
                alt="QR Code"
                width={128}
                height={128}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-24">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {product.reviews.map((review, i) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-neutral-800 p-4 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">{review.reviewerName}</p>
                <span className="text-yellow-500 flex items-center gap-1">
                  <StarIcon className="h-4 w-4" />
                  {review.rating}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {review.comment}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
