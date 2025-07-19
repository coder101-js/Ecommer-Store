"use client";
import { useCart } from "./../context/CartContext";
import Image from "next/image";
export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between border-b pb-4"
              >
                {/* Image & Title */}
                <div className="flex items-center gap-4 w-full md:w-1/2">
                  {item.images?.[0] && (
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity + Remove */}
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity ?? 1}
                    min={1}
                    className="w-16 text-center border rounded"
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500 hover:underline"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
            <button
              onClick={clearCart}
              className="mt-2 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
