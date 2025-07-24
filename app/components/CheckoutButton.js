"use client";

import { useState } from "react";
import axios from "axios";

export default function CheckoutButton({ cart }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/checkout", { items: cart });
      window.location.href = res.data.url;
    } catch (err) {
      setError("Something went wrong. Try again 🥲");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Redirecting..." : "Checkout 💳"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
}
