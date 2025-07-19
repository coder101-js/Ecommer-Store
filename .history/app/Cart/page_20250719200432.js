"use client";
import { useCart } from "./../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart 🛒</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>${item.price} x {item.quantity}</p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="w-16 p-1 border"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 font-bold text-lg">
            Total: ${total.toFixed(2)}
          </div>
          <button
            onClick={clearCart}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
