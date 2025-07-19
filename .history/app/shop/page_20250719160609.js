'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Shop() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get('category') || 'mens-shoes';
  const initialSearch = searchParams.get('search') || '';

  const [category, setCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [products, setProducts] = useState([]);

  // Fetch whenever category changes
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await res.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, [category]);

  // Update URL when category or searchTerm changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (searchTerm) params.set('search', searchTerm.trim());
    router.replace(`/shop?${params.toString()}`, { scroll: false });
  }, [category, searchTerm]);

  // Filter products client‑side
  const displayed = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="..."> {/* existing container styles */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-12 text-center">⚡ Step Into the Drop</h2>

        {/* Categories + Search */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {['mens-shoes', 'womens-shoes'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setSearchTerm(''); // reset search
              }}
              className={`px-5 py-2 rounded-full font-medium border ${
                category === cat
                  ? 'bg-black text-white'
                  : 'bg-white dark:bg-[#1f2937] border-gray-300'
              }`}
            >
              {cat.replace('-', ' ').toUpperCase()}
            </button>
          ))}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-4 px-4 py-2 border rounded-full bg-gray-100 dark:bg-neutral-900 text-black dark:text-white focus:outline-none"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {displayed.map((product) => (
            <HoverImageCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Keep your HoverImageCard component here...
function HoverImageCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="... shadow and rounded"
    >
      <div className="relative w-full h-64 ...">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={400}
          height={400}
          className={`absolute transform transition-opacity duration-500 ${
            hovered ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={product.title + ' alt'}
            width={400}
            height={400}
            className={`absolute transform transition-opacity duration-500 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold">{product.title}</h3>
        <p className="text-gray-600 dark:text-gray-400">${product.price}</p>
        <p className="text-sm text-yellow-500">⭐ {product.rating}</p>
        {/* tags */}
      </div>
    </div>
  );
}
