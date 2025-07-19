// app/success/page.tsx
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

export default async function SuccessPage({ searchParams }}) {
  const token = searchParams.token;

  if (!token) {
    redirect("/");
  }

  const payload = await verifyToken(token);

  if (!payload) {
    redirect("/");
  }

  return <SuccessClient name={payload.name || "customer"} />;
}
