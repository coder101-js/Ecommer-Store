// app/success/page.tsx

import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose"; // ✅ edge-friendly lib
import { useCart } from "../context/CartContext";
export const runtime = "edge"; // 🧊 run this page on the edge

export const metadata = {
  title: "Success | Your Ecom",
  description: "Thanks for your purchase!",
};

async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}

export default async function SuccessPage() {
    const headersList = headers();
    const fullUrl = new URL(
        headersList.get("x-next-url"),
        "https://your-ecom.com"
    );
    const token = fullUrl.searchParams.get("token");

  if (!token) redirect("/"); // 🚫 no token? bounce

  const payload = await verifyToken(token);

  if (!payload) redirect("/"); // 🚫 invalid or expired? bounce again
  
  const { clearCart } = useCart();
  clearCart();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-lg">
        Thank you for your purchase, {payload.name || "customer"}! Your order is
        confirmed.
      </p>
      <Link href="/shop" className="mt-6 text-blue-500 underline">
        Go back to store
      </Link>
    </div>
  );
}
