"use client";
import { useCart } from "../context/CartContext";
import { Suspense } from "react";
import ShopClient from "./ShopClient";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="text-center pt-20">Loading shop...</div>}>
      <ShopClient />
    </Suspense>
  );
}
