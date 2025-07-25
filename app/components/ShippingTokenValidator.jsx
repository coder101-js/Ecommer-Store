// app/shipping/ShippingTokenValidator.jsx
'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function ShippingTokenValidator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      try {
        const token = searchParams.get("token");
        if (!token) throw new Error("Missing token");

        const { data } = await axios.get(`/api/shipping/valid?token=${token}`);
        if (!data?.valid) {
          router.push("/cart?shippingError");
        }
      } catch (err) {
        console.error("❌ Error:", err.message);
        router.push("/cart?shippingError");
      } finally {
        setLoading(false);
      }
    };

    validate();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-lg">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return null;
}
