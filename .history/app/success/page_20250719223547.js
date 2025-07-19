import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import SuccessClient from "./SuccessClient";

export const runtime = "edge";

export const metadata = {
  title: "Success | Your Ecom",
  description: "Thanks for your purchase!",
};

// 🔐 JWT verification helper
async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err); // helpful for debugging
    return null;
  }
}

export default async function SuccessPage(request) {
  const url = new URL(request.url); // ✅ cleaner than using headers
  const token = url.searchParams.get("token");

  if (!token) {
    console.warn("❌ No token in URL — redirecting");
    redirect("/");
  }

  const payload = await verifyToken(token);

  if (!payload) {
    console.warn("❌ Invalid or expired token — redirecting");
    redirect("/");
  }

  // ✅ Token is valid, render the success client
  return <SuccessClient name={payload.name || "customer"} />;
}
