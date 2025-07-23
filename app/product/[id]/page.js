"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setSelectedImg(data.thumbnail);
    }

    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <section className="p-10 animate-pulse">
        <div className="h-72 bg-gray-200 dark:bg-neutral-800 rounded-xl mb-6" />
        <div className="h-6 bg-gray-200 dark:bg-neutral-700 w-1/2 mb-2 rounded" />
        <div className="h-4 bg-gray-200 dark:bg-neutral-700 w-3/4 rounded" />
      </section>
    );
  }

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
            disabled={isAdding}
            onClick={async () => {
              setIsAdding(true);
              addToCart(product);
              toast.success("Added to cart!");

              try {
                // Add a small delay before sync (to prevent spam + batching)
                await new Promise((res) => setTimeout(res, 1000));

                await fetch("/api/save", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    type: "cart",
                    data: [
                      {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                        images: product.images,
                      },
                    ],
                  }),
                });
              } catch (err) {
                toast.error("Failed to sync cart 🥲");
                console.error("MongoDB save error:", err);
              }

              setIsAdding(false);
            }}
            className={`mt-4 px-6 py-3 rounded-full transition font-medium flex items-center justify-center gap-2 ${
              isAdding
                ? "bg-gray-500 cursor-wait text-white"
                : "bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-300"
            }`}
          >
            {isAdding ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white dark:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Adding...
              </>
            ) : (
              "Add to Cart"
            )}
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
