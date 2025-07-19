import Image from "next/image";

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  return data.products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function getProduct(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  return (
    <section className="px-6 py-24 max-w-5xl mx-auto text-black dark:text-white">
      <div className="grid md:grid-cols-2 gap-12">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          className="rounded-xl object-contain w-full h-auto"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-lg mb-4 text-gray-600 dark:text-gray-400">
            {product.description}
          </p>
          <p className="text-2xl font-semibold mb-2">${product.price}</p>
          <p className="text-yellow-500 text-sm">⭐ {product.rating}</p>

          <button className="mt-6 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
