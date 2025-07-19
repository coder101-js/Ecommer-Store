'use client';

import axios from 'axios';

export default function CheckoutButton({ cart }) {
  const handleCheckout = async () => {
    const res = await axios.post('/api/checkout', { items: cart });
    window.location.href = res.data.url; // redirect to Stripe
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-purple-600 text-white px-4 py-2 rounded"
    >
      Checkout 💳
    </button>
  );
}
