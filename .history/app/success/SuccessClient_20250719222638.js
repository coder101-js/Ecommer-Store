// app/success/SuccessClient.tsx
"use client";

import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function SuccessClient({ name }) {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(); // ✅ Only runs in browser after render
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-lg">
        Thank you for your purchase, {name}! Your order is confirmed.
      </p>
      <Link href="/shop" className="mt-6 text-blue-500 underline">
        Go back to store
      </Link>
    </div>
  );
}
