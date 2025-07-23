"use client";
import { useCart } from "./../context/CartContext";
import CheckoutButton from "../components/CheckoutButton";
import Image from "next/image";
import { useState, useRef } from "react";
import axios from "axios";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [pendingSync, setPendingSync] = useState(false);
  const syncTimeoutRef = useRef(null);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const debouncedSyncCartToDB = (cartData) => {
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

    setPendingSync(true);

    syncTimeoutRef.current = setTimeout(async () => {
      try {
        await axios.post("/api/save", {
          type: "cart",
          data: cartData,
        });
      } catch (err) {
        console.error("🛑 Failed to sync cart:", err.message);
      } finally {
        setPendingSync(false);
      }
    }, 400); // Debounce delay
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    debouncedSyncCartToDB(updatedCart);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    debouncedSyncCartToDB(cart.filter((item) => item.id !== id));
  };

  const handleClear = () => {
    clearCart();
    debouncedSyncCartToDB([]);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🛒</h1>

      {cart.length === 0 ? (
        <p className="text-gray-700 text-4xl block text-center w-full dark:text-white">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4 w-full md:w-1/2">
                  {item.images?.[0] && (
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      width={200}
                      height={200}
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-white">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease quantity of ${item.title}`}
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
                    aria-label={`Quantity of ${item.title}`}
                    onFocus={(e) => e.target.select()}
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                    aria-label={`Increase quantity of ${item.title}`}
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="ml-2 text-red-500 hover:text-red-600"
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right space-y-2">
            <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
            {pendingSync && (
              <div className="text-sm text-gray-400 dark:text-gray-500 italic">
                Syncing with server...
              </div>
            )}
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleClear}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Clear Cart
              </button>
              <CheckoutButton cart={cart} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
