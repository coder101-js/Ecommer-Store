import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import SuccessClient from "./SuccessClient";

export const runtime = "edge";

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
    console.error("JWT verification failed:", err);
    return null;
  }
}

export default async function SuccessPage() {
  const headersList = headers();
  const referer = headersList.get("x-next-url");

  if (!referer) {
    console.warn("⚠️ No x-next-url header found.");
    redirect("/");
  }

  const fullUrl = new URL(referer, "http://localhost:3000.com");
  const token = fullUrl.searchParams.get("token");

  if (!token) {
    console.warn("❌ No token in URL — redirecting");
    redirect("/");
  }

  const payload = await verifyToken(token);

  if (!payload) {
    console.warn("❌ Invalid or expired token — redirecting");
    redirect("/");
  }

  return <SuccessClient name={payload.name || "customer"} />;
}
